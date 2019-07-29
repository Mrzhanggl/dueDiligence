import { log } from "util";
import Cookies from 'js-cookie'
export default {
    install: function (Vue) {
        Vue.mixin({

            methods: {
                //下划线_ 表示公共命名方法
                //http请求get
                _getData(api, params = {}, success, failed = () => { }) {
                    let vm = this;

                    if (typeof (params) == 'string') {
                        params = { token: Cookies.get('_Token') }
                    } else {
                        params.token = Cookies.get('_Token')
                    }
                    vm.axios.get(api, {
                        params
                    }).then(response => {
                        if (response.data.code == 0) {
                            success(response.data)
                        } else {
                            if(response.data.code == -2){
                                this.$store.commit("setUnusualSync",true)
                                return false;
                            }else{
                              console.log(this.$router); 
                              vm.$message.error(response.data.msg)
                                failed(response.data)
                                return false;
                            }
                        }
                    })
                },
                //http请求post
                _postData(api, params = {}, success, failed = () => { }) {
                    let vm = this;
              
                    if (typeof (params) == 'string') {
                        params = { token: Cookies.get('_Token') }
                    } else {
                       params.token = Cookies.get('_Token')
                    }

                    vm.axios.post(api, params).then(response => {
                        if (response.data.code == 0) {
                            success(response.data)
                        } else {
                            if(response.data.code == -2){
                                this.$store.commit("setUnusualSync",true)
                                return false;
                            }else{
                                this.$route.name=='login'?"":vm.$message.error(response.data.msg)
                                failed(response.data)
                                return false;
                            }

                            
                        }
                    })
                },
            }
        })
    }
}