<template>
  <navigator
    class="goods-item u-p-20 u-m-10"
    :url="`/pages/goods/goods-detail?id=${item.id}`"
  >
    <u-image
      class="u-skeleton-rect"
      width="100%"
      height="300rpx"
      :src="item.cover_url"
    ></u-image>
    <view
      class="u-skeleton-rect goods-title u-line-1 u-font-30 u-m-t-10 u-m-b-10"
      >{{ item.title || "商品名称" }}</view
    >
    <view class="u-flex u-row-between">
      <text class="goods-price u-skeleton-rect">￥{{ item.price }}</text>
      <view class="small u-skeleton-rect u-text-right">
        <view>已售:{{ item.sales }}</view>
      </view>
    </view>
  </navigator>
</template>

<script>
export default {
  name: "goods-card",
  props: ["item"],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.goods-item {
  box-shadow: 0 10rpx 20rpx 0 rgba(#000, 0.3);

  .goods-title {
    width: 100%;
    font-weight: 550;
  }

  .goods-price {
    width: 40%;
    color: red;
    font-weight: 550;
  }

  .small {
    width: 40%;
  }
}
</style>
