<template>
  <div class="animi  container">
    <div class="step-default">
      <div class="step" :class="[ antype?'step-color-1':'' ]">step1</div>
      <div class="circle-left">
        <div class="cc-basic left-cir" :class="[ antype?'left-cir-1':'' ]"></div>
      </div>
      <div class="circle-right">
        <div class="cc-basic right-cir" :class="[ antype?'right-cir-1':'' ]"></div>
      </div>
    </div>
    <div class="step-info">
      <div class="bold">开始尽调</div>
      <div class="text" :class="[ antype?'step-basic':'basic' ]">收集基本信息</div>
      <div class="text" :class="[ antype?'step-change':'change' ]">收集变更信息</div>
      <div class="text" :class="[ antype?'step-other':'other' ]">收集其他信息</div>
      <div :class="[ antype?'step-omit':'omit' ]">...</div>
    </div>
    <div class="line-box">
      <div class="line"></div>
      <div :class="[ antype?'step-line-tran-1':'step-line' ]">
        <div class="line-color"></div>
      </div>
    </div>

    <!-- 第二步--------------------- -->
    <div class="step-default">
      <div class="step" :class="[ antype?'step-color-2':'' ]">step2</div>
      <div class="circle-left">
        <div class="cc-basic left-cir" :class="[ antype?'left-cir-2':'' ]"></div>
      </div>
      <div class="circle-right">
        <div class="cc-basic right-cir" :class="[ antype?'right-cir-2':'' ]"></div>
      </div>
    </div>
    <div class="step-info">
      <div class="bold">信息收集</div>
      <div class="text" :class="[ antype?'step-basic-2':'basic-2' ]">整理基本信息</div>
      <div class="text" :class="[ antype?'step-change-2':'change-2' ]">整理变更信息</div>
      <div class="text" :class="[ antype?'step-other-2':'other-2' ]">整理文档</div>
      <div :class="[ antype?'step-omit-2':'omit-2' ]">...</div>
    </div>
    <div class="line-box">
      <div class="line"></div>
      <div :class="[ antype?'step-line-tran-2':'step-line' ]">
        <div class="line-color"></div>
      </div>
    </div>
    <!-- 第三步--------------------- -->
      <div class="step-default">
      <div class="step" :class="[ antype?'step-color-3':'' ]">step3</div>
      <div class="circle-left">
        <div class="cc-basic left-cir" :class="[ antype?'left-cir-3':'' ]"></div>
      </div>
      <div class="circle-right">
        <div class="cc-basic right-cir" :class="[ antype?'right-cir-3':'' ]"></div>
      </div>
    </div>
    <div class="step-info " style="padding-top:47px">
      <div class="bold">信息整理</div>
      <div class="text" :class="[ antype?'step-basic-3':'basic-3' ]">编码文档</div>
      <div class="text" :class="[ antype?'step-change-3':'change-3' ]">编码文件格式</div>
      <div :class="[ antype?'step-omit-3':'omit-3' ]">...</div>
    </div>
    <div class="line-box">
      <div class="line"></div>
      <div :class="[ antype?'step-line-tran-3':'step-line' ]">
        <div class="line-color"></div>
      </div>
    </div>
    <!-- 第四步--------------------- -->
    <div class="step-default">
      <div class="step" :class="[ antype?'step-color-4':'' ]">step4</div>
      <div class="circle-left">
        <div class="cc-basic left-cir" :class="[ antype?'left-cir-4':'' ]"></div>
      </div>
      <div class="circle-right">
        <div class="cc-basic right-cir" :class="[ antype?'right-cir-4':'' ]"></div>
      </div>
    </div>
    <div class="step-info " style="margin-top: -117px;">
      <div class="bold">生成报告</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      antype:false,
      des:"尽调报告生成中..."
    };
  },
  watch:{
      '$store.state.antype':function(newVal){
          this.handleClick()
      }
  },
 
  
  methods: {
       handleClick(){
        console.log(111111);
           
        let vm = this;
        // this.antype= true;
        setTimeout(()=>{
          vm.antype= true;
        },400)
        setTimeout(()=>{
          vm.des="尽调报告已生成"
        },26500)
      }
  }
};
</script>
<style lang="scss" scoped>
$time: 5s;

@mixin step-default {
  position: relative;
  width: 80px;
  height: 80px;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  margin-left: 41px;
}
@mixin step {
  width: 74px;
  height: 74px;

  border-radius: 50%;
  text-align: center;
  line-height: 74px;
  color: #9ea8b1;
  border: 3px solid rgba(230, 233, 235, 1);
}
@mixin step-color($delay) {
  color: $theme-color;
  transition: color 0s cubic-bezier(0.45,0,0.45,1) ;
  -webkit-transition: color 0s cubic-bezier(0.45,0,0.45,1) ;
  transition-delay:  $delay;
  -moz-transition-delay:  $delay; /* Firefox 4 */
  -webkit-transition-delay:  $delay; /* Safari 和 Chrome */
  -o-transition-delay:  $delay; /* Opera */

}
@mixin circle-tran($delay) {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  z-index: 10000000;
  transition: all 2.5s cubic-bezier(0.45,0,0.5,1) ;
  -webkit-transition: all 2.5s cubic-bezier(0.45,0,0.5,1) ;
   transition-delay:  $delay;
  -moz-transition-delay:  $delay; /* Firefox 4 */
  -webkit-transition-delay:  $delay; /* Safari 和 Chrome */
  -o-transition-delay:  $delay; /* Opera */

}

@mixin line {
  width: 38px;
  height: 2px;
  background: rgba(230, 233, 235, 1);
}
@mixin line-color {
  width: 38px;
  height: 2px;
  background: rgba(66, 133, 244, 1);
}
@mixin line-box {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 2px;
  vertical-align: 8px;
  margin-left: 82px;
}
@mixin step-line {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 2px;
  overflow: hidden;
}
@mixin step-line-tran($delay) {
  position: absolute;
  left: 0;
  top: 0;
  width: 38px;
  height: 2px;
  overflow: hidden;
  transition: all 2s cubic-bezier(0.45,0,0.5,1) ;
  -webkit-transition: all 2s cubic-bezier(0.45,0,0.5,1) ;
   transition-delay:  $delay;
  -moz-transition-delay:  $delay; /* Firefox 4 */
  -webkit-transition-delay:  $delay; /* Safari 和 Chrome */
  -o-transition-delay:  $delay; /* Opera */

}

@mixin display($opacity, $time, $delay) {
  opacity: $opacity;
  transition: all $time cubic-bezier(0.45,0,0.5,1) ;
  -webkit-transition: all $time cubic-bezier(0.45,0,0.5,1) ;
   transition-delay:  $delay;
  -moz-transition-delay:  $delay; /* Firefox 4 */
  -webkit-transition-delay:  $delay; /* Safari 和 Chrome */
  -o-transition-delay:  $delay; /* Opera */

}
@mixin omit($width, $time, $delay) {
  width: $width;
  overflow: hidden;
  transition: all $time cubic-bezier(0.45,0,0.5,1) ;
  -webkit-transition: all $time cubic-bezier(0.45,0,0.5,1) ;
   transition-delay:  $delay;
  -moz-transition-delay:  $delay; /* Firefox 4 */
  -webkit-transition-delay:  $delay; /* Safari 和 Chrome */
  -o-transition-delay:  $delay; /* Opera */
  
}
.animi {
  // -webkit-backface-visibility: hidden;
  // -webkit-transform-style:preserve-3d;
  margin: 30px auto;
  .step-default {
    @include step-default;
    &:nth-child(1){
        margin-left: 237px;
    }
    .step {
      @include step;
    }
    .step-color-1 {
      @include step-color(5s);
    }
    .cc-basic {
      width: 74px;
      height: 74px;
      border-radius: 50%;
    }
    .circle-left {
    
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 80px;
      overflow: hidden;
      .left-cir {
        position: absolute;
        left: 0px;
        border: 3px solid transparent;
        border-right: 3px solid  $theme-color;
        border-bottom: 3px solid $theme-color;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        z-index: -1;
      }
      .left-cir-1 {
     
        @include circle-tran(2.5s);
      }
    }
    .circle-right {
      position: absolute;
      right: 0;
      top: 0;
      width: 40px;
      height: 80px;
      // display: none;
      overflow: hidden;
      .right-cir {
        position: absolute;
        right: 0px;
        border: 3px solid  transparent;
        border-left: 3px solid $theme-color;
        border-top: 3px solid $theme-color;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      
        z-index: -1;
      }
      .right-cir-1 {
        @include circle-tran(0s);
      }
    }
  }
  
  .step-info {
    display: inline-block;
    line-height: 30px;
    vertical-align: middle;
    padding-top: 73px;
    margin-left: 36px;
    .basic {
      @include display(0, 1.5s, 0s);
    }
    .step-basic {
      @include display(1, 1.5s, 0s);
    }
    .change {
      @include display(0, 1.5s, 1.5s);
    }
    .step-change {
      @include display(1, 1.5s, 1.5s);
    }
    .other {
      @include display(0, 1.5s, 3s);
    }
    .step-other {
      @include display(1, 1.5s, 3s);
    }
    .omit {
      @include omit(0, 0.5s, 4.5s);
    }
    .step-omit {
      @include omit(27px, 0.5s, 4.5s);
    }
  }

  .line-box {
    @include line-box;
    .line {
      @include line;
    }
    .line-color {
      @include line-color;
    }
    .step-line {
      @include step-line;
    }
    .step-line-tran-1 {
      @include step-line-tran(5s);
    }
  }

  // 第二步-------------------

  .step-default {
    .step-color-2 {
      @include step-color(12s);
    }
    .circle-left {
      .left-cir-2 {
        @include circle-tran(9.5s);
        
      }
    }
    .circle-right {
      .right-cir-2 {
        @include circle-tran(7s);
      }
    }
  }
  .step-info {
    .basic-2 {
      @include display(0, 1.5s, 7s);
    }
    .step-basic-2 {
      @include display(1, 1.5s, 7s);
    }
    .change-2 {
      @include display(0, 1.5s, 8.5s);
    }
    .step-change-2 {
      @include display(1, 1.5s, 8.5s);
    }
    .other-2 {
      @include display(0, 1.5s, 10s);
    }
    .step-other-2 {
      @include display(1, 1.5s, 10s);
    }
    .omit-2 {
      @include omit(0, 0.5s, 11.5s);
    }
    .step-omit-2 {
      @include omit(27px, 0.5s, 11.5s);
    }
  }
  .line-box {
    .step-line-tran-2 {
      @include step-line-tran(12s);
    }
  }
  // 第三步-------------------
  .step-default {
    .step-color-3 {
      @include step-color(19s);
    }
    .circle-left {
      // -webkit-backface-visibility: hidden;
      // -webkit-transform-style:preserve-3d;
      .left-cir-3 {
        @include circle-tran(16.5s);
      
      }
    }
    .circle-right {
      .right-cir-3 {
        @include circle-tran(14s);
      }
    }
  }
  .step-info {
    .basic-3 {
      @include display(0, 2s, 14s);
    }
    .step-basic-3 {
      @include display(1, 2s, 14s);
    }
    .change-3 {
      @include display(0, 2s, 16s);
    }
    .step-change-3 {
      @include display(1, 2s, 16s);
    }
    .omit-3 {
      @include omit(0, 1s, 18s);
    }
    .step-omit-3{
      @include omit(27px, 1s, 18s);
    }
  }
  .line-box {
    .step-line-tran-3 {
      @include step-line-tran(19s);
    }
  }
  // 第四步-------------------
  .step-default {
    .step-color-4 {
      @include step-color(26s);
    }
    .circle-left {
      .left-cir-4 {
        @include circle-tran(23.5s);
      }
    }
    .circle-right {
      .right-cir-4 {
        @include circle-tran(21s);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@media screen and(max-width: $large-srceen) {
  .animi .step-default:nth-child(1){
    margin-left: 47px;
  }
  .animi .line-box{
    margin-left: 41px;
  }
}
</style>
