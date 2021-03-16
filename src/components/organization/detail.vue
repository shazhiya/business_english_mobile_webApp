<template>
    <navbar :title="organization.organizationName" style="padding-bottom: 30px" v-if="organization">
        <template #right>
            <p></p>
        </template>

        <template #default>
            <van-cell-group title="组织创建者">
                <userSmallCard :user="organization.creator"/>
            </van-cell-group>
            <van-cell-group title="基本信息">
                <cc>
                    <van-field label="组织名称" readonly v-model="organization.organizationName"></van-field>
                    <van-field label="简介" type="textarea" autosize readonly v-model="organization.organizationDescription"></van-field>
                    <van-field label="联系电话" readonly v-model="organization.phone"></van-field>
                </cc>
            </van-cell-group>
            <van-cell-group title="认证材料">
                <cc>
                    <van-image
                        v-for="img in organization.data"
                        :key="img"
                        width="100%"
                        :src="src + img"
                        radius="8px"
                    />
                </cc>
            </van-cell-group>

            <div v-if="type==='audit'">
                <van-button type="primary" style="width: 95%; margin: auto; display: block;">
                    审核通过
                </van-button>
                <van-button type="danger" style="width: 95%; margin:10px auto; display: block;">
                    审核不通过
                </van-button>
            </div>

            <div v-if="type==='freeze'">
                <van-button type="danger" style="width: 95%; margin:10px auto; display: block;">
                    冻结该组织
                </van-button>
            </div>

        </template>

    </navbar>
</template>

<script>
import userSmallCard from "component/user/userSmallCard";
import post from "@/store/util";
export default {
    name: "detail",
    components:{userSmallCard},
    data(){
        return {
            type: this.$route.params.type|| 'display',
            organizationId: this.$route.params.id,
            organization: undefined
        }
    },
    created() {
        post('organization/load',{organizationId: this.organizationId},res=>{
            this.organization = res.data[0]
            this.organization.data = this.organization.data.split(';')
        })
    }
}
</script>

<style scoped>

</style>