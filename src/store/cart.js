import Vue from 'vue';

export default {

    // 定义状态, 相当于data数据
    state: {
        // 这里的初始数据优先从storage里获取, 如果没有就设一个空对象
        // 数据结构预览: { 153: 5, 154: 10, 155: 12 }, ID为key, 数量为value
        cart: JSON.parse(localStorage.getItem('cart')) || {},
    },

    // 相当于computed数据
    getters: {
        total(state) {
            // values先拿到对象里的val数量, 然后reduce把他们合并相加
            return Object.values(state.cart).reduce((sum, v) => sum += v, 0);
        }
    },

    // 定义修改状态的方法, 这里的方法需要通过store.commit(方法名称, 参数)
    mutations: {

        // 这里的方法第一个参数固定为state, 由vuex类库固定传递, 第二个参数由方法调用者自由传递, 可传可不传
        modify(state, data) {
            let { id, num } = data; // es6的语法, 解构里面的id与num值

            // state.cart[id] = num;   // 根据id, 修改对应的购买数量值
            Vue.set(state.cart, id, num);  // 因为可能加到商品是一个新的, 那么添加新属性需要用set方法才能让视图跟着更新

            // 每次状态变化后, 把新的状态记录在本地storage里, 放置页面刷新后数据丢失
            localStorage.setItem('cart', JSON.stringify(state.cart));
            console.log(state.cart);
        },

        // 删除商品
        del(state, id) {
            // 第一个参数为要删除属性的对象, 第二个参数为属性名
            Vue.delete(state.cart, id)

            // 每次状态变化后, 把新的状态记录在本地storage里, 放置页面刷新后数据丢失
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }

};
