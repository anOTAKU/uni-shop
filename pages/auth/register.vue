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
        required
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
        required
      >
        <u-input
          placeholder="请输入邮箱"
          :border="border"
          v-model="form.email"
          type="email"
        ></u-input>
      </u-form-item>
      <!-- 密码 -->
      <u-form-item
        :label-position="labelPosition"
        label="密码"
        prop="password"
        required
      >
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
        prop="password_confirmation"
        required
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
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 12,
            type: "string",
            message: "姓名长度在3到12个字符",
            trigger: ["change", "blur"],
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: ["change", "blur"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["change", "blur"],
          },
          {
            // 正则不能含有两边的引号
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
            message: "需同时含有字母和数字，长度在6-12之间",
            trigger: ["change", "blur"],
          },
        ],
        password_confirmation: [
          {
            required: true,
            message: "请重新输入密码",
            trigger: ["change", "blur"],
          },
          {
            validator: (rule, value, callback) => {
              return value === this.form.password;
            },
            message: "两次输入的密码不相等",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  methods: {
    // 勾选版权协议
    checkboxChange(e) {
      this.check = e.value;
    },
    // 执行注册
    async submit() {
      // 表单验证
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          if (!this.model.agreement) return this.$u.toast("请勾选协议");
          console.log("验证通过");
        } else {
          console.log("验证失败");
          return false;
        }
      });
      // 准备提交数据
      const params = this.form;

      //请求api，执行注册
      await this.$u.api.authRegister(params);

      this.$u.toast("注册成功！");

      //注册成功，重定向到登录
      setTimeout(() => {
        this.$u.route({
          type: "redirect",
          url: "pages/center/center",
          params,
        });
      }, 1500);
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
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
