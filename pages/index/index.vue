<template>
  <view>
    <u-swiper :list="swiperList"></u-swiper>
    <u-tabs
      class="index-tabs"
      bar-width="100"
      item-width="160"
      :list="list"
      :is-scroll="false"
      :current="currentSort"
      @change="changeSort"
    ></u-tabs>
    <view class="goods-list">
      <u-row gutter="16">
        <u-col span="6" v-for="i in 12" :key="i">
          <view class="demo-layout bg-purple"
            ><navigator
              class="goods-item u-p-20 u-m-10"
							url=""
            >
              <u-image
                class="u-skeleton-rect"
                width="100%"
                height="300rpx"
                src="https://oss.shop.eduwork.cn/product/2020-0820-5f3e059c25d7b.png"
              ></u-image>
              <view
                class="u-skeleton-rect goods-title u-line-1 u-font-30 u-m-t-10 u-m-b-10"
                >商品名称</view
              >
              <view class="u-flex u-row-between">
                <text class="goods-price u-skeleton-rect"
                  >￥20</text
                >
                <view class="small u-skeleton-rect u-text-right">
                  <view>已售:5</view>
                </view>
              </view>
            </navigator>
          </view>
        </u-col>
      </u-row>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [
        "https://cdn.uviewui.com/uview/swiper/1.jpg",
        "https://cdn.uviewui.com/uview/swiper/2.jpg",
        "https://cdn.uviewui.com/uview/swiper/3.jpg",
      ],
      list: [
        {
          name: "默认",
        },
        {
          name: "销量",
        },
        {
          name: "推荐",
        },
        {
          name: "最新",
        },
      ],
      currentSort: 0,
      src: "https://oss.shop.eduwork.cn/product/2020-0820-5f3e059c25d7b.png",
    };
  },
  methods: {
    changeSort(index) {
      this.currentSort = index;
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.index-tabs {
  padding-top: 30rpx;
  margin: 0 70rpx;
}

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
