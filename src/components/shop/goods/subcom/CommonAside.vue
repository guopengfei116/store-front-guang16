<template>
    <div class="left-220">
        <ul class="side-img-list">
        
            <li v-for="(item, i) in list" :key="item.id">
                <div class="img-box">
                    <label>{{ i + 1 }}</label>
                    <img :src="item.img_url">
                </div>
                <div class="txt-box">
                    <a href="/goods/show-98.html">{{ item.title }}</a>
                    <span>{{ item.add_time | date }}</span>
                </div>
            </li>
        
        </ul>
    </div>
</template>

<script>
    export default {
        // 接收父传过来的list数据
        props: ['list'],

        // 局部过滤器
        filters: {

            // 日期过滤器
            date(tplDate) {
                let date = new Date(tplDate);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            }
        }
    }
</script>

<style scoped>

</style>