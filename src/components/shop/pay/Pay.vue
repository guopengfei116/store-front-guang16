<template>
    <div>
        <input type="text">
        <button @click="pay">支付</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id
            }
        },

        methods: {
            pay() {
                this.$http.get(this.$api.orderPay + this.id).then(res => {
                    if(res.data.status == 0) {
                        this.$router.push({name: 'orderComplete'})
                    }
                });
            }
        },
    }
</script>

<style scoped>

</style>