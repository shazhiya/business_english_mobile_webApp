<template>
  <div style="position:relative;">
        <div class="height">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <comment v-for="i in list" :key="i" style="padding-bottom: 10px"/>
            </van-list>
        </div>
        <div style="position: absolute; width: 100%;">
            <van-field
                    v-model="mess"
                    center
                    clearable
                    placeholder="在此输写下评论"
                    :maxlength="maxlength"
                    style="padding-left: 30px"
            >
                <template #button>
                    <van-button size="small" type="primary" @click="sendComment()">({{inputLen+'/'+maxlength}})发送</van-button>
                </template>
            </van-field>
        </div>
  </div>
</template>

<script>
import comment from "component/communication/comment";
export default {
  name: "allComment",
  data() {
    return {
      list: 0,
      loading: false,
      finished: false,
      maxlength: 30,
      mess: ''
    };
  },
  components:{
    comment
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.list = 5

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    sendComment(/*data*/){

    }
  },
  computed:{
    inputLen(){
      return this.mess.length>10? ''+this.mess.length : '0' + this.mess.length
    }
  }
}
</script>

<style scoped>
.height{
  height: calc(100vh - 149px);
  overflow: scroll;
}
</style>