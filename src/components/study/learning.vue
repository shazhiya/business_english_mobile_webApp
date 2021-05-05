<template>
    <div>
        <navbar :title="curriculum.curriculumName" @right="show=true">
            <template #right v-if="true">
                <p style="color: #409EFF">选择章节</p>
            </template>

            <template #default>
                <card style="width: 96%; margin-top: 5px; height: 250px; position: relative">
                    <video v-if="currentWareType==='video'" :src="currentSourceUrl" width="98%" height="98%" controls style="margin: 1%; border-radius: 6px">
<!--                        <source :src="currentSourceUrl">-->
                    </video>
                    <div v-if="currentWareType==='audio'" style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center">
                        <h2 style="text-align: center; width: 75%; height: 62px" class="van-multi-ellipsis--l2">
                            {{coursewareName}}
                        </h2>
                        <audio controls style="margin: auto; display: block;" :src="currentSourceUrl">

                        </audio>
                    </div>
                    <div v-if="currentWareType==='img'" style="height: 100%; width: 100%; border-radius: 5px">
                        <van-image width="100%" height="100%"
                                   :src="currentSourceUrl"
                                   fit="cover"
                                   @click="showImg=true"
                        />
                        <van-image-preview v-model="showImg" :images="[currentSourceUrl]" :show-index="false"></van-image-preview>
                    </div>

                    <div style="position: absolute; bottom: 4px; width: 100%">
                        <div style="background: rgba(10,10,10,0.5); color: #EEEEEE; font-size: 12px; padding: 0 10px;border-radius: 4px">
                            {{coursewareName}}
                        </div>
                    </div>
                </card>
                    <van-cell-group :title="currentChapter.chapterCode +' - '+ currentChapter.chapterName">
                        <cc>
                            <div>
                                <div style="padding: 5px; color: gray; font-size: 14px" class="van-ellipsis">
                                    {{currentChapter.chapterDescription}}
                                </div>
                                <van-divider></van-divider>
                                <coursewareItem v-for="ware in currentChapter.coursewares" @click="changeCourseware(ware)" :key="ware.coursewareId" :ware='ware'/>
                            </div>
                        </cc>
                    </van-cell-group>

            </template>

        </navbar>
        <van-action-sheet v-model="show" :actions="chapters" close-on-click-action @select="onSelect"/>
        <van-sticky :offset-top="46" style="margin-top: 50px">
            <van-tabs v-model="active" swipeable @change="changeTable">
                <van-tab title="评论">
                   <div class="remainHeight">
                       <allComment v-if="this.currentChapter.chapterId" :show-control="false" :show-sub="false" :type="'评论'" :chapterId="this.currentChapter.chapterId"></allComment>
                   </div>
                </van-tab>
                <van-tab title="探讨">
                    <div class="remainHeight">
                        <allComment v-if="this.currentChapter.chapterId" :show-control="false" :show-sub="true" :type="'讨论'" :chapterId="this.currentChapter.chapterId"></allComment>
                    </div>
                </van-tab>
                <van-tab title="笔记">
                    <div class="remainHeight" style="position: relative">
                        <note-item v-for="note in notes" :note="note" :key="note.noteId" :place="'chapter'"/>
                        <div style="position: absolute; bottom: 3vw; right: 3vw;" @click="showNotepad=true">
                            <van-button style="border-radius: 50px;" type="primary">
                                <van-icon name="edit"/>
                            </van-button>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="课后习题">
                    <div class="remainHeight">
                        <taskItem v-for="task in curriculum.tasks" :key="task.id" :task="task"/>
                    </div>
                </van-tab>
            </van-tabs>
        </van-sticky>
        <van-dialog v-model="showNotepad" title="请选择笔记本" :show-confirm-button="false" show-cancel-button>
            <van-cell v-for="notepad in notepads" :key="notepad.notepadId" :title="notepad.title" :title-style="{textAlign:'center',color:'red'}" @click="openEditor(notepad.notepadId)"/>
        </van-dialog>
        <van-dialog title="记笔记" v-model="showEditor" show-cancel-button :before-close="addNoteItem">
            <van-field v-model="noteItem" type="textarea" placeholder="记笔记"></van-field>
        </van-dialog>
    </div>
</template>

<script>
import navbar from "component/card/navbar";
import coursewareItem from './coursewareItem'
import taskItem from "component/task/taskItem";
import allComment from "component/communication/allComment";
import noteItem from "component/study/noteItem";
import resolvedPost from "@/store/ResovePost";
import post from "@/store/util";
export default {
    components: {
        navbar,coursewareItem,taskItem,allComment,noteItem
    },
    data(){
        return {
            active: 3,
            show: false,
            showImg:false,
            chapters: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
            curriculumId: this.$route.query.curriculumId||3,
            chapterIndex: this.$route.query.chapterIndex||0,
            classId: this.$route.query.classId||0,
            curriculum:{},
            currentChapter:{},
            currentCourseware:{},
            sourceSrc: '',
            showNotepad: false,
            notepads:[],
            showEditor: false,
            noteItem: '',
            notepadId: null,
            notes:[]
        }
    },
    methods:{
        changeTable(index){
            if (index===2) this.loadNotes()
        },
        onSelect(action){
            this.changeChapter(action)
        },
        changeChapter(action){
            this.currentChapter = this.curriculum?.chapters?.find(cha=>cha.chapterId===action.chapterId)
            this.changeCourseware(this.currentChapter?.coursewares[0])
        },
        changeCourseware(ware){
            this.currentCourseware = this.currentChapter.coursewares?.find(wa=>wa.coursewareId==ware.coursewareId)||{}
            this.sourceSrc = this.src + 'file/inline/download/'+ ware.coursewareId
        },
        distinguishFileType(postfix){
            if (['png','jpg'].some(ps=>ps===postfix))
                return 'img'
            if (['mp4','exe'].some(ps=>ps===postfix))
                return 'video'
            if (['mp3'].some(ps=>ps===postfix))
                return 'audio'
        },
        loadNotepads() {
            resolvedPost('note/loadNotepads', {user: this.$store.getters.myself})
                .then(data => {
                    this.notepads = data.filter(np=>np.status==='normal')
                })
        },
        openEditor(notepadId){
            this.notepadId = notepadId
            this.showNotepad = false
            this.showEditor = true
        },
        addNoteItem(action,done) {
            if (action==='cancel') {
                done()
                return
            }
            post('note/write',{
                notepad:{notepadId: this.notepadId},
                noteContent: this.noteItem,
                status: 'normal',
                chapter:{
                    chapterId: this.currentChapter.chapterId
                }
            },()=>{
                done()
                this.loadNotes()
                this.showDialog = false
            })
        },
        loadNotes(){
            resolvedPost('note/loadNotes',{
                user:this.$store.getters.myself,
                chapter:{chapterId: this.currentChapter.chapterId}
            }).then(data=>{
                this.notes = data?.filter(note=>note.status==='normal')
            })
        }
    },
    computed:{
        currentWareType(){
            return this.currentCourseware.fileType
        },
        coursewareName(){
            return this.currentCourseware?.coursewareName?.split('.')[0]
        },
        currentSourceUrl(){
            return this.sourceSrc
        }
    },
    beforeMount() {
        resolvedPost('curriculum/load',{curriculumId:this.curriculumId})
            .then(res=>{
                this.curriculum = res?.[0]
                res[0]?.chapters.forEach(chapter=>{
                    chapter.coursewares.forEach(cw=>{
                        cw.fileType = this.distinguishFileType(cw.coursewareName.split('.')[cw.coursewareName.split('.').length-1])
                    })
                })
                this.chapters = this.curriculum?.chapters.map(chapter=>{
                    return {
                        name: chapter.chapterCode + '-' + chapter.chapterName,
                        chapterId: chapter.chapterId
                    }
                })
                let selectedChapterId = this.$route.params.selectedChapterId
                let displayedChapter = selectedChapterId?{chapterId:selectedChapterId}:this.chapters?.[this.chapterIndex]
                this.changeChapter(displayedChapter)
            })
        this.loadNotepads()
    }
}
</script>

<style scoped>
.remainHeight{
    height: calc(100vh - 90px);
    overflow: scroll;
}
</style>