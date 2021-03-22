<template>
    <navbar title="消息通知">
        <template #default>
            <van-cell-group title="邀请通知">
                <cc>
                    <agreePanel v-for="message in notifies" :key="message.messageId"
                                :content="message.messageContent"
                                :all="message"
                                @ok="react"
                                @reject="react"
                    />
                </cc>
            </van-cell-group>

            <van-cell-group title="系统消息">
                <cc>
                    <agreePanel v-for="message in []" :key="message.messageId"
                                :content="message.messageContent"
                                :all="message"
                                @ok="react"
                                @reject="react"
                    />
                </cc>
            </van-cell-group>

        </template>
    </navbar>
</template>

<script>
import agreePanel from "component/card/agreePanel";
import post from "@/store/util";
export default {
    name: "notifyManager",
    components:{agreePanel},
    data(){
        return {
            notifyTypes:["organization invite"]
        }
    },
    methods:{
        react(mess,ok){
            post('organization/reactInvitation',{
                messageId:mess.messageId,
                options:mess.options,
                status:ok?'接受':'拒绝',
                targetUser:{userId:mess.targetUser.userId}
            },()=>{
                this.$notify({message:"操作成功",type:'success'})
                this.$store.dispatch('loadMessages')
            })
        }
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