<template>
    <div style="padding: 10px; border-bottom: #EEEEEE 1px solid">
        <div style="padding: 5px 20px">
            {{content||''}}
        </div>
        <div style="margin: 15px 0" v-if="hide||true">
            <van-button style="width: 40%;float: left;margin: 0 5%" round type="danger" size="mini">{{rejectText||'拒绝'}}</van-button>
            <van-button style="width: 40%;float: right;margin:0 5%" round type="primary" size="mini">{{okText||'接受'}}</van-button>
        </div>
        <van-divider></van-divider>
    </div>
</template>

<script>
export default {
    name: "agreePanel",
    props: ['content','okText','rejectText','hide'],
    methods:{
        ok(){
            this.$emit('ok')
        },
        reject(){
            this.$emit('reject')
        }
    }
}
</script>

<style scoped>

</style>