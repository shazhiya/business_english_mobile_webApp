<template>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="loadCourses"
            offset="300"
        >
            <van-row v-for="(row, index) in list" :key="index">
                <van-col span="12" v-for="clazz in row" :key="clazz.clazzId">
                    <class-card :clazz="clazz">

                    </class-card>
                </van-col>
            </van-row>
        </van-list>
    </van-pull-refresh>
</template>

<script>
import classCard from './classCard'

export default {
    props: ["type","classes"],
    components: {classCard},
    data() {
        return {
            list: [],
            pageSize: 10,
            loading: false,
            finished: false,
            refreshing: false,
            error: false,
        };
    },
    methods: {
        loadCourses(reverse) {
            this.$store.dispatch("course_base/search", {
                index: Math.ceil(this.$store.getters['course_base/coursesSize'](this.type) / this.pageSize),
                size: this.pageSize,
                condition: {},
                isUnshift: reverse,
                type: this.type
            }).then(res => {
                if (res < 10) this.finished = true;
                this.loading = false
                this.refreshing = false;
                this.list = this.$store.getters['course_base/renderList'](this.type)
            })
        },
        onRefresh() {
            this.loadCourses(true);
        }
    },
    created() {
        this.$store.commit('course_base/pushSearchResult', {
            type: this.type,
            data: []
        })
    }
};
</script>

<style>
.van-pull-refresh {
    height: calc(100vh - 94px);
    overflow: scroll;
    -webkit-user-select: none;
    user-select: none;
}


</style>