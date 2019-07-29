<template>
  <div v-if="show">
    <!-- :showBtn="false" -->
    <org-chart ref="printMe" :showBtn="false" :datasource="ds" :zoom="false" class="HapMap" @downloadUrl="saveAddress"></org-chart>
  </div>
</template>

<script>
import orgChart from "~/qixinbao/indexOrgChart.vue";
import $ from "jquery";
export default {
  components: {
    orgChart
  },
  data() {
    return {
      show: true,
      api_due_map: "Home/EnterpriseMap/ownershipMap.json",
      ds: {},
      searchCompany: {}
    };
  },
  // computed:{
  //   stepId(){
  //     return this.$store.state.stepId
  //   }
  // },
  watch: {
    "$store.state.dueParams.company": {
      handler: function(newVal) {
      if (newVal == "") {
        return false;
      }
      this.show = false;
      $("div").remove(".orgchart");
      
      this.show = true;
      this.ds = {};
      this.getData();
    },
      deep: true
    }
  
  },
  methods: {
    getData() {
      let vm = this;
      vm.$store.commit("setAtlasLoad", true);
      let params = {
        enterprise_id: this.$store.state.dueParams.enterprise_id,
        company: this.$store.state.dueParams.originalCompany
      };
      setTimeout(()=>{
        
        if(vm.$refs.printMe.checkTime) {
          vm.saveAddress("")
          vm.$store.commit("setAtlasLoad", false);
        }
          
      },30000)
      this._getData(this.api_due_map, params, data => {
        vm.searchCompany = data.data;
        // vm.loading = false;
        (vm.searchCompany.name = this.$store.state.dueParams.company),
          (vm.ds = {
            id: vm.searchCompany.id,
            name: this.$store.state.dueParams.company,
            title: "变更时间: 无",
            className: "middle-level"
          });

        vm.findSon(this.searchCompany);
        vm.ds = Object.assign(vm.ds, vm.searchCompany);
        vm.findFather(this.searchCompany);

        // vm.creatData = true;
        console.log(vm.ds);

        vm.$forceUpdate();
        setTimeout(vm.$refs.printMe.print, 1000);
      });
    },
    findSon(item) {
      // console.log(item.son.length);

      if (item.son&&item.son.length > 0) {
        for (let it of item.son) {
          if (item.children && item.children.length > 0) {
          } else {
            item.children = [];
          }
          //处理成符合的格式
          item.children.push({
            id: it.id,
            name: it.name,
            title:
              this.$fn.getDate(it.start_date) +
              "&nbsp;" +
              this.$fn.toNumDecimal(it.percent * 100) +
              "%",
            className: "bottom-level",
            son: it.son
          });
        }
        for (let she of item.children) {
          if (she.son.length > 0) {
            this.findSon(she);
          }
        }
      }
    },
    findFather(item) {
      let vm = this;

      if (!!item.parent) {
        if (item.parent.children && item.parent.children.length > 0) {
        } else {
          item.parent.children = [];
        }
        //处理格式
        item.parent.title =
          (item.parent.change_date
            ? this.$fn.getDate(item.parent.change_date)
            : "暂无工商变更时间") +
          "&nbsp;" +
          this.$fn.toNumDecimal(item.parent.percent * 100) +
          "%";

        item.parent.className = "top-level";
        item.parent.children.push(vm.ds);
        vm.ds = item.parent;
      }
      if (!!item.parent && !!item.parent.parent) {
        this.findFather(item.parent);
      }
    },
    saveAddress(url) {

      let params = {
        jg_url: url
      };
      this.$store.commit("setDueParams", params);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>