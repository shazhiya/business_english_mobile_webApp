<template>
  <div>
    <van-row>
      <van-col span="5">
        <van-radio :name="option.optionAlpha" style="margin: 5px">{{option.optionAlpha}}</van-radio>
      </van-col>
      <van-col span="18" offset="1">
        <van-field v-if="editable" v-model="option.optionText" :placeholder="'edit option ' + option.optionAlpha" style="border: 1px solid black; padding: 0 0 0 5px"></van-field>
        <div v-else style="padding-top: 6px">{{option.optionText}}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    editable: {
      default: true
    },
    option: {
      default(){
        return {
          optionText: 'option text',
          optionAlpha: 'A'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>