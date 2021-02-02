<template>
    <card :width="'90%'" :iStyle="sty" style="margin: auto">
        <slot></slot>
    </card>
</template>

<script>
export default {
    data(){
        return {
            sty:{
                marginTop: "5px"
            }
        }
    }
}
</script>

<style>

</style>