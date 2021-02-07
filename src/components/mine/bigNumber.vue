<template>
    <div class="center">
        <p :style="{fontSize: number.size}">{{number.value}}</p>
        <p :style="{fontSize: name.size}">{{name.value}}</p>
    </div>
</template>

<script>
export default {
    name: "bigNumber",
    props:{
        number: {
            default(){
                return {
                    value: 0,
                    size: '24px'
                }
            }
        },
        name: {
            default() {
                return {
                    value: 'default',
                    size: '18px'
                }
            }
        }
    }
}
</script>

<style scoped>
.center{
    text-align: center;
}
div p{
    margin: 0;
}
</style>