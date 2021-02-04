<template>
    <div :style="{width:width}">
        <div :style="Object.assign({minHeight},iStyle)" class="baseCard flexContainer">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import baseCard from "component/card/baseCard";

export default {
    name: "flexContainer",
    extends: baseCard
}
</script>

<style scoped>
.flexContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>