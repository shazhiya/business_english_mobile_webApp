<template>
    <div>
        <navbar title="招贤纳士">
            <template #right><p></p></template>
            <template #default>
                <van-cell-group title="角色权限管理">
                    <cc>
                        <div style="position: relative" v-for="role in roles" :key="role.roleName">
                            <div style="position: absolute; top: 5px; right: 5px">
                                <van-icon name="delete-o"></van-icon>
                            </div>
                            <van-row style="padding: 10px; border-bottom: 1px #dddddd solid">
                                <van-col span="6">
                                    <van-tag size="large" :color="role.tagColor" style="margin: 10px">{{role.roleName}}</van-tag>
                                </van-col>
                                <van-col span="15" offset="1">
                                    <van-tag v-for="security in role.securities" :key="security.securityName" plain style="margin: 10px 5px" closeable @close="removeSecurity(role.roleId,security.securityId)">
                                        {{security.securityName}}
                                    </van-tag>
                                    <van-tag style="margin: 10px 5px;" type="primary">
                                        <div style="padding: 0 10px" @click="selectSecurity=true,currentRole=role.roleId">选择</div>
                                    </van-tag>
                                </van-col>
                            </van-row>
                        </div>

                        <van-button style="width: 100%; border: none; background:none; margin: 10px 0" size="mini" @click="openAddRole">
                            添加角色
                        </van-button>
                    </cc>
                </van-cell-group>

                <van-cell-group title="成员角色审配">
                    <cc>
                        <div style="position: relative">
                            <van-row>
                                <van-col span="6">
                                    <van-tag size="large" style="margin: 10px">教师</van-tag>
                                </van-col>
                                <van-col span="15" offset="1">
                                    <van-tag plain style="margin: 10px 5px" closeable @close="removeSecurity()">招贤纳士
                                    </van-tag>
                                    <van-tag style="margin: 10px 5px;" type="primary">
                                        <div style="padding: 0 10px" @click="selectSecurity=true">选择</div>
                                    </van-tag>
                                </van-col>
                            </van-row>
                            <div style="position: absolute; top: 0; right: 0">
                                <van-icon name="delete-o"></van-icon>
                            </div>
                        </div>

                        <van-button style="width: 100%; border: none; background:none;" size="mini"
                                    @click="openAddRole">
                            添加角色
                        </van-button>
                    </cc>
                </van-cell-group>

            </template>
        </navbar>

        <van-action-sheet
            v-model="selectSecurity"
            :actions="actions"
            cancel-text="取消"
            close-on-popstate
            description="分配权限"
            @select="clickSecurity"
            @open="open"
            @close="close"
        />

        <van-dialog
            title="添加角色"
            v-model="addRole"
            show-cancel-button
            :before-close="createRole"
        >
            <van-field v-model="roleName" label="角色名" placeholder="角色名"></van-field>
            <van-field v-model="tagColor" label="标签颜色" type="color"></van-field>
        </van-dialog>

    </div>
</template>

<script>
import resolvedPost from "@/store/ResovePost";
import post from "@/store/util";

export default {
    name: "recruit",
    data() {
        return {
            organization: {
                organizationId: this.$route.params.organizationId||1
            },
            selectSecurity: false,
            addRole: false,
            roleName: '',
            tagColor: '',
            currentRole: '',
            actions: this.$store.state.allSecurity.map(sec=>{return {
                name: sec.securityName,
                securityId: sec.securityId
            }})
        }
    },
    methods: {
        removeSecurity(roleId,securityId) {
            console.log(roleId,securityId)
        },
        clickSecurity(action) {
            this.$set(action, 'color', !action.color ? 'red' : undefined)
            this.addSecurity(this.currentRole,action.securityId)
        },
        openAddRole() {
            this.addRole = true
        },
        createRole(action, done) {
            if (action==='confirm'){
                post('organization/updateRole/addRole'
                    ,{organization: {organizationId:this.organization.organizationId},role: {roleName:this.roleName,tagColor:this.tagColor}}
                        ,res=>{
                        if (res.data){
                            this.$notify({type:'success',message:'添加成功'})
                            this.loadTheOrganization()
                            done()
                        }
                    })
            }else {
                done()
            }
        },
        loadTheOrganization(){
            resolvedPost('organization/load',{organizationId:this.organization.organizationId,status:'有效'},)
            .then(res=>{
                this.organization = res[0]
            })
        },
        open(){},
        close(){

        },
        addSecurity(roleId,securityId){
            return post('organization/updateRole/addSecurityToRole',{role:{roleId,securities:[{securityId}]}})
            .then(res=>{
                console.log(res)
            })
        }
    },
    mounted(){
        this.loadTheOrganization()
    },
    computed:{
        roles(){
            return this.organization?.uros?.filter(uro=>!uro.user).map(uro=>uro.role)
        }
    }
}
</script>

<style scoped>

</style>