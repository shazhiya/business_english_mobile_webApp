<template>
    <div>
        <user-small-card class="topCard" :user="$store.getters.myself"/>

        <card width="95%" style="margin-top: 10px">
            <van-row>
                <van-col v-for="(counter,i) in counterBar" :key="i" span="8">
                    <big-number :name="counter.name" :number="counter.number"/>
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
            <transition name="van-slide-left">
                <div v-show="flag">
                    <van-cell-group :title="organ.organizationName" style="">
                        <van-cell title="发布课程" v-if="judgeSecurity(organ,'发布课程')" is-link :to="{name:'publishCourse',query:{organizationId: organ.organizationId}}"/>
                        <van-cell title="创建班级" v-if="judgeSecurity(organ,'创建班级')" is-link :to="{name:'createClazz',query:{organizationId: organ.organizationId}}"/>
                        <van-cell title="布置作业" v-if="judgeSecurity(organ,'布置作业')" is-link :to="{name:'assignTask',query:{organizationId: organ.organizationId}}"/>
                        <van-cell title="课程管理" v-if="judgeSecurity(organ,'课程管理')" is-link :to="{name:'courseManager',query:{organizationId: organ.organizationId}}"/>
                        <van-cell title="权限管理" v-if="judgeSecurity(organ,'权限管理')" is-link :to="{name:'roleManager',query:{organizationId: organ.organizationId}}"/>
                        <van-cell title="成员管理" v-if="judgeSecurity(organ,'成员管理')" is-link :to="{name:'memberManager',query:{organizationId: organ.organizationId}}"/>
                        <van-cell title="班级管理" v-if="judgeSecurity(organ,'班级管理')" is-link :to="{name:'classManagerIndex',query:{organizationId: organ.organizationId}}"/>
                    </van-cell-group>
                    <div style="position: absolute; top: 9px; right: 9px;">
                        <van-tag :color="getMyRole(organ).tagColor?getMyRole(organ).tagColor:'green'">
                            {{ getMyRole(organ) ? getMyRole(organ).roleName : '' }}
                        </van-tag>
                    </div>
                </div>
            </transition>
        </card>

        <card width="95%" style="margin-top: 10px" v-if="$store.getters.myself.userId===1">
            <van-cell-group title="管理员">
                <van-cell title="组织管理" is-link :to="{name:'organizationManager'}"/>
                <van-cell title="用户管理" is-link :to="{name:'organizationManager'}"/>
                <van-cell title="课程管理" is-link :to="{name:'organizationManager'}"/>
                <van-cell title="上传课程" is-link :to="{name:'organizationManager'}"/>
            </van-cell-group>
        </card>
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
            myOrgans: [],
            flag: false
        }
    },
    components: {bigNumber, userSmallCard},
    mounted() {
        resolvedPost('organization/load', {
            uros: [{
                user: {
                    userId: this.$store.getters.myself.userId
                }
            }],
            status: '有效'
        }, res => {
            this.myOrgans = res
            setTimeout(()=>this.flag = true,0)
        })
    },
    methods: {
        logout() {
            this.$router.push({name: 'login'})
            this.$store.commit('reset')
        },
        getMyRole(organ) {
            return organ.uros.filter(uro => uro.user?.userId == this.$store.getters.myself.userId)[0]?.role || {}
        },
        judgeSecurity(organ, securityName) {
            return this.getMyRole(organ)?.securities.some(security => security.securityName === securityName)
        }
    },
    computed: {
        counterBar() {
            let result = []
            result.push({
                name: '消息',
                number: this.$store.getters.messages.length
            })
            result.push({
                name: '我的组织',
                number: this.myOrgans?.length
            })
            result.push({
                name: '通知',
                number: 0
            })
            return result.map(re => {
                return {
                    name: {
                        value: re.name,
                        size: '14px',
                        color: 'black'
                    },
                    number: {
                        value: re.number,
                        size: '24px',
                        color: 'black'
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.topCard {
    margin: 5px auto auto;
    background: linear-gradient(30deg, aqua, gray);
    transition: all 2s;
}
</style>