<template>
    <div>
        <navbar title="权限管理" style="padding: 15px 0">
            <template #right><p></p></template>
            <template #default>
                <van-cell-group title="角色权限管理">
                    <cc>
                        <div style="position: relative" v-for="role in roles" :key="role.roleName">
                            <div style="position: absolute; top: 5px; right: 5px" @click="delRole(role.roleId)">
                                <van-icon name="delete-o"></van-icon>
                            </div>
                            <van-row style="padding: 10px; border-bottom: 1px #dddddd solid">
                                <van-col span="7">
                                    <van-tag size="large" :color="role.tagColor" style="margin: 10px">
                                        {{ role.roleName }}
                                    </van-tag>
                                </van-col>
                                <van-col span="14" offset="1">
                                    <van-tag v-for="security in role.securities" :key="security.securityName" plain style="margin: 10px 5px" closeable @close="removeSecurity(role.roleId,security.securityId)">
                                        {{ security.securityName }}
                                    </van-tag>
                                    <van-tag style="margin: 10px 5px;" mark type="primary">
                                        <div style="padding: 0 10px" @click="currentRole=role.roleId,selectSecurity=true">
                                            编辑权限
                                        </div>
                                    </van-tag>
                                </van-col>
                            </van-row>
                        </div>

                        <van-button style="width: 100%; border: none; background:none; margin: 10px 0" size="mini" @click="openAddRole">
                            添加角色
                        </van-button>
                    </cc>
                </van-cell-group>

                <van-cell-group title="成员角色分配配">
                    <cc>
                        <van-cell v-for="uro in members" :key="uro.user.userId" :title="uro.user.userName" @click="currentUser=uro.user.userId,selectRole=true">
                            <template #default>
                                <van-tag :color="uro.role.tagColor||'green'" v-if="uro.role">{{uro.role.roleName}}</van-tag>
                            </template>
                        </van-cell>
                    </cc>
                </van-cell-group>

            </template>
        </navbar>

        <van-action-sheet
                v-model="selectSecurity"
                :actions="securities"
                cancel-text="取消"
                close-on-popstate
                description="分配权限"
                @select="clickSecurity"
                @open="open"
                @close="close"
        />

        <van-action-sheet
            v-model="selectRole"
            :actions="aroles"
            cancel-text="取消"
            close-on-popstate
            description="分配角色"
            @select="clickRole"
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
                organizationId: this.$route.query.organizationId || 1
            },
            selectSecurity: false,
            selectRole: false,
            addRole: false,
            roleName: '',
            tagColor: '',
            currentRole: '',
            currentUser: '',
            securities: this.$store.state.allSecurity.map(sec => {
                return {
                    name: sec.securityName,
                    securityId: sec.securityId
                }
            }),
            aroles: [],
            members:[]
        }
    },
    methods: {
        removeSecurity(roleId, securityId) {
            this.delSecurity(roleId, securityId).then(() => this.loadTheOrganization())
        },
        clickSecurity(action) {
            if (action.color) this.delSecurity(this.currentRole, action.securityId).then(() => this.$set(action, 'color', !action.color ? 'red' : undefined))
            else this.addSecurity(this.currentRole, action.securityId).then(() => this.$set(action, 'color', !action.color ? 'red' : undefined))
        },
        openAddRole() {
            this.addRole = true
        },
        clickRole(action){
            post('organization/assignRole',{user:{userId: this.currentUser},organization:{organizationId:this.organization.organizationId},role:{roleId:action.role.roleId}},()=>{
                this.$notify({message:"操作成功",type:'success'})
                this.loadTheOrganization()
            })
        },
        createRole(action, done) {
            if (action === 'confirm') {
                post('organization/updateRole/addRole'
                    , {
                        organization: {organizationId: this.organization.organizationId},
                        role: {roleName: this.roleName, tagColor: this.tagColor}
                    }
                    , res => {
                        if (res.data) {
                            this.$notify({type: 'success', message: '添加成功'})
                            this.loadTheOrganization()
                            done()
                        }
                    })
            } else {
                done()
            }
        },
        loadTheOrganization() {
            resolvedPost('organization/load', {organizationId: this.organization.organizationId, status: '有效'})
                .then(res => {
                    this.organization = res[0]
                    this.aroles = this.organization?.uros.filter(uro=>!uro.user).map(uro=>{
                        return {
                            name: uro.role.roleName,
                            role: uro.role
                        }
                    })
                    this.members = this.organization?.uros.filter(uro=>uro.user&&uro.status!=="拒绝")
                })
        },
        open() {
            let has = this.organization.uros.find(uro => uro.role?.roleId === this.currentRole).role.securities
            this.securities.forEach(security => {
                if (has.some(h => h.securityId === security.securityId)) this.$set(security, 'color', 'red')
                else this.$set(security, 'color', undefined)
            })
        },
        close() {
            this.loadTheOrganization()
        },
        addSecurity(roleId, securityId) {
            return post('organization/updateRole/addSecurityToRole', {role: {roleId, securities: [{securityId}]}})
        },
        delSecurity(roleId, securityId) {
            return post('organization/updateRole/delSecurityToRole', {role: {roleId, securities: [{securityId}]}})
        },
        delRole(roleId) {
            this.$dialog
                .confirm({message:'确认删除角色？'})
                .then(()=>{
                    post('organization/updateRole/delRole', {role: {roleId}})
                        .then(() => this.loadTheOrganization())
                })
                .catch(()=>{})
        }
    },
    mounted() {
        this.loadTheOrganization()
    },
    computed: {
        roles() {
            return this.organization?.uros?.filter(uro => !uro.user).map(uro => uro.role)
        }
    }
}
</script>

<style scoped>

</style>