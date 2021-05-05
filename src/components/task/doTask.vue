<template>
    <navbar title="习题作业">
        <template #right><p></p></template>
        <template #default>
            <div style="margin: 10px"></div>
            <question v-for="question in task.questions" :key="question.id" :question="question" :editable="false" :show-right="true"/>
            <van-button round type="primary" style="width: 95%; margin: auto; display: block" @click="submit">
                提交作业
            </van-button>
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
            }
        }
    },
    components:{question},
    methods:{
        submit(){
            //todo
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