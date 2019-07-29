<template>
  <div class="container-card container">
    <div class="title">尽调图谱</div>
    <div
      class="charts"
      v-loading="loading"
      element-loading-text="图谱正在加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- <x-chart :id="id" :option="option" v-if="creatData" :loading="loading"></x-chart> -->
      <org-chart ref="printMe" :datasource="ds" class="HapMap"  :loading.sync="loading"></org-chart>
    </div>
  </div>
</template>
 
<script>
// 导入chart组件
import orgChart from "./indexOrgChart.vue";
import $ from "jquery"
export default {
  components: {
    orgChart
  },

  data() {
    return {
      api_due_map: "Home/EnterpriseMap/ownershipMap.json",
      searchCompany: {},
      ds: {},
      creatData: false,
      loading: false
    };
  },
  created() {
    $("div").remove(".orgchart");
    this.getData();
  },
  mounted() {
    // setTimeout(this.print, 3000);
  },
  methods: {
    handleClose() {},
    getData() {
      let vm = this;
      vm.loading = true;
      let params = {
        enterprise_id: this.$route.query.id,
        company: this.$route.query.name
      };
      this._getData(this.api_due_map, params, data => {
        console.log(data);
        vm.searchCompany = data.data;
        // vm.loading = false;
        vm.ds = {
          id: vm.searchCompany.id,
          name: vm.searchCompany.name,
          title: "变更时间: 无",
          className: "middle-level"
        };
        vm.findSon(this.searchCompany);
        vm.ds = Object.assign(vm.ds, vm.searchCompany);
        vm.findFather(this.searchCompany);

        vm.creatData = true;

        setTimeout(vm.$refs.printMe.print, 1000);
      });
    },
    findSon(item) {
      // console.log(item.son.length);

      if (item.son.length > 0) {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.charts {
  width: 100%;
  min-height: 810px;
  overflow: auto;
}
.container-card {
  margin: 30px auto;
  background-color: #fff;
  border: 2px solid #e6e9eb;
  border-radius: 8px;
}
.title {
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-top:30px;
  padding-bottom: 30px;
}
</style>

