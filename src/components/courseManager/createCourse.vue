<template>
    <div>
        <el-row>
            <el-col
            >
                <el-button type="primary" style="float: right" @click="createCourse">save</el-button>
            </el-col
            >
        </el-row>
        <el-row>
            <el-col :span="4" class="rc">课程封面</el-col>
            <el-col :span="19" :offset="1">
                <el-upload
                    ref="upload"
                    class="avatar-uploader"
                    action="''"
                    :show-file-list="false"
                    :http-request="upload"
                    accept="image/png, image/jpeg"
                >
                    <img
                        v-if="course.curriculumCover"
                        :src="src + course.curriculumCover"
                        class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
            <el-col :span="4" class="rc">
                课程名
            </el-col>
            <el-col :span="19" :offset="1">
                <el-input placeholder="course's name" v-model="course.curriculumName"></el-input>
            </el-col>

            <el-col :span="4" class="rc">
                课程描述
            </el-col>
            <el-col :span="19" :offset="1">
                <el-input placeholder="course's description" v-model="course.curriculumDescription"></el-input>
            </el-col>
        </el-row>
        <chapterList :chapters="course.chapters"></chapterList>
    </div>
</template>

<script>
import uploader from '../../network/uploadFile'
import chapterList from './chapterList'

export default {
    components: {chapterList},
    data() {
        return {
            course: {
                curriculumCover: "",
                curriculumName: "",
                curriculumDescription: "",
                chapters: []
            }
        }
    },
    methods: {
        upload() {
            uploader(this.$refs['upload'].uploadFiles[this.$refs['upload'].uploadFiles.length - 1].raw, 'courseCover')
                .then(res => {
                    this.$message({message: 'upload success', type: 'success'})
                    this.course.curriculumCover = res.data
                }).catch(err => {
                this.$message({message: err, type: 'error'})
            })
        },
        createCourse() {
            this.back.post('curriculum/create', this.course)
                .then(() => {
                    this.$message.success("create course successfully")
                    this.course = {
                        curriculumCover: "",
                        curriculumName: "",
                        curriculumDescription: "",
                        chapters: []
                    }
                }).catch(err => {
                this.$message.error(err)
            })
        }
    }
}
</script>

<style scoped>
.rc {
    text-align: right;
    font-size: 24px;
}

div >>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 115px;
    line-height: 115px;
    text-align: center;
}

.avatar {
    width: 200px;
    height: 115px;
    display: block;
}
</style>