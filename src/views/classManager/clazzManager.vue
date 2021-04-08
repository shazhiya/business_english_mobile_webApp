<template>
    <div v-if="clazz.clazzId!==undefined">
        <clazzDetail :class="clazz">
            <van-switch-cell v-model="status" title="允许学员加入" />
        </clazzDetail>
        <van-sticky :offset-top="46" style="margin-top: 50px">
            <van-tabs v-model="active" swipeable>
                <van-tab title="班级学员">
                    <div class="remainHeight">
                    </div>
                </van-tab>
                <van-tab title="入班申请">
                    <div class="remainHeight"></div>
                </van-tab>
            </van-tabs>
        </van-sticky>
    </div>
</template>

<script>
import clazzDetail from "component/clazz/clazzDetail";
import resolvedPost from "@/store/ResovePost";
export default {
    name: "clazzManager",
    components:{
        clazzDetail
    },
    data(){
        return {
            active: 0,
            status: true,
            clazz:{}
        }
    },
    beforeMount() {
        this.loadTheCLass()
    },
    methods:{
        loadTheCLass(){
            resolvedPost('class/load',{clazzId:this.$route.query.clazzId})
                .then(res=>{
                    this.clazz = res[0]
                    this.status = this.clazz.status === 'enabled'
                })
        }
    }
}
</script>

<style scoped>
.remainHeight{
    height: calc(100vh - 90px);
    overflow: scroll;
}
</style>