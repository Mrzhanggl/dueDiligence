<template>
  <div
    class="quota account container-card due-d "
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)"
  >
    <div class="filter">
      <div class="left">尽调额度分配-当前剩余尽调额度：<span class="Din-M">{{count}}</span></div>
      <div class="right search">
        <el-input v-model="search.phone" placeholder="请输入账号" @keyup.enter.native="init(1)">
            <el-button slot="append" type="primary" @click="init(1)">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="dd-table">
      <el-table :data="tableData">
        <el-table-column prop="phone" label="账号"></el-table-column>
        <el-table-column prop="jd_times" label="当前可用额度" ></el-table-column>

        <el-table-column  label="操作">
          <template slot-scope="scope">
            <div class="btn-box">
            <div class="btn-list">
              <el-button type="text" size="medium" @click="openDialog(scope.row.id)">分配额度</el-button>
            </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <public-page ref="pagList" @getData="init"></public-page>
    <index-allot :dialogVisible.sync="dialogVisible" :accId="accId" :residueNum="residueNum" @updateData="updateData"></index-allot>
  </div>
</template>
<script>
import publicPage from "@@/page.vue";
import indexAllot from "./indexAllot.vue"
export default {
  components: {
    publicPage,
    indexAllot
  },
  data() {
    return {
      api_Quota:"/Home/Quota/userIndex.json",
      api_Residue:"/Home/Quota/surplusQuota.json",
      dialogVisible:false,
      loading: false,
      search: {
        phone: "",
        page: 1,
        limit: 10
      },
      tableData: [],
      accId:0,
      residueNum:0,
      count:0
    };
  },
  created() {
    this.updateData()
  },
  methods: {
    getResidue(){
        let vm =this;
        vm._getData(vm.api_Residue,{},(data)=>{
            vm.count = data.data.count;
            vm.residueNum = data.data.count - data.data.user_quota;
            
        })
    },
    init(p) {
      let vm= this;
      p?vm.search.page = p:"";
      vm.loading = true;
      vm._getData(vm.api_Quota, vm.search, data => {
        vm.tableData = data.data.data;
        vm.$refs.pagList.page = parseInt(data.data.count);
        vm.$refs.pagList.size = 10;
        vm.loading = false;
      });
    },
    openDialog(id){
      var vm = this
      if(!vm.$fn.hasAuth('分配额度')){
        vm.$store.commit("setNotAuth",true)
          return false
        }
        this.accId  = Number(id);
        this.dialogVisible = true;
    },
    updateData(){
      this.init(1);
      this.getResidue()
    }
  }
};
</script>
<style lang="scss" scoped>
.quota {
  margin: 30px auto;
  .filter {
    height: 52px;
    margin-bottom: 30px;
    .left {
      line-height: 52px;
      font-weight: bold;
    }
    .right {
      .el-input .el-input__inner {
        border: 2px solid rgba(230, 233, 235, 1);
        border-radius: 4px 0px 0px 4px;
        height: 48px;
        line-height: 52px;

        width: 242px;
      }
    }
  }
  .dd-table {
    margin-top: 30px;
  }
  .point {
    vertical-align: 1px;
    width: 8px;
    height: 8px;
    background: rgba(234, 79, 79, 1);
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
  .active {
    background: rgba(0, 168, 139, 1);
  }
  .theme-text {
    cursor: pointer;
  }
}


</style>

