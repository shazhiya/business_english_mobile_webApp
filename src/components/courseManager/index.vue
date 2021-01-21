<template>
  <div>
    <el-card style="margin-bottom: 15px">
      <el-page-header :content="$route.name + (show?' >> '+show:'')" @back="$router.back()" title="返回"> </el-page-header>
    </el-card>
    <el-row :gutter="15">
      <el-col :span="6">
        <el-card>
          <el-menu style="border: none">
            <el-menu-item @click="show = 'allCourse'">所有课程</el-menu-item>
            <el-menu-item @click="show = 'createCourse'">创建课程</el-menu-item>
            <el-menu-item @click="show = 'public'">已审核</el-menu-item>
            <el-menu-item @click="show = 'non-public'">未审核</el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
            <all v-if="show == 'allCourse'" :show='true'></all>
            <create v-if="show == 'createCourse'"></create>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import all from './allCourse'
import create from './createCourse'
export default {
  data(){
    return {
      show: 'allCourse'
    }
  },
  methods:{
   
  },
  components:{
    all,create
  }
}
</script>

<style>
</style>