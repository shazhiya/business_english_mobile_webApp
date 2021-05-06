<template>
    <div class="div">
        <el-row type="flex" justify="space-between" :gutter="30">
            <el-col :span="6">
                <h2 class="title-3d">基于webApp商务英语的移动端微课系统</h2>
            </el-col>
            <el-col :xs="15" :md="17">
                <div>
                    <h2 class="menu" @click="go(`organizationManager`)">组织管理</h2>
                </div>
                <div>
                    <h2 class="menu" @click="go('courseManager-admin')">课程管理</h2>
                </div>
                <div>
                    <h2 class="menu" @click="go('userManager')">用户管理</h2>
                </div>
            </el-col>
            <el-col :xs="3" :md="1">
                <el-avatar
                    shape="square"
                    :size="32"
                    :fit="'contain'"
                    :src="src + $store.state.myself.userHeadicon"
                    v-popover:popover
                ></el-avatar>
            </el-col>
        </el-row>

        <el-popover ref="popover" placement="bottom" width="300" trigger="click">
            <show :info='$store.state.myself'>
                <div slot="funcs">
                    <el-button type="primary" @click="$router.push({name:'login'})">登出</el-button>
                    <el-button type="primary">消息通知</el-button>
                </div>
            </show>
        </el-popover>
    </div>
</template>

<script>
import map from '../../funcMapToName'
import show from '../userManager/userCardShow'

export default {
    data() {
        return {
            drawer: false,
            direction: 'ltr',
            url: require('asset/ico.jpg')
        }
    },
    components: {show},
    methods: {
        judge(name) {
            return map(name)
        },
        go(name){
            this.$router.push({name})
        }
    }
}
</script>

<style scoped>
.title-3d {
    color: #fafafa;
    white-space: nowrap;
    padding-top: 15px;
    letter-spacing: 0;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
    0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
    0px 8px 7px #001135;
}
.menu{
    padding-top: 8px;
    margin-right: 20px;
    float: right;
    color: #EEEEEE;
    border-bottom: 3px aqua solid;
}
.div >>> button {
    margin-top: 20px;
    float: right;
}

.div >>> span {
    margin-top: 20px;
}
</style>