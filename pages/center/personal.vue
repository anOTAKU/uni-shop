<template>
  <view class="u-margin-left-30 u-margin-right-30">
    <u-form :model="form" ref="uForm">
      <u-form-item label="姓名" prop="name">
        <u-input v-model="form.name" />
      </u-form-item>
      <u-form-item label="头像">
        <oss-upload @upSuccess="upSuccess"></oss-upload>
      </u-form-item>
    </u-form>
    <u-button @click="submit">提交</u-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        avatar: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.uForm.validate(async (valid) => {
        if (valid) {
          //后台更新用户姓名
          if (this.form.name) {
            let params = {
              name: this.form.name,
            };
            // 发送更改姓名请求
            await this.$u.api.userInfoUpdate(params);
          }
          // 更新头像
          if (this.form.avatar) {
            let params = {
              avatar: this.form.avatar,
            };
            // 发送更改头像请求
            await this.$u.api.authAvatar(params);
          }
          //本地获取并更新用户信息
          this.$u.utils.updateUser();
          console.log("验证通过");
        } else {
          console.log("验证失败");
        }
      });
    },
    upSuccess(data) {
      // 图片上传成功后 保存图片key
      this.form.avatar = data;
    },
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.$refs.uForm.setRules(this.rules);
    this.form.name = this.vuex_user.name;
  },
};
</script>

<style></style>
