<template>
    <div>
        <div>
            <el-input
                prefix-icon="el-icon-search"
                placeholder="search username"
                v-model="query"
                @blur="changeSearch"
                style="width: 50%"
            ></el-input>
            <el-select
                placeholder="select role"
                v-model="role"
                @change="changeRole"
                style="width: 25%"
            >
                <el-option label="all" value="null"></el-option>
                <el-option
                    v-for="role in $store.state.security.allRole"
                    :key="role.id"
                    :label="role.roleName"
                    :value="role.roleId"
                ></el-option>
            </el-select>
            <el-select
                placeholder="select status"
                v-model="enable"
                @change="changeEnable"
                style="width: 25%"
            >
                <el-option label="all" value="null"></el-option>
                <el-option label="enable" value="true"></el-option>
                <el-option label="disable" value="false"></el-option>
            </el-select>
        </div>
        <div class="cards">
            <div style="margin-top: 10px" v-for="user in userList" :key="user.userId">
                <card :info="user" :width="200">
                    <div slot="funcs" class="fl">
                        <el-row>
                            <el-col :span="24">
                                <el-button style="width: 100%;" type="primary" @click="updateUserEnable(user)">
                                    {{ user.userEnable ? "冻结用户" : "解冻用户" }}
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </card>
            </div>
        </div>

        <div class="margin:auto">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="start"
                :page-sizes="[8, 16, 12, 20, 32, 40]"
                :page-size="width"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                :pager-count="11"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import card from './userCard'

export default {
    data() {
        return {
            query: this.search,
            role: '',
            enable: ''
        }
    },
    props: ['start', 'width', 'search', 'total', 'pages', 'userList', 'callBacks'],
    components: {
        card
    },
    mounted() {
    },
    computed: {},
    methods: {
        handleSizeChange(v) {
            this.callBacks.sizeChange(v)
        },
        handleCurrentChange(v) {
            this.callBacks.currentChange(v)
        },
        changeSearch() {
            this.callBacks.searchChange(this.query)
        },
        changeRole() {
            this.callBacks.changeRole(this.role)
        },
        changeEnable() {
            this.callBacks.changeEnable(this.enable)
        },
        updateUserEnable(user) {
            this.back.post('security/setEnable', {userId: user.userId, userEnable: !user.userEnable})
                .then(res => {
                    if (res.data) {
                        user.userEnable = !user.userEnable
                        this.$message({message: 'success', type: 'success'})
                    } else {
                        this.$message({message: 'failed', type: 'error'})
                    }
                }).catch(err => {
                this.$message({message: 'failed: ' + err, type: 'error'})
            })
        }
    }
}
</script>

<style scoped>
.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>