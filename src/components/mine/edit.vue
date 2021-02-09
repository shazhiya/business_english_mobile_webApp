<template>
    <div>
        <el-row>
            <el-col :span="12">
                <p>EDIT</p>
                <p style="font-size: 10px; color: gray">编辑资料</p>
            </el-col>
            <el-col :span="12">
                <el-button style="float: right" type="primary" @click="save"
                >save
                </el-button
                >
            </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row>
            <el-col :span="8" class="rc"> 头像</el-col>
            <el-col :span="15" :offset="1">
                <el-upload
                    ref="upload"
                    class="avatar-uploader"
                    action="''"
                    :show-file-list="false"
                    :http-request="upload"
                    accept="image/png, image/jpeg"
                >
                    <img
                        v-if="user.userHeadico"
                        :src="src + user.userHeadico"
                        class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>

        <el-row class="margin">
            <el-col :span="8" class="rc">简介</el-col>
            <el-col :span="15" :offset="1">
                <el-input v-model="user.userIntro"></el-input>
            </el-col>
        </el-row>

        <el-row class="margin">
            <el-col :span="8" class="rc">电话</el-col>
            <el-col :span="15" :offset="1">
                <el-input v-model="user.userTelephone"></el-input>
            </el-col>
        </el-row>

        <el-row class="margin">
            <el-col :span="8" class="rc">电子邮件</el-col>
            <el-col :span="15" :offset="1">
                <el-input v-model="user.userEmail"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import uploader from '../../network/uploadFile'

export default {
    data() {
        return {
            user: JSON.parse(JSON.stringify((this.$store.state.user.userInfo))),
        }
    },
    methods: {
        upload() {
            uploader(this.$refs['upload'].uploadFiles[this.$refs['upload'].uploadFiles.length - 1].raw, 'headIco')
                .then(res => {
                    this.$message({message: 'upload success', type: 'success'})
                    this.user.userHeadico = res.data
                }).catch(err => {
                this.$message({message: err, type: 'error'})
            })
        },
        save() {
            this.back.post('user/update', this.user)
                .then(res => {
                    if (res.data) {
                        this.$message({message: 'save success', type: 'success'})
                        this.$store.commit('user/updateProfile', JSON.parse(JSON.stringify(this.user)))
                        this.$store.commit('user/updateUserInfo', JSON.parse(JSON.stringify(this.user)))
                    } else {
                        this.$message({message: 'save err', type: 'error'})
                    }
                })
        }
    }
}
</script>

<style>
.rc {
    text-align: right;
}

.margin {
    margin-top: 20px;
}

.avatar-uploader .el-upload {
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
    width: 96px;
    height: 96px;
    line-height: 96px;
    text-align: center;
}

.avatar {
    width: 96px;
    height: 96px;
    display: block;
}
</style>