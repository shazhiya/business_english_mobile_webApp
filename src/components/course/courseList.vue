<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
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
    onLoad() {
      console.log(this.courses.length);
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.courses.push({
            id: this.courses.length + 1,
          });
        }
        this.loading = false;

        if (this.courses.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
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