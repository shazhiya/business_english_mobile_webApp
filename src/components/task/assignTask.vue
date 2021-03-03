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
      <question></question>
      <question></question>
      <question></question>
      <van-button style="background: none; color: black" :loading="false" size="mini" class="addQuestion" round>
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
import myCourseItem from "component/course/myCourseItem";
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
    };
  },
  methods: {
    onConfirm(time) {
      this.value = time.toString();
      this.showPicker = false;
    },
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