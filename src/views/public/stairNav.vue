<template>
  <div class="container-box container">
    <div class="nav">
      <div class="box">
          <div class="workbench"  @click="goWork()"  :class="[ isWorkbench()?'is-active':'' ]">
            <div class="wb-img bottom"></div>
            <span class="wb-tl bottom">工作台</span>
          </div>
          <div class="data" @click="goData()" :class="[ isData()?'is-active':'' ]">
            <div class="da-img bottom"></div>
            <span class="da-tl bottom">数据</span>
          </div>
      </div>
    </div>

    <detail-nav v-if="isWorkbench()"></detail-nav>
  </div>
</template>
<script>
import detailNav from "./detailNav.vue";
export default {
  components: {
    detailNav
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    isData() {
      return this.$route.meta.stairNav == "data" ? true : false;
    },
    isWorkbench() {
      return this.$route.meta.stairNav == "workbench" ? true : false;
    },
    goWork(){
      this.$router.push({name:'homeIndex'})
    },
    goData(){
      this.$router.push({name:'dataIndex'})
    }

  }
};
</script>
<style lang="scss">
$height: 61px;
.nav {
  width: 1740px;
  height: $height;
  text-align: center;
  margin: 0 auto;
  .box {
    width: 370px;
    height: $height;
    margin: 0 auto;
    .data {
      float: right;
      width: 100px;
      height: $height - 3px;
      line-height: 41px;
      position: relative;
      cursor: pointer;
      &::after{
          content: '';
          display: block;
          position: absolute;
          bottom: -3px;
          width: 0%;
          height: 3px;
          left: 0;
          right: 0;
          margin: auto;
          background: $theme-color;
          transition: all .5s;
        }
    }
    .workbench {
      cursor: pointer;
      float: left;
      width: 100px;
      height: $height - 3px;
      line-height: 41px;
      border-bottom: 3px solid transparent;
      position: relative;
      &::after{
          content: '';
          display: block;
          position: absolute;
          bottom: -3px;
          width: 0%;
          height: 3px;
          left: 0;
          right: 0;
          margin: auto;
          background: $theme-color;
          transition: all .5s;
        }
    }
    .is-active {
      // border-bottom: 3px solid $theme-color;
      &::after{
          content: '';
          display: block;
          position: absolute;
          bottom: -3px;
          width: 100%;
          height: 3px;
          left: 0;
          right: 0;
          margin: auto;
          background: $theme-color;
        }
      .da-img {
        background-image: url("../../assets/img/stairNav/data_icon_active.png");
      }
      .wb-img {
        background-image: url("../../assets/img/stairNav/gallery_icon_active.png");
      }
      .da-tl,
      .wb-tl {
        color: $theme-color;
      }
    }
    .da-img {
      width: 18px;
      height: 21px;
      background-image: url("../../assets/img/stairNav/data_icon_default.png");
    }
    .wb-img {
      width: 20px;
      height: 18px;
      background-image: url("../../assets/img/stairNav/gallery_icon_default.png");
    }
    .da-tl,
    .wb-tl {
      font-size: 16px;
      font-weight: bold;
      color: rgba(13, 26, 38, 1);
      line-height: 18px;
      margin-left: 10px;
    }
    .bottom {
      display: inline-block;
      vertical-align: bottom;
    }
  }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  .nav {
     width: 1300px;
   }
}
   
</style>



