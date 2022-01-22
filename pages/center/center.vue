<template>
  <view> 个人中心 </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  onLoad() {
    if (!this.$u.utils.isLogin()) return;

  },
};
</script>

<style></style>
