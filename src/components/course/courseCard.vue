<template>
    <card :width="'90%'" :iStyle="sty" style="margin: 10px auto 0">
        <!-- image  -->
        <div style="border-radius: 5px; overflow: hidden">
            <van-image
                width="100%"
                height="100"
                :src="src + course.curriculumCover"
                fit="cover"
            />
        </div>
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
                name="eye-o"
                @click="$store.commit('updateActionSheet',{show:true})"
                style="float: right;"
                size="25"
                color="gray"
            />
        </div>

    </card>
</template>

<script>
export default {
    data() {
        return {
            sty: {
                marginTop: "5px",
            }
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