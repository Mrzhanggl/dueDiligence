<!--  -->
<template>
  <div class="all clearfix" 
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)">
    <information-sta ref="init" :datam="datam"></information-sta>
    <due-Quota></due-Quota>
    <saving-time ref="sav" :datam="datam"></saving-time>
    <version-log></version-log>
  </div>
</template>

<script>
import informationSta from "./informationSta.vue";
import dueQuota from "./dueQuota.vue";
import savingTime from "./savingTime.vue";
import versionLog from "./versionLog.vue";
export default {
  data() {
    return {
      loading:false,
      datam: {
        weekJd: 0, //本周尽调数
        weekJd_last: 0, //上周尽调数
        weekKc: 0, //本周快查数
        weekKc_last: 0, //上周快查数
        weekGs: 0, //本周快查公司数
        weekGs_last: 0 //上周快查公司数
      }
    };
  },

  components: { informationSta, dueQuota, savingTime, versionLog },

  computed: {},

  created() {
    this.init();
  },
  methods: {
    //初始化数据  世堂没办法整合接口
    init() {
      var vm = this;
      vm.loading = true
      var token = vm.Token;
      //拿周尽调次数
      vm._postData("/Home/User/currentWeekJdNumber.json", token, data => {
        vm.datam.weekJd = data.data.count;
        vm.datam.weekJd_last = data.data.last;
        //拿周快查次数
        vm._postData("/Home/User/currentWeekFcNumber.json", token, data => {
          vm.datam.weekKc = data.data.count;
          vm.datam.weekKc_last = data.data.last;
          //拿周快查公司数
          vm._postData(
            "/Home/User/currentWeekFcCompanyNumber.json",
            token,
            data => {
              vm.datam.weekGs = data.data.count;
              vm.datam.weekGs_last = data.data.last;
              vm.$refs.init.init();
              vm.$refs.sav.init();
              vm.loading= false;
            }
          );
        });
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.all {
  width: 1744px;
  margin: auto;
  margin-top: 29px;
  margin-bottom: 0px;
 
  position: relative;
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen){
  .all {
  width: 1300px;
}
}
</style>
