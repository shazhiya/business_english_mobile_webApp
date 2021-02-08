<template>
    <div @click="click">
        <transition name="van-slide-left">
            <van-cell-group v-show="v">
                <van-swipe-cell :right-width="130" :before-close="close">
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
                        <van-col>
                            <van-badge :content="200" max="99"/>
                        </van-col>
                    </van-row>
                    <span slot="right">
                        <van-button type="danger" style="height: 100%; margin-right: 5px" :loading="false">
                            关闭
                        </van-button>
                        <van-button type="warning" style="height: 100%" :loading="false">
                            已读
                        </van-button>
                    </span>
                </van-swipe-cell>
            </van-cell-group>
        </transition>
    </div>
</template>

<script>
export default {
    name: "session",
    props: ["delay"],
    data() {
        return {
            v: false
        }
    },
    methods: {
        close({position, instance}) {
            instance.close()
            if (position === 'right') {
                this.$emit('remove', this)
            }
        },
        click() {
            this.$emit('click')
        }
    },
    mounted() {
        setTimeout(() => {
            this.v = true
        }, this.delay)
    }
}
</script>

<style scoped>
p {
    margin: 8px 0;
}

.bold {
    font-weight: bolder;
    font-style: italic;
}
</style>