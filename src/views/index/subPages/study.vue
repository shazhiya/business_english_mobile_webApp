<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(banner,i) in banners" :key="i">
                <van-image
                        :src="src+banner"
                        fit="cover"
                        style="margin: 2%; display: block;border-radius: 10px;overflow: hidden;"
                        height="25vh"
                />
            </van-swipe-item>
        </van-swipe>

        <card width="95%" style="margin-top: 10px">
            <van-row>
                <van-col v-for="(c,i) in counterBar" :key="i" span="6">
                    <big-number :name="c.name" :number="c.number"/>
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
            myClasses: [],
            banners:[
                'courseCover/banners/banner1.png',
                'courseCover/banners/banner1.png',
                'courseCover/banners/banner1.png',
                'courseCover/banners/banner1.png'
            ]
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
        },
        counterBar(){
            let result = []
            result.push({
                name: '我的班级',
                number: this.myClasses.length
            })
            result.push({
                name: '我的课程',
                number: this.courses.length
            })
            result.push({
                name: '待办事项',
                number: 0
            })
            result.push({
                name: '通知',
                number: 0
            })
            return result.map(re=>{
                return {
                    name: {
                        value: re.name,
                        size: '14px',
                        color: 'black'
                    },
                    number:{
                        value: re.number,
                        size: '24px',
                        color: 'black'
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
</style>