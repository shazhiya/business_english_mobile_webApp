<template>
    <card :width="'90%'" :iStyle="sty" style="margin: 10px auto 0" @click="gotoDetail">
        <!-- image  -->
        <div style="border-radius: 5px; overflow: hidden">
            <van-image
                width="100%"
                height="100"
                :src="src + clazz.clazzLogo"
                fit="cover"
            />
        </div>
        <!-- title text -->
        <div class="van-ellipsis height" style="text-align: center; font-size: 18px; font-weight: bold">
            {{ clazz.clazzName }}
        </div>
        <div class="van-multi-ellipsis--l2" style="color: gray; padding: 0 3px; overflow: hidden">
            {{ clazz.clazzDescription }}
        </div>
        <!-- extension part -->
        <div style="padding: 3px">
            <!-- tag -->
<!--            <van-tag-->
<!--                color="#07C160"-->
<!--                size="medium"-->
<!--                style="margin-right: 5px"-->
<!--            >-->
<!--                {{'组织: ' + clazz.organization.organizationName}}-->
<!--            </van-tag>-->
            <van-tag
                color="#07C160"
                size="medium"
                style="margin-right: 5px;"
            >
                {{'课程数: ' + clazz.ccs.length}}
            </van-tag>
            <!-- operation menu -->
            <van-icon
                name="eye-o"
                @click.stop="$store.commit('updateActionSheet',{show:true});setCurrentClass(clazz)"
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
        }
    },
    props: ["clazz",'setCurrentClass'],
    methods:{
        gotoDetail(){
          this.$router.push({name: 'classDetail',query:{clazzId:this.clazz.clazzId}})
        }
    }
};
</script>

<style>
.center {
    margin: auto;
    display: inline;
}

.height {
    height: 28px;
}
</style>