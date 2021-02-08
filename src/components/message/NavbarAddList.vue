<template>
    <div>
        <van-nav-bar :title="$route.params.title" fixed placeholder left-text="返回" left-arrow>
            <div slot="right">
                <van-icon name="search" size="18"/>
            </div>
        </van-nav-bar>
        <slot>
            <p v-for="i in 10" :key="i" class="margin: 10px">
                {{i}}
            </p>
        </slot>
    </div>
</template>

<script>
export default {
    name: "NavbarAddList"
}
</script>

<style scoped>

</style>