<template>
    <div class="container">
        <van-row @click="$router.push({name:'userSpace',params:{userName:contactor.userName}})">
            <van-col span="3" offset="2">
                <van-image
                    width="48"
                    height="48"
                    radius="12"
                    :src="src + contactor.userHeadicon"
                    style="margin: 0;"
                />
            </van-col>
            <van-col span="16" offset="3">
                <p class="van-ellipsis bold">{{contactor.userName}}</p>
                <p class="van-ellipsis">{{contactor.userIntro}}</p>
            </van-col>
        </van-row>
        <van-divider></van-divider>
    </div>
</template>

<script>
export default {
    name: "contactorInfo",
    props:['contactor']
}
</script>

<style scoped>
p{
    margin: 0;
}
.container{
    margin-top: 10px;
}
.bold {
    font-weight: bolder;
    font-style: italic;
}
</style>