<template>
  <el-dialog
    class="public line safari-box"
    :visible.sync="dialogVisible"
    width="1200px"
    top="6vh"
    :before-close="handleClose"
  >
    <div slot="title" >
      <div class="big-title">初次使用设置</div>
      <div class="small-title">鉴于Safari浏览器的高安全性设置，为保证您常使用尽调系统，请按照提示修改您的Safari浏览器设置</div>
    </div>
    <div class="safari">
        <div class="first"><span class="Din-M">1.</span>找到Safari浏览器左上角菜单中【偏好设置】。</div>
        <img class="first-img" src="../../assets/img/safari/1-1.png">
        <img class="first-second-img" src="../../assets/img/safari/1-2.png">
        <div class="second"><span class="Din-M">2.</span>找到【隐私】选项卡中的网站跟踪，并取消【阻止跨站跟踪】勾选。</div>
        <div class="second-title">取消勾选后，不会对您的安全性产生影响，请放心使用。</div>
        <img class="second-img" src="../../assets/img/safari/2-1.png">
        <div class="third"><span class="Din-M">3.</span>关闭设置，重新加载页面就可以正常使用了哦。</div>
    </div>
    <div slot="footer"  class="dialog-footer" >
     </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
      handleClose(){
          this.$emit("update:dialogVisible",false);
      }
  }
};
</script>
<style lang="scss" scoped>
.big-title{
    line-height: 20px;
    font-size: 20px;
    font-weight: bold;
}
.small-title{
    line-height: 16px;
    font-size: 16px;
    color:#556675;
    padding: 20px 0 0 0;
}

.safari{
    width: 100%;
    height: 650px;
    position: relative;
    padding-top: 30px;
   
    overflow: auto;
    .first{
        color: #556675;
    }
    .first-img{
        position:absolute;
        top:60px;
    }
    .first-second-img{
        position:absolute;
        top:100px;
        left:450px;
    }
    .second{
        color: #556675;
        margin-top: 340px;
    }
    .second-title{
        color: #9EA8B1;
        margin-left: 17px;
        margin-top: 13px;
    }
    .second-img{
        position:absolute;
        top:480px;
    }
    .third{
        margin-top: 380px;
        
    }
}
</style>
<style lang="scss" scoped>
@media screen and (min-height: 1100px) {
.safari{

    height: 830px;
    
}
}

</style>



