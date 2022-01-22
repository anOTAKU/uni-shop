const install = (Vue, vm) => {
  const isLogin = () => {
    // 如果没有token则跳转至登录页面
    const token = vm.vuex_token;
    if (!token) {
      // 来自哪个页面
      const currentPage = getCurrentPages().pop();
      // 获取页面路径和请求参数
      const { options, route } = currentPage;
      let url = vm.$u.queryParams(options);
      //设置本地存储
      uni.setStorageSync("back_url", route +url);

      vm.$u.toast("请登录");
      setTimeout(() => {
        vm.$u.route({
          type: "redirect",
          url: "pages/auth/login",
        });
      }, 2000);
      return false;
    }
    return true;
  };

  vm.$u.utils = {
    isLogin,
  };
};

export default {
  install,
};
