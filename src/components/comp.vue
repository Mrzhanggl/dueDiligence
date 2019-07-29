<template>
  <div>
    <div class="x-bar" ref="printMe">
      <div :id="id" :option="option"></div>
    </div>
    <div>
      <!-- <img class="real_pic" :src="dataSrc" /> -->
    </div>
    <div class="context">
      
      <el-button type="primary" @click="downImg()" :disabled="loading">下载图片</el-button>
    </div>
  </div>
</template>
<script>
import HighCharts from "highcharts";
import loadSankey from "highcharts/modules/sankey";
import loadOldie from "highcharts/modules/oldie";
import loadExport from "highcharts/modules/exporting";
import loadOfflineExport from "highcharts/modules/offline-exporting.js";
import organization from "highcharts/modules/organization";
import html2canvas from "html2canvas";
loadExport(HighCharts);
loadOfflineExport(HighCharts);
loadSankey(HighCharts);
loadOldie(HighCharts);
organization(HighCharts);
import $ from "jquery";
import { setTimeout } from 'timers';
export default {
  // 验证类型
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    },
    loading:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      api_base64:"/home/User/acceptBase64.json",
      base64_data:"",
      chart: "",
      download:"",
      dataSrc: "",
      wide:false,
      width:1000,
      height:500,
    };
  },
  mounted() {
    this.chart = HighCharts.chart(this.id, this.option);
    
     setTimeout(this.print,1000)

  },
  methods: {
    creatImg() {
      var svgXml = $("#container");
    },
    async print() {
      const el = this.$refs.printMe;
      let vm =this;
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL"
      };
      this.dataSrc = await this.$html2canvas(el, options);
       $('.chart-container').on('mousedown', function () {
          $(this).toggleClass('modal');
          vm.chart.reflow();
        });
    },

    //转换图片
    async $html2canvas(el, options = {}) {
      const { type } = options;
      const canvas = await html2canvas(el, options).then(function(canvas) {
        
        return canvas;
      });
      if (type && type === "dataURL") {
        this.base64_data=canvas.toDataURL();
        console.log(this.base64_data);
        
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
        vm.chart.exportChartLocal();
        vm._postData(vm.api_base64,{base64_data:vm.base64_data},(data)=>{
          
          console.log(vm.webUrl+data.data.url);
          this.download =vm.webUrl+data.data.url;
        })
    },
    zoomBig(){
      this.width =this.width+500;
      $('#container').width(this.width);
	  	
      this.chart.reflow();
      this.wide = !this.wide ;
    },
    zoomLong(){
      this.height =this.height+500;
      $('#container').height(this.height);
	  	
      this.chart.reflow();
      this.wide = !this.wide ;
    },
    
  }
};
</script>
<style>
#container {
  min-width: 300px;
  /* max-width: 1000px; */
  margin: 1em auto;
  border: 1px solid silver;
}

#container h4 {
  text-transform: none;
  font-size: 12px;
  font-weight: normal;
  font-family: "微软雅黑";
}
#container p {
  font-size: 12px;
  line-height: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
#container .highcharts-credits {
  display: none;
  opacity: 0;
}
.context {
  width: 100%;
  text-align: center;
}
.context .el-button.el-button--primary {
  width: 110px;
}
</style>