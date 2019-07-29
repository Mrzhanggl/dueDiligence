<template>
  <div class="container-box container">
    <div class="detail-nav">
      <ul class="nav-total">
        <li class="nav-list" :class="[isHome()?'is-active':'']" @click="goRoute('homeIndex')">
          <div class="point"></div>首页
        </li>

        <li class="nav-list" :class="[isDue()?'is-active':'']" @click="goRoute('dueIndex')">
          <div class="point"></div>尽调
        </li>
        <li class="nav-list">
          <div class="point"></div>监控
        </li>
        <li class="nav-list"  :class="[isCollect()?'is-active':'']" @click="goRoute('collectIndex')">
          <div class="point"></div>收藏
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    goRoute(name) {
      this.$router.push({ name: name });
    },
    isHome() {
      return this.$route.name == "homeIndex" ? true : false;
    },
    isDue() {
      return this.$route.name == "dueIndex" ? true : false;
    },
    isCollect() {
      return this.$route.name == "collectIndex" ? true : false;
    },
  }
};
</script>
<style lang="scss">
$height: 72px;
@mixin com-nav {
  width: 1740px;
  height: $height;
}
.detail-nav {
  @include com-nav;
  margin: 0 auto;
  .nav-total {
    @include com-nav;
    .nav-list {
      display: inline-block;
      width: 100px;
      height: $height - 3px;
      text-align: center;
      line-height: $height - 3px;
      border-bottom: 3px solid transparent;
      margin-left: 335px;
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
      &:nth-child(1) {
        margin-left: 166px;
      }
      &:nth-child(3) {
        cursor: not-allowed;
      }
      .point {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #9ea8b1;
        border-radius: 50%;
        margin-right: 11px;
        vertical-align: 2px;
      }
      &.is-active {
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
        .point {
          width: 6px;
          height: 6px;
          margin-right: 9px;
          background-color: #fff;
          border: 3px solid $theme-color;
          vertical-align: 0px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  @mixin com-nav {
    width: 1340px;
  }
  .detail-nav {
    @include com-nav;

    .nav-total {
      width: 1300px;
      .nav-list {
        margin-left: 232px;
        &:nth-child(1) {
          cursor: pointer;
          margin-left: 113px;
        }
      }
    }
  }
}
</style>


