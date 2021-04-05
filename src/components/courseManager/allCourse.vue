<template>
    <div class="flex">
        <card v-for="course in courseList" :key="course.curriculumId" :course="course" :show='show'/>
    </div>
</template>

<script>
import card from './courseCard'
import resolvedPost from "@/store/ResovePost";

export default {
    props: ['show','type','organizationId'],
    components: {
        card
    },
    created() {
       resolvedPost('curriculum/load', {organization:{organizationId:this.organizationId}})
            .then(res => {
                this.courseList = res.filter(cu=>cu.curriculumStatus!=='dispose')
                if (this.type)
                    this.courseList =  this.courseList.filter(cu=>cu.curriculumStatus === this.type)
            })
    },
    data() {
        return {
            courseList: []
        }
    }
}
</script>

<style scoped>
.flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>