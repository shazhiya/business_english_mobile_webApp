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
                    <van-field v-model="course.creator.userName" :readonly="true" label="创建人"/>
                </van-cell-group>
            </card>
            <van-divider content-position="right">chapters</van-divider>
            <chapter ref="chapter" v-for="(chapter ,index) in course.chapters" :key="index" :chapter="chapter"
                     :del-chapter="removeChapter" :add-current-size="addCurrentSize"/>
            <van-button color="purple" class="button" round @click="addChapter" size="mini">添加章节</van-button>
            <van-button type="primary" class="button" @click="uploadFiles">发布课程</van-button>
            <van-dialog v-model="showUploadProgress" show-cancel-button confirm-button-text="完成发布"
                        :show-confirm-button="showConfirmButton" cancel-button-text="继续编辑"
                        :before-close="publishCourse">
                <van-circle
                    v-model="currentRate"
                    :rate="rate"
                    :color="gradientColor"
                    :text="totalSize!==1?'已上传:'+rate+'%':'当前无文件可上传'"
                    style="margin: 10px auto; display: block"
                />
            </van-dialog>
        </template>
    </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import chapter from "component/courseManager/chapter";
import post from "@/store/util";
import uploadFile from "@/network/uploadFile";

export default {
    name: "publishCourse",
    components: {navbar, chapter},
    data() {
        return {
            course: {
                curriculumId: null,
                curriculumCover: [],
                curriculumDescription: '',
                curriculumName: '',
                creator: {
                    userName: this.$store.getters.myself.userName
                },
                chapters: []
            },
            showUploadProgress: false,
            showConfirmButton: false,
            totalSize: 0,
            currentSize: 0,
            currentRate: 0,
            gradientColor: {
                '0%': '#3fecff',
                '100%': '#6149f6',
            }
        }
    },
    methods: {
        afterRead(file) {
            uploadFile(file.file,'courseCover',{})
                .then(res=>{
                    this.course.curriculumCover[0].url = res.data.msg
                })
        },
        addChapter() {
            this.course.chapters.push({
                chapterName: '',
                chapterCode: '',
                chapterDescription: '',
                curriculum: {},
                coursewares: []
            })
        },
        removeChapter(chapter) {
            let index = this.course.chapters.indexOf(chapter)
            // this.course.chapters.slice(index,1)
            this.$delete(this.course.chapters, index)
        },
        saveTemporarily() {
            let _that = this
            this.$dialog.confirm({
                message: '确认暂存未编辑完成课程？',
                theme: 'round-button',
                beforeClose(action, done) {
                    if (action === 'confirm') {
                        _that.createOrSaveCurriculum("saveTemporarily")
                            .then(res => {
                                if (res.data) {
                                    this.$notify({message: '保存成功', type: 'success'})
                                    done()
                                } else {
                                    this.$notify({message: '服务器异常', type: 'danger'})
                                }
                        })
                        return
                    }
                    done()
                }
            }).catch(() => {
            })
        },
        uploadFiles() {
            let chapters = this.$refs['chapter']
            this.totalSize = 0
            this.currentSize = 0
            if (chapters) {
                chapters.forEach(chapter => {
                    let upload = chapter.$refs['upload'].$refs['upload-inner']
                    let willUploadFiles = upload.fileList
                    if (willUploadFiles) willUploadFiles.forEach(file => {
                        if (file.size)
                            this.totalSize += file.size
                    })
                    chapter.uploadFiles()
                })
            }
            if (this.totalSize == 0 && this.currentSize == 0) {
                this.currentSize = 1
                this.totalSize = 1
                this.showConfirmButton = true
            }
            this.showUploadProgress = true
        },
        addCurrentSize(addition) {
            this.currentSize += addition
        },
        publishCourse(action, done) {
            if (action === 'confirm') {
                this.createOrSaveCurriculum("audited")
                    .then(res => {
                        if (res.data) {
                            this.$notify({message: '创建成功', type: 'success'})
                            done()
                        } else {
                            this.$notify({message: '服务器异常', type: 'danger'})
                        }
                    })
                return
            }
            done()
        },
        createOrSaveCurriculum(type) {
            return post(`curriculum/create/${type}`, this.curriculum, res => {
                return res
            })
        }
    },
    computed: {
        curriculum() {
            return {
                curriculumId: this.course.curriculumId,
                curriculumCover: this.course.curriculumCover[0].url.replace(this.src,''),
                curriculumDescription: this.course.curriculumDescription,
                curriculumName: this.course.curriculumName,
                chapters: this.course.chapters,
                creator:{
                    userId: this.$store.getters.myself.userId
                },
                organization:{
                    organizationId: this.$route.query.organizationId
                }
            }
        },
        rate() {
            return Number(this.currentSize / this.totalSize * 100).toFixed(1)
        }
    },
    watch: {
        rate(newV) {
            this.showConfirmButton = (newV == 100)
        }
    },
    beforeMount() {
        if (Object.keys(this.$route.params).length){
            this.course = this.$route.params
            this.course.creator={userId: this.course.creator.userId,userName:this.course.creator.userName}
            this.course.orgaization={organizationId:this.course.organization.organizationId}
            this.course.chapters.forEach(chapter=>{
                chapter.curriculum = null;
                chapter.coursewares.forEach(courseware=>{
                    courseware.chapter = null
                })
            })
            this.course.curriculumCover = [{
                url: this.src + this.course.curriculumCover
            }]
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