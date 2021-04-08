<template>
    <div style="padding: 10px; border-bottom: #EEEEEE 1px solid">
        <slot>
            <div style="padding: 5px 20px">
                {{content||''}}
            </div>
        </slot>
        <div style="margin: 15px 0" v-if="hide||true">
            <van-button @click="reject" style="width: 40%;float: left;margin: 0 5%" round type="danger" size="mini">{{rejectText||'拒绝'}}</van-button>
            <van-button @click="ok" style="width: 40%;float: right;margin:0 5%" round type="primary" size="mini">{{okText||'接受'}}</van-button>
        </div>
        <van-divider></van-divider>
    </div>
</template>

<script>
export default {
    name: "agreePanel",
    props: ['content','okText','rejectText','hide','all'],
    methods:{
        ok(){
            this.$emit('ok',this.all,true)
        },
        reject(){
            this.$emit('reject',this.all,false)
        }
    }
}
</script>

<style scoped>

</style>