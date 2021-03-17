<template>
    <card style="margin:10px auto; width: 95%">
        <slot>
            <van-empty
                class="custom-image"
                image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                description="空空如也"
            />
        </slot>
    </card>
</template>

<script>
export default {
    name: "commonCard"
}
</script>

<style scoped>
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}
</style>