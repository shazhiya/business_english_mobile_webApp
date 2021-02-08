<template>
    <div class="container">
        <van-row>
            <van-col span="3" offset="2">
                <van-image
                    width="36"
                    height="36"
                    radius="12"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    style="margin: 0;"
                />
            </van-col>
            <van-col span="16">
                <p class="van-ellipsis bold">ichijo hotaru</p>
                <p class="van-ellipsis">kissshot acerolaorion heartunderblade</p>
            </van-col>
        </van-row>
    </div>
</template>

<script>
export default {
    name: "contactorInfo"
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