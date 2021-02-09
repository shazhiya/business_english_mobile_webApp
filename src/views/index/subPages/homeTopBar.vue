<template>
    <div :style="{marginTop:this.$store.state.optional.homeTopBarHeight}" class="overflowHide">
        <van-row>
            <van-col span="3">
                <van-image
                    width="48"
                    height="48"
                    radius="12"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    style="margin: 5px 0 0 5px"
                />
            </van-col>
            <van-col span="16">
                <van-search
                    v-model="value"
                    shape="round"
                    placeholder="请输入搜索关键词"
                />
            </van-col>
            <van-col span="5">
                <van-row style="margin-top: 10px">
                    <van-col span="12">
                        <van-button icon="search" size="small" type="primary"/>
                    </van-col>
                    <van-col span="12">
                        <van-button icon="ellipsis" size="small" type="primary"/>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
    </div>
</template>

<script>
export default {
    name: "homeTopBar",
    data() {
        return {
            value: '',
            popover: false
        }
    },
    created() {
        this.$store.commit("optional/setHomeTopBarHeight", '0px')
    }
}
</script>

<style scoped>
.overflowHide {
    transition: all 0.3s linear;
}

</style>