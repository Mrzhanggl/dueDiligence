<template>
  <el-dialog title="尽调额度分配" class="public line" :visible.sync="dialogVisible" width="750px" top="23vh" :before-close="handleClose">
   
   <div
    class="due-d "
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)"
  >
    <div class="dd-table" style="margin-top:30px">
      <el-table :data="tableData">
        <el-table-column prop="product" label="商品名称"></el-table-column>
        <el-table-column prop="residue" label="可分配额度"></el-table-column>

        <el-table-column  label="分配额度">
          <template slot-scope="scope">
          <el-input-number :debounce="500" v-model="scope.row.allotNum" :controls="false"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
    </div>
   </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="text" class="cancel" @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="allotNum()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import publicPage from "@@/page.vue";
export default { 
  components: {
    publicPage,
  },
  props:{
      dialogVisible:{
        type:Boolean,
        default:false
      },
      accId:{
        type:Number,
        default:0
      },
      residueNum:{
        type:Number,
        default:0
      }
  },
  data() {
    return {
        api_allocations:"/Home/Quota/giveQuota.json",
        params:{
          id:"",
          nums:0
        },
        loading:false,
        tableData:[{
          product:"生成尽调报告",
          residue :0,
          allotNum:0
        }]
    };
  },
  watch:{
       dialogVisible(newVal){
         if(newVal){
           this.params.id = this.accId;
           this.tableData[0].residue =this.residueNum;
         }
       }
  },
  methods: {
    handleClose(){

      this.$emit("update:dialogVisible",false)
      this.params={
          id:"",
          nums:0
        }
         this.tableData[0].allotNum =0;
    },
    allotNum(){
      if(this.residueNum < this.tableData[0].allotNum){
          this.$message.error("额度不足，请及时申请调额。")
          return false;
      }
        let vm =this;
        let params = {
          id:vm.accId,
          nums:vm.tableData[0].allotNum
        }
        vm._postData(vm.api_allocations,params,data => {
                 vm.$message.success(data.msg)
                 vm.handleClose()
                 this.$emit("updateData",1)
        })
    }
  }
};
</script>
