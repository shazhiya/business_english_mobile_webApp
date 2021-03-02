<template>
    <div>
        <user-small-card class="topCard"/>

        <card width="95%" style="margin-top: 10px">
            <van-row>
                <van-col v-for="i in 4" :key="i" span="6">
                    <big-number/>
                </van-col>
            </van-row>
        </card>

        <card width="95%" style="margin-top: 10px">
            <van-cell-group title="通用">
                <van-cell title="编辑个人信息" :to="{name:'editProfile'}" :is-link="true"/>
            </van-cell-group>
        </card>

        <card width="95%" style="margin-top: 10px">
            <van-cell-group title="教师">
                <van-cell title="发布课程" is-link :to="{name:'publishCourse'}"/>
                <van-cell title="创建班级" is-link :to="{name:'createClazz'}"/>
                <van-cell v-for="i in 5" :key="i" title="单元格" value="内容" :is-link="true"/>
            </van-cell-group>
        </card>

        <card width="95%" style="margin-top: 10px">
            <van-cell-group title="i am a title">
                <van-cell v-for="i in 5" :key="i" title="单元格" value="内容" :is-link="true"/>
            </van-cell-group>
        </card>


<!--        <van-button style="margin: 10px auto auto;width:95%" round type="primary" block>主要按钮</van-button>-->
        <van-button style="margin: 10px auto 10px;width:95%" round type="danger" block>登出</van-button>


    </div>
</template>

<script>
import userSmallCard from "component/user/userSmallCard";
import bigNumber from "component/mine/bigNumber";
export default {
    name: "mine",
    data() {
        return {

        }
    },
    components:{bigNumber,userSmallCard}
}
</script>

<style scoped>
.topCard{
    margin: 5px auto auto;
    background: linear-gradient(30deg,aqua,gray);
    transition: all 2s;
}
</style>