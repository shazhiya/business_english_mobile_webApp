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
                            <van-uploader v-model="fileList" max-count="1" :after-read="afterRead"/>
                        </van-col>
                    </van-row>
                </card>

                <card width="95%" style="margin-top: 10px; padding-top: 20px">
                    <van-cell-group title="基本信息">
                        <!-- 输入任意文本 -->
                        <van-field v-model="text" label="文本"/>
                        <!-- 输入手机号，调起手机号键盘 -->
                        <van-field v-model="tel" type="tel" label="手机号"/>
                        <!-- 允许输入正整数，调起纯数字键盘 -->
                        <van-field v-model="digit" type="digit" label="整数"/>
                        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
                        <van-field v-model="number" type="number" label="数字"/>
                        <!-- 输入密码 -->
                        <van-field v-model="password" type="password" label="密码"/>
                    </van-cell-group>
                </card>

                <card width="95%" style="margin-top: 10px; padding-top: 20px">
                    <van-cell-group title="基本信息">
                        <!-- 输入任意文本 -->
                        <van-field v-model="text" label="文本"/>
                        <!-- 输入手机号，调起手机号键盘 -->
                        <van-field v-model="tel" type="tel" label="手机号"/>
                        <!-- 允许输入正整数，调起纯数字键盘 -->
                        <van-field v-model="digit" type="digit" label="整数"/>
                        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
                        <van-field v-model="number" type="number" label="数字"/>
                        <!-- 输入密码 -->
                        <van-field v-model="password" type="password" label="密码"/>
                    </van-cell-group>
                </card>

            </template>

            <template #right>
                <van-icon name="replay" size="22px"/>
            </template>
        </navbar>

        <van-button type="primary" :loading="false" class="button">
            修改保存
        </van-button>
    </div>
</template>

<script>
import navbar from "component/card/navbar";

export default {
    name: "editProfile",
    components: {
        navbar
    },
    data() {
        return {
            fileList: [],
            tel: '',
            text: '',
            digit: '',
            number: '',
            password: '',
        }
    },
    methods: {
        afterRead(file,detail) {
            console.log(file)
            console.log(detail)
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