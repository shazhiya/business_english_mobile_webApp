<template>
    <div>
        <van-nav-bar title="list" fixed placeholder>
            <div slot="right">
                <van-icon name="search" size="18"/>
            </div>
        </van-nav-bar>

        <van-cell-group>
            <van-cell title="我的班级" :to="{name:'dis',params:{title: 'test'}}" is-link></van-cell>
            <van-cell title="我的班级" is-link></van-cell>
            <van-cell title="我的班级" is-link></van-cell>
        </van-cell-group>

        <card
            width="95%"
            style="margin: 10px auto"
        >
            <session v-for="i in 10" :key="i" :delay="i*150" @remove="remove" @click="openChatPanel"/>
        </card>


    </div>
</template>

<script>
import session from "component/message/session";

export default {
    name: "message",

    methods: {
        remove(child) {
            console.log(child.$el)
            child.$el.remove()
        },
        openChatPanel(info) {
            this.$router.push({name: 'chatPanel', params: info})
        }
    },
    components: {
        session
    }
}
</script>

<style scoped>

</style>