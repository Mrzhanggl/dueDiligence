<!--  -->
<template>
  <div class="pro-all">
    <div class="pro-main">
      <steps></steps>
      <due-first v-show="this.$store.state.stepId == 1"></due-first>
      <due-second v-show="this.$store.state.stepId == 2"></due-second>
      <due-third v-show="this.$store.state.stepId == 3"></due-third>
    </div>
  </div>
</template>

<script>
import steps from "./steps.vue";
import dueFirst from "./dueFirst.vue";
import dueSecond from "./dueSecond.vue";
import dueThird from "./dueThird.vue";
export default {
  data() {
    return {
      leaveType: true
    };
  },

  components: {
    steps,
    dueFirst,
    dueSecond,
    dueThird
  },

  computed: {},

  created() {
    this.$store.commit("setStep", 1);
    this.$store.commit("setAntype", false);
  },

  beforeRouteLeave(to, from, next) {

    if (this.$store.state.stepId == 2) {
      this.$confirm("系统不会保存您的尽调信息?", "要离开当前页面吗？", {
        distinguishCancelAndClose: true,
        confirmButtonText: "留下",
        cancelButtonText: "离开",
        cancelButtonClass: "el-button--text"
      })
        .then(() => {
          next(false);
        })
        .catch(action => {
          action === "cancel" ? next() : next(false);
        });
    } else {
      next();
    }
  },
  methods: {
 
  }
};
</script>
<style lang='scss' scoped>
.pro-all {
  width: 100%;
  min-width: 1740px;
  padding-top: 30px;
  position: relative;
  .pro-main {
    width: 1740px;
    height: 830px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(230, 233, 235, 1);
    border-radius: 8px;
    margin: auto;
  }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  .pro-all {
    min-width: 1300px;
    .pro-main {
      width: 1300px;
    }
  }
}
// @media screen and(min-height: 1100px) {
//   .pro-all {
//     padding-bottom: 0px;
//   }
// }
</style>