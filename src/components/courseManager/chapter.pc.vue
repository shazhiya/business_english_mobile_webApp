<template>
    <el-collapse-item>
        <div slot="title">
            <input
                placeholder="chapter code"
                v-model="chapter.chapterCode"
                style="width: 30%"
                @click.stop=""
            />
            <span>*</span>
            <input
                placeholder="chapter name"
                v-model="chapter.chaptername"
                style="width: 30%"
                @click.stop=""
            />
            <el-button
                icon="el-icon-delete"
                type="warning"
                style="width: 15%; margin-left: 20%"
                @click="delMe"
            ></el-button>
        </div>

        <div>
            <el-row :gutter="30">
                <el-col :span="5" class="rc mt"> 章节描述</el-col>
                <el-col :span="19" class="mt">
                    <el-input
                        v-model="chapter.description"
                        placeholder="chapter description"
                    ></el-input>
                </el-col>
                <el-col :span="5" class="rc mt"> 课件</el-col>
                <el-col :span="19" class="mt">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action=""
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                        :http-request="upload"
                    >
                        <el-button slot="trigger" size="small" type="primary">选择课件</el-button>
                        <el-button
                            style="width: 50%; float: right"
                            size="small"
                            type="success"
                            @click="submitUpload"
                        >
                            上传
                        </el-button>
                    </el-upload>
                </el-col>
            </el-row>
        </div>
    </el-collapse-item>
</template>

<script>
import uploader from '../../network/uploadFile'

export default {
    props: ['chapter'],
    methods: {
        delMe() {
            let chapters = this.$parent.$parent.chapters
            chapters.splice(chapters.indexOf(this.chapter), 1)
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file) {
            let index
            this.chapter.coursewares.forEach((item, i) => {
                if (item.coursewareTitle == file.name)
                    index = i
            })
            this.chapter.coursewares.splice(index, 1)
        },
        handlePreview(file) {
            console.log(file);
        },
        upload(fileW) {
            uploader(fileW.file, "courseware")
                .then(res => {
                    this.chapter.coursewares.push({
                        coursewareName: fileW.file.name,
                        coursewarePath: res.data
                    })
                    this.$message.success("upload " + fileW.file.name + " successfully")
                })
                .catch(err => {
                    this.$message.error(err)
                })

        },
        show() {
            console.log(this.chapter)
        }
    },
    computed: {
        fileList() {
            return this.chapter.coursewares.map(ware => {
                return {name: ware.coursewareName}
            })
        }
    }
}
</script>

<style scoped>
.rc {
    text-align: right;
}

input {
    height: 35px;
    line-height: 35px;
    padding-left: 5px;
    border: gray 1px solid;
    border-radius: 6px;
    text-align: center;
}

.mt {
    margin-top: 3px;
}
</style>