<template>
    <card :width="'90%'" :iStyle="sty" style="margin: auto">
        <!-- image  -->
        <van-image
            width="100%"
            height="100"
            :src="src + course.curriculumCover"
            fit="cover"
        />
        <!-- title text -->
        <div class="van-multi-ellipsis--l2 height">
            {{ course.curriculumName }}
        </div>
        <!-- extension part -->
        <div style="padding: 3px">
            <!-- tag -->
            <van-tag
                v-for="i in 2"
                :key="i"
                color="#EAE1E1"
                size="medium"
                style="margin-right: 5px"
            >
                标签{{ i }}
            </van-tag>
            <!-- operation menu -->
            <van-icon
                name="setting"
                @click="show = true"
                style="float: right"
                size="25"
            />
        </div>
        <!-- action sheet -->
        <van-action-sheet v-model="show" title="标题">
            <div class="content">内容</div>
        </van-action-sheet>
    </card>
</template>

<script>
export default {
    data() {
        return {
            sty: {
                marginTop: "5px",
            },
            show: false,
        };
    },
    props: ["course"],
};
</script>

<style>
.center {
    margin: auto;
    display: inline;
}

.height {
    height: 38px;
}
</style>