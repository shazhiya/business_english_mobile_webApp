<template>
    <div>
        <clazzDetail v-if="getClazz.clazzId" :clazz="getClazz" >
            <div>
                <van-button v-if="'auditing'===myStatus" color="gray" size="mini" style="margin:10px auto; width: 95%; display: block" round disabled>
                    申请已提交
                </van-button>
                <van-button v-if="'none'===myStatus" type="primary" size="mini" style="margin:10px auto; width: 95%; display: block" round @click="enrollTheClass">
                    申请加入
                </van-button>
                <van-button v-if="''===myStatus" type="primary" size="mini" style="margin:10px auto; width: 95%; display: block" round @click="enrollTheClass">
                    已加入
                </van-button>
            </div>
        </clazzDetail>
        <van-sticky :offset-top="46" style="margin-top: 50px">
            <van-tabs animated swipeable v-model="active">
                <van-tab title="班级学员">
                    <div class="remainHeight">
                        <userSmallCard v-for="classUser in student" :key="classUser.clazzUserId" :user="classUser.user"/>
                    </div>
                </van-tab>
                <van-tab title="授课教师">
                    <div class="remainHeight">
                        <userSmallCard v-for="user in teacher" :key="user.userId" :user="user"/>
                    </div>
                </van-tab>
            </van-tabs>
        </van-sticky>
    </div>
</template>

<script>
import clazzDetail from "component/clazz/clazzDetail";
import userSmallCard from "component/user/userSmallCard";
import resolvedPost from "@/store/ResovePost";
import post from "@/store/util";
export default {
    name: "displayClassDetail",
    components:{clazzDetail,userSmallCard},
    data(){
        return {
            clazz:{},
            active:0
        }
    },
    computed:{
        student(){
            return this.clazz.clazzUsers?.filter(cu=>cu.status==='同意')
        },
        teacher(){
            return this.clazz.ccs?.reduce((total,curr)=>{
                if (!total.some(cc=>cc.curriculum.creator.userId===curr.curriculum.creator.userId))
                    total.push(curr)
                return total
            },[]).map(cc=>cc.curriculum.creator)
        },
        myStatus(){
            return this.clazz.clazzUsers
                ?.find(cu=>cu.user.userId === this.$store.getters.myself.userId && cu.status!=='disabled')
                ?.status||"none"
        },
        getClazz(){
            return this.clazz
        }
    },
    beforeMount() {
        this.loadTheCLass()
    },
    methods: {
        loadTheCLass() {
            resolvedPost('class/load', {clazzId: this.$route.query.clazzId})
                .then(res => {
                    this.clazz = res[0]
                })
        },
        enrollTheClass(){
            post('class/saveCU',{
                user:{userId: this.$store.getters.myself.userId},
                clazz:{clazzId: this.$route.query.clazzId}
            },()=>{
                this.$notify({
                    message: '申请已提交'
                })
                this.loadTheCLass()
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