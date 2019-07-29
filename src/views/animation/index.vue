<template>
  <div class="hello">
    <div class="charts">
      <x-chart :id="id" :option="option"></x-chart>
    </div>
    
  </div>
</template>
 
<script>
// 导入chart组件
import XChart from "../../components/comp.vue";
export default {
  data() {
    return {
      id: "container",
      option: {
        chart: {
          reflow:true,
          width: 800,
          height: 800,
         
          inverted: true,
          style: {
            fontFamily: '微软雅黑',
          }
        },
        title: {
          text: "Highsoft 公司组织结构"
        },

        series: [
          {
            type: "organization",
            name: "Highsoft",
            keys: ["from", "to"],
            data: [
              ["CEO", "CPO"],
              ["CEO", "HR"],
              ["CEO", "CSO"],
              ["CEO", "CMO"],
              ["CPO", "Product"],
              ["CPO", "Web"],
              ["CSO", "Sales"],

              ["CPO", "ice"],
              ["ice", "de"],
            ],
            levels: [
              {
                level: 0,
                color: "white",
                dataLabels: {
                  color: "black"
                },
                height: 10
              },
              {
                level: 1,
                color: "white",
                dataLabels: {
                  color: "black"
                },
                height:10
              },
              {
                level: 2,
                color: "white",
                dataLabels: {
                  color: "black"
                },
                height:10
              },
              {
                level: 3,
                color: "white",
                dataLabels: {
                  color: "black"
                },
                height:10
              },
              {
                level: 4,
                color: "white",
                dataLabels: {
                  color: "black"
                },
                height:10
              },
            
            ],
            nodes: [
              {
                id: "CEO",
                name: "公司",
                description: "2019-10-01         100%",
                column: 0,
                color:"#23d242",
                dataLabels: {
                  color: "white"
                },
              },
              {
                id: "HR",
                name: "66666",
                column:1,
                description: "2019-10-01           100%",
            
  
              },
              {
                id: "CPO",
                name: "Torstein Hønsi",
                description: "2019-10-01       100%",
                
                column: 1
              },
              {
                id: "CSO",
                name: "Anita Nesse",
                description: "2019-10-01        100%",
            
                column: 1
              },
              {
                id: "CMO",
                name: "Vidar Brekke",
                description: "2019-10-01        100%",
              
                column: 1
              },
              {
                id: "Product",
                name: "产品研发",
                description: "2019-10-01        100%",
                column: 2,
    
              },
              {
                id: "Web",
                name: "运维",
                description: "网站开发，系统维护",
                column: 2,
                color:"blue",
              },
              {
                id: "Sales",
                name: "销售部",
                description: "2019-10-01         100%",
                column: 2
              },
              {
                id: "Market",
                name: "市场部",
                description: "2019-10-01         100%",
                column: 2
              },
              {
                id: "ice",
                name: "冰",
                description: "2019-10-01          100%",
                column: 2
              },
              {
                id: "de",
                name: "得",
                description: "2019-10-01          100%",
                column: 3
              }
            ],
            colorByPoint: false,
            
           borderWidth: 2,
			     borderColor: '#e6e6e6',
           
            
            nodeWidth: 55
          }
        ],
        tooltip: {
              enabled: false
        },
        exporting: {
          allowHTML: true,
          sourceWidth: 800,
          sourceHeight: 800
        }
      }
    };
  },
  components: {
    XChart
  }
};
</script>






