<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="loadCourses"
    >
      <van-row v-for="(row,index) in renderList" :key="index">
        <van-col span="12" v-for="course in row" :key="course.id">
          <course-card>
            {{course}}  
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
      console.log(this.courses.length);
      let additional = this.generate(10)
      this.refreshing = false
      if (additional.length<10){
        this.finished = true
      }
      this.loading = false
      if (reverse) {
        this.courses.unshift(...additional)
      }else {
        this.courses.push(...additional)
      }
    },
    onRefresh() {
      this.loadCourses(true)
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
  computed:{
    renderList(){
      let rows = []
      this.courses.forEach((course,index)=>{
        if(index%2 == 1) return
        rows.push([this.courses[index],this.courses[index+1]])
      })
      return rows
    }
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
</style>