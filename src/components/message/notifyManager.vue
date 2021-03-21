<template>
    <navbar title="消息通知">
        <cc>
            <agreePanel v-for="message in notifies" :key="message.messageId"
                        :content="message.messageContent"
                        @ok="react()"
                        @reject="react()"
            />
        </cc>
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
        react(){
            post('organization/updateInvitation',{},()=>{

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