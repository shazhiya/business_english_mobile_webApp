<template>
    <navbar
        title="创建班级"
        style="padding: 0 0 10px 0"
    >
        <template #right>
            <van-icon name="records" size="22"/>
        </template>
        <template #default>
            <!--cover-->
            <card width="95%" style="margin-top: 10px; padding-top: 20px">
                <van-row gutter="20">
                    <van-col span="8" class="tr">
                        班级图标
                    </van-col>
                    <van-col span="16">
                        <van-uploader v-model="clazz.clazzLogo" max-count="1" :after-read="afterRead"/>
                    </van-col>
                </van-row>
            </card>

            <cc>
                <van-field type="text" label="班级名称" v-model="clazz.clazzName" placeholder="班级名称"></van-field>
                <van-field type="textarea" autosize v-model="clazz.clazzDescription" placeholder="描述班级基本情况" label="班级简介"></van-field>
            </cc>

            <van-cell-group title="课程">

                <van-swipe-cell :right-width="65" v-for="course in beSelectedCourse" :key="course.curriculumId">
                    <template>
                        <myCourseItem :course="course" :show-toolbar="false"></myCourseItem>
                    </template>
                    <template #right>
                        <van-button type="danger" :loading="false" style="height: 100%" @click="remove(course)">
                            移除
                        </van-button>
                    </template>
                </van-swipe-cell>
                <van-button style="background:#FFFFFF; color: black; border: none" round size="mini" class="button" :loading="false" @click="show=true">
                    添加课程
                </van-button>
            </van-cell-group>

            <van-button type="primary" round class="button" :loading="false" @click="createClass">
                创建班级
            </van-button>

            <van-action-sheet
                v-model="show"
                :actions="actions"
                cancel-text="取消"
                @select="select"
            />
        </template>
    </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import myCourseItem from "component/course/courseItem";
import resolvedPost from "@/store/ResovePost";
import uploadFile from "@/network/uploadFile";
import post from "@/store/util";
export default {
    components: {navbar,myCourseItem},
    data() {
        return {
            clazz:{
                clazzLogo: [],
                clazzName: '',
                clazzDescription:'',
                ccs:[]
            },
            show: false,
            actions: []
        }
    },
    methods: {
        afterRead(file) {
            uploadFile(file.file,'courseCover',{})
                .then((res)=>{
                    file.status= 'done'
                    this.clazz.clazzLogo[0].src = res.data.msg
                })
        },
        select(item){
            this.$set(item,'disabled',true)
            this.clazz.ccs.push({curriculum:{curriculumId:item.curriculumId}})
        },
        remove(course){
            this.$delete(this.clazz.ccs,this.clazz.ccs.findIndex(cc=>cc.curriculum.curriculumId===course.curriculumId))
            course.disabled = false
        },
        createClass(){
            post('class/save',{
                clazzId: this.clazz.clazzId,
                clazzName:this.clazz.clazzName,
                clazzDescription: this.clazz.clazzDescription,
                clazzLogo: this.clazz.clazzLogo[0].src,
                ccs: this.clazz.ccs,
                organization:{
                    organizationId: this.$route.query.organizationId
                },
                status: 'enabled'
            },()=>{
                this.$router.back()
            })
        }
    },
    beforeMount() {
        resolvedPost('curriculum/load',{organization:{organizationId:this.$route.query.organizationId||8}})
        .then(res=>{
            res.forEach(curriculum=>{
                curriculum.name = curriculum.curriculumName
            })
            this.actions = res
        })
    },
    computed:{
        beSelectedCourse(){
            return this.actions.filter(action=>this.clazz.ccs.some(cc=>cc.curriculum.curriculumId===action.curriculumId))
        }
    }
}
</script>

<style scoped>
.tr {
    /*text-align: right;*/
    padding-left: 16px;
    /*font-size: 22px;*/
}

.button {
    width: 95%;
    margin: 10px auto 10px;
    display: block;
}
</style>