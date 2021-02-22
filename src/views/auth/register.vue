<template>
    <div>
        <navbar title="注册">
            <template #right>
                <p></p>
            </template>
        </navbar>
        <van-cell-group style="margin: 30px 0 0 0">
            <van-field v-model="userName" placeholder="请输入用户名" label="用户名"/>
            <van-field v-model="password" placeholder="请输入密码" label="密码"/>
            <van-field v-model="confirmPassword" placeholder="请确认密码" label="确认密码"/>
            <van-field v-model="email" placeholder="请输入邮箱" label="邮箱"/>
            <van-field v-model="verifyCode" placeholder="验证码" label="验证码" @click="giveVC">
                <template #button>
                    <van-button size="small" type="primary" :disabled="disabled">{{ alert }}</van-button>
                </template>
            </van-field>
        </van-cell-group>
        <van-button type="primary" style="width: 80%; margin: 100px auto; display: block;" :loading="false" @click="">
            注册
        </van-button>
    </div>
</template>

<script>
import navbar from "component/card/navbar";
export default {
    data() {
        return {
            userName:'',
            password:'',
            confirmPassword:'',
            email:'',
            verifyCode:'',
            disabled: false,
            alert: '获取验证码'
        }
    },
    components:{navbar},
    methods: {
        giveVC(){
            this.disabled = true
            let time = 60;
            this.alert = time + '秒后重试'
            let handler = setInterval(()=>{
                this.alert = time + '秒后重试'
                if (--time<=0){
                    clearInterval(handler)
                    this.alert = '获取验证码'
                    this.disabled = false
                }
            },1000)
        },
        register() {
            if (this.cp != this.info.password) {
                alert('confirm password differ to password')
                return
            }
            this.$store
                .dispatch('register', this.info)
                .then(code => {
                    if (code == 1) {
                        alert('success')
                        this.gotoLogin()
                    } else {
                        alert('error')
                    }
                })
        },
        gotoLogin() {
            this.$router.push({name: 'login', params: this.info})
        }
    }
}
</script>

<style>

</style>