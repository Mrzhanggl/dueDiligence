"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from "qs";
import {webUrl} from '@/utils/url.js'
import router from '@/router.js'
import Cookies from 'js-cookie'
import { log } from 'util';
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
   baseURL: webUrl,
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 10000, // Timeout
  headers: {
    "Content-Type": 'application/x-www-form-urlencoded',
  },

  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if(config.method === "post" ){
      config.data = qs.stringify(config.data)
    }
    if(config.method === "get" ){
      config.params = qs.parse(config.params)
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    //没登录自动弹回登录页面
    
    if (response.data.code == -1&&response.data.msg =="非法用户!") {
      Cookies.remove('_Token')
      // console.log(router.history.current.fullPath)
      // router.push({
      //       path: '/login',
      //       query: {
      //         redirect: router.history.current.fullPath
      //       }
      //     })

    } 


    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
