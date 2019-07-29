<!--  -->
<template>
  <div class="dueall">
      <div class="due-ttbox clearfix">
          <span class="due-ttbox-t1">尽调额度</span>
          <span  class="due-ttbox-t2">（尽调额度为：每月{{Number(jd_sum)+Number(user_info.jd_times)}}次）</span>
          <router-link  class="due-ttbox-t3" :to="{name:'dueIndex'}">查看尽调记录</router-link>
      </div>
      <div class="dueall-main">
          <div class="duemain-box">
              尽调额度使用情况{{jd_sum}}/{{Number(jd_sum)+Number(user_info.jd_times)}}
              <span>
                  请求额度
              </span>
             
          </div>
          <div class="dueline-dsj"> <i id="dsj"></i></div>
          <div class="dueline-box">
              <div class="dueline-true"></div>
              <div class="dueline-yuan">
                  <div></div>
              </div>
          </div>
          <ul class="dueline-foot">
              <li :class="{'active':jd_sum/user_info.jd_times>0}"></li>
              <li :class="{'active':jd_sum/user_info.jd_times>=0.2}"></li>
              <li :class="{'active':jd_sum/user_info.jd_times>=0.4}"></li>
              <li :class="{'active':jd_sum/user_info.jd_times>=0.6}"></li>
              <li :class="{'active':jd_sum/user_info.jd_times>=0.8}"></li>
              <li :class="{'active':jd_sum/user_info.jd_times>=1}"></li>
          </ul>
      </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import $ from 'jquery'
export default {
  data () {
    return {
        jd_sum:0,
        user_info:{}
    };
  },

  components: {},
    created(){

    },
  computed: {},

    mounted(){
         this.init()
    },

  methods: {
      init(){
          
          var vm = this
          vm.user_info =JSON.parse(sessionStorage.getItem('userdata')) 
          
          vm._postData('/Home/User/currentMonthJdNumber.json',{},(data)=>{
             
              vm.jd_sum= parseInt(data.data.count)
              var ps =vm.jd_sum/(Number(vm.jd_sum)+Number(vm.user_info.jd_times))
            // var ps =1
            if(vm.user_info.jd_times==0){
                ps=0
            }
              var xs = ps.toFixed(2)
              function toPercent(ps){
                    var str=Number(ps*100).toFixed(1);
                    str+="%";
                    return str;
                }
                
              console.log(vm.user_info.jd_times)
              $('.dueline-yuan').css('left',toPercent(ps))
               $('.dueline-true').css('width',toPercent(ps))
                $('#dsj').css('left',toPercent(ps))
                var left = 0
                if(document.body.clientWidth>1800){
                    if(xs>0.23&&xs<0.77){
                    left = 360*(xs-0.2)/0.54
                    }else if(xs<0.23){
                    left = 30 
                    }else if(xs>0.77){
                        left = 368
                    }
                }else{
                    if(xs>0.25&&xs<0.75){
                  left = 128*(xs-0.2)/0.5
                    }else if(xs<0.25){
                    left = 30 
                    }else if(xs>0.75){
                        left = 158
                    }
                }
               if(xs<=0.02){
                  
                   $('.duemain-box').css('border-bottom-left-radius','0px')
               }
               if(xs==1){
                  
                   $('.duemain-box').css('border-bottom-right-radius','0px')
               }
               if(xs>0.25&&xs<0.75){
                    $('.duemain-box').css('margin-left',left+'px')
                }else if(xs<0.25){
                    $('.duemain-box').css('margin-left',left+'px')
                }else if(xs>0.75){
                    $('.duemain-box').css('margin-left','0px')
                        $('.duemain-box').css('float','right')
                        $('.duemain-box').css('margin-right','30px')
                }
                vm.watchPercent(xs);
          })
      },
      watchPercent(xs){
          $(window).resize(function(){

              var w = $(this).width();
              var left = 0;
              if(w>1800){
                  if(xs>0.23&&xs<0.77){
                  left = 360*(xs-0.2)/0.54
                    }else if(xs<0.23){
                    left = 30 
                    }else if(xs>0.77){
                        left = 378
                    }
                    $('.duemain-box').css('margin-left',left+'px')
              }else{
                  if(xs>0.25&&xs<0.75){
                  left = 128*(xs-0.2)/0.5
                    }else if(xs<0.25){
                    left = 30 
                    }else if(xs>0.75){
                        left = 158
                    }
                    $('.duemain-box').css('margin-left',left+'px')
              }
              

          })
      }
  }
}

</script>
<style lang='scss' scoped>
.dueall{
    letter-spacing: 0;
    width: 720px;
    float: left;
    margin-left: 30px;
    .due-ttbox{
        margin-bottom: 20px;
        width: 100%;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        line-height:1;
        .due-ttbox-t1{
            float: left;
            color: #0D1A26;
        }
        .due-ttbox-t2{
            color: #9EA8B1;
            float: left;
        }
        .due-ttbox-t3{
            color:$theme-color;
            float: right;
        }
        
    }
    .dueall-main{
        width:720px;
        height:160px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(230,233,235,1);
        border-radius:8px;
        .duemain-box{
            margin-top: 20px;
            margin-left: 30px;
            padding: 19px 120px 19px 20px;
            height: 52px;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:$theme-color;
            line-height:1;
            background:#E1EDFF;
            display: inline-block;
            // box-shadow:0px 4px 10px 0px rgba(66,133,244,0.24);
            border-radius:4px;
            box-sizing: border-box;
            position: relative;
            >span{
                position:absolute;
                right: 20px;
                top: 6px;
                width:90px;
                height:40px;
                background:rgba(66,133,244,1);
                border-radius:4px;
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:40px;
                text-align: center;
            }
            
        }
        .dueline-dsj{
            position: relative;
            width: 660px;
            height: 7px;
            margin: auto;
            overflow: hidden;
             >i{
                 top: 0;
                position: absolute;
                bottom: -7px;
                left: 0%;
                margin-left: -7.5px;
                display: block;
                width: 0;
                height: 0;
                border-top: 7px solid #E1EDFF;
                border-left: 7.5px solid transparent;
                border-right: 7.5px solid transparent;
            }
        }
        .dueline-box{
            width: 660px;
            height: 2px;
            background: #E1EDFF;
            margin: auto;
            margin-top: 24px;
            position: relative;
            .dueline-true{
                position: absolute;
                height: 4px;
                width: 0%;
                top: -1px;
                background: $theme-color;
            }
            .dueline-yuan{
                position: absolute;
                top: -14px;
                left: 0%;
                margin-left: -15px;
                width:26px;
                height:26px;
                background:rgba(255,255,255,1);
                border:2px solid rgba(66,133,244,1);
                border-radius:50%;
                >div{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    width:4px;
                    height:4px;
                    background:rgba(255,255,255,1);
                    border:2px solid rgba(66,133,244,1);
                    border-radius:50%;
                }
            }
        }
        .dueline-foot{
            margin-left: 30px;
            margin-top: 33px;
            &>.active{
                background: $theme-color;
            }
            li{
                float: left;
                width:6px;
                height:2px;
                background:rgba(230,233,235,1);
                margin-left: 125px;
            }
            li:first-child{
                margin-left: 0;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
    .dueall{
        width: 500px;
        .dueall-main{
            width: 500px;
            .dueline-dsj{
                width: 440px;
            }
            .dueline-box{
                width: 440px;
            }
            .dueline-foot{
                li{
                    margin-left: 81px;
                }
                li:first-child{
                    margin-left: 0;
                }
            }
        }
    }
}
</style>
