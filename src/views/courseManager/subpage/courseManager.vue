<template>
    <navbar title="课程管理" style="padding-bottom: 20px">
        <van-cell-group title="审核通过课程">
            <cc>
                <course-item v-for="c in curriculums.filter(co=>co.curriculumStatus==='passed')" :course="c" :key="c.curriculumId">
                    <template>
                        <van-icon name="delete-o" size="20" @click.stop="deleteCourse(c.curriculumId)"></van-icon>
                        <van-icon name="edit" size="20" @click.stop="$router.push({name:'publishCourse',params: c,query:{organizationId:c.organization.organizationId}})"></van-icon>
                    </template>
                </course-item>
            </cc>
        </van-cell-group>
        <van-cell-group title="待审核课程">
            <cc>
                <course-item v-for="c in curriculums.filter(co=>co.curriculumStatus==='audited')" :course="c" :key="c.curriculumId">
                    <template>
                        <van-icon name="delete-o" size="20" @click.stop="deleteCourse(c.curriculumId)"></van-icon>
                        <van-icon name="edit" size="20" @click.stop="$router.push({name:'publishCourse',params: c,query:{organizationId:c.organization.organizationId}})"></van-icon>
                    </template>
                </course-item>
            </cc>
        </van-cell-group>
        <van-cell-group title="待修改课程">
            <cc>
                <course-item v-for="c in curriculums.filter(co=>co.curriculumStatus==='saveTemporarily')" :course="c" :key="c.curriculumId">
                    <template>
                        <van-icon name="delete-o" size="20" @click.stop="deleteCourse(c.curriculumId)"></van-icon>
                        <van-icon name="edit" size="20" @click.stop="$router.push({name:'publishCourse',params: c,query:{organizationId:c.organization.organizationId}})"></van-icon>
                    </template>
                </course-item>
            </cc>
        </van-cell-group>
    </navbar>
</template>

<script>
import resolvedPost from "@/store/ResovePost";
import courseItem from "component/course/courseItem";
import post from "@/store/util";
export default {
    name: "courseManager",
    components:{courseItem},
    data(){
        return {
            courses:[]
        }
    },
    beforeMount() {
        this.loadCourse()
    },
    computed:{
        curriculums(){
            return this.courses
        }
    },
    methods:{
        loadCourse(){
            resolvedPost("curriculum/load",{organization:{organizationId:this.$route.query.organizationId}})
                .then(res=>this.courses=res)
        },
        deleteCourse(cid){
            let _that = this
            this.$dialog.confirm({
                title:'删除课程',
                message:"确认删除？",
                beforeClose(action,done){
                    if (action==='confirm'){
                        return post('curriculum/change/dispose',{curriculumId:cid},()=>{
                            _that.loadCourse()
                            done();
                        })
                    }
                    done()
                    return
                }
            })
        }
    }
}
</script>

<style scoped>

</style>