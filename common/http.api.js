// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
  //定义api属性
  vm.$u.api = {};

  // 首页
  vm.$u.api.index = (params = {}) => vm.$u.get("/api/index", params);

  // 商品详情
  vm.$u.api.getGoodsInfo = (id) => vm.$u.get(`/api/goods/${id}`);
  // 商品收藏和取消
  vm.$u.api.collectGoods = (id) => vm.$u.post(`/api/collects/goods/${id}`);

  // 获取购物车列表
  vm.$u.api.getCartsList = () => vm.$u.get("/api/carts");
  // 添加至购物车
  vm.$u.api.addCart = (params) => vm.$u.post("/api/carts", params);
  // 购物车改变选中
  vm.$u.api.changeCartChoose = (params) =>vm.$u.patch("/api/carts/checked", params);
  //将商品移出购物车
  vm.$u.api.delCartGoods = (cart) => vm.$u.delete(`/api/carts/${cart}`);
  //购物车商品数量改变
  vm.$u.api.numChange = (cart,num) => vm.$u.put(`/api/carts/${cart}`,{num});

  //认证相关的
  //注册
  vm.$u.api.authRegister = (params) => vm.$u.post("/api/auth/register", params);
  //登录
  vm.$u.api.authLogin = (params) => vm.$u.post("/api/auth/login", params);
  // 退出
  vm.$u.api.authLogout = () => vm.$u.post("/api/auth/logout");
  //获取oss
  vm.$u.api.authOss = () => vm.$u.get("/api/auth/oss/token");
  //用户更改头像
  vm.$u.api.authAvatar = (params) => vm.$u.patch("/api/user/avatar", params);

  // 用户相关的
  // 用户详情
  vm.$u.api.userInfo = () => vm.$u.get("/api/user");
  //用户信息更新
  vm.$u.api.userInfoUpdate = (params) => vm.$u.put("/api/user", params);

  // 订单相关的

  // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
};

export default {
  install,
};
