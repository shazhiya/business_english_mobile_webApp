<template>
  <div class="container">
<!--    top bar-->
    <van-row>
      <van-col span="3">
        <van-image
            width="48"
            height="48"
            radius="12"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            style="margin: 5px 0 0 5px"
        />
      </van-col>
      <van-col span="16">
        <van-search
            v-model="value"
            shape="round"
            placeholder="请输入搜索关键词"
        />
      </van-col>
      <van-col span="5">
        <van-row style="margin-top: 10px">
          <van-col span="12">
            <van-button icon="plus" size="small" type="primary" />
          </van-col>
          <van-col span="12">
            <van-button icon="plus" size="small" type="primary"/>
          </van-col>
        </van-row>
      </van-col>
    </van-row>

    <div class="main">
      <router-view name="main"/>
    </div>

<!--    bottom menu bar-->
    <van-tabbar v-model="active" :fixed="true" active-color="#ee0a24" inactive-color="#000" :placeholder="true">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    components:{

    },
    data(){
        return {
          active: 0,
          value: ""
        }
    },
    methods:{

    }
}
</script>

<style scoped>
.container{
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: visible;
}
.main{
  max-height: calc(100vh - 107px);
}
</style>