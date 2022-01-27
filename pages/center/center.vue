<template>
  <view>
    <view class="u-flex user-box u-p-l-30 u-p-t-30 u-p-r-20 u-p-b-30">
      <view class="u-m-r-10">
        <u-avatar :src="vuex_user.avatar_url" size="140"></u-avatar>
      </view>
      <view class="u-flex-1">
        <view class="u-font-18 u-p-b-20">{{ vuex_user.name }}</view>
        <view class="u-font-14 u-tips-color">邮箱:{{ vuex_user.email }}</view>
      </view>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item
          icon="setting"
          title="个人信息"
          @click="to(urlList[0])"
        ></u-cell-item>
      </u-cell-group>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item
          icon="order"
          title="全部订单"
          @click="to(urlList[1])"
        ></u-cell-item>
        <u-cell-item
          icon="star"
          title="商品收藏"
          @click="to(urlList[2])"
        ></u-cell-item>
        <u-cell-item
          icon="more-dot-fill"
          title="收货地址"
          @click="to(urlList[3])"
        ></u-cell-item>
      </u-cell-group>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item
          icon="reload"
          title="退出登录"
          @click="logout"
        ></u-cell-item>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      urlList: [
        "pages/center/personal",
        "pages/center/allOrder",
        "pages/center/collect",
        "pages/center/address",
      ],
    };
  },
  methods: {
    to(url) {
      this.$u.route({
        url,
      });
    },
    async logout() {
      //后台退出登录
      await this.$u.api.authLogout();
      // 清除缓存token和用户信息
      this.$u.vuex("vuex_token", null);
      this.$u.vuex("vuex_user", {});

      // 跳转到首页
      this.$u.toast("退出登录");

      setTimeout(() => {
        this.$u.route({
          type: "reLaunch",
          url: "pages/index/index",
        });
      }, 1500);
    },
  },
  onLoad() {
    if (!this.$u.utils.isLogin()) return;
  },
};
</script>

<style lang="scss" scoped>
page {
  background-color: #ededed;
}

.camera {
  width: 54px;
  height: 44px;

  &:active {
    background-color: #ededed;
  }
}
.user-box {
  background-color: #fff;
}
</style>
