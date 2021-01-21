<template>
  <div @click="goto">
    <el-card  class="card" :title="course.curriculumDescription" >
      <el-image 
        fit='scale-down'
        slot="header"
        style="height: 115px;"
        lazy:true
        :src='src+course.curriculumCover'
    ></el-image>
    <h3 style="text-align: center">{{course.curriculumName}}</h3>
    <el-button v-if="show" type="primary" @click.stop="del" style="width:100%">delete</el-button>
  </el-card>
  </div>
</template>

<script>
export default {
    props:['course','show'],
    methods:{
      goto(){
        this.$router.push({name:'study',params:{course:this.course}})
      },
      del(){
        this.back.post('curriculum/del',{curriculumId:this.course.curriculumId}).then(res=>{
          if(res.data) {
            this.$parent.courseList.splice(this.$parent.courseList.indexOf(this.course),1)
            this.$message.success("del course successfully")
          }
        })
      }
    }
}
</script>

<style scoped>
.card{
    width: 200px;
    word-wrap: break-word;
    
}
</style>