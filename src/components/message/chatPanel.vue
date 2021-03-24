<template>
    <div>
        <van-nav-bar :title="$route.query.userName" @click-left="$router.go(-1)" @click-right="$router.push({name:'userSpace',params:{userName:'ichijo hotaru'}})" placeholder fixed left-text="返回" left-arrow>
            <template #right>
                <van-icon name="friends-o" size="24" />
            </template>
        </van-nav-bar>
        <div class="main" >
            <van-pull-refresh ref="main" v-model="loading" @refresh="loadMess">
                <one-message v-for="(mess,index) in histories" :direction="mess.sendUser.userId===this.$store.getters.myself.userId?'left':'right'" :display-time="false" :key="index">
                </one-message>
            </van-pull-refresh>
        </div>
        <div>
            <van-field
                v-model="mess"
                center
                clearable
                placeholder="在此输入消息"
                :maxlength="maxlength"
            >
                <template #button>
                    <van-button size="small" type="primary" @click="sendMess">({{inputLen+'/'+maxlength}})发送</van-button>
                </template>
            </van-field>
        </div>
    </div>
</template>

<script>
import oneMessage from "component/message/oneMessage";
import resolvedPost from "@/store/ResovePost";
import post from "@/store/util";
export default {
    name: "chatPanel",
    data(){
        return {
            mess: '',
            maxlength: 50,
            loading: false,
            finished: false,
            histories: [],
        }
    },
    components:{
        oneMessage
    },
    computed:{
        inputLen(){
            return this.mess.length>10? ''+this.mess.length : '0' + this.mess.length
        }
    },
    methods: {
        loadMess(){
            this.loading = false
        },
        sendMess(){
            post('message/send',{
                sendUser:{userId: this.$store.getters.myself.userId},
                targetUser:{userId: this.$route.query.uid},
                status: '未读'
            })
            setTimeout(()=>{
                let dom = this.$refs['main'].$el
                dom.scrollTop = dom.scrollHeight
            },0)
        }
    },
    mounted(){
        resolvedPost('message/history',{
            targetUser:{userId: this.$store.getters.myself.userId},
            sendUser:{userId: this.$route.query.uid},
            status: '未读',
            messageSendtime: new Date()
        }).then(data=>{
            this.histories = data
            setTimeout(()=>{
                let dom = this.$refs['main'].$el
                dom.scrollTop = dom.scrollHeight
            },0)
        })
    }
}
</script>

<style scoped>
.toolbar{
    margin-left: 16px;
}

.main{
    height: calc(100vh - 99px);
    background: linear-gradient(45deg, gray,white);
}

.van-pull-refresh {
    overflow: scroll;
    -webkit-user-select: none;
    height: calc(100vh - 99px);
    user-select: none;
}
</style>