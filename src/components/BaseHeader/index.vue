<template>
  <div class="wrapper">
    <div
      class="left"
      @click="handleLeftClick"
    >
      <i :class="['iconfont', icon]"></i>
    </div>
    <div class="middle">
      {{ text }}
    </div>
    <div
      class="right"
      @click="handleRightClick"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'icon-fanhui-'
    },
    middleText: String,
    clickLeft: Function
  },

  data() {
    return {};
  },

  computed: {
    text() {
      return this.middleText || this.$route.meta.title || '';
    }
  },

  methods: {
    handleLeftClick() {
      if (typeof this.clickLeft === 'function') {
        this.clickLeft();
      } else {
        this.$router.go(-1);
      }
    },
    handleRightClick() {
      this.$emit('on-right-click');
    }
  },

  created() {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  height: 44px;
  border-bottom: 1px solid #f2f2f2;
}
.left {
  flex: none;
  width: 50px;
  display: flex;
  justify-content: center;
}
.middle {
  flex: auto;
  display: flex;
  justify-content: center;
}
.right {
  flex: none;
  width: 50px;
  display: flex;
  justify-content: center;
}
</style>