<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="loadCourses"
      offset="300"
    >
      <van-row v-for="(row, index) in list" :key="index">
        <van-col span="12" v-for="course in row" :key="course.id">
          <course-card :course="course" >
    
          </course-card>
        </van-col>
      </van-row>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import courseCard from "./courseCard";
export default {
  props: ["courses"],
  components: { courseCard },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
    };
  },
  methods: {
    loadCourses(reverse) {
      console.log('loaded courses')
      this.$store.dispatch("course_base/search",{
        index:1,
        size:10,
        condition:{},
        isUnshift: reverse
      }).then(res=>{
        if(res<10) this.finished = true;
        this.loading = false
        this.refreshing = false;
        this.list = this.$store.getters['course_base/renderList']("undefined")
      })
    },
    onRefresh() {
      this.loadCourses(true);
    }
  },
  created(){
    this.$store.commit('course_base/pullSearchResult')
  }
};
</script>

<style>
.van-pull-refresh {
  height: calc(100vh - 151px);
  overflow: scroll;
  -webkit-user-select: none;
  user-select: none;
}
.van-list {
  height: calc(100vh - 151px);
}
</style>