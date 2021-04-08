<template>
    <card style="width: 95%; margin:10px auto;" @click="click">
        <div class="container">
            <van-row gutter="30px">
                <van-col span="4" offset="1">
                    <van-image
                        width="48"
                        height="48"
                        radius="12"
                        :src="src + clazz.clazzLogo"
                        style="margin: 0;"
                    />
                </van-col>
                <van-col span="18" offset="1">
                    <p class="van-ellipsis bold" style="font-size: 20px">
                        {{clazz.clazzName}}
                    </p>
                    <p class="van-ellipsis">
                        {{clazz.clazzDescription}}
                    </p>
                </van-col>
            </van-row>
        </div>
    </card>
</template>

<script>
export default {
    name: "clazzItem",
    props:['clazz'],
    methods:{
        click(){
            this.$emit('click',this.clazz)
        }
    }
}
</script>

<style scoped>
p {
    margin: 0;
}

.container {
    margin-top: 5px;
}

.bold {
    font-weight: bolder;
    font-style: italic;
}
</style>