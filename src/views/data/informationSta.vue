<!--  -->
<template>
  <div class="sjall">
      <p>数据统计</p>
      <div > 
        <div class="itembox">
          <p>本周尽调数量</p>
          <b >{{datam.weekJd}}</b>
          <div :class="Jd">较上周<div :class="Jd"><div></div></div> <b>{{Math.abs(datam.weekJd-datam.weekJd_last)}}</b></div>
        </div>
        <div class="shu"></div>
        <div class="itembox">
          <p>本周快查次数</p>
          <b >{{datam.weekKc}}</b>
          <div :class="Kc">较上周<div :class="Kc"><div></div></div> <b>{{Math.abs(datam.weekKc-datam.weekKc_last)}}</b></div>
        </div>
        <div class="shu"></div>
        <div class="itembox">
          <p>本周快查公司数</p>
          <b >{{datam.weekGs}}</b>
          <div :class="Gs">较上周<div :class="Gs"><div></div></div> <b>{{Math.abs(datam.weekGs-datam.weekGs_last)}}</b></div>
        </div>
      </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      Jd:{
        'gr':false,
        'red':false,
        'blue':false,
      },
      Kc:{
        'gr':false,
        'red':false,
        'blue':false,
      },
      Gs:{
        'gr':false,
        'red':false,
        'blue':false,
      },
    };
  },
  props:{
    datam:{
      type: Object,
      default: function () {

        return { message: 'hello' }

      }
    }
  },
  components: {},
  created(){
  },
  computed: {},
  watch:{
  },
  mounted(){

  },
  methods: {
      //初始化数据
      init(){
        var jd = parseInt(this.datam.weekJd)
        var jd_last = parseInt(this.datam.weekJd_last)
        var kc = parseInt(this.datam.weekKc)
        var kc_last = parseInt(this.datam.weekKc_last)
        var gs = parseInt(this.datam.weekGs)
        var gs_last = parseInt(this.datam.weekGs_last)
        if(jd>jd_last){
          this.Jd.gr = true
        }else if(jd<jd_last){
          this.Jd.red = true
        }
        else{
          this.Jd.blue = true
        }
        if(kc>kc_last){
          this.Kc.gr = true
        }else if(kc<kc_last){
          this.Kc.red = true
        }else{
          this.Kc.blue = true
        }
        if(gs>gs_last){
          this.Gs.gr = true
        }else if(gs<gs_last){
          this.Gs.red = true
        }else{
          this.Gs.blue = true
        }
      }
  }
}

</script>
<style lang='scss' scoped>
@mixin commontt{
  font-size:16px;
  font-family:MicrosoftYaHei;
  font-weight:bold;
  color:rgba(13,26,38,1);
  line-height:1;
}
.shu{
  float: left;
  width:2px;
  height:93px;
  background: #E6E9EB;
  margin-top: 34px;
}
.sjall{
  float: left;
  >p{
    margin: 0;
    margin-bottom: 21px;
    @include commontt;
  }
  >div{
    // width:986px;
    height:156px;
    background:rgba(255,255,255,1);
    border:2px solid rgba(230,233,235,1);
    border-radius:8px;
    .itembox{
      width: 270px;
      float: left;
      margin-left: 57px;
      margin-top: 29px;
      >p{
        margin: 0;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(158,168,177,1);
        line-height:1;
        margin-bottom: 19px;
      }
      >b{
        display: block;
        font-size:32px;
        font-family:'DIN-Bold';
        font-weight:bold;
        color:rgba(13,26,38,1);
        line-height:23px;
        margin-bottom: 19px;
      }
      >.gr{
        color: #00A88B;
      }
      >.red{
          color: #EA4F4F;
      }
      >.blue{
          color: $theme-color;
      }
      >div{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        line-height:18px;
        
        >b{
          display: inline-block;
          vertical-align: text-bottom;
          margin-top: 3px;
          font-size:18px;
          font-family:DIN-Medium;
          font-weight:500;
          line-height:18px;
        }
        >.gr{
           margin: 0 10px;
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 0px;
          border-bottom: 12px solid #00A88B;
          border-left: 6.5px solid transparent;
          border-right: 6.5px solid transparent;
          vertical-align: middle;
        }
        >.red{
          margin: 0 10px;
           display: inline-block;
          width: 0;
          height: 0;
          border-bottom: 0px;
          border-top: 12px solid #EA4F4F;
          border-left: 6.5px solid transparent;
          border-right: 6.5px solid transparent;
          vertical-align: middle;
        }
        >.blue{
           margin: -3px 10px 0px 10px;
           display: inline-block;
          width: 14px;
          height:3px;
          background:rgba(66,133,244,1);
          vertical-align: middle;
          position: relative;
          >div{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 2px;
            height: 3px;
            background: white;
            z-index: 3;
          }
        }
      }
    }
  }
}

</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  .sjall{
    >div{
      .itembox{
        width: 196px;
      }
    }
  }
}
</style>
