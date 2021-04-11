<template>
    <div>
        <clazzDetail :clazz="clazz">
            <van-switch-cell v-model="status" title="允许学员加入" />
        </clazzDetail>
        <van-sticky :offset-top="46" style="margin-top: 50px">
            <van-tabs animated swipeable v-model="active">
                <van-tab title="班级学员">
                    <div class="remainHeight">
                        <userSmallCard v-for="classUser in student" :key="classUser.clazzUserId" :user="classUser.user"/>
                    </div>
                </van-tab>
                <van-tab title="入班申请">
                    <div class="remainHeight">
                        <cc v-for="classUser in audited" :key="classUser.clazzUserId">
                        <agreePanel :all="classUser" @ok="changeCU" @reject="changeCU">
                            <userSmallCard :user="classUser.user"/>
                        </agreePanel>
                        </cc>
                    </div>
                </van-tab>
            </van-tabs>
        </van-sticky>
    </div>
</template>

<script>
import clazzDetail from "component/clazz/clazzDetail";
import userSmallCard from "component/user/userSmallCard";
import agreePanel from "component/card/agreePanel";

import resolvedPost from "@/store/ResovePost";
import post from "@/store/util";
export default {
    name: "clazzManager",
    components:{
        clazzDetail,userSmallCard,agreePanel
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
        },
        changeCU(cu,flag){
            post('class/changeCU',{clazzUserId:cu.clazzUserId,status:flag?'同意':'拒绝'},()=>{
                this.loadTheCLass()
            })
        }
    },
    watch:{
        status(n){
            post('class/change',{clazzId:this.$route.query.clazzId,status:n?'enabled':'disabled'})
        }
    },
    computed:{
        student(){
            return this.clazz.clazzUsers?.filter(cu=>cu.status==='同意')
        },
        audited(){
            return this.clazz.clazzUsers?.filter(cu=>cu.status==='待同意')
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