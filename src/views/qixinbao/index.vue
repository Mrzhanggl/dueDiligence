<!--  -->
<template>
  <div class="qxb-all"  v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)">
    <div class="qxb-remind" v-if="is_safari">关于尽调系统在Safari浏览器上正确得打开姿势，戳这里~<img @click="handleClick" style="cursor: pointer;margin-left: 10px;font-size:0px;vertical-align: -6px;" src="../../assets/img/safari/warning_icon_default.png"></div>
      <div class="qxb-main" id="iframe_box">
        <!-- <iframe src="https://b-plugin.qixin.com/third-login?tenant=falv&returnUrl=/search/advanced" frameborder="0" width="100%" height="830px" ></iframe> -->
      </div>
      <div class="qxb-btbox">
        <div class="qxb-btbox-itemc" :class="{'collect':is_collect==1}" @click="collect()" >
        <div class="qxb-btbox-imgc"></div>
        <div class="qxb-btbox-ttc" v-show="!(is_collect==1)">
          收藏<br>
          企业</div>
         <div class="qxb-btbox-ttc" v-show="is_collect==1">
          取消<br>
          收藏</div>
        </div>
       
       
        <div class="qxb-btbox-itema" @click="creatAtla()" >
          <div class="qxb-btbox-imga"></div>
          <div class="qxb-btbox-tta">
            尽调<br>
            图谱</div>
        </div>
        <div class="qxb-btbox-itemb" @click="gotree()">
          <div class="qxb-btbox-imgb"></div>
          <div class="qxb-btbox-ttb">
            企业<br>
            生命树</div>
        </div>
      </div>
      <index-atlas :dialogVisible.sync= "dialogVisible" v-if="dialogVisible"></index-atlas>
      <index-safari :dialogVisible.sync="safariVisible" ></index-safari>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import $ from 'jquery'
import indexAtlas from './indexAtlas.vue'
import indexSafari from './indexSafari.vue'
import { setTimeout } from 'timers';
export default {
  components:{
    indexAtlas,
    indexSafari
  },
  data () {
    return {
      loading2:false,
      dialogVisible:false,
      safariVisible:false,
      is_safari:false,
      is_collect:""
    };
  },

  
  created(){
    this.loading2=true
    setTimeout(()=>{
        this.loading2=false
    },2000)
    this.is_collect  = JSON.parse(sessionStorage.getItem('business')).is_collected;
    var issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    if(issafariBrowser){
        this.is_safari = true;
    }
    
  },
  
  mounted () {
    this.init();
  },

  methods: {
    init(){
      var vm = this;
      if(!this.$route.query.eid){
              var json = {
                name:vm.$route.query.name,
                token:vm.token,
              }
              vm._postData('/Home/Enterprise/search.json',json,(data)=>{
                
                sessionStorage.setItem('business',JSON.stringify(data.data.data[0]))
                var company = JSON.parse(sessionStorage.getItem('business'))
                var iframe = document.createElement('iframe'); 
                  iframe.setAttribute('frameborder', '0');  
                  iframe.width="100%"
                iframe.height="830px"
                 var return_url = '/search/advanced';
                  var token = Cookies.get('token')
                  console.log(company)
                  if(company.qxb_id){
                    return_url = '/company/info?eid='+company.qxb_id;
                  }
                  alert(company.qxb_id)
                  return_url=encodeURIComponent(return_url)
                  
                  iframe.src="https://b-plugin.qixin.com/third-login?tenant=falv&returnUrl="+return_url+'&token='+token;  
                  document.getElementById('iframe_box').appendChild(iframe)

              })
      }else{
          var iframe = document.createElement('iframe'); 
          iframe.setAttribute('frameborder', '0');  
          iframe.width="100%"
        iframe.height="830px"
          var return_url = '/search/advanced';
          var token = Cookies.get('token')
          if(this.$route.query.eid){
            return_url = '/company/info?eid='+this.$route.query.eid;
          }
          return_url=encodeURIComponent(return_url)
          iframe.src="https://b-plugin.qixin.com/third-login?tenant=falv&returnUrl="+return_url+'&token='+token;  
          console.log("https://b-plugin.qixin.com/third-login?tenant=falv&returnUrl="+return_url+'&token='+token)
          document.getElementById('iframe_box').appendChild(iframe)
      }
      


     
      
//  console.log(document.getElementById('iframe_box'))
    },
    gotree(){
       this.$router.push({name: 'lifeTreeIndex',query:{id:this.$route.query.id,name:this.$route.query.name}})
    },
    creatAtla(){
        //  this.dialogVisible = true;
        this.$router.push({name: 'qixinbaoIndexAtlas',query:{id:this.$route.query.id,name:this.$route.query.name}})
    },
    collect(){
      let vm = this;
      let info = JSON.parse(sessionStorage.getItem('business'))
      console.log(info);
      
      let api = this.is_collect ==1?vm._api_unCollect:vm._api_collect;
      let id = info.enterprise_id ?info.enterprise_id:info.id;
      vm._postData(api,{enterprise_id:id},data=>{
        vm.$message.success(data.msg)
        this.is_collect ==1?this.is_collect =0:this.is_collect =1;
        info.is_collected ==1?info.is_collected =0:info.is_collected =1;
        sessionStorage.setItem('business',JSON.stringify(info))
      })
    },
    handleClick(){
            this.safariVisible=true;
    }
  }
}

</script>
<style lang='scss' scoped>
.qxb-all{
    width:100%;
    padding-top: 30px;
    // padding-bottom: 30px;
    position: relative;
    .qxb-remind{
      color:#556675;
      width:1740px;
      height: 22px;
      margin:0 auto;
      margin-bottom: 17px;
      line-height: 22px;
      vertical-align: middle;
    }
    .qxb-main{
        width:1740px;
        min-height:830px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(230,233,235,1);
        margin: auto;
    }
    .qxb-btbox{
        position: fixed;
        right: 14px;
        bottom: 155px;
        .qxb-btbox-itema{
          width:62px;
          height:93px;
          background:rgba(255,255,255,1);
          border:2px solid rgba(66,133,244,1);
          border-radius:4px;
          margin-bottom: 10px;
          transition: all .6s;
          cursor: pointer;
          .qxb-btbox-imga{
            width: 22px;
            height: 20px;
            background: url('../../assets/img/qixinbao/atlas_default.png');
            margin: auto;
            margin-top: 15px;
            margin-bottom: 8px;
            transition: all .6s;
          }
          .qxb-btbox-tta{
            text-align: center;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(66,133,244,1);
            line-height:21px;
            transition: all .6s;
          }
        }
        .qxb-btbox-itema:hover{
          width:62px;
          height:93px;
          // background:rgba(66,133,244,1);
          box-shadow:0px 4px 10px 0px rgba(66,133,244,0.24);
          border-radius:4px;
        }
        .qxb-btbox-itema:active{
          background:rgba(66,133,244,1);
        }
        .qxb-btbox-itema:active>.qxb-btbox-imga{
          background: url('../../assets/img/qixinbao/atlas_hover.png');
        }
        .qxb-btbox-itema:active>.qxb-btbox-tta{
          color: white;
        }
        .qxb-btbox-itemb{
          width:62px;
          height:93px;
          background:rgba(255,255,255,1);
          border:2px solid rgba(66,133,244,1);
          border-radius:4px;
          transition: all .6s;
          cursor: pointer;
          .qxb-btbox-imgb{
            width: 20px;
            height: 22px;
            background: url('../../assets/img/qixinbao/arbor_default.png');
            margin: auto;
            margin-top: 15px;
            margin-bottom: 8px;
            transition: all .6s;
          }
          .qxb-btbox-ttb{
            text-align: center;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(66,133,244,1);
            line-height:21px;
            transition: all .6s;
          }
        }
        .qxb-btbox-itemb:hover{
          width:62px;
          height:93px;
          // background:rgba(66,133,244,1);
          box-shadow:0px 4px 10px 0px rgba(66,133,244,0.24);
          border-radius:4px;
        }
        .qxb-btbox-itemb:active{
          background:rgba(66,133,244,1);
        }
        .qxb-btbox-itemb:active>.qxb-btbox-imgb{
          background: url('../../assets/img/qixinbao/arbor_hover.png');
        }
        .qxb-btbox-itemb:active>.qxb-btbox-ttb{
          color: white;
        }
        // ---------------------------------------
        .qxb-btbox-itemc{
          width:62px;
          height:93px;
          background:rgba(255,255,255,1);
          border:2px solid rgba(66,133,244,1);
          border-radius:4px;
          margin-bottom: 10px;
          transition: all .6s;
          cursor: pointer;
          .qxb-btbox-imgc{
            width: 22px;
            height: 22px;
            background: url('../../assets/img/qixinbao/collect_icon_default.png');
            margin: auto;
            margin-top: 15px;
            margin-bottom: 8px;
            transition: all .6s;
          }
          .qxb-btbox-ttc{
            text-align: center;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(66,133,244,1);
            line-height:21px;
            transition: all .6s;
          }
        }
        .collect:hover{
          width:62px;
          height:93px;
          // background:rgba(66,133,244,1);
          box-shadow:0px 4px 10px 0px rgba(66,133,244,0.24);
          border-radius:4px;
        }
        .collect{
          background:rgba(66,133,244,1);
        }
        .collect>.qxb-btbox-imgc{
          background: url('../../assets/img/qixinbao/collect_icon_active.png');
        }
        .collect>.qxb-btbox-ttc{
          color: white;
        }
    }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  .qxb-all{
    .qxb-main{
      width: 1300px;
    }
    .qxb-remind{
      width: 1300px;
      
    }
  }
}
</style>
