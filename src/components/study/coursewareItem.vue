<template>
    <div @click="click">
        <van-row gutter="30">
            <van-col span="1" offset="1">
                <van-icon v-if="fileType==='video'" name="video-o" size="22"/>
                <van-icon v-if="fileType==='img'" name="photo-o" size="22"/>
                <van-icon v-if="fileType==='audio'" name="music-o" size="22"/>
            </van-col>
            <van-col span="19">
                <div style="vertical-align: middle;display: inline-block; overflow: hidden; width: 100%" class="van-ellipsis">
                    {{ware.coursewareName.split('.')[0]}}
                </div>
            </van-col>
            <van-col span="2">
                <van-icon name="down" @click.stop="download"/>
            </van-col>
        </van-row>
    </div>
</template>

<script>
// import post from "@/store/util";

export default {
    name: "coursewareItem",
    props:['ware'],
    data(){
        return {
            fileType:this.ware.fileType
        }
    },

    methods:{
        download(){
            // let url;
            // todo
        },
        click(){
            this.$emit('click',this)
        }
    }
}
</script>

<style scoped>

</style>