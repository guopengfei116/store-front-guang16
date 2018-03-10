import Vue from 'vue'
import Router from 'vue-router'

// 导入账户管理相关页面
import Login from '../components/account/login/Login';

// 导入商城相关页面
import Shop from '../components/shop/Shop';
import GoodsList from '../components/shop/goods/List';
import GoodsDetail from '../components/shop/goods/Detail';
import Shopcart from '../components/shop/shopcart/Shopcart';
import OrderSite from '../components/shop/order/Site';
import OrderPay from '../components/shop/order/Pay';
import OrderComplete from '../components/shop/order/Complete';

// 导入支付页面
import Pay from '../components/shop/Pay/Pay';

Vue.use(Router)

let goods = [
  { name: 'goodsList', path: 'goods/list', component: GoodsList },
  { name: 'goodsDetail', path: 'goods/detail/:id', component: GoodsDetail }
];

let shopcart = [
  { name: 'shopcart', path: 'shopcart', component: Shopcart },
];

let order = [ 
  { name: 'orderSite', path: 'order/site/:ids', component: OrderSite }, // 需要知道哪些商品要下单
  { name: 'orderPay', path: 'order/pay/:id', component: OrderPay }, // 需要知道订单ID才能付款
  { name: 'orderComplete', path: 'order/complete', component: OrderComplete }
];

let router = new Router({
  routes: [

    // 支付页面
    { name: 'pay', path: '/pay/:id', component: Pay },

    // 账户管理路由配置
    { name: 'login', path: '/login', component: Login },

    // 商城路由配置
    { name: 'shop', path: '/', component: Shop, children: [ ...goods, ...shopcart, ...order ] },
  ]
});

// 网站白名单, 加到这里页面都不用校验登陆权限
let baidan = ['goodsList', 'goodsDetail', 'shopcart'];

// 添加路由前置守卫, 其实就是添加一个函数, 这个函数会在路由配置之前执行, 我们可以在这里添加一些登陆或者权限的校验
// to与from是两个对象, 可以拿到url信息
router.beforeEach((to, from, next) => {
  // 通过to.name得知用户访问的是什么页面, 如果是admin相关页面, 那么继续判断用户有没有登陆
  // 有 => 调用next()通过访问,  没有 => 调用next({name: 'login'})跳转到登陆页面

  // 判断当前访问的页面在不在白名单中
  let isTrue = baidan.some(v => v == to.name);

  // 如果访问的是白名单页面, 直接通过, 终止下面代码的执行
  if(isTrue) {
    next();
    return;
  }
  
  // 现在我们是在一个js模块当中, 并不是在vue组件中, 所以这里的this不是组件实例, 而是undefined, 无法this.$http与this.$api
  Vue.prototype.$http.get(Vue.prototype.$api.isLogin).then(res => {
      let isLogin = false;

      // 已登陆
      if(res.data.code == 'logined') {
          isLogin = true;
      }

      // 如果访问登陆页面
      // 已登陆 => 为了用户友好体验, 自动跳转到后台管理
      // 未登陆 => 允许访问登陆页面
      if(to.name == 'login') {
          if(isLogin) {
              next({name: 'goodsList'});
          }else {
              next();
          }
      }

      // 如果访问后台页面
      // 已登陆 => 允许访问后台页面 
      // 未登陆 => 禁止访问, 自动跳转到登陆页面
      if(to.name != 'login') {
          if(isLogin) {
              next();
          }else {
              // query用来设置url中的查询字符串, 我们这里把用户要访问的页面地址通过query记录下来
              // 将来用户登陆成功后, 再自动跳回这个地址
              next({name: 'login', query: {next: to.fullPath}}); 
          }
      }
  })
});

export default router;