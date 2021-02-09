<template>
    <nal :title="$route.params.title">
        <div v-if="type==='myClasses'">
            <contactor-info v-for="clazz in list" :key="clazz"/>
        </div>
    </nal>
</template>

<script>
import commonNav from "component/card/navbar";
import contactorInfo from "component/message/contactorInfo";
export default {
    name: "contacts",
    components:{
        nal: commonNav,
        contactorInfo
    },
    data(){
        return {
            type:  this.$route.params.title,
            list: []
        }
    },
    mounted(){
        if (this.type === 'myClasses'){
            // todo
            this.list.push(1,23,45,4156,7,89,456,132)
        }// els if ....

    }
}
</script>

<style scoped>

</style>