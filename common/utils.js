const install = (Vue, vm) => {
  // 是否登录
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
      uni.setStorageSync("back_url", route + url);

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

  // 本地获取并更新用户信息
  const updateUser = async () => {
    //重新请求用户信息
    const res = await vm.$u.api.userInfo();
    //将用户信息放入vuex_user
    vm.$u.vuex("vuex_user", res);
  };

  vm.$u.utils = {
    isLogin,
    updateUser,
  };
};

export default {
  install,
};
