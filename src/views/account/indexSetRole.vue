<template>
  <el-dialog
    :title="isAdd?'新增账号':'角色设置'"
    :visible.sync="roleDialog"
    width="480px"
    top="28vh"
    class="public account-input"
    :before-close="handleClose"
  >
    <el-input v-model="params.name"  onKeyUp="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'')"  maxlength='12'   class="com-input third" placeholder="请输入用户名" v-if="isAdd">
      <div slot="prefix">用户名：</div>
    </el-input>
    <el-input v-model="params.phone" onKeyUp="value=value.replace(/[^0-9]/g,'')"  maxlength='11'  class="com-input" style="margin-top:20px;" placeholder="请输入11位手机号" :disabled="!isAdd">
      <div slot="prefix">账号：</div>
    </el-input>
    <el-select
      v-model="params.role_id"
      placeholder="请选择角色"
      class="select search"
      style="width:100%;margin-top:20px"
      :popper-append-to-body="false"
      @change="roleChange"
    >
      <template slot="prefix">角色：</template>
      <el-option v-for="(item,index) in role_list" :key="index" :label="item.name" v-show="item.role_type !=1" :value="item.id"></el-option>
    </el-select>
    <div v-if="isAdd" class="caption">账号创建成功后，账号信息将推送至申请人手机。</div>
    <span slot="footer" class="dialog-footer">
      <el-button type="text" class="cancel" @click=" handleClose()">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    roleDialog: {
      type: Boolean,
      default: false
    },
    role_list: {
      type: Array,
      default: () => []
    },
    roleObj: {
      type: Object,
      default: () => {}
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      api_creat: "/Home/UserPower/createAccount.json",
      api_change: "/Home/UserPower/changeUserRole.json",
      params: {
        role_id: "",
        phone: "",
        name: "",
        id: ""
      }
    };
  },
  watch: {
    roleDialog(newVal) {
      if (newVal) {
        this.params.phone = this.roleObj.phone;
        this.params.name = this.roleObj.username;
        this.params.role_id = this.roleObj.role_id;
        if (!this.roleObj.id) {
          delete this.params.id;
        } else {
          this.params.id = this.roleObj.id;
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:roleDialog", false);
      this.params = {
        role_id: "",
        phone: "",
        name: "",
        id: ""
      };
    },
    roleChange(val) {
      this.params.role_id = val;
    },
    submit() {
      let vm = this;
      let api = vm.isAdd ? vm.api_creat : vm.api_change;
      console.log(vm.params);
      
      vm.params.name = vm.params.name.replace(/\s+/g,""); 
      if(vm.params.name==''&&vm.isAdd){
            vm.$message.error("用户名不能为空") 
            return false;
      }
      if(!(/^1(0|3|4|5|6|7|8|9)[0-9]\d{8}$/.test(vm.params.phone))&&vm.isAdd ){
            vm.$message.error("手机号不正确且不能为空") 
            return false;
      }
      
      if(vm.params.role_id==''&&vm.isAdd){
            vm.$message.error("请选择角色") 
            return false;
      }
      let params = vm.isAdd
        ? {
            role_id: vm.params.role_id,
            phone: vm.params.phone,
            name: vm.params.name
          }
        : {
            role_id: vm.params.role_id,
            user_id: vm.params.id,
            name: vm.params.name
          };

      vm._postData(api, params, data => {
        vm.$message.success(data.msg);
        vm.handleClose();
        vm.$emit("updateData", 1);
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.caption {
  // width: 100%;
  margin-top: 10px;
  // margin-left: 20px;
}
</style>