<template>
  <view>
    <!-- 商品信息展示 -->
    <view class="goods-show u-p-b-80">
      <!-- 图片展示 -->
      <view class="u-text-center">
        <image mode="heightFix" :src="goods.cover_url"></image>
      </view>
      <view class="u-p-20">
        <!-- 商品基本信息 -->
        <view class="base-info">
          <text class="title u-font-40">{{ goods.title }}</text>
          <view class="u-flex u-row-between u-m-t-20 u-m-b-20">
            <text class="price u-font-32" style="color: red"
              >￥{{ goods.price }}</text
            >
            <text class="small">库存:{{ goods.stock }}</text>
            <text class="small">销量:{{ goods.sales }}</text>
          </view>
        </view>
        <!-- tab栏 -->
        <u-tabs
          class="index-tabs"
          bar-width="100"
          item-width="160"
          :list="tabList"
          :is-scroll="false"
          :current="currentSort"
          @change="changeSort"
        ></u-tabs>
        <!-- 商品详情 -->
        <template v-if="currentSort == 0">
          <view class="u-text-center">
            <u-parse :html="goods.details"></u-parse>
          </view>
        </template>
        <!-- 商品评论 -->
        <template v-if="currentSort == 1">
          <template v-if="goods.comments.length">
            <view
              class="comment"
              v-for="(res, index) in goods.comments"
              :key="index"
            >
              <view class="left">
                <image :src="res.user.avatar_url" mode="aspectFill"></image>
              </view>
              <view class="right">
                <view class="top">
                  <view class="name">{{ res.user.name }}</view>
                  <view class="like" :class="{ highlight: res.isLike }">
                    <view class="num">{{ res.star }}</view>
                    <u-icon
                      v-if="!res.isLike"
                      name="thumb-up"
                      :size="30"
                      color="#9a9a9a"
                    ></u-icon>
                  </view>
                </view>
                <view class="content">{{ res.content }}</view>
                <view class="reply-box">
                  <view class="text">{{ res.reply }}</view>
                </view>
                <view class="bottom">
                  {{ res.created_at }}
                </view>
              </view>
            </view>
          </template>
          <template v-else>
            <!-- 评论为空 -->
            <u-empty text="暂无评论" src="order"></u-empty>
          </template>
        </template>
        <!-- 推荐商品 -->
        <template v-if="currentSort == 2"
          ><template v-if="like_goods.length">
            <view class="goods-list u-skeleton">
              <u-row gutter="16">
                <u-col
                  span="6"
                  v-for="(item, index) in like_goods"
                  :key="index"
                >
                  <view class="demo-layout bg-purple">
                    <goods-card :item="item"></goods-card>
                  </view>
                </u-col>
              </u-row>
            </view>
          </template>
          <template v-else>
            <!-- 推荐商品为空 -->
            <u-empty text="暂无推荐商品" src="bag"></u-empty>
          </template>
        </template>
      </view>
    </view>
    <!-- 底部栏 -->
    <view class="navigation">
      <view class="left">
        <!-- 收藏 -->
        <view class="item" @click="changeCollectStatus">
          <u-icon
            v-if="goods.is_collect == 0"
            name="star"
            :size="40"
            :color="$u.color['contentColor']"
          ></u-icon>
          <u-icon
            v-else
            name="star-fill"
            :size="40"
            :color="$u.color['contentColor']"
          ></u-icon>
          <view class="text u-line-1">{{
            goods.is_collect ? "已收藏" : "收藏"
          }}</view>
        </view>
        <!-- 购物车 -->
        <view class="item car" @click="toCart">
          <u-badge
            class="car-num"
            :count="cartsNum"
            type="error"
            :offset="[-3, -6]"
          ></u-badge>
          <u-icon
            name="shopping-cart"
            :size="40"
            :color="$u.color['contentColor']"
          ></u-icon>
          <view class="text u-line-1">购物车</view>
        </view>
      </view>
      <view class="right">
        <u-button class="cart btn u-line-1" size="medium" @click="addCart"
          >加入购物车</u-button
        >
        <u-button class="buy btn u-line-1" size="medium" @click="buy"
          >立即购买</u-button
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goods: {},
      like_goods: {},
      tabList: [
        {
          name: "商品详情",
        },
        {
          name: "商品评论",
        },
        {
          name: "推荐商品",
        },
      ],
      currentSort: 0,
      cartsNum: 0,
    };
  },
  methods: {
    // tab选择
    changeSort(index) {
      this.currentSort = index;
    },
    // 获取商品详情
    async getGoodsInfo(id) {
      const res = await this.$u.api.getGoodsInfo(id);
      this.goods = res.goods;
      this.like_goods = res.like_goods;
    },
    // 切换收藏状态
    async changeCollectStatus() {
      if (this.$u.utils.isLogin) {
        await this.$u.api.collectGoods(this.goods.id);
        if (this.goods.is_collect) {
          this.$u.toast("取消收藏成功");
        } else {
          this.$u.toast("收藏成功");
        }
        this.goods.is_collect = !this.goods.is_collect;
      }
    },
    //获取购物车的商品数量
    async getCarNum() {
      if (this.vuex_token) {
        const res = await this.$u.api.getCartsList();
        this.cartsNum = res.data.length;
      }
    },
    //跳转至购物车
    toCart() {
      this.$u.route({
        type: "reLaunch",
        url: "pages/cart/cart",
      });
    },
    // 添加至购物车
    async addCart() {
      const params = {
        goods_id: this.goods.id,
      };
      await this.$u.api.addCart(params);
      this.$u.toast("成功加入购物车");
      this.getCarNum();
    },
    // 立即购买
    buy() {
      this.$u.toast("暂无购买功能");
    },
  },
  onLoad(params) {
    // 得到商品id
    const id = params.id;
    // 获取商品详情
    this.getGoodsInfo(id);
    // 获取购物车的商品数量
    this.getCarNum();
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  border: solid 2rpx #f2f2f2;
  background-color: #ffffff;
  padding: 16rpx 0;
  justify-content: space-between;
  .left {
    display: flex;
    font-size: 20rpx;
    .item {
      margin: 0 30rpx;
      &.car {
        text-align: center;
        position: relative;
        .car-num {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
        }
      }
    }
  }
  .right {
    float: right;
    display: flex;
    font-size: 28rpx;
    align-items: center;
    .btn {
      line-height: 66rpx;
      padding: 0 30rpx;
      border-radius: 36rpx;
      color: #ffffff;
    }
    .cart {
      background-color: #ed3f14;
      margin-right: 30rpx;
    }
    .buy {
      background-color: #ff7900;
      margin-right: 30rpx;
    }
  }
}

.comment {
  display: flex;
  padding: 30rpx;
  .left {
    image {
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
      background-color: #f2f2f2;
    }
  }
  .right {
    flex: 1;
    padding-left: 20rpx;
    font-size: 30rpx;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10rpx;
      .name {
        color: #5677fc;
      }
      .like {
        display: flex;
        align-items: center;
        color: #9a9a9a;
        font-size: 26rpx;
        .num {
          margin-right: 4rpx;
          color: #9a9a9a;
        }
      }
      .highlight {
        color: #5677fc;
        .num {
          color: #5677fc;
        }
      }
    }
    .content {
      margin-bottom: 10rpx;
    }
    .reply-box {
      background-color: rgb(242, 242, 242);
      border-radius: 12rpx;
      .item {
        padding: 20rpx;
        border-bottom: solid 2rpx $u-border-color;
        .username {
          font-size: 24rpx;
          color: #999999;
        }
      }
      .all-reply {
        padding: 20rpx;
        display: flex;
        color: #5677fc;
        align-items: center;
        .more {
          margin-left: 6rpx;
        }
      }
    }
    .bottom {
      margin-top: 20rpx;
      display: flex;
      font-size: 24rpx;
      color: #9a9a9a;
      .reply {
        color: #5677fc;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
