<template>
    <div>
        <van-nav-bar title="消息列表" fixed placeholder>
            <div slot="right">
                <van-icon name="search" size="18"/>
            </div>
        </van-nav-bar>

        <van-cell-group>
            <van-cell title="我的班级" :to="{name:'contacts',params:{title: 'myClasses'}}" is-link></van-cell>
            <van-cell title="消息通知" :to="{name:'notifyManager'}" is-link>
                <van-badge :content="notifies.length"></van-badge>
            </van-cell>

            <van-cell title="我的联系人" is-link></van-cell>
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
    data(){
        return {
            notifyTypes:["organization invite"]
        }
    },
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
    },
    computed:{
        notifies(){
            return this.$store.getters.messages.filter(msg=>this.notifyTypes.some(notifyType=>msg.type===notifyType))
        }
    }
}
</script>

<style scoped>

</style>