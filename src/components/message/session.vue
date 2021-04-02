<template>
    <div @click="click">
        <transition name="van-slide-left">
            <van-cell-group v-show="session.opposite!=undefined" v-if="session.opposite!=undefined">
                <van-swipe-cell :right-width="130">
                    <van-row>
                        <van-col span="6">
                            <van-image
                                width="48"
                                height="48"
                                radius="12"
                                :src="src+session.opposite.userHeadicon"
                                style="margin: 5px 0 0 5px"
                            />
                        </van-col>
                        <van-col span="16">
                            <p class="van-ellipsis bold">{{ session.opposite.userName }}</p>
                            <p class="van-ellipsis">
                                {{lastMessage}}
                            </p>
                        </van-col>
                        <van-col v-if="session.isNew">
                            <van-badge :content="session.messages.length" max="99"/>
                        </van-col>
                    </van-row>
                    <span slot="right">
                        <van-button type="danger" style="height: 100%; margin-right: 5px" :loading="false" @click="closeSession">
                            关闭
                        </van-button>
                        <van-button type="warning" style="height: 100%" :loading="false" @click="readMark">
                            已读
                        </van-button>
                    </span>
                </van-swipe-cell>
            </van-cell-group>
        </transition>
    </div>
</template>

<script>
import post from "@/store/util";

export default {
    name: "session",
    props: ["delay","session"],
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
        },
        readMark(){
            post('message/markRead',{
                sendUser:{userId:this.session.opposite.userId},
                targetUser:{userId:this.$store.getters.myself.userId},
                messageSendTime: new Date().getTime()
            },()=>{
                this.session.isNew = false
                this.$store.dispatch('pushSession',{
                    userName: this.session.opposite.userName,
                    userId: this.session.opposite.userId
                })
                this.$store.dispatch('loadMessages',{
                    targetUser:{userId: this.$store.getters.myself.userId},
                    status: '未读'
                })
            })
        },
        closeSession(){
            this.readMark()
            this.$store.dispatch('popSession',{
                userName: this.session.opposite.userName,
                userId: this.session.opposite.userId
            })
        }
    },
    mounted() {
        setTimeout(() => {
            this.v = true
        }, this.delay)
    },
    computed:{
        lastMessage(){
            return  /*(this.session.opposite.userId===this.session.messages[0]?.sendUser.userId? this.session.opposite?.userName + ": ":"") +*/ this.session.messages[0]?.messageContent
        }
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