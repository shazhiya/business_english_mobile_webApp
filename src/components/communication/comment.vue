<template>
    <div style="padding: 10px">
        <van-row gutter="10">
            <van-col span="3" offset="">
                <van-image
                        width="48"
                        height="48"
                        :src="src+comment.commenter.userHeadicon"
                        radius="48px"
                />
            </van-col>
            <van-col span="19" offset="1">
                <p style="margin: 0; font-weight: bold; font-size: 18px; float: left; width: 50%; overflow: hidden" class="van-ellipsis">
                    {{comment.commenter.userName}}
<!--                    <van-tag type="primary" :mark="false" :plain="false">tag</van-tag>-->
                </p>
                <p style="margin: 0; float: right;overflow: hidden;width: 50%;" class="van-ellipsis">
                    {{new Date(parseInt(comment.createdTime)).toLocaleString().replace(/:\d{1,2}$/,' ')}}
                </p>
                <p style="margin-top: 25px; color: gray; clear: both">
                    {{comment.commentContent}}
                </p>
                <div class="controller" v-if="showControl">
                    <van-icon name="good-job-o"/>
                    {{ 2260 }}
                    <van-icon name="good-job-o" style="margin-left: 15px;transform: rotateX(180deg)"/>
                    {{ 2260 }}
                    <van-icon name="chat-o" style="margin-left: 15px; transform: rotateY(180deg); float: right" size="22px"/>
                </div>

                <div class="subComments" v-if="showSub">
                    <div v-for="sub in comment.children.filter((comment,index)=>index<5)" :key="sub.commentId">
                        <el-link type="primary">{{sub.commenter.userName}}</el-link>
                        {{sub.commentContent}}
                    </div>
                    <el-link type="primary" @click="$router.push({name: 'commentDetail',params:{comment}})">
                        共记{{comment.children.length}}条回复>
                    </el-link>
                </div>
            </van-col>
        </van-row>
        <van-divider/>
    </div>
</template>

<script>
export default {
    name: "comment",
    props: {
        showSub: {
            default: true
        },
        showControl:{
            default: false
        },
        comment: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style scoped>
.controller {

}

.subComments {
    background: #EEEEEE;
    margin-top: 2px;
    font-size: 14px;
}

.subComments > div {
    padding: 3px;
}
</style>