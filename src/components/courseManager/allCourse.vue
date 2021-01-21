<template>
  <div class="flex">
      <card v-for="course in courseList" :key="course.curriculumId" :course="course" :show='show'>
        
      </card>
  </div>
</template>

<script>
import card from './courseCard'
export default {
    props:['show'],
    components:{
        card
    },
    // props:['courseList'],
    created(){
        this.back.post('curriculum/all',{})
            .then(res=>{
                this.courseList = res.data
            })
    },
    data(){
        return {
            courseList: []
        }
    }
}
</script>

<style scoped>
.flex{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>