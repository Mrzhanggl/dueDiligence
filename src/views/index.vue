<template>
  <div>
    <public-header ref="header"></public-header>
    <stair-nav></stair-nav>
    <div class="container-box min-height" :class="{'stairNav':!isWordData}">
      <router-view></router-view>
    </div>
    <public-footer></public-footer>
  </div>
</template>
<script>
import publicHeader from "~/public/header.vue";
import stairNav from "~/public/stairNav.vue";
import publicFooter from "~/public/footer.vue";
import Cookies from "js-cookie";
export default {
  components: {
    publicHeader,
    stairNav,
    publicFooter
  },
  data() {
    return {};
  },
  watch: {
    $route() {
      this.setUserData();
    }
  },
  computed: {
    isWordData() {
      return this.$route.meta.stairNav == "workbench";
    }
  },
  beforeRouteUpdate(to, from, next) {
    var vm = this;

    if (to.name == "dataIndex") {
      if (!vm.$fn.hasAuth("数据页展示")) {
        vm.$store.commit("setNotAuth", true);
        return false;
      } else {
        next();
      }
    } else if (to.name == "dueIndex") {
      if (!vm.$fn.hasAuth("查看尽调记录")) {
        vm.$store.commit("setNotAuth", true);
        return false;
      } else {
        next();
      }
    } else {
      next();
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   alert('aaa');
  //   next()
  // },
  created() {
    this.setUserData();
    this.$fn.setLoginToken(Cookies.get("_Token"));
  },
  methods: {
    setUserData() {
      var vm = this;
      vm._postData("/Home/User/getUserInfo.json", {}, data => {
        vm.$refs.header.person = data.data.data;
        var user = JSON.stringify(data.data.data);
        sessionStorage.setItem("userdata", user);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.min-height {
  min-height: 614px;
}
.min-height.stairNav {
  min-height: 685px;
}
</style>
<style lang="scss" scoped>

@media screen and(min-height: 969px) {
  .min-height {
    min-height: 647px;
  }
  .min-height.stairNav {
    min-height: 719px;
  }
}
@media screen and(min-height: 987px) {
  .min-height {
    min-height: 665px;
  }
  .min-height.stairNav {
    min-height: 736px
  }
}
@media screen and(min-height: 1000px) {
  .min-height {
    min-height: 691px;
  }
  .min-height.stairNav {
    min-height: 762px;
  }
}
</style>



