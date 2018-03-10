<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link>&gt;
                <router-link :to="{ name: 'shopcart' }">购物车</router-link>&gt;
                <router-link to="">支付中心</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-16">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{ order.order_no }}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{ order.accept_name }}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{ order.area }}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{ order.mobile }}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{ order.order_amount }}元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="message">
                                    <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                    <span>{{ order.message }}</span>
                                </div>
                            </div>
                            <div class="el-col el-col-8">
                                <div id="container">
                                    二维码图片
                                    <canvas width="300" height="300"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import '@/lib/qr/jqueryqr.js';
    import $ from 'jquery';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                order: {},
                timer: null
            }
        },

        methods: {
            // 获取订单信息
            getOrder() {
                this.$http.get(this.$api.order + this.id).then(res => {
                    if(res.data.status == 0) {
                        this.order = res.data.message[0]; // 注意接口返回的是一个数组
                    }
                })
            },

            // 开启定时器不断检测当前订单的状态, 如果为2, 证明支付成功过了, 那么跳转到支付成功页面
            checkStatus() {
                this.timer = setInterval(() => {
                    console.log(1111)
                    this.$http.get(this.$api.order + this.id).then(res => {

                        // 成功后清除定时器, 然后跳到到成功页面
                        if(res.data.message[0].status == 2) {
                            clearInterval(this.timer);
                            this.$router.push({name: 'orderComplete'});
                        }
                    })
                }, 2000);
            }
        },

        created() {
            this.getOrder();
            this.checkStatus();
        },

        mounted() {
            // 二维码插件使用
            $('#container').erweima({
                text: `http://localhost:8080/pay/${this.id}`,
                label: '买买买'
            });
        },

        // 组件销毁时会自动被调用, 在这个生命周期函数里一般会主动销毁各种不能自动释放的资源
        destroyed() {
            clearInterval(this.timer);
        }

    }
</script>

<style>
</style>