<template>
  <navbar title="我的笔记" @right="openDialog">
    <template #right>
      <van-icon name="plus" size="20"></van-icon>
    </template>
    <template #default>
      <van-cell-group title="2020.1.2">
        <card style="width: 95%;margin: 10px auto; position: relative">
          <p>
            aababababababab
          </p>
          <div style="position: absolute; top: 5px; right: 5px" @click="deleteNoteItem()">
            <van-icon name="delete-o"></van-icon>
          </div>
          <div style="border-top: 1px solid #EEEEEE">
            <div style="float: left;width: 60%; color: #409EFF; font-size: 12px;padding: 5px;overflow: hidden">笔记源自 course->chapter</div>
            <div style="float: right;width: 30%; color: red; font-size: 12px;padding: 5px;overflow: hidden; text-align: right" @click="goto()">
              前往该章节
            </div>
          </div>
        </card>
      </van-cell-group>
      <van-dialog title="记笔记" v-model="showDialog" show-cancel-button :before-close="addNoteItem">
        <van-field v-model="noteItem" type="textarea" placeholder="记笔记"></van-field>
      </van-dialog>
    </template>
  </navbar>
</template>

<script>
import navbar from "component/card/navbar";

export default {
  name: "noteItem",
  components:{
    navbar
  },
  data(){
    return {
      showDialog: false,
      noteItem: ''
    }
  },
  methods:{
    goto(/*option*/){
      // todo
    },
    deleteNoteItem(/*option*/){
      // todo
    },
    openDialog(){
      this.showDialog = true
      this.noteItem = ''
    },
    addNoteItem(){}
  }
}
</script>

<style scoped>

</style>