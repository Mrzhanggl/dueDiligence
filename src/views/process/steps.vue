<!--  -->
<template>
  <div class="steps-all">
      <div class="steps-item" :class="{'active':stepId==1}" @click="handleClick(1)">
          <img v-if='stepId==1' src="@img/process/bz1_active.png" alt="">
          <img v-else src="@img/process/bz1_def.png" alt="">
          1尽调设置
          <div class="steps-sj"></div>
      </div>
      <div class="steps-item" :class="{'active':stepId==2}">
          <img v-if='stepId==2' style="margin-top:-2px" src="@img/process/bz2_active.png" alt="">
          <img v-else style="margin-top:-2px" src="@img/process/bz2_def.png" alt="">
          2模板预览
          <div  class="steps-sj"></div>
      </div>
      <div class="steps-item" :class="{'active':stepId==3}" @click="handleClick(3)">
          <img v-if='stepId==3' src="@img/process/bz3_active.png" alt="">
          <img v-else src="@img/process/bz3_def.png" alt="">
          3开始尽调
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

  computed: {
      stepId(){
          return this.$store.state.stepId
      }
  },

  mounted () {},

  methods: {
      handleClick(num) {
        //   if( this.$store.state.stepId==2){
        //       this.$store.commit("setStep", num);
        //         if (num == 3) {
        //             this.$store.commit("setAntype", true);
        //             this.$store.commit("setDueParams", this.startDue());
        //         }
        //   }
            
        },
  }
}

</script>
<style lang='scss' scoped>
.steps-all{
    width: 1680px;
    height:52px;
    background:rgba(240,241,242,1);
    border-radius:4px 4px 4px 4px;
    margin: auto;
    margin-top: 30px;
    
    .steps-item{
        width:560px;
        height:52px;
        float: left;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:#0D1A26;
        line-height:52px;
        text-align: center;
        position: relative;
        >img{
            vertical-align: middle;
        }
        .steps-sj{
            position: absolute;
            width: 0;
            height: 0;
            right: 0;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 6px solid #556675;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
    .active{
        color: $theme-color;
    }
}
</style>
<style lang="scss" scoped>

@media screen and (max-width:$large-srceen) {
  .steps-all{
    width: 1239px;
    .steps-item{
         width: 413px;
    }
  }

}
</style>