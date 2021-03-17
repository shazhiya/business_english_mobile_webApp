<template>
  <div>
    <navbar title="招贤纳士">
      <template #right><p></p></template>
      <template #default>
        <van-cell-group title="角色权限管理">
          <cc>
            <div style="position: relative">
              <van-row>
                <van-col span="6">
                  <van-tag size="large" style="margin: 10px">教师</van-tag>
                </van-col>
                <van-col span="15" offset="1">
                  <van-tag plain style="margin: 10px 5px" closeable @close="removeSecurity()">招贤纳士</van-tag>
                  <van-tag style="margin: 10px 5px;" type="primary">
                    <div style="padding: 0 10px" @click="selectSecurity=true">选择</div>
                  </van-tag>
                </van-col>
              </van-row>
              <div style="position: absolute; top: 0; right: 0">
                <van-icon name="delete-o" ></van-icon>
              </div>
            </div>

            <van-button style="width: 100%; border: none; background:none;" size="mini" @click="openAddRole">
              添加角色
            </van-button>
          </cc>
        </van-cell-group>

        <van-cell-group title="成员角色审配">
          <cc>
            <div style="position: relative">
              <van-row>
                <van-col span="6">
                  <van-tag size="large" style="margin: 10px">教师</van-tag>
                </van-col>
                <van-col span="15" offset="1">
                  <van-tag plain style="margin: 10px 5px" closeable @close="removeSecurity()">招贤纳士</van-tag>
                  <van-tag style="margin: 10px 5px;" type="primary">
                    <div style="padding: 0 10px" @click="selectSecurity=true">选择</div>
                  </van-tag>
                </van-col>
              </van-row>
              <div style="position: absolute; top: 0; right: 0">
                <van-icon name="delete-o" ></van-icon>
              </div>
            </div>

            <van-button style="width: 100%; border: none; background:none;" size="mini" @click="openAddRole">
              添加角色
            </van-button>
          </cc>
        </van-cell-group>

      </template>
    </navbar>

    <van-action-sheet
        v-model="selectSecurity"
        :actions="actions"
        cancel-text="取消"
        close-on-popstate
        description="分配权限"
        @select="clickSecurity"
    />

    <van-dialog
      title="添加角色"
      v-model="addRole"
      show-cancel-button
      :before-close="createRole"
    >
      <van-field v-model="roleName" placeholder="角色名"></van-field>
    </van-dialog>

  </div>
</template>

<script>
export default {
  name: "recruit",
  data(){
    return {
      selectSecurity: false,
      addRole: false,
      roleName: '',
      actions: [
        { name: '着色选项' },
        { name: '禁用选项' },
        { name: '加载选项' },
        { name: '加载选项' },
        { name: '加载选项' },
        { name: '加载选项' },
      ],
    }
  },
  methods:{
    removeSecurity(){

    },
    clickSecurity(action){
      this.$set(action,'color',!action.color?'red':undefined)
    },
    openAddRole(){
      this.addRole = true
    },
    createRole(action,done){
      console.log(action, done)
    }
  }
}
</script>

<style scoped>

</style>