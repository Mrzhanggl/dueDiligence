<template>
  <div class="due-input-f due-input-d">
    <el-select
      v-model="value_mb"
      clearable
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
      :popper-append-to-body="false"
      @change="handleChange"
    >
      <el-option v-for="item in companys" :key="item.id" :label="item.name" :value="item.id">
        <span
          style="display:block; font-size:16px; color:#556675; line-height:32px;margin-top:8px"
        >{{item.name}}</span>
        <span
          style="display:block; font-size:16px; color:#556675; line-height:32px;"
        >法人股东：{{item.oper_name}} &nbsp&nbsp|&nbsp&nbsp {{item.status}}</span>
      </el-option>
    </el-select>
    <span>目标公司：</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_company: "/Home/Enterprise/search.json",
      companys: [],
      value_mb: "",
      loading: false
    };
  },
  watch: {
    "$store.state.stepId": function(newVal) {
      if (newVal == 2) {
        this.fillInfo();
      }
    }
  },
  created() {
    this.fillInfo();
  },
  methods: {
    fillInfo() {
      this.companys = [];
      let params = this.$store.state.dueParams;
      this.value_mb = params.enterprise_id;
      this.companys.push({
        id: params.enterprise_id,
        name: params.company,
        oper_name: params.corporate,
        status: params.status
      });
    },
    remoteMethod(query) {
      let vm = this;
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          vm.getData(query);
        }, 200);
      } else {
        this.companys = [];
      }
    },
    getData(name) {
      let vm = this;
      let params = {
        name: name,
        token: this.Token
      };
      vm._getData(vm.api_company, params, data => {
        vm.loading = false;

        vm.companys = data.data.data;
      });
    },
    handleChange(val) {}
  }
};
</script>
<style lang='scss' scoped>
.due-input-f {
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  .el-select {
    width: 100%;
    height: 52px;
  }
  > span {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #9ea8b1;
    line-height: 52px;
    position: absolute;
    top: 0;
    left: 20px;
  }
  .due-cheak {
    position: absolute;
    width: 96px;
    height: 52px;
    background: #e4eefd;
    border-radius: 4px;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #4285f4;
    line-height: 52px;
    text-align: center;
    right: -116px;
  }
}
</style>