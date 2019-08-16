<template>
  <div class="p-page-bg p-full p-flex">
    <base-header></base-header>
    <div class="p-flex-scroll">
      <div class="item p-level">
        <div class="item__title">
          {{ article.title }}
        </div>
        <div class="item__header">
          <img
            :src="article.avatar"
            class="item__avatar"
          >
          <div>
            <p class="item__author">{{ article.name }}</p>
            <p class="item__time">{{ article.moment }}</p>
          </div>

        </div>
        <div class="item__content">
          {{ article.content }}
        </div>
        <!-- <div class="item__reply">

      </div> -->
      </div>

      <div
        class="comment"
        v-for="(item, index) in comments"
        :key="index"
      >
        <div class="item p-level">
          <div class="item__header">
            <img
              :src="item.avatar"
              class="item__avatar"
            >
            <div class="item__header-middle">
              <p class="item__author">{{ item.name }}</p>
              <p class="item__time">{{ item.moment }}</p>
            </div>
            <div class="item__header-right">
              {{ item.floor }}楼
            </div>
          </div>
          <div class="item__comment">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>

    <div class="publish">
      <div class="publish__top">
        <div class="publish__filed">
          <mt-field
            label=""
            placeholder="我有话要说..."
            v-model="content"
          ></mt-field>
        </div>
        <div class="publish__btn">
          <mt-button
            size="small"
            type="primary"
            :disabled="publishBtnDisabled"
            @click.native="handlePublish"
          >发表</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { articleGetDetail, articleGetComments, comment } from '@/api';
import { Field as MtField, Button as MtButton } from 'mint-ui';

export default {
  components: {
    MtField,
    MtButton
  },
  data() {
    return {
      article: {},
      content: '',
      comments: []
    };
  },

  computed: {
    publishBtnDisabled() {
      return this.content === '';
    }
  },

  methods: {
    initData() {
      let { id } = this.$route.query;
      articleGetDetail({
        id
      })
        .then(data => {
          this.article = data;
        })
        .catch(() => {});

      this.initComments();
    },
    initComments() {
      let { id } = this.$route.query;
      articleGetComments({
        id
      })
        .then(data => {
          this.comments = data;
        })
        .catch(() => {});
    },
    handlePublish() {
      let { id } = this.$route.query;
      comment({
        id,
        content: this.content
      })
        .then(() => {
          this.initComments();
          this.content = '';
        })
        .catch(() => {});
    }
  },

  created() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
.item {
  background-color: #fff;
  padding-top: 7px;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
}
.item__header {
  display: flex;
  margin-bottom: 19px;
}
.item__header-middle {
  flex: auto;
}
.item__header-right {
  color: #999;
  font-size: 12px;
}
.item__avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 8px;
}
.item__author {
  color: #333;
  font-size: 14px;
  margin-bottom: 6px;
}
.item__time {
  color: #999;
  font-size: 12px;
}
.item__content {
  color: #000;
  padding-bottom: 23px;
  font-size: 16px;
  line-height: 24px;
}
.item__comment {
  color: #000;
  padding: 0 0 23px 40px;

  font-size: 16px;
  line-height: 24px;
}
.item__reply {
  display: flex;
  height: 44px;
  align-items: center;
  flex-direction: row-reverse;
}
.item__title {
  color: #000;
  font-size: 18px;
  font-weight: 700;
  padding: 8px 0 15px 0;
}
.publish {
  background: #fff;
  width: 100%;
  border-top: 1px solid #f2f2f2;
  .mint-field-core {
    background-color: #f5f5f5;
  }
}
.publish__top {
  display: flex;
  align-items: center;
}
.publish__filed {
  flex: auto;
}
.publish__btn {
  padding-right: 12px;
}
.comment {
  margin-bottom: 1px;
}
</style>

<style>
.publish .mint-field-core {
  background-color: #f5f5f5;
}

.publish .mint-cell-value {
  background-color: #f5f5f5;
  padding: 5px;
}

.publish .mint-field-core::placeholder {
  color: #b9b9b9;
}
</style>
