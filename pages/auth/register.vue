<template>
  <view class="wrap u-margin-left-10 u-margin-right-10">
    <u-form :model="form" ref="uForm">
      <!-- 昵称 -->
      <u-form-item
        :leftIconStyle="{ color: '#888', fontSize: '32rpx' }"
        left-icon="account"
        label-width="120"
        :label-position="labelPosition"
        label="姓名"
        prop="name"
      >
        <u-input
          placeholder="请输入姓名"
          :border="border"
          v-model="form.name"
          type="text"
        ></u-input>
      </u-form-item>
      <!-- 邮箱 -->
      <u-form-item
        :leftIconStyle="{ color: '#888', fontSize: '32rpx' }"
        left-icon="email"
        label-width="120"
        :label-position="labelPosition"
        label="邮箱"
        prop="email"
      >
        <u-input
          placeholder="请输入邮箱"
          :border="border"
          v-model="form.email"
          type="email"
        ></u-input>
      </u-form-item>
      <!-- 密码 -->
      <u-form-item :label-position="labelPosition" label="密码" prop="password">
        <u-input
          :password-icon="true"
          :border="border"
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></u-input>
      </u-form-item>
      <!-- 确认密码 -->
      <u-form-item
        :label-position="labelPosition"
        label="确认密码"
        label-width="150"
        prop="rePassword"
      >
        <u-input
          :border="border"
          type="password"
          v-model="form.password_confirmation"
          placeholder="请确认密码"
        ></u-input>
      </u-form-item>
      <!-- 注册按钮 -->
      <view class="agreement">
        <u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
        <view class="agreement-text"> 勾选代表同意uni-shop的版权协议 </view>
      </view>
      <u-button @click="submit">提交</u-button>
    </u-form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: { name: "", email: "", password: "", password_confirmation: "" },
      labelPosition: "left",
      border: true,
      check: false,
    };
  },
  methods: {
    // 勾选版权协议
    checkboxChange(e) {
      this.check = e.value;
    },
    // 表单错误提示
    errorMessage(message) {
      this.$u.toast(message);
      return false;
    },
    // 表单验证
    verification() {
      if (this.$u.test.isEmpty(this.form.name)) {
        this.errorMessage("姓名不能为空");
      } else if (!this.$u.test.email(this.form.email)) {
        this.errorMessage("邮箱错误或为空");
      } else if (this.check !== true) {
        this.errorMessage("请勾选同意uni-shop的版权协议");
      } else {
        return true;
      }
    },
    // 执行注册
    async submit() {
      if (this.verification()) {
        // 准备提交数据
        const params = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
        };

        //请求api，执行注册
        const res = await this.$u.api.authRegister(params);

        this.$u.toast("注册成功！");

        //注册成功，重定向到登录
        setTimeout(() => {
          this.$u.route({
            type: "redirect",
            url: "pages/center/center",
            params,
          });
        }, 1500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 30rpx;
}

.agreement {
  display: flex;
  align-items: center;
  margin: 40rpx 0;

  .agreement-text {
    padding-left: 8rpx;
    color: $u-tips-color;
  }
}
</style>
