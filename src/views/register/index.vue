<template>
  <div class="p-flex">
    <div class="upload__wrapper">
      <base-upload
        :multiple="false"
        :isLocal="true"
        @upload-local="uploadLocal"
      >

        <div
          class="default-avatar"
          v-if="imgSrc === ''"
        >
          头像
        </div>
        <img
          v-else
          :src="imgSrc"
          class="avatar"
        >
      </base-upload>
    </div>
    <div class="p-flex-scroll wrapper">
      <mt-field
        label="用户名"
        placeholder="请输入"
        v-model="username"
      ></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入"
        type="password"
        v-model="password"
      ></mt-field>
    </div>
    <div class="p-footer-btn">
      <mt-button
        type="primary"
        size="large"
        @click.native="handleClick"
      >注册</mt-button>
    </div>
  </div>
</template>
<script>
import { Field as MtField, Button as MtButton } from 'mint-ui';
import { register } from '@/api';

export default {
  components: {
    MtField,
    MtButton
  },
  data() {
    return {
      username: '',
      password: '',
      imgSrc: ''
    };
  },

  methods: {
    handleClick() {
      let params = this.getParams();
      register(params)
        .then(() => {})
        .catch(() => {});
    },
    getParams() {
      let formData = new FormData();
      formData.append('name', this.username);
      formData.append('password', this.password);
      formData.append('avatar', this.file);
      return formData;
    },
    uploadLocal(file) {
      this.file = file[0];
      let url = this.getObjectURL(this.file);
      this.imgSrc = url;
    },
    getObjectURL(file) {
      let url;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }
  },

  created() {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px;
}
.upload__wrapper {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
  line-height: 0;
}
.default-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 30%;
  border: 1px solid #737171;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 20%;
}
</style>