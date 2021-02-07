<template>
    <div>
        <van-nav-bar title="我的消息">
            <div slot="right">
                <van-icon name="search" size="18" />
            </div>
        </van-nav-bar>

        <van-cell-group>
            <van-cell title="我的班级" is-link></van-cell>
            <van-cell title="我的班级" is-link></van-cell>
            <van-cell title="我的班级" is-link></van-cell>
        </van-cell-group>

        <card
            width="95%"
            style="margin: 10px auto"
        >

                <session v-for="i in 10" :key="i"/>

        </card>


    </div>
</template>

<script>
import session from "component/message/session";
export default {
    name: "message",
    methods:{

    },
    components:{
        session
    }
}
</script>

<style scoped>

</style>