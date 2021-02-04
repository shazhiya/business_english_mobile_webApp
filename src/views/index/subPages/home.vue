<template>
    <div v-hammer:swipe="swipeup">
        <van-tabs animated swipeable :before-change="beforeChange" style="height:100%" >
            <van-tab v-for="tag in tags" :title="tag.title" :key="tag.title">
                <course-list :type="tag.title"/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import courseList from "component/course/courseList";

export default {
    components: {courseList},
    data() {
        return {
            active: "",
            tags: [
                {
                    title: "Hot",
                },
                {
                    title: "推荐",
                },
                {
                    title: 'popular'
                },
                {
                    title: 'laster'
                },
                {
                    title: 'likes'
                },
                {
                    title: 'random'
                },
                {
                    title: 'favorites'
                },
                {
                    title: 'vip'
                },
                {
                    title: '4K'
                }
            ]
        };
    },
    methods: {
        beforeChange(name) {
            // todo
            console.log(name);
            return true;
        },
        swipe(obj){
            if (obj.additionalEvent=="panup"){
                this.$store.commit("optional/setHomeTopBarHeight",'0px')
            }
            if (obj.additionalEvent == "pandown"){
                this.$store.commit("optional/setHomeTopBarHeight",'57px')
            }
        }
    },
    created() {
        this.$store.commit('course_base/pushSearchResult')
    }
};
</script>

<style scoped>

</style>