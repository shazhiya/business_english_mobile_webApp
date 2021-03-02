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
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                fit="cover"
            />

            <van-cell-group title="班级信息">
                <van-cell title="班级名" value="呜啦啦"/>
                <van-cell title="班级简介" value="呜啦啦啦啦啦啦啦啦啦啦啦啦啦啦"/>
            </van-cell-group>

            <van-cell-group title="班级创建者">
                <userSmallCard></userSmallCard>
            </van-cell-group>

            <van-cell-group title="教授课程">
                <myCourseItem/>
                <myCourseItem/>
                <myCourseItem/>
                <myCourseItem/>
                <myCourseItem/>
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
import myCourseItem from "component/course/myCourseItem";
import userSmallCard from "component/user/userSmallCard";
export default {
    name: "clazzDetail",
    components: {
        navbar,myCourseItem,userSmallCard
    }
}
</script>

<style scoped>

</style>