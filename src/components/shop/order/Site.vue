<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name: 'goodsList'}">首页</router-link>&gt;
                <router-link :to="{ name: 'shopcart' }">购物车</router-link>&gt;
                <router-link to="">提交订单</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!-- 头部进度 -->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 大表单 -->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <form id="orderForm" name="orderForm" @submit.prevent="submit">
                            <div class="form-box address-info">
                                <dl class="form-group">
                                    <dt>收货人姓名：</dt>
                                    <dd>
                                        <input name="book_id" id="book_id" type="hidden" value="0">
                                        <input v-model="form.accept_name"  name="accept_name" id="accept_name" type="text" class="input" datatype="s2-20" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人姓名</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>所属地区：</dt>
                                    <dd>
                                        <v-distpicker @selected="pickerChange"></v-distpicker>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>详细地址：</dt>
                                    <dd>
                                        <input v-model="form.address" name="address" id="address" type="text" class="input" datatype="*2-100" sucmsg=" ">
                                        <span class="Validform_checktip">*除上面所属地区外的详细地址</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>手机号码：</dt>
                                    <dd>
                                        <input v-model="form.mobile" name="mobile" id="mobile" type="text" class="input" datatype="m" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人的手机号码</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>电子邮箱：</dt>
                                    <dd>
                                        <input v-model="form.email" name="email" id="email" type="text" class="input" value="">
                                        <span class="Validform_checktip">方便通知订单状态，非必填</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>邮政编码：</dt>
                                    <dd>
                                        <input v-model="form.post_code" name="post_code" id="post_code" type="txt" class="input code">
                                        <span class="Validform_checktip">所在地区的邮政编码，非必填</span>
                                    </dd>
                                </dl>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!-- 我们后台只有一个支付方式, 在线支付 -->
                                <li>
                                    <label>
                                        <el-radio v-model="form.payment_id" label="6">在线支付</el-radio>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="form.express_id" label="1">顺丰</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio v-model="form.express_id" label="2">圆通</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio v-model="form.express_id" label="3">韵达</el-radio>
                                    </label>
                                </li>
                            </ul>

                            <!-- 商品列表 -->
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>

                                    <!-- 表头 -->
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>

                                    <!-- 表体 -->
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <router-link :to="{ name: 'goodsDetail', params: {id: item.id} }">
                                                <img class="img" :src="item.img_url">
                                            </router-link>
                                        </td>
                                        <td>
                                            <router-link :to="{ name: 'goodsDetail', params: {id: item.id} }">
                                                {{ item.title }}
                                            </router-link>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{ item.sell_price }}
                                            </span>
                                        </td>
                                        <td align="center">{{ $store.state.cart[item.id] }}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{ item.sell_price * $store.state.cart[item.id] }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="form.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{ total }}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{ totalPrice }}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ expressPrice }}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{ orderPrice }}</label>
                                    </p>
                                    <p class="btn-box">
                                        <button class="btn button">返回购物车</button>
                                        <button id="btnSubmit" class="btn submit" name="btnSubmit" >确认提交</button>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'

    export default {
        components: { 
            VDistpicker 
        },

        data() {
            return {
                ids: this.$route.params.ids,
                goodsList: [],
                form: {
                    express_id: '1', // 默认选中顺丰
                    payment_id: '6' // 默认选中在线支付
                },
                expressPriceTable: { 1: 20, 2: 10, 3: 8, 4: 8 } // 快递ID与价格映射表
            }
        },

        computed: {
            // 总数 => 遍历商品列表，累加他们的数量
            total() {
                return this.goodsList.reduce((sum, v) => sum += this.$store.state.cart[v.id], 0);
            },

            // 总价 => 遍历商品列表，累加他们的数量 * 单价
            totalPrice() {
                return this.goodsList.reduce((sum, v) => sum += this.$store.state.cart[v.id] * v.sell_price, 0);
            },

            // 快递费 => 判断用户所选的快递ID(form.express_id)，根据ID返回不同的价格
            expressPrice() {
                return this.expressPriceTable[this.form.express_id];
            },

            // 完整总价
            orderPrice() {
                return this.totalPrice + this.expressPrice;
            }
        },

        methods: {
            // 获取下单的商品列表数据
            getGoodsList() {
                this.$http.get(this.$api.shopcartGoods + this.ids).then(res => {
                    if(res.data.status == 0) {
                        // 修改data数据, 视图刷新
                        this.goodsList = res.data.message;
                    }
                })
            },

            // 下订单按钮, 成功后跳转到付款页面
            // 接口需要几个特殊字段，在数据提交前需要手动添加上：
            // goodsAmount  商品总价，有计算属性可以直接拿到
            // expressMoment  快递费，有计算属性可以直接拿到
            // goodsids 下单商品ids，url传递过来了，直接拿
            // cargoodsobj 下单商品id与数量映射对象，需要自己通过ids生成
            submit() {
                
                this.form.goodsAmount = this.orderPrice;
                this.form.expressMoment = this.expressPrice;
                this.form.goodsids = this.ids; // '10, 12, 21'

                // 把ids字符串劈成数组, 然后遍历数组, 拿到id与数量, 构成对象返回
                this.form.cargoodsobj = 
                    this.ids.split(',')  // [10, 12, 21]
                    .reduce((o, v) => { 
                        o[v] = this.$store.state.cart[v];
                        return o; 
                    }, {}); // { 10: 2, 12: 1, 21: 5 }

                // 调接口下单
                this.$http.post(this.$api.orderSubmit, this.form).then(res => {

                    // 下单成功后, 要从全局状态与storage里删除对应的购物车记录, 然后跳到提示支付页面
                    if(res.data.status == 0) {
                        this.ids.split(',').forEach(v => this.$store.commit('del', v));
                        this.$router.push({name: 'orderPay', params: {id: res.data.message.orderid}});
                    }
                })
            },

            // 省市区联动数据
            pickerChange(val) {
                this.form.area = val;
                console.log(val)
            }
        },

        created() {
            this.getGoodsList();
        }
    }
</script>

<style>
</style>