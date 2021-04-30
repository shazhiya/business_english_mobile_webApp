<template>
    <div>
        <navbar title="探讨">
            <template #right>
                <p></p>
            </template>
            <template #default class="height">
                <comment :comment="comment" :show-sub="false"/>
                <van-cell-group :title="'相关回复'+comment.children.length+'条'">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="onLoad"
                    >
                        <comment v-for="sub in comment.children" :key="sub.commentId" :comment="sub" style="padding-bottom: 10px;" :show-sub="false"/>
                    </van-list>
                </van-cell-group>
            </template>

        </navbar>

        <van-tabbar>
            <van-field
                    v-model="mess"
                    center
                    clearable
                    placeholder="在此输写下评论"
                    :maxlength="maxlength"
            >
                <template #button>
                    <van-button size="small" type="primary" @click="sendComment()">({{ inputLen + '/' + maxlength }})发送</van-button>
                </template>
            </van-field>
        </van-tabbar>
    </div>
</template>

<script>
import comment from "component/communication/comment";
import navbar from "component/card/navbar";
import post from "@/store/util";

export default {
    name: "commentDetail",
    data() {
        return {
            loading: false,
            finished: true,
            maxlength: 30,
            mess: '',
            comment: this.$route.params.comment
        };
    },
    components: {
        comment, navbar
    },
    methods: {
        onLoad() {
            // todo
        },
        sendComment() {
            if (mess===''){
                return
            }
            let mess = {
                commentContent: this.mess,
                parent: {
                    commentId: this.comment.commentId
                },
                commenter: this.$store.getters.myself,
                createdTime: new Date().getTime()
            }
            post('comment/mark', mess, (res) => {
                this.mess = ''
                mess.commentId = res.data.data
                this.comment.children.unshift(mess)
            })
        }
    },
    computed: {
        inputLen() {
            return this.mess.length > 10 ? '' + this.mess.length : '0' + this.mess.length
        }
    }
}
</script>

<style scoped>

</style>