<template>
  <div>
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
  </div>
</template>

<script>
import { getAllArticle } from '@/api';

export default {
  data() {
    return {};
  },

  methods: {
    handleEditClick() {
      this.$router.push('/release');
    },
    handleHanderLeftClick() {}
  },

  created() {
    getAllArticle({
      pageIndex: 0,
      pageSize: 10
    });
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
</style>