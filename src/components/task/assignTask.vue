<template>
  <navbar title="布置作业" style="padding-bottom: 40px">
    <van-cell-group title="课程">
      <myCourseItem :show-toolbar="false"></myCourseItem>
    </van-cell-group>
    <van-cell-group title="章节">
      <van-button type="primary" class="button" :loading="false" v-if="true">
        选择章节
      </van-button>
    </van-cell-group>

    <van-cell-group title="编辑作业">
      <van-field placeholder="" label="标题" value=""></van-field>
      <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="value"
          label="截至时间"
          placeholder="点击选择时间"
          @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirm"
        />
      </van-popup>
      <van-divider content-position="right">题目</van-divider>
      <question v-for="(question,index) in task.questions" :question="question" :key="index" :editable="true" @delete="deleteQuestion"></question>
      <van-button style="background: none; color: black" :loading="false" size="mini" class="addQuestion" round @click="addQuestion">
        添加题目
      </van-button>
      <van-button style="background: none; color: black" :loading="false" size="mini" class="addQuestion" round>
        从excel导入
      </van-button>
    </van-cell-group>

    <van-button type="primary" :loading="false" class="button">
      发布作业
    </van-button>

  </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import myCourseItem from "component/course/courseItem";
import question from "component/task/question";
export default {
  name: "assignTask",
  components:{
    navbar,myCourseItem,question
  },
  data() {
    return {
      value: '',
      showPicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      task:{
        id: null,
        endTime: '',
        title: '',
        chapterId: '',
        questions: [],
        clazzId:'',
        courseId:''
      }
    };
  },
  methods: {
    onConfirm(time) {
      this.value = time.toString();
      this.showPicker = false;
    },
    addQuestion(){
      this.task.questions.push({
        id: null,
        answer:'',
        serial: '',
        description: '',
        options: [
          {
            optionText: '',
            optionAlpha: 'A'
          },
          {
            optionText: '',
            optionAlpha: 'B'
          },
          {
            optionText: '',
            optionAlpha: 'C'
          },
          {
            optionText: '',
            optionAlpha: 'D'
          }
        ]
      })
      this.sortQuestionSerial()
    },
    sortQuestionSerial(){
      this.task.questions.forEach((question,index)=>question.serial = index+1)
    },
    deleteQuestion(question){
      this.$delete(this.task.questions,this.task.questions.indexOf(question))
      this.sortQuestionSerial()
    }
  }
}
</script>

<style scoped>
.button{
  width: 90%;
  display: block;
  margin: auto;

}

.addQuestion{
  width: 40%;
  display: inline-block;
  margin: 5%;
}
</style>