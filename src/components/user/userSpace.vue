<template>
    <div>
        <common-nav :title="$route.params.userName + '的空间'" @right="showSheet=true" style="padding-bottom: 10px">
            <template #default>
                <card
                    width="95%"
                    class="topCard"
                >
                    <van-row>
                        <van-col span="6" class="avatar">
                            <van-image
                                width="64"
                                height="64"
                                radius="12"
                                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                                style="margin: 5px 0 0 5px"
                            />
                        </van-col>
                        <van-col span="16">
                            <p class="username">Ichijo Hotaru</p>
                            <p class="desc van-multi-ellipsis--l2">kissshot Acerolaorion HeartUnderBlade. kissshot
                                Acerolaorion HeartUnderBlade.</p>
                        </van-col>
                    </van-row>
                </card>


                <card v-if="isPublic" width="95%" style="margin-top: 10px">
                    <van-cell-group title="基本信息">
                        <van-cell title="真实姓名" value="刹枝"/>
                        <van-cell title="电子邮箱" value="2691032513@qq.com"/>
                        <van-cell title="出生日期" value="2016/1/1"/>
                        <van-cell title="性别" value="van"/>
                    </van-cell-group>
                </card>

                <card v-if="isPublic" width="95%" style="margin-top: 10px">
                    <van-cell-group title="基本信息">
                        <van-cell title="真实姓名" value="刹枝"/>
                        <van-cell title="电子邮箱" value="2691032513@qq.com"/>
                        <van-cell title="出生日期" value="2016/1/1"/>
                        <van-cell title="性别" value="van"/>
                    </van-cell-group>
                </card>


                <card v-else width="95%" style="margin-top: 10px">
                    <p style="text-align: center;">
                        <span><van-icon name="warning-o" color="red" size="22px"/></span>
                        该用户未公开个人信息
                    </p>
                </card>

                <van-button type="primary" :loading="false" round class="button">
                    发起会话
                </van-button>

                <van-button :type="isContact?'danger':'primary'" :loading="false" round class="button">
                    {{ isContact ? '移除联系人' : '添加到联系人' }}
                </van-button>

            </template>

            <div slot="right">
                <van-icon name="ellipsis"/>
            </div>
        </common-nav>

        <van-action-sheet v-model="showSheet" :actions="actions"  close-on-click-action/>
    </div>
</template>

<script>
import commonNav from "component/card/navbar";

export default {
    name: "userSpace",
    components: {
        commonNav
    },
    data() {
        return {
            showSheet: false,
            actions: [
                {name: '着色选项', color: '#ee0a24'},
                {name: '禁用选项', disabled: true},
                {name: '加载选项', loading: true}
            ],
            isPublic: this.$route.params.showDefault ? this.$route.params.showDefault : true,
            isContact: this.$route.params.showDefault ? this.$route.params.showDefault : true,
        }
    }
}
</script>

<style scoped>
.topCard {
    margin: 5px auto auto;
    /*background: linear-gradient(30deg, aqua, gray);*/
    transition: all 2s;
}

.username {
    font-size: 30px;
    font-weight: bold;
    margin: 5px 0 0 0;
}

.avatar {
    margin-top: 5px;
}

.desc {
    margin: 5px 0;
}

.button {
    width: 95%;
    margin: 10px auto 0;
    display: block;
}
</style>