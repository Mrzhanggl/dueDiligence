<template>
  <div>
    <el-dialog
      title="角色成员"
      class="public line"
      :visible.sync="memberDialog"
      width="750px"
      top="23vh"
      :before-close="handleClose"
    >
      <div
        class="due-d"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.9)"
        style="margin-top:30px"
      >
        <div class="right">
          <div class="btn-box">
            <div style="display:inline-block">
              <el-input v-model="params.phone" placeholder="请输入账号"  @keyup.enter.native="init(1)">
                <el-button slot="append" type="primary" @click="init(1)">搜索</el-button>
              </el-input>
            </div>
            <el-button
              type="primary"
              class="public-btn sjcy"
              style="margin-left:30px;box-shadow: 0px 4px 10px 0px rgba(66, 133, 244, 0.24);"
              @click="newAdd"
            >新增成员</el-button>
          </div>
        </div>
        <div class="dd-table clear" style="padding-top: 30px;margin-bottom: 30px;">
          <el-table :data="tableData">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column label="账号">
              <template slot-scope="scope">
                <span class="Din-M">{{scope.row.phone}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  class="danger"
                  size="medium"
                  style="width:auto;height:auto"
                  :disabled="role_type == 1||role_type == 2"
                  @click="removeAcc(scope.row)"
                >移除人员</el-button>
              </template>
            </el-table-column>
          </el-table>
          <public-page ref="pagList" @getData="init"></public-page>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="新增成员"
      class="public account-input"
      :visible.sync="addDialog"
      width="480px"
      top="40vh"
      :before-close="handleAddClose"
    >
      <el-input v-model="phone" class="com-input" placeholder="请输入11位手机号">
        <div slot="prefix">账号：</div>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" class="cancel" @click=" handleAddClose()">取 消</el-button>
        <el-button type="primary" @click="moveMem()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import publicPage from "@@/page.vue";
export default {
  components: {
    publicPage
  },
  props: {
    memberDialog: {
      type: Boolean,
      default: false
    },
    role_id: {
      type: String,
      default: ""
    },
    role_type:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      api_role: "/Home/Role/MyRoleUser.json",
      api_remove: "/Home/UserPower/RemoveAccount.json",
      api_move: "/Home/UserPower/moveUser.json",
      api_change: "/Home/Role/moveUser.json",
      addDialog: false,
      params: {
        role_id: "",
        phone: "",
        page: 1,
        limit: 5
      },
      phone: "",
      loading: false,
      tableData: []
    };
  },
  watch: {
    memberDialog(newVal) {
      if (newVal) {
        this.params.role_id = this.role_id;
        console.log(this.role_type);
        
        this.init(1);
      }
    }
  },
  methods: {
    newAdd() {
      var vm = this;
      if (!vm.$fn.hasAuth("新增角色组成员")) {
        this.$store.commit("setNotAuth", true);
        return false;
      }
      vm.addDialog = true;
    },
    handleClose() {
      this.$emit("update:memberDialog", false);
      this.params = {
        role_id: "",
        phone: "",
        page: 1,
        limit: 5
      };
    },
    init(p) {
      let vm = this;
      vm.loading = true;
      p ? (vm.params.page = p) : "";
      vm._getData(vm.api_role, vm.params, data => {
        vm.tableData = data.data.data;
        vm.$refs.pagList.page = parseInt(data.data.count);
        vm.$refs.pagList.size = 5;
        vm.loading = false;
      });
    },
    removeAcc(obj) {
      var vm = this;
      if (!vm.$fn.hasAuth("移除角色组成员")) {
        this.$store.commit("setNotAuth", true);
        return false;
      }
      this.$confirm(
        `您将把【<span class="Din-M">${obj.phone}</span>】从【${obj.role_name}】角色移除`,
        "请确认",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "el-button--text"
        }
      )
        .then(() => {
          this.removeData(obj.id);
        })
        .catch(() => {});
    },
    removeData(id) {
      let vm = this;
      //移除成员默认是移动到用户组
      console.log('id:',id);
      
      vm._postData(vm.api_change, {user_id: id }, data => {
        vm.$message.success(data.msg);
        vm.init();
        vm.$emit("updataData");
      });
    },
    handleAddClose() {
      this.addDialog = false;
      this.phone = "";
    },
    moveMem() {
      let vm = this;
      let params = {
        role_id: vm.role_id,
        phone: vm.phone
      };
      console.log(params);
      vm._postData(vm.api_move, params, data => {
        vm.$message.success(data.msg);
        vm.phone = "";
        vm.$emit("updataData");
        vm.init();
      });
    }
  }
};
</script>
