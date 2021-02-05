<template>
    <div class="center">
        <p></p>
        <p></p>
    </div>
</template>

<script>
export default {
    name: "bigNumber",
    props:{
        number: {
            num: 0,
            size: ''
        }
    }
}
</script>

<style scoped>
.center{
    text-align: center;
}
</style>