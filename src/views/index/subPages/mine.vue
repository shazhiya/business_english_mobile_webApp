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
      <card width="95%" style="margin-top: 10px" v-for="organ in myOrgans" :key="organ.organizationId">
        <van-cell-group :title="organ.organizationName">
          <van-cell title="发布课程" is-link :to="{name:'publishCourse'}"/>
          <van-cell title="创建班级" is-link :to="{name:'createClazz'}"/>
          <van-cell title="布置课程" is-link :to="{name:'assignTask'}"/>
        </van-cell-group>
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
        <van-button style="margin: 10px auto 10px;width:95%" round type="danger" block>登出</van-button>


    </div>
</template>

<script>
import userSmallCard from "component/user/userSmallCard";
import bigNumber from "component/mine/bigNumber";
import post from "@/store/util";
export default {
    name: "mine",
    data() {
        return {
            myOrgans: null
        }
    },
    components:{bigNumber,userSmallCard},
    mounted() {
      post('organization/load',{
        uros:[{
          user:{
            userId: this.$store.getters.myself.userId
          }
        }],
        status: '有效'
      },res=>{
        this.myOrgans = res.data
      })
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