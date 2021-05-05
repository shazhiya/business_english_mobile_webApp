<template>
    <navbar title="布置作业" style="padding-bottom: 40px">
        <van-cell-group title="选择班级课程">
            <van-dropdown-menu>
                <van-dropdown-item v-model="clazz" :options="classes" />
                <van-dropdown-item v-model="task.curriculum.curriculumId"   :options="courses" />
            </van-dropdown-menu>
        </van-cell-group>

        <van-cell-group title="编辑作业">
            <van-field label="标题" placeholder="请输入作业标题" v-model="task.title"/>
            <van-divider content-position="right">题目</van-divider>
            <question v-for="(question,index) in task.questions" :question="question" :key="index" :editable="true" @delete="deleteQuestion"></question>
            <van-button style="background: none; color: black" :loading="false" size="mini" class="addQuestion" round @click="addQuestion">
                添加题目
            </van-button>
            <van-button style="background: none; color: black" :loading="false" size="mini" class="addQuestion" round>
                从excel导入
            </van-button>
        </van-cell-group>

        <van-button type="primary" :loading="false" class="button" @click="assignTask">
            发布作业
        </van-button>

    </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import question from "component/task/question";
import resolvedPost from "@/store/ResovePost";
import post from "@/store/util";

export default {
    name: "assignTask",
    components: {
        navbar, question
    },
    data() {
        return {
            value: '',
            clazz: 0,
            course: 0,
            clazzes:[],
            task: {
                id: null,
                title: '',
                questions: [],
                curriculum: {
                    curriculumId: ''
                }
            }
        }
    },
    methods: {
        addQuestion() {
            this.task.questions.push({
                id: null,
                answer: '',
                serial: '',
                description: '',
                options: [
                    {
                        optionText: '',
                        optionAlpha: 'A'
                    },
                    {
                        optionText: '',
                        optionAlpha: 'B'
                    },
                    {
                        optionText: '',
                        optionAlpha: 'C'
                    },
                    {
                        optionText: '',
                        optionAlpha: 'D'
                    }
                ]
            })
            this.sortQuestionSerial()
        },
        sortQuestionSerial() {
            this.task.questions.forEach((question, index) => question.serial = index + 1)
        },
        deleteQuestion(question) {
            this.$delete(this.task.questions, this.task.questions.indexOf(question))
            this.sortQuestionSerial()
        },
        assignTask(){
            post('task/assign',this.task,()=>{
                this.$router.go(-1)
                this.$message({
                    message: '发布成功'
                })
            })
        }
    },
    mounted(){
        resolvedPost('class/load',{
            organization:{
                organizationId: this.$route.query.organizationId
            }
        },data=>{
            this.clazzes = data
            this.clazz = data[0]?.clazzId
            this.task.curriculum.curriculumId = data[0]?.ccs[0]?.curriculum.curriculumId
        })
    },
    computed:{
        classes(){
            let cses = this.clazzes?.map(clazz=>{
                return {
                    value: clazz.clazzId,
                    text: clazz.clazzName
                }
            })
            return cses
        },
        courses(){
            let cc = this.clazzes.find(clazz=>clazz.clazzId===this.clazz)?.ccs.map(cc=>{
                return {
                    value: cc.curriculum.curriculumId,
                    text: cc.curriculum.curriculumName
                }
            })
            if (!cc) cc = []
            return cc
        }
    }
}
</script>

<style scoped>
.button {
    width: 90%;
    display: block;
    margin: auto;

}

.addQuestion {
    width: 40%;
    display: inline-block;
    margin: 5%;
}
</style>