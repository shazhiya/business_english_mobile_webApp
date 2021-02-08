<template>
    <div class="oneMess">
        <div style="text-align: center; margin-top: 15px" v-show="displayTime">
            <van-tag round type="primary">2020/10/10 20:10:13</van-tag>
        </div>
        <van-image
            width="48"
            height="48"
            fit="cover"
            radius="12"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            style="margin: 10px;"
            :class="direction==='left'?'floatLeft':'floatRight'"
        />
        <div class="chatBox" :class="direction==='left'?'floatLeft leftMess':'floatRight rightMess'">
            kissshot acerolaorion heartunderblade
            kissshot acerolaorion heartunderblade
            kissshot acerolaorion heartunderbladexx
        </div>
        <div style="clear: both"/>
    </div>
</template>

<script>
export default {
    name: "oneMessage",
    props:{
        direction:{
            type:String,
            default: 'left'
        },
        displayTime:{
            type:Boolean,
            default: false
        }
    },
    data(){
        return {
            alongShow: true,
            bubble: {
                show: true,
                value: "kissshot acerolaorion heartunderblade"
            }
        }
    }
}
</script>

<style scoped>
.floatLeft{
    float: left;
}
.floatRight{
    float: right;
}
.oneMess{
    min-height: 50px;
    margin-top: 5px;
}

.chatBox{
    position: relative;
    margin:12px;
    padding:5px 8px;
    word-break: break-all;
    background: #ffffff;
    border: 1px solid #989898;
    border-radius: 5px;
    max-width:60%;
}

.leftMess::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: -20px;
    top:15px;
    border: 10px solid;
    border-color: transparent white transparent transparent ;
}

.rightMess::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    right: -20px;
    top: 15px;
    border: 10px solid;
    border-color: transparent transparent transparent white;
}
</style>