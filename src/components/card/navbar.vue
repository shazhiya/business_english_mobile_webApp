<template>
    <div>
        <van-nav-bar :title="title" fixed placeholder @click-right="clickRight" @click-left="$router.go(-1)" left-text="返回" left-arrow>
            <div slot="right">
                <slot name="right">
                    <van-icon name="search" size="18"/>
                </slot>
            </div>
        </van-nav-bar>
        <slot/>
    </div>
</template>

<script>
export default {
    name: "NavbarAddList",
    props: {
        title: {
            default: 'title',
            type: String
        }
    },
    methods: {
        clickRight() {
            this.$emit('right')
        }
    }
}
</script>

<style scoped>

</style>