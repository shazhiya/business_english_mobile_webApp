<template>
    <div>
        <nal title="我的联系人" @right="search=true">
            <template #right>
                <van-icon name="plus" size="20"></van-icon>
            </template>
            <div>
                <contactor-info v-for="contact in contacts" :key="contact.contactsId" :contactor="contact.contactor"/>
            </div>
        </nal>

        <van-dialog v-model="search" title="添加联系人" show-cancel-button
                    :show-confirm-button="searchResult.userId!=undefined" confirm-button-text="添加"
                    @confirm="add"
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
import commonNav from "component/card/navbar";
import contactorInfo from "component/message/contactorInfo";
import _ from "lodash";
import post from "@/store/util";
import resolvedPost from "@/store/ResovePost";
export default {
    name: "contacts",
    components:{
        nal: commonNav,
        contactorInfo,
        userSmallCard
    },
    data(){
        return {
            userName:'',
            search: false,
            searchResult: {}
        }
    },
    computed:{
        contacts(){
            return this.$store.getters.contactors
        }
    },
    methods:{
        searchUser() {
            this.debounce()
        },
        add(){
            post('message/contactors/add',{self:this.$store.getters.myself,contactor:{userId:this.searchResult.userId}},()=>{
                this.$notify({type:'success',message:'操作成功'})
                this.$store.dispatch('loadContactors')
            })
        },
        loadUserInfo() {
            resolvedPost('user/getProfileByUsername', {userName: this.userName})
                .then(user => {
                    this.searchResult = user
                })
        }
    },
    mounted() {
        this.debounce = _.debounce(this.loadUserInfo , 500)
    },
    watch: {
        userName() {
            this.searchUser()
        }
    }
}
</script>

<style scoped>

</style>