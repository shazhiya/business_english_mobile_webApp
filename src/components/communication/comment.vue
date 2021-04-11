<template>
  <div style="padding: 10px">
    <van-row gutter="10">
      <van-col span="3" offset="">
        <van-image
          width="48"
          height="48"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          radius="48px"
        />
      </van-col>
      <van-col span="19" offset="1">
        <p style="margin: 0; font-weight: bold; font-size: 18px; float: left; width: 50%; overflow: hidden" class="van-ellipsis">
          ichijo hotaru
          <van-tag type="primary" :mark="false" :plain="false">tag</van-tag>
        </p>
        <p style="margin: 0; float: right;overflow: hidden;width: 50%;" class="van-ellipsis">
          2021/12/21 20:20:13
        </p>
        <p style="margin-top: 25px; color: gray; clear: both">
          商务英语这个课程讲的真好！
        </p>
        <div class="controller">
          <van-icon name="good-job-o"/>{{2260}}
          <van-icon name="good-job-o" style="margin-left: 15px;transform: rotateX(180deg)"/>{{2260}}
          <van-icon name="chat-o" style="margin-left: 15px; transform: rotateY(180deg); float: right" size="22px"/>
        </div>

        <div class="subComments" v-if="showSub">
          <div>
            <el-link type="primary">shazhiya:</el-link>
            ichijo hotaru
          </div>
          <div>
            <el-link type="primary">shazhiya:</el-link>
            ichijo hotaru
          </div>
          <div>
            <el-link type="primary">shazhiya:</el-link>
            ichijo hotaru
          </div>
          <el-link type="primary" @click="$router.push({name: 'commentDetail'})">共记55条评论></el-link>
        </div>
      </van-col>
    </van-row>
    <van-divider/>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: {
    showSub: {
      default: true
    }
  }
}
</script>

<style scoped>
.controller{

}
.subComments{
  background: #EEEEEE;
  margin-top: 2px;
  font-size: 14px;
}

.subComments>div{
  padding: 3px;
}
</style>