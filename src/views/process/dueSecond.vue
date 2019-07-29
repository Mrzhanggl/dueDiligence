<template>
  <div class="due-second">
    <ul class="d-template">
      <li class="d-left">
        <div class="title" @click="select">
          <div class="left">
            <div class="check-all" id="check-all">
              <i class="iconfont icon-done"></i>
            </div>全选
          </div>
        </div>
        <div class="tp-box">
          <due-second-catalog ref="catalog" @checkAll="checkAll"></due-second-catalog>
        </div>
      </li>
      <li class="d-middle">
        <div class="title">
          <div class="left">模板预览</div>
          <div class="right" @click="dialogVisible = true">
            <img src="../../assets/img/due/more_icon_default.png" />
          </div>
        </div>
        <div class="tp-box" id="all">
          <template-container></template-container>
        </div>
      </li>
      <li class="d-right">
        <div class="title">
          <div class="left">提示</div>
        </div>
        <div class="tp-box" style="padding-top:21px">
          <div class="section">当前预览的尽调报告模板为无数据填充版本</div>
          <div class="section">本尽调报告中的所填充的数据内容均已经过第三方平台授权</div>
          <div class="section">尽调报告中的股权穿透图可能内容较多，请保存图片到本地进行查看</div>
        </div>
      </li>
    </ul>
    <div class="operat-area">
      <div class="prev-btn" @click="handleClick(1)">上一步</div>
      <el-button
        class="btn"
        type="primary"
        v-if="$store.state.dueParams.enterprise_id != 3366"
        :disabled="($store.state.atlasLoad)"
        @click="handleClick(3)"
      >{{$store.state.atlasLoad?'模板加载中':'下一步'}}</el-button>
      <el-button
        class="btn"
        type="primary"
        v-if="$store.state.dueParams.enterprise_id == 3366"
        @click="handleClick(3)"
      >下一步</el-button>
    </div>
    <due-second-global :dialogVisible.sync="dialogVisible"></due-second-global>
  </div>
</template>
<script>
import $ from "jquery";
import templateContainer from "./dueSecondTemplate.vue";
import dueSecondGlobal from "./dueSecondGlobal.vue";
import dueSecondCatalog from "./dueSecondCatalog.vue";
export default {
  components: {
    templateContainer,
    dueSecondGlobal,
    dueSecondCatalog
  },
  data() {
    return {
      dialogVisible: false,
      catalogue: [{}],
      selectAll: false,
      idPx: [
        {
          id: 1,
          loacl: 0
        },
        {
          id: 2,
          loacl: 904
        },
        {
          id: 3,
          loacl: 1346
        },
        {
          id: 4,
          loacl: 1868
        },
        {
          id: 5,
          loacl: 1945
        },
        {
          id: 6,
          loacl: 3488
        },
        {
          id: 7,
          loacl: 4488
        },
        {
          id: 8,
          loacl: 5188
        },
        {
          id: 9,
          loacl: 5648
        },
        {
          id: 10,
          loacl: 6408
        },
        {
          id: 11,
          loacl: 7508
        }
      ]
    };
  },
  computed: {
    selectId() {
      console.log(this.$refs.catalog.idArr);

      return this.$refs.catalog.idArr;
    }
  },
  watch: {
    "$store.state.showId": function(newVal) {
      this.locationId(newVal);
    }
  },

  mounted() {
    this.select();
  },
  methods: {
    handleClick(num) {
      this.$store.commit("setStep", num);
      if (num == 3) {
        this.$store.commit("setAntype", true);
        this.$store.commit("setDueParams", this.startDue());
      }
    },
    select() {
      if ($("#check-all").hasClass("is-active")) {
        $("#check-all").removeClass("is-active");
        this.$refs["catalog"].allSelect(false);
      } else {
        $("#check-all").addClass("is-active");
        this.$refs["catalog"].allSelect(true);
      }
    },
    checkAll(type) {
      type
        ? $("#check-all").addClass("is-active")
        : $("#check-all").removeClass("is-active");
    },
    //开始尽调
    startDue() {
      let vm = this;
      let collateList = this.$fn.collateList();
      let params = {
        token: vm.Token,
        fm_yy: [],
        key_map: []
      };
      this.selectId.sort(this.sortNumber);
      this.selectId.map(data => {
        collateList.map(item => {
          if (item.id == data && (data == 1 || data == 2)) {
            data == 1 ? params.fm_yy.push("封面") : params.fm_yy.push("引言");
          }
          if (item.id == data && data != 1 && data != 2 && item.title) {
            // params.key_map[item.title] = item.content;
            params.key_map.push(item.title);
          }
        });
      });
      return params;
    },
    sortNumber(a, b) {
      //升序
      return a - b;
    },
    locationId(id) {
      for (let item of this.idPx) {
        if (item.id == id) {
          $(`#all`).scrollTop(item.loacl);
          break;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.section {
  font-size: 18px;
  // font-weight: bold;
  text-indent: 2em;
  letter-spacing: 0px;
  line-height: 36px;
  padding:0 30px;
  color:#556675;
  text-align: justify;
}
.due-second {
  width: 1680px;
  height: 728px;
  margin: auto;
  margin-top: 20px;
  ul > li {
    display: inline-block;
    height: 603px;
    margin-left: 20px;
    border: 2px solid rgba(230, 233, 235, 1);
    border-radius: 8px;
    vertical-align: top;
    &:nth-child(1) {
      margin-left: 0px;
    }
  }

  .d-left {
    width: 356px;
  }
  .d-middle {
    width: 916px;
    .right {
      width: 20px;
      height: 58px;
      line-height: 60px;
      margin-right: 22px;
      text-align: center;
      cursor: pointer;
    }
  }
  .d-right {
    width: 356px;
  }
  .tp-box {
    width: 100%;
    height: 543px;
    border-radius: 0 0 8px 8px;
    overflow: auto;
    
  }
  .title {
    width: 100%;
    height: 58px;
    background-color: #f7f9fb;
    border-bottom: 2px solid rgba(230, 233, 235, 1);
    border-radius: 8px 8px 0px 0px;
    .left {
      line-height: 58px;
      margin-left: 30px;
      font-size: 18px;
    }
  }
  .operat-area {
    margin-top: 30px;
    line-height: 60px;
    text-align: center;
    .btn {
      width: 173px;
      height: 60px;
      letter-spacing: 2px;
      margin-left: 20px;
    }
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  .section {

  padding:0 10px;
 
}
  .due-second {
    width: 1239px;
    .d-middle {
      width: 615px;
    }
    .d-right {
      width: 216px;
    }
    .tp-box {
      width: 100%;
    }
  }
}
</style>
