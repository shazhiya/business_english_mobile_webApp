<template>
    <card style="width: 95%; margin:10px auto; position: relative;">
        <div class="delete" @click="deleteChapter">
            <van-icon name="delete-o"/>
        </div>
        <van-cell-group :title="codeAndName">
            <van-cell-group>
                <van-row gutter="10">
                    <van-col span="24"><van-field v-model="chapter.chapterCode" label="章节单元"/></van-col>
                    <van-col span="24"><van-field v-model="chapter.chapterName" label="章节名"/></van-col>
                </van-row>
                <van-field v-model="chapter.chapterDescription" label="章节描述" type="textarea" rows="1" auto/>
            </van-cell-group>

            <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                multiple
                :before-upload="beforeUploadHandler"
                :on-remove="removeHandler"
                :file-list="coursewares"
                :auto-upload="false"
                :http-request="requestHandler"
            >
                <van-button color="aqua" slot="trigger" style="width: 80%" round size="mini">
                    添加课件
                </van-button>
            </el-upload>
        </van-cell-group>
    </card>
</template>

<script>
import fileSliceUpload from "@/network/fileSliceUpload";
import fileMd5Encode from "@/network/fileMd5Encode";
import post from "@/store/util";
export default {
    name: "chapter",
    props:['chapter','delChapter','addCurrentSize'],
    data() {
        return {}
    },
    computed: {
        codeAndName() {
            let name = this.chapter.chapterName
            let code = this.chapter.chapterCode
            return (code?code:'??') + ' -- ' + (name ? name : '新建章节')
        },
        coursewares(){
            return this.chapter.coursewares.map(ware => {
                return {name: ware.coursewareName}
            })
        }
    },
    methods: {
        deleteChapter() {
            this.delChapter(this.chapter)
        },
        beforeUploadHandler(file) {
            return fileMd5Encode(file).then(md5=>{
                return post('file/validateMd5',{md5},res=>{
                    return res.data
                })
            }).then(exist=>{
                return new Promise((resolve, reject) => {
                    if (exist) resolve(exist)
                    else {
                        this.fileList.push({name: file.name})
                        reject(exist)
                    }
                })
            })
        },
        removeHandler() {
        },
        requestHandler({file}) {
            fileSliceUpload(file,{},obj=>{
                let size = obj.chunkSize
                this.addCurrentSize(size)
            }).then(res=>{
                console.log(res)
            })
        },
        uploadFiles(){
            this.$refs.upload.submit()
        }
    }
}
</script>

<style scoped>
.delete {
    position: absolute;
    top: 10px;
    right: 10px;
}

>>> .el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
    width: 100%;
}

.claa {
    height: 40px;
}
</style>