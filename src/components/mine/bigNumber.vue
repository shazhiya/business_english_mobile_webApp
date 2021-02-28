<template>
    <div class="center">
        <p :style="{fontSize: number.size,color:number.color}">{{number.value}}</p>
        <p :style="{fontSize: name.size,color:name.color}">{{name.value}}</p>
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
                    size: '24px',
                    color: 'black'
                }
            }
        },
        name: {
            default() {
                return {
                    value: 'default',
                    size: '18px',
                    color: 'black'
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