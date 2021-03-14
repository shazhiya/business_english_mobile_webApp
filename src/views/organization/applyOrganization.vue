<template>
  <navbar title="申请创办组织">
    <template #right>
      <p></p>
    </template>

    <template #default>
      <van-cell-group title="创办组织">
        <van-form>
          <van-field label="组织名" placeholder="组织名" v-model="organization.organizationName"></van-field>
          <van-field label="相关简介" placeholder="相关简介" type="textarea" autosize rows="2" v-model="organization.organizationDescription"></van-field>
          <van-field name="uploader" label="认证资料">
            <template #input>
              <van-uploader v-model="organization.data" result-type="file" show-upload :after-read="uploadImg"/>
            </template>
          </van-field>
        </van-form>
      </van-cell-group>
      <van-button type="primary" round style="width: 100%; margin: 10px auto" @click="apply">
        确认提交
      </van-button>
    </template>


  </navbar>
</template>

<script>
import navbar from "component/card/navbar";
import uploadFile from "@/network/uploadFile";
import post from "@/store/util";
export default {
  name: "applyOrganization",
  components:{
    navbar
  },
  data(){
    return {
      organization:{
        organizationName: '',
        organizationDescription:'',
        data: []
      }
    }
  },
  methods:{
    uploadImg(file){
      uploadFile(file.file,'auditedData').then(res=>{
        if (res.data.code){
          file.status = "done"
          file.url = this.src + res.data.msg
          file.relativeUrl = res.data.msg
        }
      })
    },
    apply(){
      let organ = JSON.parse(JSON.stringify(this.organization))
      organ.data = organ.data.map(file=>file.relativeUrl).join(";")
      post("organization/applyOrganization",organ,res=>{
        if (res.data.code) {
          this.$notify({
            type: 'success',
            message: '申请已提交，请等待工作人员审核。'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>