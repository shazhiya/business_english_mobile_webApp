<template>
    <cc style="">
        <div style="margin: 15px 0 0 0">
            <van-row gutter="30px">
                <van-col span="12">
                    <div class="van-ellipsis" style="padding: 0 10px">阿斯顿发生</div>
                </van-col>
                <van-col span="8">
                    <div class="van-ellipsis">共记{{task.questions.length}}道题目</div>
                </van-col>
                <van-col span="1" offset="2" >
                    <van-icon name="edit" size="20" @click="doTask"/>
                </van-col>
            </van-row>
        </div>
    </cc>
</template>

<script>
export default {
    name: "taskItem",
    props: ['task'],
    methods:{
        doTask(){
            this.$router.push({name: 'doTask',query:{taskId: this.task.id}})
        }
    }
}
</script>

<style scoped>

</style>