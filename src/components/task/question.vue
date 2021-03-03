<template>
  <card style="margin:0 auto 20px; padding: 10px 0; width: 95%; position: relative">
    <van-row gutter="10">
      <van-col span="2"  offset="1" style="padding-top:4px; font-weight: bold; ">11</van-col>
      <van-col span="18">
        a啊阿斯顿发吉萨地方ui哈桑丢发生丢发生的合计卡号时代u是打包发士大夫啊睡沙发好舒服不擦撒旦解放
      </van-col>
    </van-row>
    <van-row>
      <van-col span="19" offset="2">
        <div style="margin: 10px">
          <van-radio-group v-model="radio">
            <anOption></anOption>
            <anOption></anOption>
            <anOption></anOption>
            <anOption></anOption>
          </van-radio-group>
        </div>
      </van-col>
    </van-row>
    <div style="position: absolute; top: 10px; right: 10px">
      <van-icon name="delete-o" size="20px"></van-icon>
    </div>
  </card>
</template>

<script>
import anOption from "component/task/AnOption";
export default {
  name: "question",
  components:{
    anOption
  },
  data(){
    return {
      radio:''
    }
  }
}
</script>

<style scoped>

</style>