<template>
  <div class="p-full">
    <base-header @on-right-click="handleHeaderRightClick">
      <span
        slot="right"
        class="header-text"
      >发布</span>
    </base-header>
    <div>
      <mt-field
        placeholder="标题"
        v-model="title"
      ></mt-field>
      <mt-field
        placeholder="尽情发挥吧..."
        type="textarea"
        rows="4"
        v-model="content"
      ></mt-field>
    </div>
  </div>
</template>

<script>
import { Field as MtField, Button as MtButton } from 'mint-ui';
import { release } from '@/api';

export default {
  components: {
    MtField
  },

  data() {
    return {
      title: '',
      content: ''
    };
  },

  methods: {
    handleEditClick() {
      this.$router.push('/release');
    },
    handleHeaderRightClick() {
      release({
        title: this.title.trim(),
        content: this.content.trim()
      })
        .then(() => {
          this.$router.go(-1);
        })
        .catch(() => {});
    }
  },

  created() {}
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
}
.header-text {
  font-size: 16px;
}
.icon-bianji {
  margin-right: 20px;
}
</style>