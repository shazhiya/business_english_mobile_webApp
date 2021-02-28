<template>
  <card
      width="95%"
      class="topCard"
      @click="$router.push({name:'userSpace',params:{userName:'ichijo hotaru'}})"
  >
    <van-row>
      <van-col span="6" class="avatar">
        <van-image
            width="64"
            height="64"
            radius="12"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            style="margin: 5px 0 0 5px"
        />
      </van-col>
      <van-col span="16">
        <p class="username">Ichijo Hotaru</p>
        <p class="desc van-multi-ellipsis--l2">kissshot Acerolaorion HeartUnderBlade. kissshot
          Acerolaorion HeartUnderBlade.</p>
      </van-col>
    </van-row>
  </card>
</template>

<script>
export default {
  name: "userSmallCard"
}
</script>

<style scoped>
.topCard {
  margin: 5px auto auto;
  /*background: linear-gradient(30deg, aqua, gray);*/
  transition: all 2s;
}

.username {
  font-size: 30px;
  font-weight: bold;
  margin: 5px 0 0 0;
}

.avatar {
  margin-top: 5px;
}

.desc {
  margin: 5px 0;
}

</style>