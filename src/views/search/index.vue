<template>
<!-- <div class="container-box"> -->
  <div class="search container-card"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    
    <div class="result">
      <div class="rs-text left caption">
        找到和“{{$route.query.searchtext}}”相关的企业有<span class="theme-text Din-M">{{company_list.count}}</span>家
      </div>
      <div v-show="find" class="right">
        <el-select v-model="sort" placeholder class="select" :popper-append-to-body="false" @change="changeSort">
          <template slot="prefix"  >
            排序：
          </template>
          <el-option
            v-for="(item,index) in sort_list"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <ul v-show="find" class="main-card clear">
      <li class="card-list container" v-for="(item,index) in company_list.data" :key="index">
        <div class="ls-tl" @click="goQixinbao(item.qxb_id,item.id,item.name,item)">
          <div class="ls-tl-img" v-if="item">
            <img class="logo" :class="[item.logo == 'http://dd.falv58.com/Common/upload/cos/2019-06-2618085669834095.png'?'':'shadow']" :src="item.logo?item.logo:'../../assets/img/home/projec_icon_default.png'">
          </div>
          <div class="ls-tl-explain">
            <div class="company_name" v-html="changeColor(item.name)"></div>
            <div class="caption">{{item.status}}(在营、开业、在册)</div>
          </div>
          <!-- <div class="ls-tl-dl">
            <el-button type="primary" class="download" circle icon="el-icon-bottom"></el-button>
          </div> -->
        </div>
        <div class="ls-dt">
          <ul class="dt-box">
            <li class="dt-list">
              <span class="caption left">法定代表人</span>
              <span class="text right">{{item.oper_name}}</span>
            </li>
            <li class="dt-list">
              <span class="caption left">注册资本</span>
              <span class="text right">{{item.regist_capi}}</span>
            </li>
            <li class="dt-list">
              <span class="caption left">成立时间</span>
              <span class="text right">{{item.start_date}}</span>
            </li>
          </ul>
        </div>
        <ul class="ls-ot">
          <li class="ot-item" @click="goQixinbao(item.qxb_id,item.id,item.name,item)">
            <div class="item check" ></div>查看
          </li>
          <li class="ot-item" @click="goDue(item.id,item.name,item.oper_name,item.status,item)">
            <div class="item Due-D"></div>尽调
          </li>
          <li class="ot-item " :class="item.is_collected==1?'is-active':''"   @click="collect(item.id,item.is_collected)">
            <div class="item collect"></div>{{item.is_collected==1 ?"已收藏":"收藏"}}
          </li>
        </ul>
      </li>
    </ul>
    <common-page v-show="find"  ref="pagList"  @getData='getData' ></common-page>
    <div v-if="!find" class="not-find">
      <img src="../../assets/img/search/notfind.png.png" alt="">
      <div>找不到合适的企业，重新搜索试试吧</div>
    </div>
    
  </div>
  <!-- </div> -->
</template>
<script>
import commonPage from "@@/page.vue"
export default {
  components: {
    commonPage
  },
  data() {
    return {
      find:true,
      loading:false,
      search: "晓法",
      number: 239,
      sort: "0",
      page:1,
      sort_list: [
        {
          value: "0",
          label: "默认排序"
        },
        {
          value: "2",
          label: "最早成立企业"
        },
        {
          value: "1",
          label: "最新成立企业"
        },
      ],
      company_list: [
        
      ]
    };
  },
  watch:{
    $route(newVal){
        this.getData(1)
        
    }
  },
  created(){
    this.getData(1)
  },
  mounted() {
    
  },
  methods: {
    changeSort(){
        this.getData(1)
    },
    goQixinbao(eid,id,name,business){
      var vm = this
      sessionStorage.setItem('business',JSON.stringify(business))
      var json={
        enterprise_id:id,
        token:vm.Token
      }
      vm._postData('/Home/User/markFastCheck.json',json,(data)=>{
         vm.$router.push({name: 'qixinbaoIndex',query:{eid:eid,id:id,name:name}})
      })
     
    },
    goDue(id,name,corporate,status,business){
      let params = {
        enterprise_id: id,
        company: name,
        corporate: corporate,
        status:status
      };
      sessionStorage.setItem('business',JSON.stringify(business))
      this.$store.commit("setDueParams", params);
      this.$router.push({name: 'processIndex',query:{type:'exist'}})
    },
    collect(id,status){
        let vm= this;
        let api = status == 1?vm._api_unCollect:vm._api_collect;
        vm._postData(api,{enterprise_id:id},data=>{
              vm.$message.success(data.msg);
              vm.getData(null,false);
        })
    },
    getData(p,type =true){
      var vm = this
      vm.loading=type
      p?vm.page = p:""
      var json = {
        token:vm.Token,
        name:vm.$route.query.searchtext,
        limit:6,
        page:vm.page,
        order_index:this.sort
      }
      vm._postData('/Home/Enterprise/search.json',json,(data)=>{
            vm.loading=false
            vm.company_list = data.data
            if(data.data.count=='0'){
              vm.find = false;
            }else{
              vm.find = true;
            }
            vm.$refs.pagList.page = parseInt(data.data.count)
            vm.$refs.pagList.size = 6
            console.log(data.data.count)
      })
    },
    changeColor(name){
      let text = this.$route.query.searchtext
      let arr = name.split(`${text}`)
      let item,str=''
      for(item of  arr){
       if(arr.indexOf(item) == arr.length-1) {
         str=str+item
       }else{
         str = item+`<span class='theme-text'>${text}</span>`
       }
      }
      return str
    }
  }
};
</script>
<style lang="scss" scoped>

.search {
  
  margin: 30px auto 0 auto;
  
  .result {

    height: 52px;
    .rs-text {
      white-space: nowrap;
      line-height: 52px;
    }
  }
  .main-card {
    width: 100%;
    height: auto;
    padding-top: 30px;
    & > li {
      display: inline-block;
    }
    .card-list {
      border: 2px solid rgba(230, 233, 235, 1);
      border-radius: 8px;
      margin-left: 45px;
      cursor: pointer;
      transition: all .5s;
      &:hover{
        box-shadow:0px 12px 24px 0px rgba(13,26,38,0.08);
        transform: translateY(-5px);
      }
    }
  }
  .not-find{
    width: 303px;
    margin: auto;
    margin-top: 158px;
    >img{
      display: block;
      width: 100%;
    }
    >div{
      margin-top: 41px;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(158,168,177,1);
      line-height:1;
      text-align: center;
    }
  }
}
.card-list {
  .ls-tl {
    position: relative;
    border-radius: 8px 8px 0px 0px;
    width: 546px;
    height: 118px;
    border-bottom: 2px solid rgba(230, 233, 235, 1);
    .ls-tl-img {
      @include position-vertical-center(31px);
      left: 30px;
      width: 62px;
      height: 62px;
      background-color: rgba(66, 133, 244, 0.15);
      border-radius: 50%;
      text-align: center;
      line-height: 75px;
    }
    .ls-tl-explain {
      @include position-vertical-center(24px);
      left: 110px;
      height: 48px;

      .company_name {
        font-size: 20px;
        font-weight: bold;
        line-height: 20px;
      }
      .caption {
        margin-top: 12px;
        font-size: 16px;
        line-height: 16px;
      }
    }
    .ls-tl-dl {
      @include position-vertical-center(16px);
      right: 30px;
    }
  }

  .ls-dt {
    border-bottom: 2px solid rgba(230, 233, 235, 1);
    .dt-box {
      .dt-list {
        height: 16px;
        padding: 22px 30px;
        .point {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 10px;
          margin-top: -2px;
          background: rgba(234, 79, 79, 1);
          border-radius: 50%;
          vertical-align: middle;

          &.active {
            background: #00a88b;
          }
        }
      }
    }
  }

  .ls-ot {
    border-radius: 0 0 8px 8px;
    background-color: #f7f9fb;
    & > li {
      display: inline-block;
    }
    .ot-item {
      width: 102px;
      margin: 22px 0;
      padding: 0 39px;
      text-align: center;
      line-height: 16px;
      cursor: pointer;
      &:nth-child(-n + 2) {
        // padding-right: 58px;
        border-right: 2px solid rgba(230, 233, 235, 1);
      }
      &:hover {
        color: $theme-color ;
        .check {
          
          background-image: url("../../assets/img/search/check_icon_hover.png") !important;
        }
        .item.Due-D {
          
          background-image: url("../../assets/img/search/legal_investigation_icon_hover.png") !important;
        }
        .item.collect {
          background-image: url("../../assets/img/search/collect_icon_hover.png") !important;
        }
      }
      &.is-active {
        color: $theme-color;
        .item.collect{
        background-image: url("../../assets/img/search/collect_icon_hover.png") !important;
        }
      }
      
      .item {
        display: inline-block;
        margin-right: 10px;
        &.check {
          width: 18px;
          height: 12px;
          background-image: url("../../assets/img/search/check_icon_default.png");
        }
        &.Due-D {
          width: 16px;
          height: 16px;
          vertical-align: -2px;
          background-image: url("../../assets/img/search/legal_investigation_icon_default.png");
        }
        &.collect {
          width: 18px;
          height: 17px;
          vertical-align: -2px;
          background-image: url("../../assets/img/search/collect_icon_default.png");
        }
      }
    }
  }
}
@media screen and (min-width: $large-srceen) {
  .search .main-card .card-list:nth-child(n + 4) {
        margin-top: 45px;
  }
  .search .main-card .card-list:nth-child(3n-2){
    margin-left: 0;
  }
}

</style>
<style lang="scss" scoped>
@media screen and (max-width:$large-srceen) {
  .result{
        width: 1300px;
      }
 .container-card{
    .main-card{
      width: 1300px;
      height: auto;
     
      .card-list{
        &:nth-child(2n-1){
          margin-left: 0;
        }
         &:nth-child(n+3){
          margin-top: 45px;
        }
        .ls-tl{
          width: 623px;
        }
        .ls-ot .ot-item{
          width: 128px;
        }
      }
    }
  }
  
}
</style>
