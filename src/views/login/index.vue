<template>
  <div class="p-flex">
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
        size='large'
        @click.native="handleClick"
      >登录</mt-button>
    </div>
  </div>
</template>
<script>
import { Field as MtField, Button as MtButton } from 'mint-ui';
import { login } from '@/api';

export default {
  components: {
    MtField,
    MtButton
  },
  data() {
    return {
      username: '',
      password: ''
    };
  },

  methods: {
    handleClick() {
      login({
        name: this.username,
        password: this.password
      })
        .then(() => {
          let redirect = this.$route.query.redirect || '/';
          this.$router.replace(redirect);
        })
        .catch(() => {});
    }
  },

  created() {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px;
}
</style>