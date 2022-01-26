<template>
  <view v-if="vuex_token">
    <!-- 购物车列表 -->
    <view v-if="goodsList.length">
      <view class="u-flex u-p-15" v-for="goods in goodsList" :key="goods.id">
        <view>
          <u-checkbox
            v-model="goods.is_checked ? true : false"
            :name="goods.id"
            @change="checkboxChange"
            size="40"
            shape="circle"
          ></u-checkbox>
        </view>
        <!-- 商品信息 -->
        <view class="u-flex u-p-10">
          <view @tap="jump(`/pages/goods/goods-detail`, goods.goods_id)">
            <u-image
              border-radius="15"
              width="200rpx"
              height="200rpx"
              :src="goods.goods_data.cover_url"
            >
            </u-image>
          </view>
          <view class="u-flex u-row-between u-col-top u-p-10">
            <view @tap="jump(`/pages/goods/goods-detail`, goods.goods_id)">
              <!-- 书名 -->
              <text class="u-p-l-10 u-font-32">{{
                goods.goods_data.title
              }}</text>
              <br />
              <!-- 库存 -->
              <view class="u-text-right">
                库存:<text style="color: red">{{
                  goods.goods_data.stock
                }}</text>
              </view>
            </view>
            <!-- 金额 -->
            <view class="u-flex u-row-between">
              <text class="u-font-34">￥{{ goods.goods_data.price }}</text>
              <!-- 数量增减框 -->
              <u-number-box
                v-model="goods.num"
                :min="1"
                :max="goods.goods_data.stock"
                :index="goods.id"
                @change="numChange"
              ></u-number-box>
              <!-- 删除按钮 -->
              <u-icon
                @tap="removeGoods(goods.id)"
                name="trash"
                color="#e83333"
                size="36"
              >
              </u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-else><u-empty text="购物车为空" src="bag"></u-empty></view>
    <!-- 底部栏 -->
    <view class="bottomFixed">
      <!-- 全选 -->
      <view class="left">
        <u-checkbox v-model="allCheck" size="30" shape="circle"
          >全选</u-checkbox
        >
      </view>
      <!-- 合计和结算 -->
      <view class="right">
        <view class="total"
          >合计:<strong style="color: red"
            >￥{{ this.totalPrice }}</strong
          ></view
        >
        <u-button class="buy btn u-line-1" size="medium">去结算</u-button>
      </view>
    </view>
  </view>
  <view v-else>请先登录</view>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
    };
  },
  computed: {
    //全选的状态和改变事件
    allCheck: {
      get() {
        return this.goodsList.every((goods) => {
          return goods.is_checked;
        });
      },
      async set(val) {
        let cart_ids = [];
        if (val == true) {
          this.goodsList.forEach((goods) => cart_ids.push(goods.id));
        }
        const params = {
          cart_ids,
        };
        await this.$u.api.changeCartChoose(params);
        this.getCartsList();
      },
    },
    //合计
    totalPrice() {
      let price = 0;
      this.goodsList.forEach((item) => {
        if (item.is_checked) {
          price += item.goods_data.price * item.num;
        }
      });
      return price;
    },
  },
  methods: {
    //改变购物车中的选中状态
    async checkboxChange(e) {
      const { name, value } = e;
      let cart_ids = [];
      this.goodsList.forEach((goods) => {
        if (goods.is_checked && goods.id !== name) {
          cart_ids.push(goods.id);
        }
      });
      if (value == true) {
        cart_ids.push(name);
      }
      const params = {
        cart_ids,
      };
      await this.$u.api.changeCartChoose(params);
      this.getCartsList();
    },
    //得到购物车中的商品列表
    async getCartsList() {
      const list = [];
      const res = await this.$u.api.getCartsList();
      res.data.forEach(async (item) => {
        item.goods_data = (await this.$u.api.getGoodsInfo(item.goods_id)).goods;
        list.push(item);
      });
      this.goodsList = list;
      console.log(this.goodsList);
    },
    // 商品数量改变
    async numChange(val) {
      // 通过设置index获取（购物车商品的id）既val中第二参数
      const { value, index } = val;
      await this.$u.api.numChange(index, String(value));
    },
    // 移出购物车
    async removeGoods(id) {
      // delCartGoods
      await this.$u.api.delCartGoods(id);
      // 删除商品后进行提示   再次调用获取商品列表
      this.$u.toast("移出购物车成功");
      this.getCartsList();
    },
    // 商品详情跳转
    jump(url, id) {
      this.$u.route({
        url,
        params: {
          id,
        },
      });
    },
  },
  async onLoad() {
    if (this.vuex_token) {
      this.getCartsList();
    }
  },
};
</script>

<style lang="scss" scoped>
.bottomFixed {
  display: flex;
  position: fixed;
  width: 100%;
  border: solid 2rpx #f2f2f2;
  background-color: #fff;
  padding: 16rpx 0;
  justify-content: space-between;
  .left {
    display: flex;
    font-size: 20rpx;
  }
  .right {
    float: right;
    display: flex;
    font-size: 28rpx;
    align-items: center;
    .total {
      margin-right: 80rpx;
    }
    .btn {
      line-height: 66rpx;
      padding: 0 30rpx;
      border-radius: 36rpx;
      color: #ffffff;
    }
    .buy {
      background-color: #ff7900;
      margin-right: 30rpx;
    }
  }
}

/*#ifdef H5*/
.bottomFixed {
  bottom: 100rpx;
}

/*#endif*/
/*#ifdef MP-WEIXIN*/
.bottomFixed {
  bottom: 0;
  z-index: 99999;
}

/*#endif*/
</style>
