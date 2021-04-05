<template>
    <navbar
        title="创建班级"
        style="padding: 0 0 10px 0"
    >
        <template #right>
            <van-icon name="records" size="22"/>
        </template>
        <template #default>
            <!--            cover-->
            <card width="95%" style="margin-top: 10px; padding-top: 20px">
                <van-row gutter="20">
                    <van-col span="8" class="tr">
                        班级图标
                    </van-col>
                    <van-col span="16">
                        <van-uploader v-model="clazz.logo" max-count="1" :after-read="afterRead"/>
                    </van-col>
                </van-row>
            </card>

            <van-cell-group title="课程">

                <van-swipe-cell :right-width="65">
                    <template>
                        <myCourseItem :show-toolbar="false"></myCourseItem>
                    </template>
                    <template #right>
                        <van-button type="danger" :loading="false" style="height: 100%">
                            移除
                        </van-button>
                    </template>
                </van-swipe-cell>
                <van-button style="background:#FFFFFF; color: black; border: none" round size="mini" class="button" :loading="false" @click="show=true">
                    添加课程
                </van-button>
            </van-cell-group>

            <van-button type="primary" round class="button" :loading="false">
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
export default {
    components: {navbar,myCourseItem},
    data() {
        return {
            clazz:{
                logo: []
            },
            show: false,
            actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' },{ name: '选项一' }, { name: '选项二' }, { name: '选项三' },{ name: '选项一' }, { name: '选项二' }, { name: '选项三' },{ name: '选项一' }, { name: '选项二' }, { name: '选项三' },{ name: '选项一' }, { name: '选项二' }, { name: '选项三' },{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
        }
    },
    methods: {
        afterRead() {
        },
        select(item){
            this.$set(item,'disabled',true)
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