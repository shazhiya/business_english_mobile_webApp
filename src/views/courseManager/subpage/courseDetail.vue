<template>
    <div>
        <navbar
            title="课程详情"
            style="position: relative"
        >
            <template #right>
                <van-icon name="setting-o" size="20px"/>
            </template>

            <template #default>
                <div style="padding: 5px; overflow: hidden;">
                    <van-image
                        width="100%"
                        height="150px"
                        radius="10px"
                        src="https://img01.yzcdn.cn/vant/cat.jpeg"
                        fit="cover"
                    />
                </div>

                <van-cell-group title="课程信息">
                    <van-cell title="课程名" value="啦啦啦"/>
                    <van-cell title="简介" value="kissshot acerolaorion HeartUnderBlade"/>
                </van-cell-group>

                <van-cell-group title="课程讲师">
                    <userSmallCard/>
                </van-cell-group>

                <van-cell-group title="课程评分">
                    <card style="width: 95%; margin: auto">
                        <van-row gutter="10">
                            <van-col span="6">
                                <big-number
                                    :name="{color: 'black',value:'总评分',size:'16px'}"
                                    :number="{color: 'red',value:'99.6',size:'24px'}"
                                />
                            </van-col>
                            <van-col span="6">
                                <big-number
                                    :name="{color: 'black',value:'评分人数',size:'16px'}"
                                    :number="{color: 'black',value:'22244',size:'24px'}"
                                />
                            </van-col>
                            <van-col span="12">
                                <big-number
                                    :name="{color: 'black',value:'我的评分',size:'16px'}"
                                    :number="{color: 'gray',value:'未参与评分',size:'20px'}"
                                />
                            </van-col>
                        </van-row>
                    </card>
                </van-cell-group>

                <van-cell-group title="目录">
                    <card style="width: 95%; margin: auto">
                        <van-cell title="章节1" value="章节名" label="章节描述章节描述章节描述章节描述章节描述章节描述" is-link/>
                        <van-cell title="章节1" value="章节名" label="章节描述" is-link/>
                        <van-cell title="章节1" value="章节名" label="章节描述" is-link/>
                        <van-button color="#FFFFFF" class="button" size="mini" round :loading="false">
                            <p style="color: black">展示更多....</p>
                        </van-button>
                    </card>
                </van-cell-group>

                <van-button type="primary" :loading="false" class="button" round @click="todo">
                    {{ false ? "订阅课程" : "进入学习" }}
                </van-button>

                <van-cell-group title="课程评论">
                    <comment/>
                    <van-button color="#FFFFFF" size="mini" round :loading="false" class="button"
                                @click="gotoAllComment">
                        <p style="color: black">更多评论.....</p>
                    </van-button>
                </van-cell-group>

            </template>
        </navbar>
    </div>
</template>

<script>
import navbar from "component/card/navbar";
import userSmallCard from "component/user/userSmallCard";
import bigNumber from "component/mine/bigNumber";
import comment from "component/communication/comment";

export default {
    name: "courseDetail",
    components: {
        navbar, userSmallCard, bigNumber, comment
    },
    data() {
        return {
            showPopover: true,
            actions: [{text: '选项一'}, {text: '选项二'}, {text: '选项三'}],
        }
    },
    methods: {
        gotoAllComment() {
            this.$router.push({name: 'allComment'})
        },
        todo() {
            this.$router.push({name:'learning'})
        }
    }
}
</script>

<style scoped>

.button {
    width: 95%;
    margin: 10px auto 0;
    display: block;
}
</style>