<!--  -->
<template>
  <div class="savall">
      <p>节省时间</p>
      <div class="sav-main">
          <div class="sav-bigbox">
              <div id="main" style="width: 100%;height:100%;"></div>
              <div class="sav-bigboxtt">{{allSavingTime}}H</div>
              <span class="sav-bigboxtf">累计节约时间</span>
          </div>
          <div class="sav-num">
              <div class="sav-numitem">
                  <span></span>
                  <p>您累计尽调次数<b>{{datam.weekJd}}</b><span>次</span></p>
                  <div>为您节省<b>{{datam.weekJd*24}}</b><span>小时</span></div>
              </div>
              <div class="xian"></div>
              <div class="sav-numitem">
                  <span></span>
                  <p>您累计快查公司数<b>{{datam.weekGs}}</b><span>家</span></p>
                  <div>为您节省<b>{{datam.weekGs*24}}</b><span>小时</span></div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import $ from "jquery"
import { setTimeout } from 'timers';
export default {
  data () {
    return {
        // imageSrc:""
    };
  },
  props:{
    datam:{
      type: Object,
      default: function () {

        return { message: 'hello',
         }

      }
    }
  },
  components: {},

  computed: {
      allSavingTime(){
          return this.datam.weekJd*24+this.datam.weekGs*24
      }
  },
  created () {

  },
  mounted() {
  },

  methods: {
      init(){
          var _this = this
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option =  {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
            },
            series: [
                {
                    name:'统计情况',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '10',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    color:['#FFC400','#4285F4'],
                    data:[
                        {value:_this.datam.weekJd, name:'累计尽调次数'},
                        {value:_this.datam.weekGs, name:'快查公司数'},
                    ]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        setTimeout(this.convertCanvasToImage,2000)
       
      },
    //   convertCanvasToImage() {
    //    let  canvas = $('canvas')[0]
	  
	//   this.imageSrc = canvas.toDataURL("image/png");
    //     console.log(canvas.toDataURL("image/png"));
        
    // }
  }
}

</script>
<style lang='scss' scoped>
// .g2-guide-html {
//         width: 100px;
//         height: 80px;
//         vertical-align: middle;
//         text-align: center;
//         line-height: 0.2;
//     }

//     .g2-guide-html .title {
//         font-size: 12px;
//         color: #8c8c8c;
//         font-weight: 300;
//     }

//     .g2-guide-html .value {
//         font-size: 22px;
//         color: #000;
//         font-weight: bold;
//     }
.savall{
    float: left;
    >p{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(13,26,38,1);
        line-height:1;
        margin-top: 42px;
        margin-bottom: 21px;
    }
    .sav-main{
        width:986px;
        height:548px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(230,233,235,1);
        border-radius:8px;
        .sav-num{
            margin-left: 160px;
            margin-top: 20px;
            position: relative;
            >.xian{
                position: absolute;
                top: 14px;
                left: 335px;
                width:2px;
                height:60px;
                background: #E6E9EB;
            }
            >div:first-of-type{
                float: left;
            }
            >div:last-of-type{
                margin-left:480px;
            }
            .sav-numitem{
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(158,168,177,1);
                line-height:1;
                >span{
                    display: block;
                    width:30px;
                    height:6px;
                    background:rgba(66,133,244,1);
                    margin-bottom: 20px;
                }
                >p{
                    margin-bottom: 16px;
                    b{
                        color: #0D1A26;
                    }
                    span{
                        color: #0D1A26
                    }
                }
                >div{
                    b{
                        color: #0D1A26;
                    }
                    span{
                        color: #0D1A26
                    }
                }
            }
            .sav-numitem:first-of-type>span{
                background: #FFC400;
            }
        }
        .sav-bigbox{
            width: 325px;
            height: 325px;
            margin: auto;
            margin-top: 61px;
            position: relative;
            .sav-bigboxtt{
                position: absolute;
                top: 133px;
                font-size:32px;
                font-family:DIN-Bold;
                font-weight:bold;
                color:rgba(13,26,38,1);
                line-height:40px;
                text-align: center;
                left: 0;
                right: 0;
                margin: auto;
            }
            .sav-bigboxtf{
                position: absolute;
                top: 177px;
                font-size:16px;
                font-family:MicrosoftYaHei; 
                font-weight:400;
                color:rgba(158,168,177,1);
                line-height:36px;
                text-align: center;
                left: 0;
                right: 0;
                margin: auto;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
    .savall{
        .sav-main{
            width: 766px;
            .sav-num{
                margin-left: 154px;
                .xian{
                    left: 230px;
                }
                 >div:last-of-type{
                    margin-left:300px;
                }
            }
        }
    }
}


</style>
