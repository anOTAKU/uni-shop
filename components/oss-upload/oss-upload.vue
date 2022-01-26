<template>
  <u-upload
    :action="action"
    :form-data="formData"
    :before-upload="beforeUpload"
    :max-size="5 * 1024 * 1024"
    max-count="1"
    @on-success="upSuccess"
  ></u-upload>
</template>

<script>
let _this = {};
export default {
  name: "oss-upload",
  data() {
    return {
      action: "",
      formData: {},
      upFileName: "",
    };
  },
  methods: {
    async beforeUpload(index, list) {
      // 得到全局唯一的文件名
      const { file } = list[0];
      const fileName = String(file.name.split(".").slice(0, 1));
      const upFileName = this.$u.guid(20) + fileName;
      _this.upFileName = upFileName;
      // 请求获取oss-token的api
      const oss = await _this.$u.api.authOss();

      // 参数准备
      _this.action = oss.host;
      // 额外的上传参数
      _this.formData = {
        key: upFileName,
        policy: oss.policy,
        OSSAccessKeyId: oss.accessid,
        success_action_status: "200", //让服务端返回200,不然，默认会返回204
        signature: oss.signature,
      };
      return true;
    },
    //图片上传至阿里云成功后将文件名传给父组件
    async upSuccess() {
      this.$emit("upSuccess", this.upFileName);
    },
  },
  created() {
    // wx小程序中this会在上传前钩子内丢失
    _this = this;
  },
};
</script>

<style lang="scss"></style>
