<template>
    <div @click="goto">
        <el-card class="card" :title="course.curriculumDescription">

            <template style="margin: 3px" #header>
                <el-image
                        fit='scale-down'
                        slot="header"
                        style="height: 115px;"
                        :src='src+course.curriculumCover'
                />
                <h3 style="text-align: center;margin: 5px">
                    {{ course.curriculumName }}
                </h3>
            </template>
            <template>
                <div>
                    <div class="van-multi-ellipsis--l2" style="min-height: 40px">
                        {{course.curriculumDescription}}
                    </div>
                    <div v-if="course.curriculumStatus==='audited'">
                        <el-button type="primary" @click.stop="auditCourse('passed')" style="width:45%">通过</el-button>
                        <el-button type="danger" @click.stop="auditCourse('rejected')" style="width:45%; float: right">驳回</el-button>
                    </div>
                    <div v-if="course.curriculumStatus==='passed'">
                        <el-button type="danger" @click.stop="auditCourse('rejected')" style="width:100%;">
                            退回修改
                        </el-button>
                    </div>
                    <div v-if="(course.curriculumStatus==='rejected'||course.curriculumStatus==='saveTemporarily')">
                        <el-button type="warning" disabled style="width:100%;">
                            待更新提交审核
                        </el-button>
                    </div>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script>
import post from "@/store/util";

export default {
    props: ['course', 'show'],
    methods: {
        goto() {
            this.$router.push({name: 'learning', params: {course: this.course}})
        },
        auditCourse(type){
            post(`curriculum/change/${type}`,{curriculumId:this.course.curriculumId},()=>{
               this.course.curriculumStatus = type
            })
        }
    }
}
</script>

<style scoped>
.card {
    width: 200px;
    word-wrap: break-word;

}
>>>.el-card__header {
    padding: 4px 2px;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
}
</style>