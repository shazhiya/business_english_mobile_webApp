<template>
  <div>
    <van-row>
      <van-col span="5">
        <van-radio name="1" style="margin: 5px">A</van-radio>
      </van-col>
      <van-col span="18" offset="1">
        <van-field v-model="optionA" placeholder="" style="border: 1px solid black; padding: 0"></van-field>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      optionA:''
    }
  }
}
</script>

<style scoped>

</style>