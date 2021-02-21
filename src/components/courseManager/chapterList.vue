<template>
    <div>
        <el-divider content-position="right">chapters</el-divider>
        <el-collapse>
            <chapter v-for="chapter in chapters" :key="chapter.chapterName" :chapter="chapter"></chapter>
        </el-collapse>
        <el-button type="primary" @click="addChapter">添加章节</el-button>
    </div>
</template>

<script>
import chapter from './chapter.pc'

export default {
    components: {
        chapter
    },
    props: ["chapters"],
    methods: {
        addChapter() {
            this.chapters.push({coursewares: []});
        }
    }
}
</script>

<style scoped>
div >>> button {
    width: 100%;
}
</style>