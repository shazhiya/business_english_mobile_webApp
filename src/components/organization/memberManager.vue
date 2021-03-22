<template>
    <div>
        <navbar title="成员管理" style="padding-bottom: 20px;">
            <van-cell-group title="现有成员">
                <cc>
                    <div v-for="(u,index) in invited" :key="index" style="position: relative">
                        <userSmallCard :user="u"></userSmallCard>
                        <div style="position: absolute; top: 10px; right: 20px" @click="deleteMember(u)">
                            <van-icon name="delete-o"></van-icon>
                        </div>
                    </div>
                </cc>
            </van-cell-group>
            <div style="position: relative">
                <van-cell-group title="待同意加入">
                    <cc style="padding: 10px 0">
                        <div v-for="(u,index) in unInvited" :key="index" style="position: relative">
                            <userSmallCard :user="u"></userSmallCard>
<!--                            <div style="position: absolute; top: 15px; right: 20px">-->
<!--                                <van-icon name="delete-o"></van-icon>-->
<!--                            </div>-->
                        </div>
                    </cc>
                    <van-button style="width: 95%; margin:10px auto; display: block" type="primary" round size="mini" @click="search=true">
                        邀请成员
                    </van-button>
                </van-cell-group>
            </div>
        </navbar>

        <van-dialog v-model="search" title="邀请新成员" show-cancel-button
                    :show-confirm-button="searchResult.userId!=undefined" confirm-button-text="邀请"
                    @confirm="invite"
        >
            <van-field label="昵称" placeholder="请输入昵称后搜索" v-model="userName"/>
            <div style="height: 79px;padding: 10px 0; overflow: hidden">
                <userSmallCard  :user="searchResult" v-if="searchResult.userId"></userSmallCard>
                <van-empty v-else image="https://img01.yzcdn.cn/vant/custom-empty-image.png" image-size="78"/>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import userSmallCard from "component/user/userSmallCard";
import _ from 'lodash'
import resolvedPost from "@/store/ResovePost";
import post from "@/store/util";

export default {
    name: "memberManager",
    components: {userSmallCard},
    data() {
        return {
            search: false,
            searchResult: {},
            userName: '',
            organizationId: this.$route.query.organizationId,
            memberUros:[]
        }
    },
    methods: {
        searchUser() {
            this.debounce()
        },
        deleteMember(user){
            post('organization/delMember',{user:{userId:user.userId},organization:{organizationId: this.$route.query.organizationId}},()=>{
                this.$notify({message:"操作成功",type:'success'})
                this.loadMember()
            })
        },
        invite() {
            if (this.memberUros.some(uro=>uro.user?.userId===this.searchResult.userId)){
                this.$notify({message:"该用户已存在在组织中"})
                return
            }
            post('organization/inviteMember',{organization:{organizationId:this.organizationId},user:{userId:this.searchResult.userId}})
            .then(()=>{
                this.loadMember()
            })
        },
        loadUserInfo() {
            resolvedPost('user/getProfileByUsername', {userName: this.userName})
                .then(user => {
                    this.searchResult = user
                })
        },
        loadMember(){
            resolvedPost('organization/load',{organizationId: this.organizationId})
            .then(data=>this.memberUros = data[0].uros)
        }
    },
    mounted() {
        this.debounce = _.debounce(this.loadUserInfo , 500)
        this.loadMember()
    },
    watch: {
        userName() {
            this.searchUser()
        }
    },
    computed:{
        unInvited(){
            return this.memberUros.filter(uro=>uro.status==="待接受邀请").map(uro=>uro.user)
        },
        invited(){
            return this.memberUros.filter(uro=>uro.status==="接受").map(uro=>uro.user)
        }
    }
}
</script>

<style scoped>

</style>