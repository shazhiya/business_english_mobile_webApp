<template>
    <card style="width: 95%;margin: 10px auto; position: relative">
        <p style="padding: 0 15px">
            {{ note.noteContent }}
        </p>
        <div style="position: absolute; top: 5px; right: 5px" @click="deleteNoteItem">
            <van-icon name="delete-o"></van-icon>
        </div>
        <div style="border-top: 1px solid #EEEEEE" v-if="note.chapter&&!place">
            <div style="float: left;width: 60%; color: #409EFF; font-size: 12px;padding: 5px;overflow: hidden">笔记源自 {{note.chapter.curriculum.curriculumName}}->{{note.chapter.chapterName}}</div>
            <div style="float: right;width: 30%; color: red; font-size: 12px;padding: 5px;overflow: hidden; text-align: right" @click="goto()">
                前往该章节
            </div>
        </div>
        <div style="border-top: 1px solid #EEEEEE" v-if="place==='chapter'">
            <div style="float: left;width: 60%; color: #409EFF; font-size: 12px;padding: 5px;overflow: hidden">笔记源自 {{note.notepad.title}}</div>
            <div style="float: right;width: 30%; color: red; font-size: 12px;padding: 5px;overflow: hidden; text-align: right" @click="goto()">
                打开笔记本
            </div>
        </div>
    </card>
</template>

<script>
import post from "@/store/util";

export default {
    name: "noteItem",
    props: ['note','place'],
    methods: {
        goto(){
            if (this.place==='chapter'){
                this.$router.push({
                    name: 'noteItems',
                    query: {
                        npId: this.note.notepad.notepadId
                    }
                })
            }else {
                this.$router.push({
                    name: 'learning',
                    params:{
                        selectedChapterId: this.note.chapter.chapterId
                    }
                })
            }
        },
        deleteNoteItem() {
            post('note/garbage',{
                noteId: this.note.noteId,
                status: 'garbage'
            },()=>{
                this.$parent.$parent.loadNotes()
            })
        }
    }
}
</script>

<style scoped>

</style>