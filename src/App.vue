<template>
  <div id="app">
<!--    <router-view></router-view>-->
    <card>
      <p>this is my card</p>
      <p>this is my card</p>
      <p>this is my card</p>
      <p>this is my card</p>
      <p>this is my card</p>
    </card>
  </div>
</template>

<script>
import card from 'component/card/baseCard'
export default {
  components:{card}
}

</script>

<style>
body {
  margin: 0;
}
* {
  margin: 0;
  padding: 0;
  border: 0;
}

::-webkit-scrollbar {
  display: none;
  /* background-color:transparent; */
}
</style>
