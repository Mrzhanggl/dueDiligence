<template>
  <div class="container-box header_main container">
    <div class="header">
      <div class="law-office hd-mid web-font" @click="comeBack()">{{person.enterprise}}</div>
      <div class="global hd-mid">
        <!-- <div class="search"></div> -->
        <el-input
          v-model="search"
          class="search"
          placeholder="请输入企业名称"
          @keyup.enter.native="searchData()"
          :disabled="!$fn.hasAuth('快捷搜索')"
        >
          <i slot="suffix" class="btn iconfont icon-sousuo" @click="searchData()"></i>
        </el-input>
      </div>
      <div class="new-due">
        <span @click="goPro()"  v-if="!($route.name == 'processIndex')">
          <el-button type="primary"   class="btn" icon="iconfont icon-jia">新增尽调</el-button>
        </span>
      </div>
      <div class="feedback hd-mid">
        <div class="box" @click="handleClick">
          <i class="iconfont icon-xinxi" style="color:#9EA8B1"></i>
          <div class="box-word">反馈</div>
        </div>
      </div>
      <el-tooltip placement="bottom" effect="light">
        <div slot="content"  class="hd-setting">
          <div  v-show="$fn.hasAuth('权限管理')" class="hd-set-item" @click="goJur()"><span class="iconfont icon-team"></span>权限管理</div>
          <div v-show="$fn.hasAuth('账户管理')" class="hd-set-item" @click="goAcc()"><span class="iconfont icon-idcard"></span>账号管理</div>
          <div  v-show="$fn.hasAuth('尽调额度分配')" class="hd-set-item" @click="goQuota()"><span class="iconfont icon-piechart"></span>尽调额度分配</div>
          <div class="hd-set-item" @click="goUserPP()"><span class="iconfont icon-solution"></span>用户协议</div>
          <div class="hd-set-item" @click="setPswDialog = true"><span class="iconfont icon-lock"></span>修改密码</div>
          <div class="hd-set-item" @click="goOut()"><span class="iconfont icon-export"></span>退出登陆</div>
        </div>
        <div class="header-img hd-mid">
          <img :src="header_img" />
          <div class="hd-icon"></div>
        </div>
      </el-tooltip>
      <header-feedback :dialogVisible.sync="dialogVisible"></header-feedback>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="setPswDialog"
      width="480px" class="public" style="margin-top:17vh;">
      <!-- <div class="account">
        账号：<input disabled type="text" value="1332435235325">
      </div> -->
    <!-- <el-input v-model="issue_unit" class="com-input" @change="handleClick">
      <div slot="prefix">账号：</div>
    </el-input> -->
     <el-input  v-model="person.phone" class="com-input account" disabled>
      <div slot="prefix">账号：</div>
    </el-input>
    <el-input v-model="newPassword" minlength='6'  onKeyUp="value=value.replace(/[\W^_]/g,'')" maxlength='12' :show-password="true"  class="com-input" :autocomplete="'new-password'">
      <div slot="prefix">新密码：</div>
    </el-input>
    <el-input v-model="secPassword" minlength='6'  onKeyUp="value=value.replace(/[\W^_]/g,'')" maxlength='12' style="margin-bottom:0px;"  :show-password="true" class="com-input"  :autocomplete="'new-password'">
      <div slot="prefix">确认密码：</div>
    </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setPswDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitSet()">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>
<script>
import Cookies from 'js-cookie';
import headerFeedback from "./headerFeedback.vue";
export default {
  components: {
    headerFeedback
  },
  data() {
    return {
      setJurisdictionBox:'',
      newPassword:'',
      secPassword:'',
      setPswDialog:false,
      law_name: "",
      header_img: "",
      search: "",
      dialogVisible: false,
      person:{},
    };
  },
  watch:{
      person:{
        handler:function(newVal){
            console.log(newVal);
            this.law_name = newVal.enterprise;
            this.header_img = newVal.header_img;
        },
        deep:true
      }
  },
  mounted() {
    this.$route.name == "searchIndex"
      ? (this.search = this.$route.query.searchtext)
      : "";
  },
  methods: {
    goPro(){
      var vm = this
      if(!vm.$fn.hasAuth('新增尽调')){
      vm.$store.commit("setNotAuth",true)
        return false
      }
      vm.$router.push('/index/processIndex');
    },
    goOut(){
      var vm = this
      vm._postData('/Home/UserPower/loginOut.json',{},(data)=>{
           Cookies.remove('token');
           vm.$router.push('/login');
         })
       
    },
    goJur(){
      this.$router.push('/index/jurisdictionIndex');
    },
    goAcc(){
      this.$router.push('/index/accountIndex');
    },
    goQuota(){
      this.$router.push('/index/quotaIndex');
    },
    submitSet(){
      var vm = this;
      vm.newPassword = vm.newPassword.replace(/\s+/g,""); 
       vm.secPassword = vm.secPassword.replace(/\s+/g,""); 
       if(vm.newPassword==''){
         this.$message.error('请输入密码');
         return false;
       }
       if(vm.newPassword.length<6){
         this.$message.error('密码不得少于六位数');
         return false;
       }
       if(vm.newPassword!= vm.secPassword){
         this.$message.error('密码不一致，请重新输入');
       }else{
         var json = {
           password:vm.newPassword
         }
         vm._postData('/Home/UserPower/changePassWord.json',json,(data)=>{
            vm.setPswDialog = false;
            this.$router.push('/login');
            vm.$message({
              message: '恭喜你，成功修改密码,请重新登陆',
              type: 'success'
            });
         })
       }
    },
    comeBack(){
      this.$router.push('/index/homeIndex');
    },
    goUserPP() {
      this.$router.push("/index/datauserProtocol");
    },
    handleClick() {
      var vm = this
      if(!vm.$fn.hasAuth('反馈')){
      this.$store.commit("setNotAuth",true)
        return false
      }
      this.dialogVisible = true;
    },
    searchData() {
      var vm = this;
      if(!vm.$fn.hasAuth('快捷搜索')){
      this.$store.commit("setNotAuth",true)
        return false
      }
      
      vm.search = vm.search.replace(/\s+/g,"");     
      if (vm.search == "") {
        vm.$message.error("企业名不能为空");
        return;
      }
      this.$router.push({
        name: "searchIndex",
        query: { searchtext: vm.search }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$sreach-wd: 620px;
$sreach-hg: 52px;
.hd-setting{
  padding: 0;
  font-size:16px;
  font-weight:400;
  color:rgba(85,102,117,1);
  line-height:16px;
  width: 176px;
  cursor: pointer;
  .hd-set-item{
    width: 100%;
    height: 52px;
    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(85,102,117,1);
    line-height:52px;
    
    >span{
      font-size: 20px;
      margin-left: 17px;
      vertical-align: middle;
      margin-right: 8px;
    }
    &:hover{
      background:rgba(66,133,244,.15);
    }
  }
}
.com-input{
  margin-bottom: 20px;
}
.header {
  width: 1740px;
  margin: 0 auto;
  height: 74px;
  .hd-mid {
    display: inline-block;
    vertical-align: middle;
  }
  .law-office {
    width: 341px;
    height: 74px;
    line-height: 74px;
    font-size: 20px;
    font-weight: bold;
    color: $theme-color;
    text-align: left;
    cursor: pointer;
  }
}
.global {
  position: relative;
  width: 1041px;
  height: 100%;
  .search {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -($sreach-hg/2) 0px 0px 0- ($sreach-wd/2);
    width: $sreach-wd;
    height: $sreach-hg;
    border-radius: 4px;
    .icon-sousuo {
      color: #fff;
      font-size: 33px;
    }
    .icon-sousuo.btn {
      display: inline-block;
      width: 42px;
      height: 42px;
      background: $theme-color;
      line-height: 42px;
      border-radius: 4px;
      font-weight: 600;
      transition: all .3s;
      &:hover,
      &:focus {
        background: #689df6;
        border-color: #689df6;
        color: #ffffff;
        
      }
      &:active {
        background: #3b78dc;
        border-color: #3b78dc;
        color: #ffffff;
        outline: none;
      }
    }
  }
}
.new-due {
  display: inline-block;
  width: 150px;
  transition: all .3s;
  &:hover{
    transform: translateY(-3px);
  }
  .btn {
    width: 150px;
    height: 52px;
    box-shadow: 0px 4px 10px 0px rgba(66, 133, 244, 0.24);
  }
  .iconfont {
    margin-right: 11px;
  }
}
.feedback {
  padding: 12px 53px 6px 53px;
  .box {
    width: 34px;
    height: 46px;
    text-align: center;
    cursor: pointer;
    .iconfont {
      color: rgba(158, 168, 177, 1);
      font-weight: 600;
      font-size: 21px;
    }
    .box-word {
      padding-top: 3px;
      width: 100%;
      height: 14px;
      font-size: 14px;
      line-height: 14px;
      font-family: Alibaba-PuHuiTi-M;
      font-weight: 500;
      color: rgba(158, 168, 177, 1);
    }
  }
}
.header-img {
  position: relative;
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
  }
  .hd-icon{
    position: absolute;
    right: -22px;
    top:0;
    bottom: 0;
    margin: auto;
    width: 0;
    height: 0;
    border-top: 6px solid #556675;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
     }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  $sreach-wd: 524px;
  $sreach-hg: 52px;
  .header {
    width: 1300px;
    .law-office {
      width: 314px;
    }
  }
  .global {
    width: 629px;
    .search {
      margin: -($sreach-hg/2) 0px 0px 0- ($sreach-wd/2);
      width: $sreach-wd;
    }
  }
}
</style>
