<template>
    <div class="page">
        <el-pagination class="reset"
            :background="true" 
            layout="prev, pager, next,jumper"
            :page-size="size"
            :total="page"
            @current-change='changePage'>
        </el-pagination>
    </div>
</template>
<script>
export default {
   data() {
      return {
          page:0,
          size:0,
      }
   },
   props:{
   },
   created(){
    //    this.text()
   },
   methods: {
       changePage(p){
           this.$emit('getData', p);
       }
   }
}
</script>
<style lang="scss" scoped>
.page{
  padding: 30px 0 0 0;
  text-align: center;
}
</style>

