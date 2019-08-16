<template>
  <div
    id="app"
    class="app"
  >
    <keep-alive>
      <router-view v-if="keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    keepAlive() {
      return this.$route.meta.keepAlive;
    }
  }
};
</script>

<style lang="scss">
.app {
  height: 100%;
}
</style>
