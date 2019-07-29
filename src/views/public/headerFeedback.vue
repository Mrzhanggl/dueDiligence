<template>
  <el-dialog title="意见反馈" class="public public-animat" :visible.sync="dialogVisible" width="480px" top="23vh" :before-close="handleClose">
    <el-input  type="textarea"
  :rows="12"  :maxlength="2000" show-word-limit v-model="feedback" placeholder="请输入内容" ></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button type="text" class="cancel" @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="submitFeedback()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import $ from "jquery"
import Cookies from 'js-cookie'
export default {
  props:{
      dialogVisible:{
        type:Boolean,
        default:false
      }
  },
  data() {
    return {
         feedback:""
    };
  },
  methods: {
    handleClose(){
      this.$emit("update:dialogVisible",false)
    },
    // 反馈提交
    submitFeedback(){
      var vm = this
      var msg=$.trim(vm.feedback) 
      if(msg==''){
        vm.$message.error('请输入反馈信息')
        return;
      }
      var json = {
        message:msg,
        token:Cookies.get('token')
      }
       vm._postData('/Home/User/pushMessage.json',json,(data)=>{
         this.$emit("update:dialogVisible",false)
       })
    }
  }
};
</script>
