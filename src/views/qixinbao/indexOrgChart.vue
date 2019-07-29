<template>
  <div>
    <vo-basic
      :data="datasource"
      :zoom="zoom"
      :pan="true"
      :nodeTitle="'name'"
      :nodeId="'id'"
      :nodeContent="'title'"
      :toggleCollapse="true"
    ></vo-basic>
    <div
      style="width:100%;font-weight:bold;text-align:center;margin:10px auto 10px auto;"
      v-if="showBtn"
      v-show="!showLittle"
    >
      <div>图谱太大无法生成图片</div>
    </div>
    <div style="width:100%;text-align:center;margin:30px auto;" v-if="showBtn" v-show="showLittle">
      <a :href="this.base64_data" download="图谱.png">
        <el-button
          class="next-btn"
          style="width:130px;
                  height:52px;
                  background:rgba(66,133,244,1);
                  border-radius:4px;"
          type="primary"
        >下载图片</el-button>
      </a>
    </div>
  </div>
</template>

<script>
import { VoBasic } from "vue-orgchart";
import html2canvas from "html2canvas";
import $ from "jquery";
import { setTimeout } from "timers";
window.html2canvas = html2canvas;
export default {
  components: {
    VoBasic
  },
  props: {
    datasource: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    zoom: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    download: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      api_base64: "/home/User/acceptBase64.json",
      base64_data: "",
      showLittle: true,
      checkTime:true,//判断时间没有超过30秒的标志，从而中止延时
      // datasource: {
      // id: "1",
      // name: "Lao Lao",
      // title: "general manager",
      // className: "middle-level",
      // children: [
      //   {
      //     id: "2",
      //     name: "Bo Miao",
      //     title: "2019-12-01 100%",
      //     className: "middle-level"
      //   },
      //   {
      //     id: "3",
      //     name: "Su Miao",
      //     title: "department manager",
      //     className: "middle-level",
      //     children: [
      //       { id: "4", name: "Tie Hua", title: "senior engineer" },
      //       }
      //     ]
      //   },
      //   {
      //     id: "8",
      //     name: "Hong Miao",
      //     title: "department manager",
      //     className: "middle-level"
      //   },
      //   {
      //     id: "9",
      //     name: "Chun Miao",
      //     title: "department manager",
      //     className: "middle-level"
      //   }
      // ]
      // }
    };
  },
  mounted() {
    let vm = this;

    // setTimeout(vm.print,4000)
  },
  methods: {
    async print() {
      const el = $(".orgchart:eq(1)>table")[0];

      let boxWidth =
        $(".orgchart:eq(1)>table").width() / 2 -
        $("#chart-container").width() / 2 +
        50;
      $(".orgchart:eq(1)").css(
        "transform",
        `matrix(1, 0, 0, 1, -${boxWidth}, 0)`
      );
      let vm = this;
      console.log($(".orgchart:eq(1)>table").width() > 15000);

      if ($(".orgchart:eq(1)>table").width() > 20000) {
        this.showLittle = false;
        vm.$emit("update:loading", false);
        vm.$emit("downloadUrl", "");
        return false;
      }

      console.log(this.datasource);
      const options = {
        type: "dataURL"
      };
      this.dataSrc = await this.$html2canvas(el, options);
    },
    //转换图片
    async $html2canvas(el, options = {}) {
      console.log(el);
      const { type } = options;
      const canvas = await html2canvas(el, options).then(function(canvas) {
        return canvas;
      });
      if (type && type === "dataURL") {
        this.base64_data = canvas.toDataURL();
        this.checkTime = false;
        this.$emit("update:loading", false);
        this.$store.commit("setAtlasLoad", false);
        

        this.downImg();
        return canvas.toDataURL();
      } else {
        console.warn(
          "Vue Html2Canvas Warn: Invalid option type. Use 'dataURL' instead. Returning canvas."
        );
        return canvas;
      }
    },
    downImg() {
      let vm = this;
      vm._postData(vm.api_base64, { base64_data: vm.base64_data }, data => {
        console.log(vm.webUrl + data.data.url);
        vm.$emit("downloadUrl", data.data.url);
      });
    }
  }
};
</script>
<style lang='scss' >
.public .el-button .next-btn {
  letter-spacing: 1px;
  width: 130px;
  height: 52px;
  background: rgba(66, 133, 244, 1);
  border-radius: 4px;
}
.orgchart > table {
  padding-bottom: 250px !important;
  padding-left: 50px !important;
  padding-right: 50px !important;
  padding-top: 0px;
}
.orgchart:first-child {
  display: none;
}
.orgchart .node {
  width: 224px;
  border: 0px dashed transparent;
}
.orgchart .node .title {
  text-align: center;
  font-size: 12px;
  font-weight: 300;
  height: auto;
  line-height: 30px;
  word-wrap: break-word;
  word-break: break-all;
  text-overflow: unset;
  white-space: pre-line;
  background-color: #42b983;
  color: #fff;
  border-radius: 4px 4px 0 0;
}
.orgchart .node .content {
  width: 100%;
  height: 24px;
  font-size: 12px;
  line-height: 20px;
  border: 1px solid #42b983;
  border-radius: 0 0 4px 4px;
  text-align: center;
  background-color: #fff;
  color: #333;
  overflow: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.orgchart tr.lines > td:nth-child(1).rightLine {
  position: relative;
  border-right: 1px solid #616161;
}
.orgchart tr.lines > td:nth-child(1).rightLine:before {
  position: absolute;
  right: -2px;
  top: 0;
  content: "";
  width: 2px;
  height: 100%;
  background-color: #616161;
}
.orgchart .top-level .title {
  background-color: rgb(179, 179, 179);
  // border-color: #000;
  // border: 1px solid;
  border-bottom: 0px;
  color: #fff;
}
.orgchart .top-level .content {
  border-color: rgb(179, 179, 179);
}
.orgchart .middle-level .title {
  background-color: #009933;
}
.orgchart .middle-level .content {
  border-color: #009933;
}
.orgchart .bottom-level .title {
  background-color: #006699;
}
.orgchart .bottom-level .content {
  border-color: #006699;
}
</style>