<template>
  <div
    class="base-upload"
    tabindex="0"
  >
    <slot></slot>
    <input
      class="base-upload__input"
      type="file"
      name=""
      ref="input"
      @change="handleInputChange"
      :accept="accept"
      :multiple="multiple"
    >
  </div>

</template>

<script>
import lrz from 'lrz';
export default {
  props: {
    //上传的文件类型
    accept: {
      type: String,
      default: 'image/*'
    },
    //是否支持多选文件
    multiple: {
      type: Boolean,
      default: true
    },
    //上传的地址
    action: {
      type: String,
      required: false
    },
    //压缩
    isCompress: {
      type: Boolean,
      default: false
    },
    //上传时附带的额外参数
    requestData: Object,
    //文件开始发送的钩子
    onSend: Function,
    //文件上传时的钩子
    onProgress: Function,
    //文件上传成功时的钩子
    onSuccess: Function,
    //文件上传失败时的钩子
    onError: Function,
    isLocal: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClick() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    handleInputChange(ev) {
      let files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles(files) {
      let postFiles = Array.from(files);

      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }

      if (this.isLocal) {
        this.$emit('upload-local', postFiles);
        return;
      }

      postFiles.forEach(singleFile => {
        if (this.isCompress) {
          lrz(singleFile)
            .then(rst => {
              this.upload(rst.file);
            })
            .catch(err => {
              this.upload(singleFile);
            });
        } else {
          this.upload(singleFile);
        }
      });
    },
    upload(singleFile) {
      //如果要增加beforeUpload钩子
      this.post(singleFile);
    },
    post(singleFile) {
      let opts = {
        file: singleFile,
        filename: 'file',
        isCompress: this.isCompress,
        requestData: this.requestData,
        action: this.action,
        onProgress: e => {
          this.onProgress && this.onProgress(e, singleFile);
        },
        onSuccess: res => {
          this.onSuccess && this.onSuccess(res, singleFile);
        },
        onError: err => {
          this.onError && this.onError(err, singleFile);
        },
        onSend: _ => {
          this.onSend && this.onSend();
        }
      };

      let uploadHttp = new UploadHttp(opts);

      uploadHttp.request();
    }
  }
};

class UploadHttp {
  constructor(opts) {
    this.opts = opts || {};
  }

  request() {
    let xhr = new XMLHttpRequest();
    let action = this.opts.action;

    if (xhr.upload) {
      xhr.upload.onprogress = e => {
        if (e.total > 0) {
          e.percent = (e.loaded / e.total) * 100;
        }
        this.opts.onProgress(e);
      };
    }

    const formData = new FormData();

    if (this.opts.requestData) {
      Object.keys(this.opts.requestData).forEach(key => {
        formData.append(key, this.opts.requestData[key]);
      });
    }

    if (this.opts.isCompress) {
      formData.append(
        this.opts.filename,
        this.opts.file,
        `${new Date().getTime()}.${this.opts.file.type.split('/')[1]}`
      );
    } else {
      formData.append(this.opts.filename, this.opts.file);
    }

    xhr.onerror = e => {
      this.opts.onError(e);
    };

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        return this.opts.onError(this.getError(action, this.opts, xhr));
      }

      this.opts.onSuccess(this.getBody(xhr));
    };

    xhr.open('post', action, true);

    if (this.opts.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    const headers = this.opts.headers || {};

    for (let item in headers) {
      if (headers.hasOwnProperty(item) && headers[item] !== null) {
        xhr.setRequestHeader(item, headers[item]);
      }
    }

    xhr.send(formData);
    this.opts.onSend();

    return xhr;
  }

  getError(action, option, xhr) {
    let msg;
    if (xhr.response) {
      msg = `${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
      msg = `${xhr.responseText}`;
    } else {
      msg = `fail to post ${action} ${xhr.status}`;
    }

    let err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
  }

  getBody(xhr) {
    let text = xhr.responseText || xhr.response;
    if (!text) {
      return text;
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }
}
</script>

<style scoped>
.base-upload {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
}

.base-upload__input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
