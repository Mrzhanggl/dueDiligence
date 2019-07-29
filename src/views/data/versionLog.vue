<!--  -->
<template>
  <div class="vesall">
      <div class="ves-top">
          版本记录
          <span >为规则库献一份力</span>
      </div>
      <div class="ves-box">
            <div class="ves-main">
              <div class="ves-log clearfix">
                <div  class="clearfix ves-log-item">
                  <div class="ves-log-l">
                    <div>2019-06-18</div>
                    <span>版本号V2.12.4</span>
                  </div>
                  <div class="ves-log-r">800条规则</div>
                </div>
                <div  class="clearfix ves-log-item">
                  <div class="ves-log-l">
                    <div>2019-06-18</div>
                    <span>版本号V2.12.4</span>
                  </div>
                  <div class="ves-log-r">800条规则</div>
                </div>
                <div  class="clearfix ves-log-item">
                  <div class="ves-log-l">
                    <div>2019-06-18</div>
                    <span>版本号V2.12.4</span>
                  </div>
                  <div class="ves-log-r">800条规则</div>
                </div>
                <div  class="clearfix ves-log-item">
                  <div class="ves-log-l">
                    <div>2019-06-18</div>
                    <span>版本号V2.12.4</span>
                  </div>
                  <div class="ves-log-r">800条规则</div>
                </div>
                <div  class="clearfix ves-log-item">
                  <div class="ves-log-l">
                    <div>2019-06-18</div>
                    <span>版本号V2.12.4</span>
                  </div>
                  <div class="ves-log-r">800条规则</div>
                </div>
                <div  class="clearfix ves-log-item">
                  <div class="ves-log-l">
                    <div>2019-06-18</div>
                    <span>版本号V2.12.4</span>
                  </div>
                  <div class="ves-log-r">800条规则</div>
                </div>
                <div  class="clearfix ves-log-item">
                  <div class="ves-log-l">
                    <div>2019-06-18</div>
                    <span>版本号V2.12.4</span>
                  </div>
                  <div class="ves-log-r">800条规则</div>
                </div>
                <div class="ves-log-xian">
                  <div class="ves-log-dian"></div>
                  <div class="ves-log-dian"></div>
                  <div class="ves-log-dian"></div>
                  <div class="ves-log-dian"></div>
                  <div class="ves-log-dian"></div>
                  <div class="ves-log-dian"></div>
                  <div class="ves-log-dian"></div>
                </div>
              </div>
            </div>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted () {
    
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
.element::-webkit-scrollbar { width: 0 !important }
.vesall{
    width: 720px;
    float: left;
    margin-left: 30px;
    .ves-top{
        margin-top: 43px;
        margin-bottom: 21px;
        font-size:16px;
        font-weight:bold;
        color:rgba(13,26,38,1);
        line-height:1;
        >span{
            float: right;
            font-weight:bold;
            color:rgba(66,133,244,1);
            line-height:1;
        }
    }
    .ves-box{
        width:720px;
        height:548px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(230,233,235,1);
        border-radius:8px;
        
        .ves-main{
          margin: 38px 6px 20px 28px;
          height: 492px;
          overflow-y:scroll;
          &::-webkit-scrollbar  
          {  
              width: 6px;  
          }  
          &::-webkit-scrollbar-thumb{  
              background-color: #556675;  
          }  
          .ves-log{
            width: 620px;
            margin: 0;
            float: right;
            position: relative;
            margin-right: 16px;
            >.ves-log-item{
              
              width: 100%;
              float: right;
              >.ves-log-l{
                float: left;
                margin-top: 22px;
                margin-bottom: 28px;
                font-size:16px;
                font-family:DIN-Medium;
                font-weight:500;
                color:#556675;
                line-height:1;
                >div {
                  margin-bottom: 14px;
                }
                >span{

                }
              }
              >.ves-log-r{
                float:right;
                margin-top: 52px;
                font-size:16px;
                font-family:DIN-Medium;
                font-weight: bold;
                color:rgba(13,26,38,1);
                line-height:1;
              }
            }
            .ves-log-xian{
              position: absolute;
              left: -35px;
              width:2px;
              height:100%;
              background:rgba(230,233,235,1);
              >.ves-log-dian{
                width:12px;
                height:12px;
                background:rgba(66,133,244,1);
                box-shadow:0px 2px 6px 0px rgba(66,133,244,0.4);
                border-radius:50%;
                margin-left: -5px;
                margin-top: 84px;
              }
              >.ves-log-dian:first-child{
                margin-top: 38px;
              }
            }
          }
        }
    }
}
</style>
<style lang="scss" scoped>
@media screen and(max-width: $large-srceen) {
  .vesall {
    width: 500px;
    .ves-box{
      width: 498px;
      .ves-main .ves-log{
        width: 392px;
      }
    }
  }
  
}
</style>
