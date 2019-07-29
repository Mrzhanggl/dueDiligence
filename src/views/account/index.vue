<template>
  <div
    class="account container-card due-d"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)"
  >
    <div class="filter">
      <div class="left">账号管理-账号列表</div>
      <div class="right search">
        <el-select
          v-model="search.role_id"
          placeholder
          class="select"
          :popper-append-to-body="false"
          @change="roleChange"
        >
          <template slot="prefix">角色：</template>
          <el-option label="全部"  :value="''"></el-option>
          <el-option
            v-for="(item,index) in role_list"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input v-model="search.phone" placeholder="请输入账号" @keyup.enter.native="init(1)">
          <el-button slot="append" type="primary" @click="init(1)">搜索</el-button>
        </el-input>
        <el-button
          class="public-btn"
          @click="addAcc"
          type="primary"
          style="margin-left:30px"
        >新增账号</el-button>
      </div>
    </div>
    <div class="dd-table">
      <el-table :data="tableData">
        <el-table-column prop="phone" label="账号"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="btn-box">
              <div class="btn-list" v-if="scope.row.role_type != 1">
                <el-button type="text" size="medium"  @click="setRole(scope.row)">角色设置</el-button>
              </div>
              <div class="btn-list" :class="{'trunleft':scope.row.role_type=='1'}">
                <el-button type="text" size="medium" @click="authDio(3,scope.row.role_id,scope.row.role_name,scope.row)">查看权限</el-button>
              </div>
              <div class="btn-list"  :class="{'trunleftb':scope.row.role_type=='1'}">
                <el-button type="text" size="medium"  @click="resetPassword(scope.row)">重置密码</el-button>
              </div>
              <div class="btn-list">
                <el-button
                  type="text"
                  v-if="scope.row.role_type != 1"
                  class="danger"
                  size="medium"
                  @click="delAccount(scope.row.id)"
                >删除账号</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <public-page ref="pagList" @getData="init"></public-page>
    <!-- <download :wordId="downloadId" :dialogVisible.sync="dialogVisible"></download> -->
      
    <index-set-role  :role_list="role_list" :roleDialog.sync="roleDialog" :roleObj="roleObj" :isAdd ="isAdd" @updateData="init"></index-set-role>
    <el-dialog title="重置成功" :visible.sync="dialogRs" class="public" width="480px" top="40vh">
    <div style="margin-bottom:30px;">密码已重置，账号信息已推送至被修改账号的手机。</div>
    </el-dialog>
     <auth-box  ref="authPower" :setJurisdictionBox.sync="setJurisdictionBox" :type.sync="type" @init='init'></auth-box>
  </div>
</template>
<script>
import publicPage from "@@/page.vue";
import authBox from "@@/authBox.vue";
import indexSetRole from "./indexSetRole.vue";
export default {
  components: {
    publicPage,
    authBox,
    indexSetRole
  },
  data() {
    return {
      api_Role: "/Home/Role/MyRoleList.json",
      api_Acc: "/Home/Role/UserRoleList.json",
      api_del: "/Home/UserPower/RemoveAccount.json",
      api_reset: "/Home/UserPower/createAccount.json",
      setJurisdictionBox: false,
      type:3,
      loading: false,
      dialogRs: false,
      roleDialog: false,
      isAdd: false,
      roleObj:{},
      search: {
        phone: "",
        role_id: "",
        page: 1,
        limit: 10
      },
      tableData: [],
      role_list: [],
      user_info:{},
    };
  },
  created() {
    this.init(1);
    this.getRoleList();
  },
  methods: {
    init(p) {
      let vm = this;
      p ? (vm.search.page = p) : "";
      vm.loading = true;
      vm.user_info =JSON.parse(sessionStorage.getItem('userdata')) 
      vm._getData(vm.api_Acc, vm.search, data => {
        vm.tableData = data.data.data;
        vm.$refs.pagList.page = parseInt(data.data.count);
        vm.$refs.pagList.size = 10;
        vm.loading = false;
      });
    },
    authDio(type,role_id,role_name,obj){
      var vm = this
      if(obj.phone==vm.user_info.phone){
        if(!vm.$fn.hasAuth('查看权限')){
          vm.$store.commit("setNotAuth",true)
            return false
        }
      }else{
        if(!vm.$fn.hasAuth('查看成员权限')){
          vm.$store.commit("setNotAuth",true)
            return false
        }
      }
      vm.type=type
      // if(type==1){
      //   vm.$refs.authPower.check_two = []
      //   vm.$refs.authPower.show_list = []
      //   vm.setJurisdictionBox=true
      // }else if(type==2){
          vm._getData('Home/AuthRecursion/authRolePower.json?role_id='+role_id,{},(data)=>{
            vm.$refs.authPower.auth_list = data.data
            vm.$refs.authPower.role_id = role_id
             vm.$refs.authPower.role_name = role_name
              vm.$refs.authPower.role_type = obj.role_type
            vm.$refs.authPower.resetList()
            vm.setJurisdictionBox = true
          })
      // }
      
      
    },
    getRoleList() {
      let vm = this;
      vm._getData(vm.api_Role, {}, data => {

        vm.role_list = vm.role_list.concat(data.data.data);
      });
    },
    roleChange(val) {
      this.search.role_id = val;
      this.init(1);
    },
    openDownload(id) {
      this.downloadId = id;
      this.dialogVisible = true;
    },
    setRole(obj){
          this.roleObj=obj;
          this.roleDialog = true;
          this.isAdd = false;
    },
    addAcc(){
      var vm = this
      if(!vm.$fn.hasAuth('新增成员')){
        vm.$store.commit("setNotAuth",true)
          return false
        }
          this.roleObj={
            role_id:"",
            phone:"",
            id:""
        };
          this.roleDialog = true;
          this.isAdd = true;
    },
    resetPassword(obj) {
      var vm = this
      if(obj.phone==vm.user_info.phone){
        if(!vm.$fn.hasAuth('重置密码')){
          vm.$store.commit("setNotAuth",true)
            return false
        }
      }else{
        if(!vm.$fn.hasAuth('重置成员密码')){
          vm.$store.commit("setNotAuth",true)
            return false
        }
      }
      
      this.$confirm(`您将把【<span class="Din-M">${obj.phone}</span>】的登陆密码进行重置`, "请确认", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "el-button--text"
      })
        .then(() => {
           this.resetData(obj);
        })
        .catch(() => {});
    },
    resetData(obj){
        let vm = this;
        let params = {
          phone:obj.phone,
          id:obj.id,
          role_id:obj.role_id,
        }
        vm._postData(vm.api_reset,params,data=>{
         vm.dialogRs=true
        })
    },
    delAccount(id) {
      var vm = this
      if(!vm.$fn.hasAuth('删除成员')){
        vm.$store.commit("setNotAuth",true)
          return false
        }
      this.$confirm("您确定需要删除该账号？", "请确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "el-button--text"
      })
        .then(() => {
          this.delData(id);
        })
        .catch(() => {});
    },
    delData(id) {
      let vm = this;
      vm._postData(vm.api_del, { id: id }, data => {
        vm.init(1);
        vm.$message({
          type: "success",
          message: "操作成功!"
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.account {
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

