<template>
    <navbar
        title="发布课程"
        style="padding: 0 0 10px 0"
        @right="saveTemporarily"
    >
        <template #right>
            <van-icon name="records" size="22"/>
        </template>
        <template #default>
            <!--            cover-->
            <card width="95%" style="margin-top: 10px; padding-top: 20px">
                <van-row gutter="20">
                    <van-col span="8" class="tr">
                        封面
                    </van-col>
                    <van-col span="16">
                        <van-uploader v-model="course.curriculumCover" max-count="1" :after-read="afterRead"/>
                    </van-col>
                </van-row>
            </card>
            <!--            description-->
            <card width="95%" style="margin-top: 10px;">
                <van-cell-group title="课程简述">
                    <van-field v-model="course.curriculumName" label="课程名称"/>
                    <van-field
                        v-model="course.curriculumDescription"
                        rows="2"
                        autosize
                        type="textarea"
                        label="课程描述"
                    />
                    <van-field v-model="course.user.userName" :readonly="true" label="创建人"/>
                </van-cell-group>
            </card>
            <van-divider content-position="right">chapters</van-divider>
            <chapter v-for="(chapter ,index) in course.chapters" :key="index" :chapter="chapter" :del-chapter="removeChapter"/>
            <van-button type="primary" class="button" @click="addChapter">添加章节</van-button>
        </template>
    </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import chapter from "component/courseManager/chapter";
export default {
    name: "publishCourse",
    components: {navbar,chapter},
    data() {
        return {
            course:{
                curriculumId:null,
                curriculumCover: [],
                curriculumDescription: '',
                curriculumName: 'curriculumName',
                user:{
                    userName: 'creator'
                },
                chapters: []
            }
        }
    },
    methods: {
        afterRead() {
        },
        addChapter(){
            this.course.chapters.push({
                chapterName:'',
                chapterCode:'',
                chapterDescription:'',
                curriculum:{},
                coursewares:[]
            })
        },
        removeChapter(chapter){
            let index = this.course.chapters.indexOf(chapter)
            // this.course.chapters.slice(index,1)
            this.$delete(this.course.chapters,index)
        },
        saveTemporarily() {
            this.$dialog.confirm({
                message:'确认暂存未编辑完成课程？',
                theme: 'round-button',
                beforeClose(action,done){
                    if (action == 'confirm'){
                        setTimeout(done,3000)
                    }else {
                        done()
                    }
                }
            }).catch(()=>{})
        }
    },
    computed:{
        curriculum(){
            return {
                curriculumId: this.course.curriculumId,
                curriculumCover: this.course.curriculumCover[0],
                curriculumDescription: this.course.curriculumDescription,
                curriculumName: this.course.curriculumName,
                user:this.course.user,
                chapters: this.course.chapters
            }
        }
    }
}
</script>

<style scoped>
.tr {
    /*text-align: right;*/
    padding-left: 16px;
    /*font-size: 22px;*/
}

.button {
    width: 95%;
    margin: 10px auto 10px;
    display: block;
}
</style>