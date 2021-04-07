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
                    <div v-if="currentWareType==='img' && currentCoursewareId" style="height: 100%; width: 100%; border-radius: 5px">
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
                                <coursewareItem v-for="ware in currentChapter.coursewares" @click="display" :key="ware.coursewareId" :ware='ware'/>
                            </div>
                        </cc>
                    </van-cell-group>

            </template>

        </navbar>
        <van-action-sheet v-model="show" :actions="chapters" close-on-click-action @select="onSelect"/>
        <van-sticky :offset-top="46" style="margin-top: 50px">
            <van-tabs v-model="active" swipeable>
                <van-tab title="评论">
                   <div class="remainHeight">
                       <p>1</p>
                       <p>2</p>
                       <p>3</p>
                       <p>4</p>
                       <p>5</p>
                       <p>6</p>
                       <p>7</p>
                       <p>8</p>
                       <p>9</p>
                       <p>10</p>
                       <p>11</p>
                       <p>12</p>
                       <p>13</p>
                       <p>14</p>
                       <p>15</p>
                       <p>16</p>
                       <p>17</p>
                       <p>18</p>
                       <p>19</p>
                       <p>20</p>
                   </div>
                </van-tab>
                <van-tab title="探讨">
                    <div class="remainHeight"></div>
                </van-tab>
                <van-tab title="解惑">
                    <div class="remainHeight"></div>
                </van-tab>
                <van-tab title="笔记">
                    <div class="remainHeight"></div>
                </van-tab>
                <van-tab title="课后习题">
                    <div class="remainHeight">
                        <cc>
                            <taskItem></taskItem>
                        </cc>
                    </div>
                </van-tab>
            </van-tabs>
        </van-sticky>
    </div>
</template>

<script>
import navbar from "component/card/navbar";
import coursewareItem from './coursewareItem'
import taskItem from "component/task/taskItem";
import resolvedPost from "@/store/ResovePost";
export default {
    components: {
        navbar,coursewareItem,taskItem
    },
    data(){
        return {
            active: 0,
            show: false,
            showImg:false,
            chapters: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
            curriculumId: this.$route.query.curriculumId||3,
            classId: this.$route.query.classId||0,
            curriculum:{},
            currentChapter:{},
            currentCourseware:{}
        }
    },
    methods:{
        onSelect(action){
            this.changeChapter(action)
        },
        changeChapter(action){
            this.currentChapter = this.curriculum?.chapters?.find(cha=>cha.chapterId===action.chapterId)
            this.changeCourseware(this.currentChapter?.coursewares[0])
        },
        changeCourseware(ware){
            this.currentCourseware = this.currentChapter.coursewares?.find(wa=>wa.coursewareId==ware.coursewareId)||{}
        },
        display(wareItem){
            this.currentCourseware = wareItem
        },
        distinguishFileType(postfix){
            if (['png','jpg'].some(ps=>ps===postfix))
                return 'img'
            if (['mp4','exe'].some(ps=>ps===postfix))
                return 'video'
            if (['mp3'].some(ps=>ps===postfix))
                return 'audio'
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
            return this.src + 'file/inline/download/'+ this.currentCourseware.ware?.coursewareId
        },
        currentCoursewareId(){
            return this.currentCourseware.ware?.coursewareId
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
                this.changeChapter(this.chapters?.[0])
            })
    }
}
</script>

<style scoped>
.remainHeight{
    height: calc(100vh - 90px);
    overflow: scroll;
}
</style>