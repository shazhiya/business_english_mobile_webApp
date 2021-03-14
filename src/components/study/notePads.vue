<template>
  <navbar title="我的笔记本" @right="openDialog">
    <template #right>
      <van-icon name="plus" size="20"></van-icon>
    </template>
    <template #default>
      <van-cell-group title="笔记本">
        <van-swipe-cell right-width="100px">
          <van-cell title="单词" is-link :to="{name:'noteItems'}"></van-cell>
          <template #right>
            <van-button type="danger" @click="deleteNotePad()">删除</van-button>
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
export default {
  name: "noteList",
  components:{navbar},
  data(){
    return {
      showDialog: false,
      notepadName: ''
    }
  },
  methods:{
    deleteNotePad(/*notepadId*/){
      // todo
    },
    openDialog(){
      this.notepadName = ''
      this.showDialog = true
    },
    addNotepad(/*done*/){
      // todo
    }
  }
}
</script>

<style scoped>

</style>