<template>
    <div v-if="userInfo" style="height: 100%; position: relative">
        <common-nav :title="userInfo.userName + '的空间'" @right="showSheet=false" style="padding-bottom: 10px">
            <template #default>
                <user-small-card :user="userInfo"/>
                <card v-if="isPublic" width="95%" style="margin-top: 10px">
                    <van-cell-group title="基本信息">
                        <van-cell title="昵称" :value="userInfo.userName"/>
                        <van-cell title="简介" :value="userInfo.userIntro"/>
                        <van-cell title="注册时间" :value="userInfo.userRegisterdate"/>
                    </van-cell-group>
                </card>

                <cc>
                    <van-cell-group title="联系方式">
                        <van-cell title="电子邮箱" :value="userInfo.userEmail"/>
                        <van-cell title="移动电话" :value="userInfo.userTelephone"/>
                    </van-cell-group>
                </cc>
            </template>

            <div slot="right">
                <van-icon name="ellipsis"/>
            </div>
        </common-nav>

        <div style="position: absolute; bottom: 0; width: 100%; padding-bottom: 15px">
            <van-button @click="openChat" type="primary" :loading="false" round class="button" v-if="$store.getters.myself.userName !== $route.params.userName">
                发起会话
            </van-button>

            <van-button @click="contactOperate" v-if="$store.getters.myself.userName !== $route.params.userName" :type="isContact?'danger':'primary'" :loading="false" round class="button">
                {{ isContact ? '移除联系人' : '添加到联系人' }}
            </van-button>
        </div>
        <van-action-sheet v-model="showSheet" :actions="actions"  close-on-click-action/>
    </div>
</template>

<script>
import commonNav from "component/card/navbar";
import userSmallCard from "component/user/userSmallCard";
import post from "@/store/util";
export default {
    name: "userSpace",
    components: {
        commonNav,userSmallCard
    },
    data() {
        return {
            showSheet: false,
            actions: [
                {name: '着色选项', color: '#ee0a24'},
                {name: '禁用选项', disabled: true},
                {name: '加载选项', loading: true}
            ],
            userInfo:undefined,
            isPublic: this.$route.params.showDefault ? this.$route.params.showDefault : true,
        }
    },
    mounted() {
        post('user/getProfileByUsername',{userName: this.$route.params.userName},res=>{
            this.userInfo = res.data
        })
    },
    computed:{
        isContact(){
            return this.$store.getters.contactors.some(con=>con.contactor.userName===this.$route.params.userName)
        }
    },
    methods:{
        contactOperate(){
            if (!this.isContact){
                post('message/contactors/add',{self:this.$store.getters.myself,contactor:{userId:this.userInfo.userId}},()=>{
                    this.$notify({type:'success',message:'操作成功'})
                    this.$store.dispatch('loadContactors')
                })
            }else {
                post('message/contactors/del',{self:this.$store.getters.myself,contactor:{userId:this.userInfo.userId}},()=>{
                    this.$notify({type:'success',message:'操作成功'})
                    this.$store.dispatch('loadContactors')
                })
            }
        },
        openChat(){
            this.$router.push({
                name: 'chatPanel',
                query:{
                    uid:this.userInfo.userId,
                    userName: this.userInfo.userName
                }
            })
        }
    }
}
</script>

<style scoped>
.button {
    width: 95%;
    margin: 10px auto 0;
    display: block;
}
</style>