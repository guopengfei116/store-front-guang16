<template>
    <div>
        <!-- 公共头部 -->
        <app-header></app-header>
        <!-- 变化主体 -->
        <router-view></router-view>
    </div>
</template>

<script>
    import appHeader from './subcom/Header.vue';

    export default {
        components: {
            appHeader
        }
    }
</script>

<style scoped>

</style>