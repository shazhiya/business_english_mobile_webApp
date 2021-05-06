<template>
    <navbar title="习题作业">
        <template #right><p></p></template>
        <template #default>
            <div style="margin: 10px"></div>
            <question v-for="question in task.questions" :key="question.id" :question="question" :editable="false" :show-right="showAnswer"/>
            <van-button round type="primary" style="width: 95%; margin: auto; display: block" @click="submit" v-if="!showAnswer">
                查看答案
            </van-button>
            <div v-else>
                <p style="color: red;text-align: center">
                    {{report}}
                </p>
            </div>
        </template>
    </navbar>
</template>

<script>
import resolvedPost from "@/store/ResovePost";
import question from "component/task/question";
export default {
    name: "doTask",
    data(){
        return {
            task:{
                id: this.$route.query.taskId
            },
            showAnswer: false,
            report: ''
        }
    },
    components:{question},
    methods:{
        submit(){
            this.showAnswer = true
            let total = this.task.questions.length
            let right = this.task.questions.filter(question=>question.doneAnswer===question.answer).length
            this.report = `答对${right}道题目，做错${total-right}道题目。`
        }
    },
    mounted(){
        resolvedPost('task/load',{id:this.task.id})
        .then(tasks=>{
            this.task=tasks[0]
            this.task.questions.forEach(question=>{
                question.options = JSON.parse(question.options)
            })
        })
    }
}
</script>

<style scoped>

</style>