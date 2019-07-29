<template>
    <div class="box"  v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.9)">
        <person-detail  ref="per" ></person-detail>
        <myself-dd @load='load'></myself-dd>
        <index-monitor></index-monitor>
    </div>
</template>
<script>
import personDetail from "./indexPer.vue"
import myselfDd from "./indexMyself.vue"
import indexMonitor from "./indexMonitor.vue"
import Cookies from 'js-cookie'
export default {
    components: {
      personDetail,
      myselfDd,
      indexMonitor
      
    },
   data() {
      return {
          loadingA:true,
          loadingB:true,
      }
   },
   created(){
       var vm = this;
       vm.setUserData();
   },
   computed:{
       loading(){
           return this.loadingA || this.loadingB
       }
   },
   methods: {
       load(){
           this.loadingB=false;
       },
       //获取用户信息存储至session
       setUserData(){
           var vm = this;
            var json = {
                token:Cookies.get('token')
            }
            vm._postData('/Home/User/getUserInfo.json',json,(data)=>{
                
                var user = JSON.stringify(data.data.data);
                sessionStorage.setItem('userdata',user);
                this.$refs.per.init();
                 vm.loadingA=false;
            })
       }
   }
}
</script>
<style lang="scss" scoped>
.box{
    width: 1736px;
    margin:30px auto; 
}
@media screen and (max-width:$large-srceen) {
  .box{
    width: 1300px;
    margin:30px auto; 
   }
}
</style>

