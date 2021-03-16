<template>
    <card class="bg">
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <div style="width: 100px; height: 100px; margin: auto">
                    <el-image
                        :src="headIco"
                        :fit="'fill'"
                        style="border-radius: 50px"
                    />
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 25px">
            <el-col :xs="20" :md="10">
                <el-input placeholder="username" v-model="username" @blur="findHeadIcon" clearable/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 25px">
            <el-col :xs="20" :md="10">
                <el-input
                    placeholder="password"
                    v-model="password"
                    clearable
                    show-password
                >
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin: 25px 0">
            <el-col :xs="20" :md="10">
                <el-row>
                    <el-col :span="6" :push="2">
                        <el-checkbox v-model="rememberPass">记住密码</el-checkbox>
                    </el-col>
                    <el-col :offset="12" :span="6" :pull="2">
                        <el-link :underline="false" @click="resetPassword" style="font-size: 12px">忘记密码?</el-link>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :xs="20" :md="10">
                <el-row>
                    <el-col :span="15">
                        <el-button :round="true" @click="login">登录</el-button>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <el-button :round="true" @click="gotoRegister">注册</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </card>
</template>

<script>
import post from "@/store/util";

export default {
    data() {
        return {
            username: this.$route.params.username !== undefined ? this.$route.params.username : 'shazhi',
            password: this.$route.params.password !== undefined ? this.$route.params.password : '123456',
            headIco: this.src + 'headIcon/default.jpg',
            rememberPass: window.localStorage.getItem("remember")
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {username: this.username, password: this.password})
                .then(result => {
                    if (result) {
                        this.$notify({message: '登录成功', type: 'success'})
                        if (this.rememberPass) {
                            window.localStorage.setItem('userAccount', JSON.stringify({
                                username: this.username,
                                password: this.password
                            }))
                            window.localStorage.setItem('remember', true)
                        } else {
                            window.localStorage.removeItem('remember')
                            window.localStorage.removeItem('userAccount')
                        }
                    } else this.$notify({
                        message: '账户或密码错误',
                        type: 'danger'
                    })
                })
                .then(() => {
                    this.$store.commit('updateMyself',{userName: this.username})
                    return this.$store.dispatch('loadMyself')
                })
                .then(() => {
                    this.$router.push({name: 'index'})
                })
        },
        findHeadIcon() {
            post("user/queryHeadIconByUsername", {
                userName: this.username
            }, res => {
                console.log(res.data)
                if (res.data.userHeadicon) {
                    this.headIco = this.src + res.data.userHeadicon
                }
            }).catch((err) => {
                console.log(err)
                this.headIco = this.src + 'headIcon/default.jpg'
            })
        },
        gotoRegister() {
            this.$router.push({name: 'register'})
        },
        resetPassword() {
            this.$router.push({name: 'resetPassword'})
        }
    }
}
</script>

<style scoped>
.bg {
    padding-top: 100px;
    text-align: center;
    height: 100%;
    box-sizing: border-box;
    background: gray;
    background-size: cover;
    overflow: hidden;
}

div /deep/ input {
    border-radius: 30px;
    background: rgba(128, 128, 128, 0.3);
    color: white;
    font-size: 24px;
    text-align: center;
    border: 1px black solid;
}

div /deep/ .el-checkbox__label .el-divider__text,
.el-link {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 17px;
    color: white;
}

div /deep/ button {
    width: 100%;
    text-align: center;
    padding: 0;
    background: rgba(0, 0, 0, 0);
    color: white;
}
</style>