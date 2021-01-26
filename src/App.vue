<template>
  <div id="app">
    <router-view name="root"/>
  </div>
</template>

<script>
export default {
}

</script>

<style>
body ,#app{
  margin: 0;
  height: 100vh;
}
*{
  margin:auto 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  display: none;
  /* background-color:transparent; */
}
</style>
