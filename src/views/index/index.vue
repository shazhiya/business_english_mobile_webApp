<template>
    <div class="container">
        <!--    top bar-->
        <div>
            <router-view name="topBar"/>
        </div>

        <div class="main">
            <router-view name="main"/>
        </div>

        <!--    bottom menu bar-->
        <van-tabbar v-model="active" :fixed="true" active-color="#ee0a24" inactive-color="#000" :placeholder="true">
            <van-tabbar-item name="home" icon="home-o" :to="{name:'home'}">主页</van-tabbar-item>
            <van-tabbar-item name="study" icon="font-o" :to="{name:'study'}">学习</van-tabbar-item>
            <van-tabbar-item name="message" icon="chat-o" badge="66" :to="{name:'message'}">消息</van-tabbar-item>
            <van-tabbar-item name="mine" icon="user-o" :to="{name:'mine'}">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            active: this.$route.name
        }
    },
    methods: {},
    mounted() {
        this.$store.dispatch('loadALlSecurity')
    }
}
</script>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow: visible;
}

.main {
    max-height: calc(100vh - 50px);
    overflow: scroll;
}
</style>