<template>
    <navbar title="组织管理" style="padding-bottom: 20px">
            <van-cell-group title="待审批">
                <cc>
                    <van-cell v-for="or in organizations.audit" :key="or.organizationId" :title="or.organizationName" is-link :to="{name:'organizationDetail',query:{type:'audit',id:or.organizationId}}"></van-cell>
                </cc>
            </van-cell-group>
            <van-cell-group title="运作中组织">
                <cc>
                    <van-cell v-for="or in organizations.common" :key="or.organizationId" :title="or.organizationName" is-link :to="{name:'organizationDetail',query:{type:'freeze',id:or.organizationId}}"></van-cell>
                </cc>
            </van-cell-group>
            <van-cell-group title="被冻结组织">
                <cc>
                    <van-cell v-for="or in organizations.freeze" :key="or.organizationId" :title="or.organizationName" is-link :to="{name:'organizationDetail',query:{type:'restore',id:or.organizationId}}"></van-cell>
                </cc>
            </van-cell-group>
    </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import post from "@/store/util";

export default {
    name: "auditOrganization",
    components:{
        navbar
    },
    data(){
        return {
            organizations: {
                audit:[],
                common: [],
                freeze: []
            }
        }
    },
    mounted() {
        this.loadData()
    },
    methods:{
        loadData(){
            this.organizations = {
                audit:[],
                common: [],
                freeze: []
            }
            post('organization/load',{},res=>{
                res.data.forEach(organ=>{
                    if (organ.status === '待审核') this.organizations.audit.push(organ)
                    if (organ.status === '有效') this.organizations.common.push(organ)
                    if (organ.status === '冻结') this.organizations.freeze.push(organ)
                })
            })
        }
    }
}
</script>

<style scoped>

</style>