<template>
  <card style="margin:0 auto 20px; padding: 10px 0; width: 95%; position: relative">
    <van-row gutter="10">
      <van-col span="2"  offset="1" style="padding-top:4px; font-weight: bold; ">{{question.serial}}</van-col>
      <van-col span="18">
        <van-field v-if="editable" type="textarea" autosize v-model="question.description" placeholder="题目描述"></van-field>
        <div v-else>
          {{question.description}}
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="19" offset="2">
        <div style="margin: 10px">
          <van-radio-group v-model="question.answer">
            <anOption :editable="editable" v-for="option in question.options" :option="option" :key="option.optionAlpha"></anOption>
          </van-radio-group>
        </div>
      </van-col>
    </van-row>
    <div v-if="editable" style="position: absolute; top: 10px; right: 10px" @click="delMe">
      <van-icon name="delete-o" size="20px"></van-icon>
    </div>
  </card>
</template>

<script>
import anOption from "component/task/AnOption";
export default {
  name: "question",
  props: {
    editable: {
      default: true
    },
    question: {
      default(){
        return {
          id: null,
          serial: 0,
          answer:'',
          description: '',
          options: [
            {
              optionText: 'one',
              optionAlpha: 'A'
            },
            {
              optionText: 'two',
              optionAlpha: 'B'
            },
            {
              optionText: 'three',
              optionAlpha: 'C'
            },
            {
              optionText: 'four',
              optionAlpha: 'D'
            }
          ]
        }
      }
    }
  },
  components:{
    anOption
  },
  methods:{
    delMe(){
      this.$emit("delete",this.question)
    }
  }
}
</script>

<style scoped>

</style>