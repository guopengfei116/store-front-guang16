export default {

    // 定义状态, 相当于data数据
    state: {
        // 这里的初始数据优先从storage里获取, 如果没有就设一个空对象
        // 数据结构预览: { 153: 5, 154: 10, 155: 12 }, ID为key, 数量为value
        cart: JSON.parse(localStorage.getItem('cart')) || {} 
    },

    // 定义修改状态的方法, 这里的方法需要通过store.commit(方法名称, 参数)
    mutations: {

        // 这里的方法第一个参数固定为state, 由vuex类库固定传递, 第二个参数由方法调用者自由传递, 可传可不传
        modify(state, data) {
            let { id, num } = data; // es6的语法, 解构里面的id与num值
            state.cart[id] = num;   // 根据id, 修改对应的购买数量值

            // 每次状态变化后, 把新的状态记录在本地storage里, 放置页面刷新后数据丢失
            localStorage.setItem('cart', JSON.stringify(state.cart));
            console.log(state.cart);
        }
    }

};
