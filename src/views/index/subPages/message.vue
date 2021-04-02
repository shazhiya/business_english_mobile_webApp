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
                <session v-for="(session, i) in sessions" :key="session.userId" :delay="i*150" :session="session" @remove="remove" @click="openChatPanel(session.opposite)"/>
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
            notifyTypes:["organization invite"]
        }
    },
    methods: {
        remove(child) {
            child.$el.remove()
        },
        openChatPanel(info) {
            this.$router.push({name: 'chatPanel', query: {uid:info.userId,userName:info.userName}})
        }

    },
    components: {
        session
    },
    computed:{
        notifies(){
            return this.$store.getters.messages.filter(msg=>this.notifyTypes.some(notifyType=>msg.type===notifyType))
        },
        sessions(){
            let sessions =  this.$store.getters.messages.filter(mess=>mess.type=='普通消息').reduce((goal,mess)=>{
                if (!goal.some(opposite=>opposite.userId===mess.sendUser.userId)){
                    goal.push({
                        userId: mess.sendUser.userId,
                        messages:[],
                        opposite: mess.sendUser,
                        isNew: true
                    })
                }
                goal.find(opposite=>opposite.userId===mess.sendUser.userId).messages.push(mess)
                return goal
            },[])
            sessions.push(...this.$store.getters.getSessions.filter(lcs=>{
                if (!sessions.some(ns => ns.userId === lcs.userId)) {
                    resolvedPost('message/history',{
                        sendUser:{
                            userId: this.$store.getters.myself.userId,
                        },
                        targetUser:{
                            userId: lcs.userId
                        },
                        messageSendTime: new Date().getTime()
                    }).then(res=>{
                        lcs.messages = res
                        this.$set(lcs,'messages',res)
                        this.$set(lcs,'opposite',res[0].sendUser.userId===lcs.userId?res[0].sendUser:res[0].targetUser)
                    })
                    return true
                }
                return false
            }))
            return sessions||[]
        }
    },
    created() {
        this.$store.dispatch('popSession')
        this.$store.dispatch('loadMessages',{status:'未读',targetUser:{userId:this.$store.getters.myself.userId}})
    }
}
</script>

<style scoped>

</style>