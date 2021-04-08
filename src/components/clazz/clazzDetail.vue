<template>
    <navbar title="班级详情">
        <template #right>
            <van-icon name="setting-o" size="20px"/>
        </template>
        <template #default>
            <van-image
                width="96%"
                height="150px"
                radius="15px"
                style="margin: 2%"
                :src="src + clazz.clazzLogo"
                fit="cover"
            />

            <van-cell-group title="班级信息">
                <van-cell title="班级名" :value="clazz.clazzName"/>
                <van-cell title="班级简介" :value="clazz.clazzDescription" type="textarea"/>
            </van-cell-group>
            <slot></slot>

            <van-cell-group title="教授课程">
                <myCourseItem v-for="course in courses" :course="course" :key="course.curriculumId"/>
            </van-cell-group>

            <van-cell-group title="授课教师">
                <userSmallCard></userSmallCard>
                <userSmallCard></userSmallCard>
                <userSmallCard></userSmallCard>
                <userSmallCard></userSmallCard>
            </van-cell-group>

        </template>
    </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import myCourseItem from "component/course/courseItem";
import userSmallCard from "component/user/userSmallCard";
export default {
    name: "clazzDetail",
    props:['clazz'],
    components: {
        navbar,myCourseItem,userSmallCard
    },
    computed:{
        courses(){
            return this.clazz.ccs.map(cc=>cc.curriculum)
        }
    }
}
</script>

<style scoped>

</style>