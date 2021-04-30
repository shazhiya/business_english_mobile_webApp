<template>
    <div style="position:relative;">
        <div class="height">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="loadComment"
            >
                <comment v-for="comment in comments" :show-sub="showSub" :show-control="showControl" :key="comment.commentId" :comment="comment" style="padding-bottom: 10px"/>
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
            finished: false,
            maxlength: 30,
            mess: '',
            comments:[]
        };
    },
    props: ['type', 'chapterId','showSub','showControl'],
    components: {
        comment
    },
    methods: {
        sendComment() {
            if (this.mess.trim().length===0) return
            let mess = {
                commentContent: this.mess,
                chapter: {chapterId: this.chapterId},
                type: this.type,
                commenter:  this.$store.getters.myself,
                createdTime: new Date().getTime()
            }
            post('comment/mark', mess, (res) => {
                this.mess = ''
                mess.commentId = res.data.data
                this.comments.unshift(mess)
            })
        },
        loadComment(){
            resolvedPost(`comment/load/${this.comments.length}`,{chapter:{chapterId:this.chapterId},type: this.type})
            .then(res=>{
                this.comments.push(...res)
                this.loading = false
                if (res.length<10) this.finished = true
            })
        }
    },
    computed: {
        inputLen() {
            return this.mess.length > 10 ? '' + this.mess.length : '0' + this.mess.length
        }
    },
    watch:{
        chapterId(){
            this.comments = []
            this.finished = false
        }
    }
}
</script>

<style scoped>
.height {
    height: calc(100vh - 149px);
    overflow: scroll;
}
</style>