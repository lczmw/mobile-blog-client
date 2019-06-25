<template>
  <div>
    <base-header></base-header>
  </div>
</template>

<script>
import { articleGetDetail, articleGetComments } from '@/api';

export default {
  data() {
    return {};
  },

  methods: {
    initData() {
      let { id } = this.$route.query;
      articleGetDetail({
        id
      });
      articleGetComments({
        id
      });
    }
  },

  created() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
</style>