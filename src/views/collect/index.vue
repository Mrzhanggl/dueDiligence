<template>
  <div
    class="due-d container-card"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)"
  >
    <div class="filter">
      <div class="left">
        当前收藏企业有
        <span class="Din-M theme-text">{{count}}</span>家
      </div>
      <div class="right">
        <div style="display:inline-block;">
          <el-input
            placeholder="请输入内容进行搜索"
            v-model="search.text"
            class="input-with-select"
            @keyup.enter.native="init(1,aims)"
          >
            <el-select
              v-model="search.name"
              class="search"
              slot="prepend"
              placeholder="请选择"
              :popper-append-to-body="false"
            >
              <el-option label="企业名" value="company"></el-option>
              <el-option label="法人" value="corporate"></el-option>
            </el-select>
            <el-button slot="append" type="primary" class="primary-btn" @click="init(1,aims)">搜索</el-button>
          </el-input>
        </div>
        <div class="search" style="display:inline-block;margin-left:30px;">
          <el-select
            v-model="sort"
            placeholder
            class="select"
            :popper-append-to-body="false"
            @change="changeSort"
          >
            <template slot="prefix">排序：</template>
            <el-option
              v-for="(item,index) in sort_list"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="dd-table">
      <el-table :data="tableData">
        <el-table-column prop="collection_date" label="收藏日期" width="270px"></el-table-column>

        <el-table-column label="企业名" width="400px">
          <template slot-scope="scope">
            <div
              class="theme-text"
              @click="goQixinbao(scope.row.qxb_id,scope.row.enterprise_id,scope.row.name,scope.row)"
            >{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="oper_name" label="法人"></el-table-column>
        <el-table-column prop="status" label="经营状态"></el-table-column>
        <el-table-column  label="操作" >
          <template slot-scope="scope">
            <div class="btn-box">
              <div class="btn-list">
                <el-button
                  type="text"
                  size="medium"
                  @click="goDue(scope.row.id,scope.row.name,scope.row.oper_name,scope.row.status,scope.row)"
                >尽调</el-button>
              </div>
              <div class="btn-list">
                <el-button
                  type="text"
                  class="danger"
                  size="medium"
                  @click="collect(scope.row.enterprise_id,scope.row.is_collected)"
                >取消收藏</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <public-page ref="pagList" @getData="init"></public-page>
    <download :wordId="downloadId" :dialogVisible.sync="dialogVisible"></download>
  </div>
</template>
<script>
import publicPage from "@@/page.vue";
import download from "@@/download.vue";
export default {
  components: {
    publicPage,
    download
  },
  data() {
    return {
      api_collect_data: "/Home/Collection/index.json",
      loading: false,
      search: {
        name: "company",
        text: "",
        page: 1,
        limit: 10
      },
      sort: "0",
      sort_list: [
        {
          value: "0",
          label: "默认排序"
        },
        {
          value: "2",
          label: "最早成立企业"
        },
        {
          value: "1",
          label: "最新成立企业"
        }
      ],
      aims: "",
      dialogVisible: false,
      downloadId: "",
      tableData: [],
      count: 0
    };
  },
  created() {
    this.init(1);
  },
  methods: {
    goQixinbao(eid, id, name, business) {
      var vm = this;
      var json = {
        enterprise_id: id,
        token: vm.Token
      };
      sessionStorage.setItem("business", JSON.stringify(business));
      vm._postData("/Home/User/markFastCheck.json", json, data => {
        this.$router.push({
          name: "qixinbaoIndex",
          query: { eid: eid, id: id, name: name }
        });
      });
    },
    goDue(id, name, corporate, status, business) {
      let params = {
        enterprise_id: id,
        company: name,
        corporate: corporate,
        status: status
      };
      sessionStorage.setItem("business", JSON.stringify(business));
      this.$store.commit("setDueParams", params);
      this.$router.push({ name: "processIndex", query: { type: "exist" } });
    },
    init(p) {
      var vm = this;
      vm.loading = true;
      this.search.text = this.search.text.replace(/\s+/g, "");
      p ? (this.search.page = p) : "";
      var json = {
        page: p,
        limit: 10,
        [this.search.name]: this.search.text,
        order_index: this.sort
      };
      vm._postData(vm.api_collect_data, json, data => {
        vm.tableData = data.data.data;
        vm.count = parseInt(data.data.count);
        vm.$refs.pagList.page = parseInt(data.data.count);
        vm.$refs.pagList.size = 10;
        vm.loading = false;
      });
    },
    collect(id, status) {
      let vm = this;
      let api = status == 1 ? vm._api_unCollect : vm._api_collect;
      this.$confirm("确定取消收藏该企业？", "请确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "el-button--text"
      })
        .then(() => {
          vm._postData(api, { enterprise_id: id }, data => {
            vm.$message.success(data.msg);
            vm.init();
          });
        })
        .catch(() => {});
    },
    handleClick(val) {
      this.aims = val;
      this.init(1, val);
    },
    openDownload(id) {
      this.downloadId = id;
      this.dialogVisible = true;
    },
    changeSort() {
      this.init(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.due-d {
  margin: 30px auto 0 auto;
  .filter {
    height: 52px;
    .left {
      line-height: 52px;
    }
  }
  .dd-table {
    margin-top: 30px;
  }
  .point {
    vertical-align: 1px;
    width: 8px;
    height: 8px;
    background: rgba(234, 79, 79, 1);
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
  .active {
    background: rgba(0, 168, 139, 1);
  }
  .theme-text {
    cursor: pointer;
  }
}
</style>

