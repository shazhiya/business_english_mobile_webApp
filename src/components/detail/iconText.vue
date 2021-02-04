<template>
    <div :class="['iconText',{active:checked}]" :style="{fontSize}">
        <div :class="iconClass"></div>
        <div>{{ text }}</div>
    </div>
</template>

<script>
export default {
    name: "iconText",
    props: {
        iconClass: {
            type: String,
            default: "el-icon-user"
        },
        text: {
            type: String,
            default: "default"
        },
        fontSize: {
            type: String,
            default: "20px"
        }
    },
    data() {
        return {
            checked: false
        }
    },
    methods: {
        active() {
            this.checked = true
        },
        unActive() {
            this.checked = false
        }
    }
}
</script>

<style scoped>
.iconText {
    margin: auto;
    text-align: center;
}

.active {
    color: red;
}
</style>