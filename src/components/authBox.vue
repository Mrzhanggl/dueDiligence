<template>
    <el-dialog class="auth-box public" :visible.sync="setJurisdictionBox"  :before-close="handleClose">
      <div class="qc-tc-main">
        <div class="qc-tc-tt">{{dialogTitle[type]}}</div>
        <div v-if="type!=3" class="check-auth">
            <el-input  v-model="role_name" class="com-input " >
            <div slot="prefix">角色名称：</div>
            </el-input>
        </div>
        
        <div class="qc-tc-box">
          <div class="qc-tc-box3">
            <div
              v-for="(item,index) in check_list"
              :key="index"
              class="qc-tc-boxone-item"
              :class="{'active':check_first==item.auth_id}"
              @click="changeFlist(index)"
              v-show="showAuthOrd(item.name)"
            >
              {{item.name}}
              <span
                @click="check_one(item,index)"
                class="qc-tc-boxone-item-check"
                :class="{'active':haveOne(item.auth_id)&&type!='3','look-active':haveOne(item.auth_id)&&type=='3'}"
              >
                <img v-if="haveOne(item.auth_id)&&type=='3'" src="@img/quickCheck/doneicon.png" />
                <img v-else src="@img/quickCheck/gougouicon.png" />
              </span>
            </div>
          </div>
          <div class="qc-tc-box3">
            <div v-for="(item,index) in check_second" :key="index"  v-show="showAuthOrd(item.name)" class="qc-tc-boxone-item">
              {{item.name}}
              <span
                @click="check_finsh(item,index)"
                class="qc-tc-boxone-item-check"
                :class="{'active':haveOne(item.auth_id)&&type!='3','look-active':haveOne(item.auth_id)&&type=='3'}"
              >
                <img v-if="haveOne(item.auth_id)&&type=='3'" src="@img/quickCheck/doneicon.png" />
                <img  v-else src="@img/quickCheck/gougouicon.png" alt />
              </span>
            </div>
          </div>
          <div class="qc-tc-box3 qc-tc-boxts">
            <div class="qc-tc-boxlast-tt">该角色权限明细有：</div>
            <div class="qc-tc-boxlast-item" v-for="(item,index) in show_list" :key="index" >
              {{item.name}}
              <span></span>
              <div class="qc-tc-back-item" v-for="(el,i) in lis(item.auth_id)" :key="i">
                {{el.name}}
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="qc-tc-allcheck">
          全选
          <span :class="{'active':check_two.length==31}" @click="allCheck()">
            <img src="@img/quickCheck/gougouicon.png" alt />
          </span>
        </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()" >取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
import { type } from 'os';
export default {
   data() {
      return {
        role_id:'',
        role_name:'',
        role_type:'',
        auth_list:[

        ],
        show_list:[

        ],
        dialogTitle:{
          1:'新增角色',
          2:'修改权限',
          3:'查看权限'
        },
      // 所有权限
      check_list: [
        
      ],
      // 当前预览选中的一级权限
      check_first: "1",
      // 当前勾选中的一级权限
      check_first_list: [],
      // 当前二级权限展示数组
      check_second: [],
      //当前选择的所有权限
      check_two: [],
      second_bind: {
      },
      }
   },
   props:[
       'setJurisdictionBox','type'
   ],
   created(){
         this.init()
   },
   computed:{
   },
   watch:{
   },
   methods: {
    //  权限显示限制
     showAuthOrd(name){
       var vm = this
       var right = true
       if((name=='尽调额度分配'&&vm.type==1)||(name=='尽调额度分配'&&vm.type==2)){
         right = false
       }
       if((name=='查看成员尽调记录'&&vm.type==1)||(name=='查看成员尽调记录'&&vm.type==2)){
         right = false
       }
       if((name=='下载成员尽调报告'&&vm.type==1)||(name=='下载成员尽调报告'&&vm.type==2)){
         right = false
       }
       if(vm.type==3&&vm.role_type!='1'){
         if(name=='尽调额度分配'||name=='查看成员尽调记录'||name=="下载成员尽调报告"){
            right = false
          }
       }
       return right
     },
    //  修改权限权限更新
     resetList(){
       var vm = this
       vm.check_two = []
       vm.show_list = []
       vm.auth_list.forEach((el)=>{
         vm.check_two.push({
          auth_id:el.auth_id,
          name:el.name,
          type:1,
          back_id:el.back_id,
          status:2,
          next:[],
         })
         if(el.next.length>0){
           el.next.forEach((item)=>{
             vm.check_two.push({
                auth_id:item.auth_id,
                name:item.name,
                type:2,
                back_id:item.back_id,
                status:2,
                next:[],
              })
           })
         }
       })
      vm.change()
       console.log(vm.check_two)
     },
     submit(){
       
       var vm = this 
       if(vm.type==3){
         return false
       }
       vm.role_name = vm.role_name.replace(/\s+/g,'');
       if(!vm.role_name){
         return  vm.$message.error('请输入角色名称')
       }
       if(vm.check_two.length==0){
         return  vm.$message.error('请至少选择一项权限')
       }
       var json = {
         role_name:vm.role_name,
         auth_list:vm.check_two,
       }
       if(vm.type==2){
         json['role_id']=vm.role_id
       }
       vm._postData('/Home/AuthRecursion/saveAuth.json',json,(data)=>{
             this.$emit('init');
             this.$emit('update:setJurisdictionBox',false);
             if(vm.type==1){
                this.$message({
                message:vm.role_name+ '角色创建成功',
                type: 'success'
              });
             }
             if(vm.type==2){
                this.$message({
                message:vm.role_name+ '角色权限已修改',
                type: 'success'
              });
             }
       })
     },
     lis(auth_id){
       var vm = this;
       var list=[]
       vm.check_two.forEach((el)=>{
          if(el.back_id==auth_id){
            if(vm.type==1||vm.type==2){
              if(el.name!='查看成员尽调记录'){
                list.push(el)
              }
            }else{
               list.push(el)
            }
            
          }
       })
       return list
     },
     change(){
        var vm = this;
        vm.show_list=[];
        vm.check_two.forEach((el)=>{
          if(el.back_id==0){
              vm.show_list.push(el)
          }
        })

     },
     init(){
       var vm = this
        vm._getData('/Home/AuthRecursion/authList.json',{},(data)=>{
            vm.check_list=data.data
            console.log(vm.check_list)
        })
     },
      handleClose(){
          this.$emit('update:setJurisdictionBox',false);
      },
      allCheck(){
          if(this.check_two.length==31){
              this.check_two=[]
              this.check_first_list=[]
          }else{
              this.check_two=[]
              this.check_first_list=[]
              for(var key in this.second_bind){
                  this.check_two.push(key)
              }
              this.check_list.forEach((el,index)=>{
                  for(var k in el){
                       this.check_first_list.push(k)
                  }
              })
              
          }
      },
    haveOne(auth_id) {
       var vm = this
       var bt = false
        vm.check_two.forEach((el,index)=>{
          if(el.auth_id==auth_id){
            bt = true
          }
        })
        return bt
    },
    // 点击二级分类勾勾
    check_finsh(item,i){
        var vm = this
        var has = false
        if(vm.type==3){
         return false
       }
        vm.check_two.forEach((el,index,arr)=>{
           if(item.auth_id == el.auth_id){
              has = true
           }
        })
        // 取消二级勾选
        if(has){
           vm.check_two = vm.check_two.filter(el => el.auth_id!=item.auth_id)
           var hasSec = false
            vm.check_two.forEach((el,index)=>{
              if(el.back_id==item.back_id){
                hasSec = true
              }
            })
            if(!hasSec){
              vm.check_two = vm.check_two.filter(el => el.auth_id!=item.back_id)
            }
            // 勾上二级勾选
        }else{
          vm.check_two.push({
            auth_id:item.auth_id,
            name:item.name,
            type:2,
            back_id:item.back_id,
            status:2,
          })
          if(!vm.haveOne(item.back_id)){
            vm.check_list.forEach((el)=>{
               if(el.auth_id==item.back_id){
                 vm.check_two.push({
                  auth_id:el.auth_id,
                  name:el.name,
                  type:1,
                  back_id:el.back_id,
                  status:2,
                  next:[],
                 })
               }
            })
          }
        }
        vm.change()
    },
    //   点击一级分类勾勾
    check_one(item, i) {
        var vm = this
        var has = false
        if(vm.type==3){
         return false
       }
        vm.check_two.forEach((el,index,arr)=>{
           if(item.auth_id == el.auth_id){
              has = true
           }
        })
       if(has){
         vm.check_two = vm.check_two.filter(el => el.auth_id!=item.auth_id&&el.back_id!=item.auth_id)
       }else{
          vm.check_two.push({
            auth_id:item.auth_id,
            name:item.name,
            type:1,
            back_id:item.back_id,
            status:2,
            next:[],
          })
          if(item.next.length!=0){
            item.next.forEach((el,index)=>{
              vm.check_two.push({
                auth_id:el.auth_id,
                name:el.name,
                type:2,
                back_id:el.back_id,
                status:2,
              })
            })
          }
       }
       vm.change()
    },
    // 点击一级分类文字预览二级分类
    changeFlist(i) {
      var vm = this;
      vm.check_first = vm.check_list[i].auth_id;
      vm.check_second = vm.check_list[i].next;
    },
   }
}
</script>
<style lang="scss" scoped>
//新增角色框
.qc-tc-main {
    width: 100%;
    position: relative;
    .check-auth{
         width:420px;
         height: 52px;
         margin-left: 20px;
         margin-bottom: 20px;
    }
    > .qc-tc-allcheck {
      position: absolute;
      bottom: -48px;
      left: 50px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(13, 26, 38, 1);
      line-height: 20px;
      box-sizing: border-box;
      position: relative;
      width: 50px;
      > span {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: -30px;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(230, 233, 235, 1);
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;
        > img {
          display: block;
          width: 100%;
        }
      }
      > .active {
        background: $theme-color;
        border: none;
      }
    }
    .qc-tc-tt {
      font-size: 20px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: rgba(13, 26, 38, 1);
      line-height: 72px;
      margin-left: 30px;
    }
    .qc-tc-box {
      width: 100%;
      height: 360px;
      border-bottom: 2px solid #e6e9eb;
      border-top: 2px solid #e6e9eb;

      .qc-tc-box3 {
        float: left;
        box-sizing: border-box;
        width: 248px;
        height: 100%;
        border-right: 2px solid #e6e9eb;
        overflow-y: auto;

        .qc-tc-boxone-item {
          width: 100%;
          height: 60px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(13, 26, 38, 1);
          line-height: 60px;
          box-sizing: border-box;
          padding-left: 50px;
          position: relative;
          cursor: pointer;
          .qc-tc-boxone-item-check {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            left: 20px;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 1);
            border: 2px solid rgba(230, 233, 235, 1);
            border-radius: 4px;
            box-sizing: border-box;
            cursor: pointer;
            > img {
              display: block;
              width: 100%;
            }
          }
          .active {
            background: $theme-color;
            border: none;
          }
          .look-active{
            background: rgba(244,246,249,1);
            border: 2px solid rgba(230,233,235,1);
            border-radius: 4px;
            
          }
        }
        .qc-tc-boxone-item:hover {
          background: #edf3fe;
        }
        > .active {
          background: #d9e7fd;
        }
      }
      .qc-tc-box3::-webkit-scrollbar-button {
        display: none;
      }
      .qc-tc-boxts {
        border-right: none;
        background: rgba(247, 249, 251, 1);
        .qc-tc-boxlast-tt {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(85, 102, 117, 1);
          line-height: 1;
          margin-top: 21px;
          margin-bottom: 5px;
          margin-left: 20px;
        }
        .qc-tc-boxlast-item {
          width: 100%;
          box-sizing: border-box;
          padding-left: 40px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(85, 102, 117, 1);
          line-height: 38px;
          position: relative;
          >span {
            width: 4px;
            height: 4px;
            background: rgba(85, 102, 117, 1);
            border-radius: 50%;
            position: absolute;
            top:17px;
            margin: auto;
            left: 20px;
          }
          >.qc-tc-back-item{
            box-sizing: border-box;
            padding-left: 20px;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(85, 102, 117, 1);
            line-height: 38px;
            position: relative;
            >span {
              width: 4px;
              height: 4px;
              background: rgba(85, 102, 117, 1);
              border-radius: 50%;
              position: absolute;
              top:17px;
              margin: auto;
              left:0px;
            }
          }
        }
      }
    }
  }
.qc-tc-box3::-webkit-scrollbar{  
    width: 6px;  
}  
.qc-tc-box3::-webkit-scrollbar-thumb{  
    background-color: #556675;  
}  
</style>

