<template>
  <van-tabs animated swipeable :before-change="beforeChange" style="height:100%">
    <van-tab v-for="tag in tags" :title="tag.title" :key="tag.title">
      <course-list :courses="courseList" />
    </van-tab>
  </van-tabs>
</template>

<script>
import courseList from "component/course/courseList";
export default {
  components: { courseList },
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
      ],
      courseList: this.generate(50)
    };
  },
  methods: {
   beforeChange(name) {
      // todo
      console.log(name);
      return true;
    },
    generate(size){
        let re = []
        for(let i = 0; i<size;i++){
            re.push({
                id: i
            })
        }
        return re
    }
  },
};
</script>

<style scoped>

</style>