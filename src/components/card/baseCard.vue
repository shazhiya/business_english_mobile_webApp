<template>
  <div :style="Object.assign({width:width,minHeight},iStyle)" class="base">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "baseCard",
  props: {
    width: {
      type: String
    },
    minHeight: {
      type: String,
      default(){
        return "50px"
      }
    },
    iStyle: {
      default(){return {}},
      type: Object
    }
  }
}
</script>

<style scoped>
.base{
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  color: #303133;
  transition: .3s;
  border-radius: 8px;
  overflow: hidden;
  margin: auto 5px;
  padding: 2px;
  box-shadow: 0 2px 12px 0 gray;
}
</style>