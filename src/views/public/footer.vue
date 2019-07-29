<!--  -->
<template>
<div class="containe-box container">
  <div class="footer-title">
      法律尽职调查系统-Copyright 晓法网络科技(上海)有限公司  沪ICP备18048606号 
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

  methods: {}
}

</script>
<style lang='scss' scoped>
.footer-title{
    background: white;
    width: 1740px;
    height:55px ;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(158,168,177,1);
    line-height:55px;
    text-align: center;
    margin: 0 auto;
    margin-top: 30px;

    // position: fixed;
    // bottom: 0;
    // // left: 0;
}
@media screen and(max-width:$large-srceen){
    .footer-title{
       width: 1340px;
    }
}
</style>