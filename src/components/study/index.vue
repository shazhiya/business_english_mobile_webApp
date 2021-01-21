<template>
  <div>
      <el-row :gutter="20">
          <el-col :span="18">
              <el-card>
                  <video :src="src+current" width="100%" controls="controls"></video>
              </el-card>
          </el-col>
          <el-col :span="6">
              <div class="menu">
                  <el-card>
                  <el-menu style="border:none">
                     <el-submenu v-for="chapter in course.chapters" :key="chapter.chapterId" :index='chapter.chapterId+""' >
                         <div slot="title" style="word-wrap: break-word; overflow: hidden; width:85%" :title="chapter.chaptername">{{chapter.chapterCode + ". "+ chapter.chaptername}}</div>
                         <el-menu-item v-for="video in chapter.coursewares" :key="video.coursewareId">
                             <div  @dblclick="current=video.coursewarePath">
                                 {{video.coursewareName}}
                             </div>
                         </el-menu-item>
                     </el-submenu>
                  </el-menu>
              </el-card>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    data(){
        return {
            current: '',
            course: this.$route.params.course
        }
    }
}
</script>

<style>
.menu>>>.el-card__body{
    padding-top:20px ;
}
</style>