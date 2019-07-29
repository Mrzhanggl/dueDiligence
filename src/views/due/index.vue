<template>
  <div
    class="due-d container-card"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)"
  >
    <div class="filter">
      <div class="right">
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
    </div>
    <div class="dd-table">
      <el-table :data="tableData">
        <el-table-column prop="jd_time" label="调查日期" width="270px"></el-table-column>

        <el-table-column prop="aims" width="209px">
          <template slot="header" slot-scope="{ column, $index }">
            <el-dropdown trigger="click" placement="bottom-start" @command="handleClick">
              <span class="el-dropdown-link">
                尽调目的
                <i class="el-icon-caret-bottom el-icon--right text"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command>全部</el-dropdown-item>
                <el-dropdown-item command="投融资">投融资</el-dropdown-item>
                <el-dropdown-item command="银行授信">银行授信</el-dropdown-item>
                <el-dropdown-item command="IPO">IPO</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column label="企业名" width="409px">
          <template slot-scope="scope">
            <div
              class="theme-text"
              @click="goQixinbao(scope.row.enterprise_data.qxb_id,scope.row.enterprise_id,scope.row.company,scope.row)"
            >{{scope.row.company}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="corporate" label="法人"></el-table-column>
        <el-table-column label="生成状态">
          <template slot-scope="scope">
            <span class="text">
              <div
                class="point"
                :class="{ active: (scope.row.status_generate=='生成中'?false:true), }"
              ></div>
              {{scope.row.status_generate}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="操作" width="159px">
          <template slot-scope="scope">
            <div class="btn-box">
              <div class="btn-list"  v-if="scope.row.status_generate !=='生成中'">
                <el-button
                  type="text"
                  size="medium"
                  @click="openDownload(scope.row.id)"
                >下载</el-button>
              </div>
              <div class="btn-list">
                <el-button
                  type="text"
                  :class="scope.row.is_collected==1?'danger':''"
                  size="medium"
                  @click="collect(scope.row.enterprise_id,scope.row.is_collected)"
                >{{scope.row.is_collected==1?'取消收藏':'收藏'}}</el-button>
              </div>
            </div>

            <!-- <el-button type="text" size="medium">更新</el-button> -->
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
      loading: false,
      search: {
        name: "company",
        text: ""
      },
      aims: "",
      page: "1",
      dialogVisible: false,
      downloadId: "",
      tableData: []
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
      business.enterprise_data.start_date = business.business_data.start_date
      sessionStorage.setItem("business", JSON.stringify(business.enterprise_data));
      vm._postData("/Home/User/markFastCheck.json", json, data => {
        this.$router.push({
          name: "qixinbaoIndex",
          query: { eid: eid, id: id, name: name }
        });
      });
    },
    init(p, aims = "") {
      var vm = this;
      vm.loading = true;
      this.search.text = this.search.text.replace(/\s+/g, "");
      var json = {
        token: this.Token,
        page: p,
        aims: aims,
        [this.search.name]: this.search.text
      };
      vm._postData("/Home/User/allJdNumber.json", json, data => {
        vm.tableData = data.data.data;
        vm.$refs.pagList.page = parseInt(data.data.count);
        vm.$refs.pagList.size = 10;
        vm.loading = false;
      });
    },
    handleClick(val) {
      this.aims = val;
      this.init(1, val);
    },
    openDownload(id) {
      var vm = this;
      if (!vm.$fn.hasAuth("下载尽调报告")) {
        vm.$store.commit("setNotAuth", true);
        return false;
      }
      this.downloadId = id;
      this.dialogVisible = true;
    },
    collect(id, status) {
      let vm = this;
      let api = status == 1 ? vm._api_unCollect : vm._api_collect;
      vm._postData(api, { enterprise_id: id }, data => {
        vm.$message.success(data.msg);
        vm.init();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.due-d {
  margin: 30px auto;
  .filter {
    height: 52px;
    .right {
      width: 520px;
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

