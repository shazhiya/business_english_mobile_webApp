<template>
    <div>
        <el-card style="margin-bottom: 15px">
            <el-page-header :content="'课程管理' + (show?' >> '+show:'')" @back="$router.back()" title="返回"></el-page-header>
        </el-card>
        <el-row :gutter="15">
            <el-col :span="4">
                <el-card>
                    <el-menu style="border: none" menu-trigger="">
                        <el-menu-item @click="show = '所有课程'"><i class="el-icon-s-grid"></i>所有课程</el-menu-item>
                        <el-menu-item @click="show = '创建课程'"><i class="el-icon-circle-plus-outline"></i>创建课程</el-menu-item>
                        <el-menu-item @click="show = '审核通过'"><i class="el-icon-check"></i>审核通过</el-menu-item>
                        <el-menu-item @click="show = '审核驳回'"><i class="el-icon-close"></i>审核驳回</el-menu-item>
                        <el-menu-item @click="show = '待修改提交'"><i class="el-icon-edit"></i>待修改提交</el-menu-item>
                    </el-menu>
                </el-card>
            </el-col>
            <el-col :span="20">
                <el-card>
                    <all v-if="show == '所有课程'" :show='true' :key="1"></all>
                    <create v-if="show == '创建课程'" ></create>
                    <all v-if="show == '审核通过'" :type="'passed'" :key="11"></all>
                    <all v-if="show == '审核驳回'" :type="'rejected'" :key="111"></all>
                    <all v-if="show == '待修改提交'" :type="'saveTemporarily'" :key="1111"></all>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import all from './allCourse'
import create from './createCourse'

export default {
    data() {
        return {
            show: '所有课程'
        }
    },
    methods: {},
    components: {
        all, create
    }
}
</script>

<style>
</style>