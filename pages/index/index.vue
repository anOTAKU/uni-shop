<template>
  <view>
    <u-swiper :list="slides" name="img_url" height="320"></u-swiper>
    <u-tabs
      class="index-tabs"
      bar-width="100"
      item-width="160"
      :list="list"
      :is-scroll="false"
      :current="currentSort"
      @change="changeSort"
    ></u-tabs>
    <view class="goods-list u-skeleton">
      <u-row gutter="16">
        <u-col
          span="6"
          v-for="(item, index) in goods.length ? goods : [{}, {}, {}, {}]"
          :key="index"
        >
          <view class="demo-layout bg-purple">
            <goods-card :item="item"></goods-card>
          </view>
        </u-col>
      </u-row>

      <!--骨骼架-->
    </view>
    <u-skeleton
      :loading="loading"
      :animation="true"
      bgColor="#FFF"
    ></u-skeleton>
  </view>
</template>

<script>
import goodsCard from "../../components/goods-card/goods-card.vue";
export default {
  components: { goodsCard },
  data() {
    return {
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
      slides: [],
      goods: [],
      page: 1,
      loading: false,
    };
  },
  methods: {
    // tab选择
    changeSort(index) {
      this.currentSort = index;
      //重置排序
      this.goods = [];
      this.page = 1;
      this.getData();
    },
    //获取数据
    async getData() {
      this.loading = true; //显示骨骼架

      const params = {
        page: this.page,
      };
      //增加排序条件
      if (this.currentSort == 1) params.sales = 1;
      if (this.currentSort == 2) params.recommend = 1;
      if (this.currentSort == 3) params.new = 1;
      const res = await this.$u.api.index(params);

      this.loading = false; //隐藏骨骼架

      //轮播图
      this.slides = res.slides;
      //商品列表
      this.goods = [...this.goods, ...res.goods.data];
    },
  },
  onLoad() {
    this.getData();
  },
  async onReachBottom() {
    this.page += 1;
    this.getData();
  },
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
