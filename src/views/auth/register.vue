<template>
    <div>
        <navbar title="注册">
            <template #right>
                <p></p>
            </template>
        </navbar>
        <van-cell-group style="margin: 30px 0 0 0">
            <van-field v-model="userName" placeholder="请输入用户名" label="用户名"/>
            <van-field v-model="password" placeholder="请输入密码" type="password" label="密码"/>
            <van-field v-model="confirmPassword" placeholder="请确认密码" type="password" label="确认密码"/>
            <van-field v-model="email" placeholder="请输入邮箱" type="email" label="邮箱"/>
            <van-field v-model="verifyCode" placeholder="验证码" label="验证码" type="digit">
                <template #button>
                    <van-button size="small" type="primary" :loading="loading" @click="giveVC" loading-text="获取中..." :disabled="disabled">{{ alert }}</van-button>
                </template>
            </van-field>
        </van-cell-group>
        <van-button type="primary" style="width: 80%; margin: 100px auto; display: block;" :loading="false" @click="register">
            注册
        </van-button>
    </div>
</template>

<script>
import navbar from "component/card/navbar";
import post from "@/store/util";
export default {
    data() {
        return {
            userName:'',
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
            post('auth/giveVerifyCode',{email: this.email},res=>{
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
            },true)
        },
        register() {
            if (this.password==null||this.password.length < 6){
                this.$toast("密码过短")
                return
            }
            if (this.password != this.confirmPassword) {
                this.$toast({
                    message:'原密码与确认密码不一致'
                })
                return
            }
            this.$store
                .dispatch('register', {userName: this.userName,password: this.password,userEmail: this.verifyCode})
                .then(code => {
                    if (code == 1) {
                        this.$notify({
                            type: 'success',
                            message: '注册成功'
                        })
                        this.gotoLogin()
                    } else if (code == 0){
                        this.$notify({
                            type: 'danger',
                            message: '参数不完整'
                        })
                    } else if (code == -1){
                        this.$notify({
                            type: 'danger',
                            message: '验证码错误'
                        })
                    }else if (code == -2){
                        this.$notify({
                            type: 'danger',
                            message: '邮箱已被使用'
                        })
                    }else if (code == -3){
                        this.$notify({
                            type: 'danger',
                            message: '用户名已被使用'
                        })
                    }else if (code == -4){
                        this.$notify({
                            type: 'danger',
                            message: '系统繁忙，请稍后重试。'
                        })
                    }
                }).catch(()=>this.$toast('服务器繁忙，请稍后重试'))
        },
        gotoLogin() {
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style>

</style>