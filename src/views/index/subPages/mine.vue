<template>
    <div>
        <card
            width="95%"
            class="topCard"
        >
            <van-row>
                <van-col span="6" class="avatar">
                    <van-image
                        width="64"
                        height="64"
                        radius="12"
                        src="https://img01.yzcdn.cn/vant/cat.jpeg"
                        style="margin: 5px 0 0 5px"
                    />
                </van-col>
                <van-col span="16">
                    <p class="username">Ichijo Hotaru</p>
                    <p class="desc van-multi-ellipsis--l2" >kissshot Acerolaorion HeartUnderBlade. kissshot Acerolaorion HeartUnderBlade.</p>
                </van-col>
            </van-row>
        </card>

        <card width="95%" style="margin-top: 10px">
            <van-row>
                <van-col v-for="i in 4" :key="i" span="6">
                    <big-number/>
                </van-col>
            </van-row>
        </card>

        <card width="95%" style="margin-top: 10px">
            <van-cell-group title="i am a title">
                <van-cell v-for="i in 5" :key="i" title="单元格" value="内容" :is-link="true"/>
            </van-cell-group>
        </card>

        <card width="95%" style="margin-top: 10px">
            <van-cell-group title="i am a title">
                <van-cell v-for="i in 5" :key="i" title="单元格" value="内容" :is-link="true"/>
            </van-cell-group>
        </card>


<!--        <van-button style="margin: 10px auto auto;width:95%" round type="primary" block>主要按钮</van-button>-->
        <van-button style="margin: 10px auto auto;width:95%" round type="danger" block>登出</van-button>


    </div>
</template>

<script>
import bigNumber from "component/mine/bigNumber";
export default {
    name: "mine",
    data() {
        return {

        }
    },
    components:{bigNumber}
}
</script>

<style scoped>
.topCard{
    margin: 5px auto auto;
    background: linear-gradient(30deg,aqua,gray);
    transition: all 2s;
}

.username {
    font-size: 30px;
    font-weight: bold;
    margin: 5px 0 0 0;
}

.avatar{
    margin-top: 5px;
}

.desc{
    margin: 5px 0;
}
</style>