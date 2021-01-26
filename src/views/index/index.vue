<template>
  <div class="container">
    <card>

    </card>

    <flex-container class="footer">
      <div @click="changeActive(i)" v-for="i in 5">
        <iconText :ref="'it'" />
      </div>
    </flex-container>
  </div>
</template>

<script>
import iconText from "component/detail/iconText";
export default {
    components:{
      iconText
    },
    methods:{
      changeActive(i){
        for (let s = 0;s<5;s++) {
          this.$refs['it'][s].unActive()
        }
        this.$refs['it'][i-1].active()
      }
    }
}
</script>

<style scoped>
.container{
  position: relative;
  height: 100%;
}
.footer{
  position: absolute;
  bottom: 0;
  width: 100%;
  display: block;
}
</style>