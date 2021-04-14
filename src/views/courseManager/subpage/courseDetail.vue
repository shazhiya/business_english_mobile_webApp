<template>
    <div>
        <navbar
            title="课程详情"
            style="position: relative; padding-bottom: 20px"
        >
            <template #right>
                <van-icon name="setting-o" size="20px"/>
            </template>

            <template #default v-if="curriculum.curriculumId">
                <div style="padding: 5px; overflow: hidden;">
                    <van-image
                        width="100%"
                        height="150px"
                        radius="10px"
                        :src="src + curriculum.curriculumCover"
                        fit="cover"
                    />
                </div>

                <van-cell-group title="课程信息">
                    <van-cell title="课程名" :value="curriculum.curriculumName"/>
                    <van-cell title="简介" :value="curriculum.curriculumDescription"/>
                </van-cell-group>

                <van-cell-group title="课程讲师">
                    <userSmallCard :user="curriculum.creator"/>
                </van-cell-group>

                <van-button type="primary" :loading="false" class="button" round @click="todo">
                    {{ false ? "订阅课程" : "进入学习" }}
                </van-button>

                <van-cell-group title="课程评分" v-if="false">
                    <card style="width: 95%; margin: auto">
                        <van-row gutter="10">
                            <van-col span="6">
                                <big-number
                                    :name="{color: 'black',value:'总评分',size:'16px'}"
                                    :number="{color: 'red',value:'99.6',size:'24px'}"
                                />
                            </van-col>
                            <van-col span="6">
                                <big-number
                                    :name="{color: 'black',value:'评分人数',size:'16px'}"
                                    :number="{color: 'black',value:'22244',size:'24px'}"
                                />
                            </van-col>
                            <van-col span="12">
                                <big-number
                                    :name="{color: 'black',value:'我的评分',size:'16px'}"
                                    :number="{color: 'gray',value:'未参与评分',size:'20px'}"
                                />
                            </van-col>
                        </van-row>
                    </card>
                </van-cell-group>

                <van-cell-group title="目录">
                    <card style="width: 95%; margin: auto">
                        <van-cell v-for="(chapter,index) in curriculum.chapters" :key="chapter.chapterId" :title="chapter.chapterCode"
                                  :value="chapter.chapterName" :label="chapter.chapterDescription"
                                  is-link :to="{name:'learning',query:{curriculumId:curriculum.curriculumId,chapterIndex:index}}"/>
                        <van-button color="#FFFFFF" class="button" size="mini" round :loading="false" v-if="false">
                            <p style="color: black">展示更多....</p>
                        </van-button>
                    </card>
                </van-cell-group>

                <van-cell-group title="课程评论" v-if="false">
                    <comment/>
                    <van-button color="#FFFFFF" size="mini" round :loading="false" class="button"
                                @click="gotoAllComment">
                        <p style="color: black">更多评论.....</p>
                    </van-button>
                </van-cell-group>

            </template>
        </navbar>
    </div>
</template>

<script>
import navbar from "component/card/navbar";
import userSmallCard from "component/user/userSmallCard";
import bigNumber from "component/mine/bigNumber";
import comment from "component/communication/comment";
import resolvedPost from "@/store/ResovePost";

export default {
    name: "courseDetail",
    components: {
        navbar, userSmallCard, bigNumber, comment
    },
    data() {
        return {
            showPopover: true,
            actions: [{text: '选项一'}, {text: '选项二'}, {text: '选项三'}],
            curriculum: {}
        }
    },
    methods: {
        gotoAllComment() {
            this.$router.push({name: 'allComment'})
        },
        todo() {
            this.$router.push({name:'learning',query:{curriculumId:this.curriculum.curriculumId,chapterIndex:0}})
        },
        loadTheCourse(){
            resolvedPost("curriculum/load",{curriculumId: this.$route.query.curriculumId})
            .then(res=>{
                this.curriculum = res[0]
            })
        }
    },
    beforeMount() {
        this.loadTheCourse()
    }
}
</script>

<style scoped>

.button {
    width: 95%;
    margin: 10px auto 0;
    display: block;
}
</style>