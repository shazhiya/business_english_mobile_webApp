<template>
    <van-cell-group>
        <van-swipe-cell :right-width="65" :left-width="65" :before-close="close">
            <span slot="left">Select</span>

            <van-row>
                <van-col span="6">
                    <van-image
                        width="48"
                        height="48"
                        radius="12"
                        src="https://img01.yzcdn.cn/vant/cat.jpeg"
                        style="margin: 5px 0 0 5px"
                    />
                </van-col>
                <van-col span="16">
                    <p class="van-ellipsis bold">ichijo hotaru</p>
                    <p class="van-ellipsis">kissshot acerolaorion heartunderblade</p>
                </van-col>
            </van-row>

            <span slot="right">Delete</span>
        </van-swipe-cell>
    </van-cell-group>
</template>

<script>
export default {
    name: "session",
    methods: {
        close({position, instance}) {
            instance.close()
            if (position == 'right') {
                instance.close()
                // this.$dialog.confirm({
                //     message: 'are you sure to do?'
                // }).then(()=>{
                //     instance.close()
                // })
                this.remove(instance)
            }
        }
    }
}
</script>

<style scoped>
p{
    margin: 8px 0;
}
.bold{
    font-weight: bolder;
    font-style: italic;
}
</style>