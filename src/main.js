import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.css'
import './plugins/element.js'
import 'vue-orgchart/dist/style.min.css'
import http from '@/utils/http.js'
import data from '@/utils/data.js'
import {hostUrl,webUrl,__PRO__} from '@/utils/url.js'
import echarts from 'echarts'
import VueHighcharts from 'vue-highcharts';
import HighCharts from 'highcharts';
import Cookies from 'js-cookie';

Vue.use(VueHighcharts,{HighCharts})

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;



console.log(data)

Vue.use(data, {
  url: webUrl,
  hostUrl: hostUrl,
  __PRO__: __PRO__,
  
})
Vue.use(http)
//登录判断
router.beforeEach((to, from, next) => {
  // document.domain = "wxnet.me"
  if (to.meta.requireAuth) {
    next()
  } else {

    if (!!Cookies.get('_Token')) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
  methods:{
 
    // moreChart() {
    //     var options = this.getMoreOptions(this.type);
 
    //     if (this.chart) {
    //         this.chart.destroy();
    //     };
    // // 初始化 Highcharts 图表
    // this.chart = new Highcharts.Chart('highcharts-more', options);
    // }
  }
}).$mount('#app')
