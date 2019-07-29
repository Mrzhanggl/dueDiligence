<!--  -->
<template>
  <div class="duefall">
    <div class="duef-main">
      <div class="change">
        <span class="text" style="cursor: pointer;" >换</span>
      </div>
      <div class="due-input-f">
        <el-select v-model="value_md" class="search" filterable placeholder="请选择" :popper-append-to-body="false">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>尽调目的：</span>
      </div>
      <div class="due-input-f due-input-d">
        <el-select
          v-model.trim="value_mb"
          clearable
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
          :popper-append-to-body="false"
          @change="handleChange"
        >
          <el-option v-for="(item,index) in companys" :key="index" :label="item.name" :value="item.id">
            <span
              style="display:block; font-size:16px; color:#556675; line-height:32px;margin-top:8px"
            >{{item.name}}</span>
            <span
              style="display:block; font-size:16px; color:#556675; line-height:32px;"
            >法人股东：{{item.oper_name}} &nbsp&nbsp|&nbsp&nbsp {{item.status}}</span>
          </el-option>
        </el-select>
        <span>目标公司：</span>
        <router-link class="due-cheak" :to="{name:'qixinbaoIndex',query:routeObj}" v-show="!!value_mb">查看</router-link>
      </div>
      <div class="due-input-f due-input-s due-input-d">
        <el-select
          v-model="value_tz"
          clearable
          filterable
          remote
          reserve-keyword
          disabled
          placeholder="请输入关键词"
          :remote-method="remoteMethodInvest"
          :loading="loading"
          :popper-append-to-body="false"
        >
          <el-option v-for="item in invest" :key="item.id" :label="item.name" :value="item.id">
            <span
              style="display:block; font-size:16px; color:#556675; line-height:32px;margin-top:8px"
            >{{item.name}}</span>
            <span
              style="display:block; font-size:16px; color:#556675; line-height:32px;"
            >法人股东：{{item.oper_name}} &nbsp&nbsp|&nbsp&nbsp {{item.status}}</span>
          </el-option>
        </el-select>
        <span>投资方：</span>
        <router-link class="due-cheak" to="{}" v-show="!!value_tz">查看</router-link>
      </div>
    </div>
    <div class="next primary-btn" @click="nextClick">下一步</div>
    <div class="next-tip">
      点击下一步，即表示您已同意
      <router-link to="/index/datauserProtocol">《用户协议》</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
      api_company: "/Home/Enterprise/search.json",
      options: [
        {
          value: "投融资",
          label: "投融资"
        },
        {
          value: "银行授信",
          label: "银行授信"
        },
        {
          value: "IPO",
          label: "IPO"
        }
      ],
      companys: [],
      invest: [],
      value_md: "投融资", //尽调目的
      value_mb: "", //目标公司
      value_tz: "", //投资方
      loading: false,
      routeObj:{}
    };
  },

  components: {},

  computed: {},

  created() {
    
    if (this.$route.query.type) {
      let params =JSON.parse(sessionStorage.getItem('business')) 
      this.value_mb = params.id;
      this.routeObj={eid:params.qxb_id,id:params.enterprise_id,name:params.name}
      this.companys.push(params);
    }
  },
  methods: {
    changeCom() {
      var a = this.value_mb;
      this.value_mb = this.value_tz;
      this.value_tz = a;
      [this.invest, this.companys] = [this.companys, this.invest];
    },
    //投资方搜索
    remoteMethodInvest(query) {
      let vm = this;
      query = query.replace(/\s+/g,"");   
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          vm.getData(query, "invest");
        }, 200);
      } else {
        this.invest = [];
      }
    },
    //目标公司搜索
    remoteMethod(query) {
      let vm = this;
      query = query.replace(/\s+/g,"");  
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          vm.getData(query, "companys");
        }, 200);
      } else {
        this.companys = [];
      }
    },
    getData(name, type) {
      let vm = this;
      let params = {
        name: name,
        token: this.Token
      };
      vm._getData(vm.api_company, params, data => {
        vm.loading = false;
       
        type === "companys"
          ? (vm.companys = data.data.data)
          : (vm.invest = data.data.data);
        console.log(data);
      });
    },
    handleChange(value) {
    for(let item of this.companys){
      if(item.id == value){
         sessionStorage.setItem('business',JSON.stringify(item))
         this.routeObj={eid:item.qxb_id,id:item.id,name:item.name}
      }
    }  
    },
    nextClick() {
      let vm = this;

      this.person = JSON.parse(sessionStorage.getItem("userdata"));
      console.log(this.person.jd_times );
      
      if(this.person.jd_times == 0){
        this.$message.error("当前用户尽调额度不足");
        return false;
      }

      if (this.value_md == "") {
        this.$message.error("请选择尽调目的");

        return false;
      }
      if (this.value_mb == "") {
        this.$message.error("请选择目标公司");
        return false;
      }
      let params = {
        key_map: {},
        enterprise_id: "",
        company: "",
        investor: "",
        corporate: "",
        aims: this.value_md,
        status: ""
      };

      vm.companys.map(item => {
        if (item.id == vm.value_mb) {
          params.enterprise_id = item.id;
          params.company = item.name;
          params.originalCompany = item.name;
          params.corporate = item.oper_name;
          params.status = item.status;
        }
      });
      vm.invest.map(item => {
        if (item.id == vm.value_tz) {
          params.investor = item.name;
        }
      });
      this.$store.commit("setDueParams", {company:""});
      this.$store.commit("setDueParams", params); //必须位于步骤变化之前
      this.$store.commit("setStep", 2);

      console.log(this.$store.state.dueParams);
    }
  }
};
</script>
<style lang='scss' scoped>
.duefall {
  width: 100%;
  .next {
    width: 136px;
    height: 60px;
    background: rgba(66, 133, 244, 1);
    border-radius: 4px;
    text-align: center;
    margin: auto;
    margin-top: 60px;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
    margin-bottom: 30px;
    cursor: pointer;
  }
  .next-tip {
    height: 17px;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(158, 168, 177, 1);
    line-height: 1;
    text-align: center;
    > a {
      color: $theme-color;
    }
  }
  .duef-main {
    width: 404px;
    margin: auto;
    margin-top: 100px;
    position: relative;
    .change {
      position: absolute;
      bottom: 26px;
      left: -20px;
      width: 20px;
      height: 82px;
      border-top: 2px solid #E6E9EB;
      border-left: 2px solid #E6E9EB;
      border-bottom: 2px solid #E6E9EB;
      border-radius: 5px 0 0 5px;
      .text {
        position: absolute;
        left: -11px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 22px;
        height: 22px;
        background: #E6E9EB;
        border-radius: 4px;
        line-height: 22px;
        text-align: center;
      }
    }
    .due-input-f {
      width: 100%;
      position: relative;
      margin-bottom: 30px;
      .el-select {
        width: 100%;
        height: 52px;
      }
      > span {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #9ea8b1;
        line-height: 52px;
        position: absolute;
        top: 0;
        left: 20px;
      }
      .due-cheak {
        position: absolute;
        width: 96px;
        height: 52px;
        background: #e4eefd;
        border-radius: 4px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #4285f4;
        line-height: 52px;
        text-align: center;
        right: -116px;
      }
    }
  }
}
</style>