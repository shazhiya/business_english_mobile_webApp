<template>
    <div style="position:relative;">
        <div class="height">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
            >
                <comment v-for="comment in comments" :key="comment.commentId" :comment="comment" style="padding-bottom: 10px"/>
            </van-list>
        </div>
        <div style="position: absolute; width: 100%;">
            <van-field
                    v-model="mess"
                    center
                    clearable
                    placeholder="在此输写下评论"
                    :maxlength="maxlength"
                    style="padding-left: 30px"
            >
                <template #button>
                    <van-button size="small" type="primary" @click="sendComment">({{ inputLen + '/' + maxlength }})发送</van-button>
                </template>
            </van-field>
        </div>
    </div>
</template>

<script>
import comment from "component/communication/comment";
import post from "@/store/util";
import resolvedPost from "@/store/ResovePost";

export default {
    name: "allComment",
    data() {
        return {
            loading: false,
            finished: true,
            maxlength: 30,
            mess: '',
            comments:[]
        };
    },
    props: ['type', 'chapterId'],
    components: {
        comment
    },
    methods: {
        sendComment() {
            if (this.mess.trim().length===0) return
            post('comment/mark', {
                commentContent: this.mess,
                chapter: {chapterId: this.chapterId},
                type: this.type,
                commenter: {userId: this.$store.getters.myself.userId}
            }, () => {
                this.mess = ''
                this.loadComment()
            })
        },
        loadComment(){
            resolvedPost('comment/load',{chapter:{chapterId:this.chapterId}})
            .then(res=>{
                this.comments = res
            })
        }
    },
    computed: {
        inputLen() {
            return this.mess.length > 10 ? '' + this.mess.length : '0' + this.mess.length
        }
    },
    beforeMount() {
        this.loadComment()
    }
}
</script>

<style scoped>
.height {
    height: calc(100vh - 149px);
    overflow: scroll;
}
</style>