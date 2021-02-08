<template>
    <div>
        <van-nav-bar title="ichijo hotaru" @click-left="$router.go(-1)" placeholder fixed left-text="返回" left-arrow>
            <template #right>
                <van-icon name="friends-o" size="24" />
            </template>
        </van-nav-bar>
        <div class="main" >
            <van-pull-refresh ref="main" v-model="loading" @refresh="loadMess">
                <one-message v-for="item in histories" :direction="item%2==0?'left':'right'" :display-time="item==3" :key="item">
                    {{item}}
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
export default {
    name: "chatPanel",
    data(){
        return {
            mess: '',
            maxlength: 50,
            loading: false,
            finished: false,
            histories: [1,2,3,4,56,6]
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
            this.histories.push(1,2,3,4,5,6)
            this.loading = false
        },
        sendMess(){
            // todo
            this.histories.push(555)
            setTimeout(()=>{
                let dom = this.$refs['main'].$el
                dom.scrollTop = dom.scrollHeight
            },0)
        }
    },
    mounted(){
        setTimeout(()=>{
            let dom = this.$refs['main'].$el
            console.log(dom)
            dom.scrollTop = dom.scrollHeight
        },0)
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