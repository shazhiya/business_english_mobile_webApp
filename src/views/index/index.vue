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
            <van-tabbar-item icon="search" >标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
            <van-tabbar-item icon="user-o" :to="{name:'mine'}">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            active: "home"
        }
    },
    methods: {}
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
    max-height: calc(100vh - 107px);
    overflow: scroll;
}
</style>