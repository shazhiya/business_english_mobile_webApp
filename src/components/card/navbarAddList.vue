<template>
    <div>
        <van-nav-bar :title="title" fixed placeholder @click-left="$router.go(-1)" left-text="返回" left-arrow>
            <div slot="right">
                <van-icon name="search" size="18"/>
            </div>
        </van-nav-bar>
        <slot/>
    </div>
</template>

<script>
export default {
    name: "NavbarAddList",
    props:{
        title: {
            default: 'title',
            type: String
        }
    }
}
</script>

<style scoped>

</style>