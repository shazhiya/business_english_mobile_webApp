<template>
  <div ref="item" class="ani"
       :style="{transition: 'all '+duration+'ms linear',margin: '2px auto 2px', transformOrigin: '80% 50%', position: 'absolute'}"
       style=" ">
    <card min-height="5px">

    </card>
  </div>
</template>

<script>
export default {
  name: "rotateWhiteItem",
  props: ['w', 'delay', 'duration', 'deg'],
  methods: {},
  data() {
    return {
      flag: true
    }
  },
  mounted() {
    let rot = this.$refs['item']
    rot.style.width = this.w
    setTimeout(() => {
      let rot = this.$refs['item']
      rot.style.transform = "rotate(" + this.deg + "deg)"
    }, this.delay)
    setTimeout(() => {
      setInterval(() => {
        let rot = this.$refs['item']
        if (this.flag) rot.style.transform = ""
        else rot.style.transform = "rotate(" + this.deg + "deg)"
        this.flag = !this.flag
      }, this.duration)
    }, this.delay)
    console.log('complete')
  }
}
</script>

<style scoped>
.ani:hover {
  transition: none;
}

</style>