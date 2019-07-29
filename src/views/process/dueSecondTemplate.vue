<template>
    <div class="tp-container" id="all">
       
         <cover         id="1" ><div :class="noShow(1)"></div></cover>
         <introduction  id="2" ><div :class="noShow(2)"></div></introduction>
         <catalog       id="3" ><div :class="noShow(3)"></div></catalog>
         <first         id="4" ></first>
         <first-first   id="5" ><div :class="noShow(5)"></div></first-first>
         <first-second  id="6" ><div :class="noShow(6)"></div></first-second>
         <first-third   id="7" ><div :class="noShow(7)"></div></first-third>
         <first-fourth  id="8" ><div :class="noShow(8)"></div></first-fourth>
         <first-fifth   id="9" ><div :class="noShow(9)"></div></first-fifth>
         <first-sixth   id="10" ><div :class="noShow(10)"></div></first-sixth>
         <first-seventh id="11" ><div :class="noShow(11)"></div></first-seventh>
         <!-- <second-first  ><div :class="show(13)"></div></second-first>
         <second-second ><div :class="show(14)"></div></second-second>
         <second-third  ><div :class="show(15)"></div></second-third> -->
         <!-- <appendix      v-show="isSelect == 13"></appendix> -->
    </div>
</template>

<script>
import $ from 'jquery'
import first from './template/first.vue'
import firstFirst from './template/firstFirst.vue'
import firstSecond from './template/firstSecond.vue'
import firstThird from './template/firstThird.vue'
import firstFourth from './template/firstFourth.vue'
import firstFifth from './template/firstFifth.vue'
import firstSixth from './template/firstSixth.vue'
import firstSeventh from './template/firstSeventh.vue'
import secondFirst from './template/secondFirst.vue'
import secondSecond from './template/secondSecond.vue'
import secondThird from './template/secondThird.vue'
import appendix from './template/appendix.vue'
import cover from './template/cover.vue'
import introduction from './template/introduction.vue'
import catalog from './template/catalog.vue'
import atlas from './template/atlas.vue'

export default {
    components:{
        atlas,
        first,
        firstFirst,
        firstSecond,
        firstThird,
        firstFourth,
        firstFifth,
        firstSixth,
        firstSeventh,
        secondFirst,
        secondSecond,
        secondThird,
        appendix,
        cover,
        introduction,
        catalog
    },
   data() {
      return {
         
      }
   },
   computed:{
       isSelect(){
        //    console.log(this.$store.state.isSelectDue);
           
           return this.$store.state.isSelectDue;
       },
       showId(){
        //    console.log(this.$store.state.isSelectDue);
           
           return this.$store.state.showId;
       }
   },
  
   methods: {
       isAll(){
         return   this.isSelect == 'all'?true:false
       },
       noShow(id){
          if(this.isSelect.indexOf(id) == -1) {
              return 'filter-mask'
          }else{
              return ''
          }
       },
     


   }
}
</script>
<style lang="scss" scoped>
   .tp-container {
       width: 860px;
       margin: auto;
       margin-top: 29px;
       margin-bottom: 29px;
   }
</style>
<style lang="scss" scoped>
@media screen and(max-width: 1800px)  {
  .tp-container {
       width: 100%;
   }
}
</style>


