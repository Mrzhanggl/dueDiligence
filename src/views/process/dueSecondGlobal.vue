<template>
  <el-dialog
    title="全局修改"
    class="public"
    :visible.sync="dialogVisible"
    width="480px"
    top="303px"
    :before-close="handleClose"
  >
    <el-input v-model="issue_unit" class="com-input" @change="handleClick">
      <div slot="prefix">出具单位：</div>
    </el-input>
    <el-input v-model="target_company" class="com-input"  @change="handleChange">
      <div slot="prefix">目标公司：</div>
    </el-input>
    <!-- <due-select></due-select> -->
    <div class="due-input-f">
      <el-date-picker
        v-model="time"
        class="com-input"
        :clearable="false"
        :popper-append-to-body="false"
        @change="handleTime"
      ></el-date-picker>
      <span>尽调截止日：</span>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="text" class="cancel" @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="handleClose()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import dueSelect from "./dueSelect";
import { time } from 'highcharts';
export default {
  components: {
    dueSelect
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      feedback: "",
      issue_unit: "",
      target_company: "",
      time: ""
    };
  },
   watch: {
    "$store.state.stepId": function(newVal) {
      if (newVal == 2) {
        let params = this.$store.state.dueParams;
        this.target_company = params.company;
      }
    }
  },
  created() {
    this.time=new Date()
    this.handleTime(this.time);
    this.issue_unit = JSON.parse(sessionStorage.getItem("userdata")).enterprise;
    this.$store.commit("setDueParams", {cj_company:this.issue_unit}); 
  },
  methods: {
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    handleTime(val){
          console.log(val);
          let params = {
              year:val.getFullYear(),
              month:val.getMonth()+1,
              day:val.getDate()
          }
           this.$store.commit("setDueParams", params); 

    },
    handleClick(val){
         this.$store.commit("setDueParams", {cj_company:val}); 
    },
    handleChange(val){
         this.$store.commit("setDueParams", {company:val}); 
    }
  }
};
</script>
<style lang="scss" scoped>
.com-input:nth-child(n + 2) {
  margin-top: 20px;
}
.due-input-f {
  margin-top: 20px;
  width: 100%;
  position: relative;
  height: 52px;
  line-height: 52px;
  > span {
    font-size: 16px;
    color: #9ea8b1;
    line-height: 52px;
    position: absolute;
    top: 0;
    left: 20px;
  }
}
</style>
