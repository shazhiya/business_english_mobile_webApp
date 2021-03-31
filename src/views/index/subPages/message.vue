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
                <van-badge v-if="notifies.length" :content="notifies.length"></van-badge>
            </van-cell>
            <van-cell title="我的联系人" :to="{name:'contacts'}" is-link></van-cell>
        </van-cell-group>

        <van-cell-group title="会话列表">
            <cc>
                <session v-for="(session, i) in sessions" :key="session.userId" :delay="i*150" :session="session" @remove="remove" @click="openChatPanel"/>
            </cc>
        </van-cell-group>
    </div>
</template>

<script>
import session from "component/message/session";
import resolvedPost from "@/store/ResovePost";

export default {
    name: "message",
    data(){
        return {
            notifyTypes:["organization invite"],
            sessions: []
        }
    },
    methods: {
        remove(child) {
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
    },
    mounted() {
        let sessions =  this.$store.getters.messages.reduce((goal,curr)=>{
            if (!goal.some(opposite=>opposite.userId===curr.sendUser.userId)){
                goal.push({
                    userId: curr.sendUser.userId,
                    messages:[],
                    opposite: curr.sendUser,
                    isNew: true
                })
                return goal
            }
            goal.find(opposite=>opposite.userId===curr.sendUser.userId).messages.push(curr)
        },[])
        sessions.push(...this.$store.getters.getSessions.filter(se=>{
            if (!sessions.some(sess => sess.userId === se.userId)) {
                resolvedPost('message/history',{
                    sendUser:{
                        userId: this.$store.getters.myself.userId,
                    },
                    targetUser:{
                        userId: se.userId
                    },
                    messageSendTime: new Date().getTime()
                }).then(res=>{
                    se.messages = res
                    this.$set(se,'messages',res)
                    this.$set(se,'opposite',res[0].sendUser.userId===se.userId?res.sendUser:res[0].targetUser)
                })
                return true
            }
            return false
        }))
        this.sessions = sessions
    }
}
</script>

<style scoped>

</style>