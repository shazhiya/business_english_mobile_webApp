<template>
    <div style="padding-bottom:  1px">
        <navbar title="编辑个人资料" @right="$router.go(0)">
            <template #default>
                <card width="95%" style="margin-top: 10px; padding-top: 20px">
                    <van-row gutter="20">
                        <van-col span="8" class="tr">
                            头像
                        </van-col>
                        <van-col span="16">
                            <van-uploader type="file" v-model="fileList" max-count="1" :after-read="afterRead"/>
                        </van-col>
                    </van-row>
                </card>

                <card width="95%" style="margin-top: 10px; padding-top: 20px">
                    <van-cell-group title="基本信息">
                        <van-cell title="昵称" :value="$store.getters.myself.userName"></van-cell>
                        <van-cell title="注册日期" :value="$store.getters.myself.userRegisterdate"></van-cell>
                        <van-field v-model="userIntro" label="简介" type="textarea" autosize/>
                    </van-cell-group>
                </card>

                <card width="95%" style="margin-top: 10px; padding-top: 20px">
                    <van-cell-group title="联系方式">
                        <!-- 输入任意文本 -->
                        <van-cell title="邮件" :value="$store.getters.myself.userEmail"></van-cell>
                        <van-field v-model="userTelephone" type="tel" label="手机号"/>
                    </van-cell-group>
                </card>

            </template>

            <template #right>
                <van-icon name="replay" size="22px"/>
            </template>
        </navbar>

        <van-button type="primary" :loading="false" class="button" @click="updateUser">
            修改保存
        </van-button>
    </div>
</template>

<script>
import navbar from "component/card/navbar";
import uploadFile from "@/network/uploadFile";
import post from "@/store/util";
export default {
    name: "editProfile",
    components: {
        navbar
    },
    data() {
        return {
            fileList: [{
                url: this.src + this.$store.getters.myself.userHeadicon,
                status: 'done',
            }],
            userTelephone: this.$store.getters.myself.userTelephone,
            userIntro: this.$store.getters.myself.userIntro,
        }
    },
    methods: {
        afterRead(file) {
            uploadFile(file.file,'headIcon').then(res=>{
                this.fileList[0].url = this.src + res.data.msg
            })
        },
        updateUser(){
            post('user/update',{userId: this.$store.getters.myself.userId,userIntro:this.userIntro,userTelephone:this.userTelephone,userHeadicon: this.fileList[0].url.replace(this.src,'')},()=>{
                this.$notify({type:'success',message:'修改成功'})
                this.$store.dispatch('loadMyself')
                this.$router.go(-1)
            })
        }
    }
}
</script>

<style scoped>
.tr {
    /*text-align: right;*/
    padding-left: 16px;
    /*font-size: 22px;*/
}

.button {
    width: 95%;
    margin: 10px auto 10px;
    display: block;
}
</style>