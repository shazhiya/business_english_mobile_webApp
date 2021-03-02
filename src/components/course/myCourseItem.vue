<template>
    <card
        style="width: 95%; margin:10px auto;"
        @click="$router.push({name:'courseDetail'})"
    >
        <van-row gutter="30">
            <van-col span="6">
                <van-image
                    width="100%"
                    fit="cover"
                    height="70px"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    radius="5px"
                    style="margin: 5px"
                />
            </van-col>
            <van-col span="14">
                <div style="font-weight: bold; font-size: 24px" class="van-ellipsis">title</div>
                <div class="van-multi-ellipsis--l2" style="height: 40px">
                    阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸阿爸
                </div>
            </van-col>
            <van-col span="3" offset="1" v-if="showToolbar">
                <div style="display: flex; height: 84px; flex-direction: column; justify-content: space-around" >
                    <div><van-icon name="orders-o" size="20"/></div>
                    <div><van-icon name="chart-trending-o" size="20" /></div>
                    <div><van-icon name="setting-o" size="20" /></div>
                </div>
            </van-col>
        </van-row>
    </card>
</template>

<script>
export default {
    name: "myCourseItem",
    props: {
        showToolbar: {
            default: true
        }
    }
}
</script>

<style scoped>

</style>