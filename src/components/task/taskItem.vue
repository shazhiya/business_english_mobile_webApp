<template>
    <div style="margin: 8px 0">
        <van-col gutter="30px">
            <van-col span="8">
                <div class="van-ellipsis" style="padding: 0 10px">阿斯顿发生</div>
            </van-col>
            <van-col span="12">
                <div class="van-ellipsis">{{new Date()}}</div>
            </van-col>
            <van-col span="1" offset="2" >
                <van-icon name="edit" size="20" @click="doTask"/>
            </van-col>
        </van-col>
    </div>
</template>

<script>
export default {
    name: "taskItem",
    methods:{
        doTask(){
            console.log('edit task')
        }
    }
}
</script>

<style scoped>

</style>