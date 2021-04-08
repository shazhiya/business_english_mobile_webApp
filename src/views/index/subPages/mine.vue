<template>
    <div>
        <user-small-card class="topCard" :user="$store.getters.myself"/>

        <card width="95%" style="margin-top: 10px">
            <van-row>
                <van-col v-for="i in 4" :key="i" span="6">
                    <big-number/>
                </van-col>
            </van-row>
        </card>

      <card width="95%" style="margin-top: 10px">
        <van-cell-group title="通用">
          <van-cell title="编辑个人信息" :to="{name:'editProfile'}" :is-link="true"/>
          <van-cell title="我的笔记" :to="{name:'notePads'}" :is-link="true"/>
          <van-cell title="申请创办组织" :to="{name:'applyOrganization'}" :is-link="true"/>
        </van-cell-group>
      </card>
      <card width="95%" style="margin-top: 10px;position: relative;" v-for="organ in myOrgans" :key="organ.organizationId">
        <van-cell-group :title="organ.organizationName" style="">
<!--          <van-cell title="发布课程" v-if="judgeSecurity(organ,'发布课程')" is-link :to="{name:'publishCourse'}"/>-->
          <van-cell title="发布课程" is-link :to="{name:'publishCourse',query:{organizationId: organ.organizationId}}"/>
          <van-cell title="创建班级" is-link :to="{name:'createClazz',query:{organizationId: organ.organizationId}}"/>
          <van-cell title="布置作业" is-link :to="{name:'assignTask'}"/>
          <van-cell title="课程管理" is-link :to="{name:'courseManager',query:{organizationId: organ.organizationId}}"/>
          <van-cell title="权限管理" is-link :to="{name:'roleManager',query:{organizationId: organ.organizationId}}"/>
          <van-cell title="成员管理" is-link :to="{name:'memberManager',query:{organizationId: organ.organizationId}}"/>
          <van-cell title="班级管理" is-link :to="{name:'classManagerIndex',query:{organizationId: organ.organizationId}}"/>
        </van-cell-group>
        <div style="position: absolute; top: 9px; right: 9px;">
          <van-tag  :color="getMyRole(organ).tagColor?getMyRole(organ).tagColor:'green'">
              {{getMyRole(organ)?getMyRole(organ).roleName:''}}
          </van-tag>
        </div>
      </card>

      <card width="95%" style="margin-top: 10px">
        <van-cell-group title="管理员">
          <van-cell title="组织管理" is-link :to="{name:'organizationManager'}"/>
          <van-cell title="用户管理" is-link :to="{name:'organizationManager'}"/>
          <van-cell title="课程管理" is-link :to="{name:'organizationManager'}"/>
          <van-cell title="上传课程" is-link :to="{name:'organizationManager'}"/>
        </van-cell-group>
      </card>

<!--        <van-button style="margin: 10px auto auto;width:95%" round type="primary" block>主要按钮</van-button>-->
        <van-button style="margin: 10px auto 10px;width:95%" round type="danger" block @click="logout">登出</van-button>


    </div>
</template>

<script>
import userSmallCard from "component/user/userSmallCard";
import bigNumber from "component/mine/bigNumber";
import resolvedPost from "@/store/ResovePost";
export default {
    name: "mine",
    data() {
        return {
            myOrgans: null
        }
    },
    components:{bigNumber,userSmallCard},
    mounted() {
        resolvedPost('organization/load',{
        uros:[{
          user:{
            userId: this.$store.getters.myself.userId
          }
        }],
        status: '有效'
      },res=>{
        this.myOrgans = res
      })
    },
    methods:{
        logout(){
            this.$router.push({name:'login'})
            this.$store.commit('reset')
        },
        getMyRole(organ){
            return organ.uros.filter(uro=>uro.user?.userId == this.$store.getters.myself.userId)[0]?.role||{}
        },
        judgeSecurity(organ,securityName){
            return this.getMyRole(organ)?.securities.some(security=>security.securityName === securityName)
        }
    }
}
</script>

<style scoped>
.topCard{
    margin: 5px auto auto;
    background: linear-gradient(30deg,aqua,gray);
    transition: all 2s;
}
</style>