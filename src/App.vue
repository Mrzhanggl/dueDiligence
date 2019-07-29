<template>
  <div id="app">
    <router-view></router-view>
    <el-dialog
      title="数据异常"
      :visible.sync="$store.state.unusualSync"
      class="public"
      width="480px"
      top="40vh"
      :before-close="handleClose"
    >
      <div style="margin-bottom:30px;">第三方数据源获取异常，请稍后再试</div>
    </el-dialog>
    <el-dialog
      title="额，好像没有权限"
      :visible.sync="$store.state.notAuth"
      class="public"
      width="480px"
      top="40vh"
      :before-close="authClose"
    >
      <div style="margin-bottom:30px;">当前账号权限无法使用该功能，可联系管理员修改权限哦:)</div>
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "app",
  components: {},
  watch: {
    $route() {
      $("#app").scrollTop(0);
    }
  },
  
  methods: { 
    handleClose() {
    this.$store.commit("setUnusualSync",false)
    } ,
    authClose() {
     this.$store.commit("setNotAuth",false)
    } 
  }
};
</script>

<style lang="scss" scoped>
.h {
  height: 100%;
}
</style>
