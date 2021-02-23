<template>
    <div>
        <navbar title="重置密码">
            <template #right>
                <p></p>
            </template>
        </navbar>
        <van-cell-group style="margin: 30px 0 0 0">
            <el-input placeholder="您绑定的邮箱" v-model="email"/>
            <van-field style="margin-top: 10px" v-model="verifyCode" placeholder="验证码" label="验证码" type="digit">
                <template #button>
                    <van-button size="small" type="primary" :loading="loading" @click="giveVC" loading-text="获取中..." :disabled="disabled">{{ alert }}</van-button>
                </template>
            </van-field>
            <el-input style="margin-top: 30px" placeholder="新密码" v-model="password"/>
            <el-input style="margin-top: 10px" placeholder="确认新密码" v-model="confirmPassword"/>
        </van-cell-group>
        <van-button type="primary" style="width: 80%; margin: 100px auto; display: block;" :loading="false" @click="resetPassword">
            重置密码
        </van-button>
    </div>
</template>

<script>
import navbar from "component/card/navbar";
import post from "@/store/util";
export default {
    data() {
        return {
            password:'',
            confirmPassword:'',
            email:'',
            verifyCode:'',
            disabled: false,
            alert: '获取验证码',
            loading: false
        }
    },
    components:{navbar},
    methods: {
        giveVC(){
            let emailReg = /^([a-zA-Z0-9]+[-_\\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
            if (!emailReg.test(this.email)) {
                this.$toast({
                    message:'邮箱有误'
                })
                return
            }
            this.loading = true
            this.disabled = true
            post('auth/giveVerifyCode/resetPassword',{email: this.email},res=>{
                this.loading = false
                if (res.data){
                    this.$notify({
                        message:'验证码已发送邮箱，请注意查收',
                        position: 'top',
                        type: 'primary'
                    })
                }else{
                    this.$notify({
                        message:'服务其繁忙，请稍后再试。',
                        position: 'top',
                        type: 'warning'
                    })
                }

                let time = 60
                this.alert = time + '秒后重试'
                let handler = setInterval(()=>{
                    this.alert = time + '秒后重试'
                    if (--time<=0){
                        clearInterval(handler)
                        this.alert = '获取验证码'
                        this.disabled = false
                    }
                },1000)
            },true).catch(()=>{
                this.loading = false
                this.disabled = false
                this.$notify({
                    message:'网络错误'
                })
            })
        },
        resetPassword() {
            if (this.password==null||this.password.length < 6){
                this.$toast("密码过短")
                return
            }
            if (this.password !== this.confirmPassword) {
                this.$toast({
                    message:'原密码与确认密码不一致'
                })
                return
            }
            post('auth/resetPassword',{
                password: this.password,
                userEmail: this.verifyCode
            },res=>{
                if (res.data===0){
                    this.$notify({
                        message:"服务器繁忙，请稍后重试",
                        type:'danger'
                    })
                }else if (res.data===1){
                    this.$notify({
                        message:"密码重置成功",
                        type:'success'
                    })
                    this.$router.push({name:'login'})
                }else if (res.data===-1){
                    this.$notify({
                        message:"参数缺失",
                        type:'danger'
                    })
                }else if (res.data===-2){
                    this.$notify({
                        message:"验证码错误",
                        type:'danger'
                    })
                }else if (res.data===-3){
                    this.$notify({
                        message:"该邮箱未绑定账户",
                        type:'danger'
                    })
                }
            }).catch(()=>{
                this.$notify({message:"网络错误",type:'danger'})
            })
        },
        gotoLogin() {
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style>

</style>