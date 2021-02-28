<template>
  <div>
    <navbar title="评论详情">
      <template #right>
        <p></p>
      </template>
      <template #default class="height">
        <comment :show-sub="false"/>
        <van-cell-group title="相关回复55条">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <comment v-for="i in list" :key="i" style="padding-bottom: 10px;" :show-sub="false"/>
          </van-list>
        </van-cell-group>
      </template>

    </navbar>

    <van-tabbar>
      <van-field
          v-model="mess"
          center
          clearable
          placeholder="在此输写下评论"
          :maxlength="maxlength"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendComment()">({{inputLen+'/'+maxlength}})发送</van-button>
        </template>
      </van-field>
    </van-tabbar>
  </div>
</template>

<script>
import comment from "component/communication/comment";
import navbar from "component/card/navbar";
export default {
  name: "commentDetail",
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
    comment,navbar
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
    sendComment(data){

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

</style>