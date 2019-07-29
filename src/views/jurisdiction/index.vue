<template>
  <div>
    <div
      class="jur container-card due-d"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.9)"
    >
      <div class="filter">
        <div class="left">权限管理-角色列表</div>
        <div class="right">
          <el-input v-model="search.role" placeholder="请输入角色名称"></el-input>
          <el-input v-model="search.phone" placeholder="请输入账号">
            <el-button slot="append" type="primary" @click="init()">搜索</el-button>
          </el-input>
          <el-button
            class="public-btn "
            @click="authDio(1)"
            type="primary"
            style="margin-left:30px"
          >新增角色</el-button>
        </div>
      </div>
      <div class="dd-table">
        <el-table :data="tableData">
          <el-table-column prop="id" label="编号">
            <template slot-scope="scope">{{(page-1)*10+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="user_num" label="成员数"></el-table-column>
          <el-table-column prop="zip" label="操作">
            <template slot-scope="scope">
              <div class="btn-box">
                <div class="btn-list" v-if="scope.row.role_type!='1'&&scope.row.role_type!='2'">
                  <el-button
                    type="text"
                    size="medium"
                    @click="authDio(2,scope.row.id,scope.row.name)"
                  >修改权限</el-button>
                </div>
                <div class="btn-list" :class="{'trunleft':scope.row.role_type=='1'||scope.row.role_type=='2'}">
                  <el-button type="text" size="medium" @click="checkMem(scope.row.id,scope.row.role_type)">查看成员</el-button>
                </div>
                <div class="btn-list" v-if="scope.row.role_type!='1'&&scope.row.role_type!='2'">
                  <el-button
                    type="text"
                    class="danger"
                    @click="deleteRole(scope.row.name,scope.row.id)"
                    size="medium"
                  >删除角色</el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <public-page ref="pagList" @getData="init"></public-page>
      <!-- <download :wordId="downloadId" :dialogVisible.sync="dialogVisible"></download> -->
      <auth-box
        ref="authPower"
        :setJurisdictionBox.sync="setJurisdictionBox"
        :type.sync="type"
        @init="init"
      ></auth-box>
    </div>
    <index-member :memberDialog.sync="memberDialog" :role_id="role_id" :role_type="role_type" @updataData="init"></index-member>
  </div>
</template>
<script>
import publicPage from "@@/page.vue";
import download from "@@/download.vue";
import authBox from "@@/authBox.vue";
import indexMember from "./indexMember.vue";
export default {
  components: {
    publicPage,
    download,
    authBox,
    indexMember
  },
  data() {
    return {
      type: 1, //1：新增角色，2：修改角色权限，3：查看权限
      setJurisdictionBox: false, //权限弹框
      loading: false,
      role_id: "",
      role_type: "",
      memberDialog: false,
      search: {
        role: "",
        phone: "",
        name: "company",
        text: ""
      },
      aims: "",
      page: 1,
      dialogVisible: false,
      downloadId: "",
      tableData: [],
      user_info: {}
    };
  },
  created() {
    this.init(1);
  },
  methods: {
    init(page) {
      var vm = this;
      vm.loading = true;
      page ? (vm.page = page) : "";
      var json = {
        token: this.Token,
        page: vm.page,
        limit: 10
        // name: vm.search.role,
        // phone: vm.search.phone
      };
      vm.user_info = JSON.parse(sessionStorage.getItem("userdata"));
      if (vm.search.role.length > 0) {
        json["name"] = vm.search.role;
      } else if (vm.search.phone.length > 0) {
        json["phone"] = vm.search.phone;
      }
      vm._postData("/Home/Role/MyRoleList.json", json, data => {
        vm.tableData = data.data.data;
        vm.$refs.pagList.page = parseInt(data.data.count);
        vm.$refs.pagList.size = 10;
        vm.loading = false;
      });
    },
    authDio(type, role_id, role_name) {
      var vm = this;
      vm.type = type;
      if (type == 1) {
        if (!vm.$fn.hasAuth("新增角色")) {
          vm.$store.commit("setNotAuth", true);
          return false;
        }
        vm.$refs.authPower.check_two = [];
        vm.$refs.authPower.show_list = [];
        vm.setJurisdictionBox = true;
      } else if (type == 2) {
        if (!vm.$fn.hasAuth("编辑角色（权限）")) {
          vm.$store.commit("setNotAuth", true);
          return false;
        }
        vm._getData(
          "Home/AuthRecursion/authRolePower.json?role_id=" + role_id,
          {},
          data => {
            vm.$refs.authPower.auth_list = data.data;
            vm.$refs.authPower.role_id = role_id;
            vm.$refs.authPower.role_name = role_name;
            vm.$refs.authPower.resetList();
            vm.setJurisdictionBox = true;
          }
        );
      }
    },
    handleClick(val) {
      this.aims = val;
      this.init(1, val);
    },
    openDownload(id) {
      this.downloadId = id;
      this.dialogVisible = true;
    },
    deleteRole(role_name, role_id) {
      var vm = this;
      if (!vm.$fn.hasAuth("删除角色")) {
        vm.$store.commit("setNotAuth", true);
        return false;
      }
      var json = {
        role_id: role_id
      };
      this.$confirm("您将删除【" + role_name + "】角色?", "请确认", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "el-button--text"
      })
        .then(() => {
          vm._postData("/Home/Role/RemoveUserRole.json", json, data => {
            vm.init();
            this.$message({
              message: role_name + "角色已成功删除",
              type: "success"
            });
          });
        })
        .catch(action => {});
    },
    checkMem(id,role_type) {
      var vm = this;
      if (!vm.$fn.hasAuth("查看角色组成员列表")) {
        vm.$store.commit("setNotAuth", true);
        return false;
      }
      this.role_id = id;
      this.role_type = role_type;
      this.memberDialog = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.jur {
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

