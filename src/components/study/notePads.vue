<template>
    <navbar title="我的笔记本" @right="openDialog">
        <template #right>
            <van-icon name="plus" size="20"></van-icon>
        </template>
        <template #default>
            <van-cell-group title="笔记本">
                <van-swipe-cell right-width="100px" v-for="notepad in notepads" :key="notepad.notepadId">
                    <van-cell :title="notepad.title" is-link :to="{name:'noteItems',query:{npId:notepad.notepadId}}"></van-cell>
                    <template #right>
                        <van-button type="danger" @click="deleteNotePad(notepad)">删除</van-button>
                    </template>
                </van-swipe-cell>
            </van-cell-group>

            <van-dialog v-model="showDialog" title="创建笔记本" show-cancel-button :before-close="addNotepad">
                <van-field placeholder="请输入笔记本名称" center v-model="notepadName"></van-field>
            </van-dialog>
        </template>
    </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import post from "@/store/util";
import resolvedPost from "@/store/ResovePost";

export default {
    name: "noteList",
    components: {navbar},
    data() {
        return {
            showDialog: false,
            notepadName: '',
            notepads: []
        }
    },
    methods: {
        loadNotepads() {
            resolvedPost('note/loadNotepads', {user: this.$store.getters.myself})
                .then(data => {
                    this.notepads = data.filter(np=>np.status==='normal')
                })
        },
        deleteNotePad(notepad) {
            post('note/deleteNotepad',{notepadId:notepad.notepadId},()=>{
                this.loadNotepads()
            })
        },
        openDialog() {
            this.notepadName = ''
            this.showDialog = true
        },
        addNotepad(action,done) {
            if (action==='cancel') {
                done()
                return
            }
            post('note/createNotepad', {
                title: this.notepadName,
                status: 'normal',
                user:this.$store.getters.myself
            }, () => {
                this.showDialog = false
                done()
                this.loadNotepads()
            })
        }
    },
    mounted() {
        this.loadNotepads()
    }
}
</script>

<style scoped>

</style>