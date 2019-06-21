<template>
  <div class="p-page-bg p-full p-flex">
    <base-header
      @on-right-click="handleEditClick"
      :click-left="handleHanderLeftClick"
      icon="icon-wode"
    >
      <i
        slot="right"
        class="iconfont icon-bianji"
      ></i>
    </base-header>

    <div class="p-flex-scroll">
      <div
        class="item p-level"
        v-for="(item, index) in article"
        :key="index"
        @click="handleItemClick(item)"
      >
        <div class="item__header">
          <img
            :src="item.avatar"
            class="item__avatar"
          >
          <div>
            <p class="item__author">{{ item.name }}</p>
            <p class="item__time">{{ item.moment }}</p>
          </div>
        </div>
        <div class="item__content">
          {{ item.title }}
        </div>
        <div class="item__reply">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllArticle } from '@/api';

export default {
  data() {
    return {
      article: []
    };
  },

  methods: {
    handleEditClick() {
      this.$router.push('/release');
    },
    handleHanderLeftClick() {},
    getArticle() {
      getAllArticle({
        pageIndex: 0,
        pageSize: 100
      })
        .then(res => {
          this.article.push(...res);
        })
        .catch(() => {});
    },
    handleItemClick({ id }) {
      this.$router.push(`/article-detail?id=${id}`);
    }
  },

  created() {
    console.log(location);
    this.getArticle();
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
}
.icon-bianji {
  margin-right: 20px;
}
.item {
  background-color: #fff;
  padding-top: 7px;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
}
.item__header {
  display: flex;
  margin-bottom: 9px;
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
  font-size: 16px;
  margin-bottom: 4px;
}
.item__reply {
  display: flex;
  height: 44px;
  align-items: center;
  flex-direction: row-reverse;
}
</style>