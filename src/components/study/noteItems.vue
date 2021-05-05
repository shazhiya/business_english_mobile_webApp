<template>
    <navbar title="我的笔记" @right="openDialog">
        <template #right>
            <van-icon name="plus" size="20"></van-icon>
        </template>
        <template #default>
            <van-cell-group>
                <note-item v-for="note in notes" :key="note.noteId" :note="note"/>
            </van-cell-group>
            <van-dialog title="记笔记" v-model="showDialog" show-cancel-button :before-close="addNoteItem">
                <van-field v-model="noteItem" type="textarea" placeholder="记笔记"></van-field>
            </van-dialog>
        </template>
    </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import noteItem from "component/study/noteItem";
import resolvedPost from "@/store/ResovePost";
import post from "@/store/util";

export default {
    name: "noteItems",
    components: {
        navbar, noteItem
    },
    data() {
        return {
            showDialog: false,
            noteItem: '',
            notes: []
        }
    },
    methods: {
        openDialog() {
            this.showDialog = true
            this.noteItem = ''
        },
        addNoteItem(action,done) {
            if (action==='cancel') {
                done()
                return
            }
            post('note/write',{
                notepad:{notepadId: this.$route.query.npId},
                noteContent: this.noteItem,
                status: 'normal'
            },()=>{
                done()
                this.loadNotes()
                this.showDialog = false
            })

        },
        loadNotes() {
            resolvedPost('note/loadNotes',{
                notepad:{notepadId: this.$route.query.npId}
            })
            .then(data=>{
                this.notes = data?.filter(note=>note.status==='normal')
            })

        }
    },
    mounted() {
        this.loadNotes()
    }
}
</script>

<style scoped>

</style>