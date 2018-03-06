<template>
    <div>
        <!-- 面包屑导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="">首页</router-link>
            </div>
        </div>

        <!-- 页面头部 - 分类列表与轮播图 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">

                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                            <!--此处声明下面可重复循环-->
                            
                                <li>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>手机数码</span>
                                        <p>
                                        
                                            手机通讯
                                        
                                            摄影摄像
                                        
                                            存储设备
                                        
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt><a href="/goods/40.html">手机数码</a></dt>
                                            <dd>
                                                
                                                <a href="/goods/43.html">手机通讯</a>
                                                
                                                <a href="/goods/44.html">摄影摄像</a>
                                                
                                                <a href="/goods/45.html">存储设备</a>
                                                
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            
                                <li>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>电脑办公</span>
                                        <p>
                                        
                                            电脑整机
                                        
                                            外设产品
                                        
                                            办公打印
                                        
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt><a href="/goods/41.html">电脑办公</a></dt>
                                            <dd>
                                                
                                                <a href="/goods/46.html">电脑整机</a>
                                                
                                                <a href="/goods/47.html">外设产品</a>
                                                
                                                <a href="/goods/48.html">办公打印</a>
                                                
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            
                                <li>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>影音娱乐</span>
                                        <p>
                                        
                                            平板电视
                                        
                                            音响DVD
                                        
                                            影音配件
                                        
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt><a href="/goods/42.html">影音娱乐</a></dt>
                                            <dd>
                                                
                                                <a href="/goods/49.html">平板电视</a>
                                                
                                                <a href="/goods/50.html">音响DVD</a>
                                                
                                                <a href="/goods/51.html">影音配件</a>
                                                
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->
                    
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <ul class="slides">
                                    <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                                        <a href="/goods.html">
                                            <img src="/templates/main/images/focus_1.png" draggable="false">
                                        </a>
                                    </li>
                                    <li style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;" class="flex-active-slide">
                                        <a href="/goods.html">
                                            <img src="/templates/main/images/focus_2.png" draggable="false">
                                        </a>
                                    </li>
                                </ul>
                            <ol class="flex-control-nav flex-control-paging"><li><a class="">1</a></li><li><a class="flex-active">2</a></li></ol></div>
                            
                        </div>
                    </div>
                    <!--/幻灯片-->
                    
                    <!-- 侧边栏 - 推荐商品列表, 抽取为公共组件 -->
                    
                </div>
            </div>
        </div>

        <!-- 页面主体 - 商品列表预览, 抽取为子组件 -->
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>