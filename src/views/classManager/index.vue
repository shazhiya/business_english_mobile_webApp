<template>
    <div>
        <navbar title="班级管理">
            <template #default>
                <van-cell-group title="所有班级">
                    <clazz-item v-for="clazz in classes" :key="clazz.clazzId" :clazz="clazz" @click="manager"/>
                </van-cell-group>
            </template>
        </navbar>
    </div>
</template>

<script>
import clazzItem from "component/clazz/clazzItem";
import resolvedPost from "@/store/ResovePost";

export default {
    name: "index",
    components: {
        clazzItem
    },
    data(){
        return {
            classes: []
        }
    },
    methods:{
        manager(clazz){
            this.$router.push({name: 'classManager',query:{clazzId:clazz.clazzId}})
        }
    },
    beforeMount() {
        resolvedPost('class/load',{organization:{organizationId:this.$route.query.organizationId}})
        .then(res=>{
            this.classes = res
        })
    }
}
</script>

<style scoped>

</style>