<template>
    <div :style="{width:width}">
        <div :style="Object.assign({minHeight},iStyle)" class="baseCard">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "baseCard",
    props: {
        width: {
            type: String
        },
        minHeight: {
            type: String,
            default() {
                return "50px"
            }
        },
        iStyle: {
            default() {
                return {}
            },
            type: Object
        }
    }
}
</script>

<style>
.baseCard {
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    width: calc(100% - 2px);
    color: #303133;
    transition: .3s;
    border-radius: 8px;
    overflow: hidden;
    margin: auto;
    padding: 2px;
    box-shadow: 0 2px 12px 0 gray;
}
</style>