<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>
                <div>1</div>
            </van-swipe-item>
            <van-swipe-item>
                <div>2</div>
            </van-swipe-item>
            <van-swipe-item>
                <div>3</div>
            </van-swipe-item>
            <van-swipe-item>
                <div>4</div>
            </van-swipe-item>
        </van-swipe>

        <card width="95%" style="margin-top: 10px">
            <van-row>
                <van-col v-for="i in 4" :key="i" span="6">
                    <big-number/>
                </van-col>
            </van-row>
        </card>

      <van-cell-group title="我的班级">
        <clazz-item v-for="clazz in myClasses" :key="clazz.clazzId" :clazz="clazz"/>
      </van-cell-group>

        <van-cell-group title="我的课程">
            <van-empty
                description="空空如也"
                image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                v-if="false"
            >
                <van-button round type="danger" class="bottom-button">去寻找课程</van-button>
            </van-empty>
            <my-course-item v-for="course in courses" :key="course.curriculumId" :course="course"/>
        </van-cell-group>

        <van-cell-group title="待办事项">
            <van-empty></van-empty>
        </van-cell-group>

    </div>
</template>

<script>
import bigNumber from "component/mine/bigNumber";
import myCourseItem from "component/course/courseItem";
import clazzItem from "component/clazz/clazzItem";
import resolvedPost from "@/store/ResovePost";
export default {
    name: "study",
    components: {
        bigNumber,myCourseItem,clazzItem
    },
    data(){
        return {
            myClasses: []
        }
    },
    methods:{
        loadMyClasses(){
            resolvedPost('class/loadMyClasses',{user:{userId: this.$store.getters.myself.userId}})
            .then(res=>{
                this.myClasses = res
            })
        }
    },
    beforeMount() {
        this.loadMyClasses()
    },
    computed:{
        courses(){
            return this.myClasses.reduce((courseList,clazz)=>{
                courseList.push(...clazz.ccs.map(cc=>cc.curriculum))
                return courseList
            },[])
        }
    }
}
</script>

<style scoped>
.my-swipe .van-swipe-item>div {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    margin: 5px;
    border-radius: 15px;
}
</style>