import Cookies from 'js-cookie'
import { log } from 'util';
export default {
    install: function (Vue, options) {
        Vue.prototype.webUrl = options.url;
        Vue.prototype.hostUrl = options.hostUrl;
        Vue.prototype.API = options.api;
        Vue.prototype.__PRO__ = options.__PRO__;
        Vue.prototype._downloadSite = '/Home/Enterprise/downJdWord.json?user_tune_up_id=';
        Vue.prototype._default_logo = '../../assets/img/home/projec_icon_default.png';

        Vue.prototype._api_collect = '/Home/Collection/collection.json';
        Vue.prototype._api_unCollect = '/Home/Collection/uncollection.json';
        
        Vue.prototype.$fn = {
           
            catalog_list: [
                {
                  id: 1,
                  name: "封面"
                },
                {
                  id: 2,
                  name: "引言"
                },
                {
                  id: 3,
                  name: "目录"
                },
                {
                  id: 4,
                  name: "第一部分 公开渠道获得之信息",
                  children: [
                    {
                      id: 5,
                      name: "一、基本情况",
                      title:"基本情况",
                      content: ["工商信息", "股东信息", "股权结构图"]
                    },
                    {
                      id: 6,
                      name: "二、设立及变更",
                      title:"设立及变更",
                      content: ["设立", "变更", "资质证明", "法律问题"]
                    },
                    {
                      id: 7,
                      name: "三、对外投资",
                      title:"对外投资",
                      content: ["对外投资"]
                    },
                    {
                      id: 8,
                      name: "四、业务经营",
                      title:"业务经营",
                      content: ["经营范围", "业务(如有)"]
                    },
                    {
                      id: 9,
                      name: "五、知识产权",
                      title:'知识产权',
                      content: [
                        "注册商标及商标申请",
                        "专利及专利申请",
                        "著作权",
                        "域名"
                      ]
                    },
                    {
                      id: 10,
                      name: "六、融资信息",
                      title:"融资信息",
                      content: ["股权出质", "股权冻结", "抵押情况", "司法拍卖"]
                    },
                    {
                      id: 11,
                      name: "七、诉讼仲裁和行政处罚",
                      title:"诉讼仲裁和行政处罚",
                      content: ["诉讼、仲裁", "行政争议", "执行情况"]
                    }
                  ]
                }
                // {
                //   id: 12,
                //   name: "第二部分 手动输入之信息",
                //   children: [
                //     {
                //       id: 13,
                //       name: "一、财务及税务事项"
                //     },
                //     {
                //       id: 14,
                //       name: "二、劳动员工"
                //     },
                //     {
                //       id: 15,
                //       name: "三、保险"
                //     }
                //   ]
                // }
            ],
            collateList(){
                let list = [];
                for(let item of this.catalog_list){
                    list.push(item)
                    if(item.children){
                            for(let it of item.children){
                                list.push(it)
                            }
                    }
                }
                return list;
            },
            setLoginToken(token){
                Cookies.set("_Token", token);
                Vue.prototype.Token = Cookies.get('_Token');
             

                
            },
            getDate(val){
              let time ;
              // console.log(val)
              if(val==""||!val){
                time = "无"
                
              }else{
                  time= val.split(' ')[0]
              }
              return time
            },
            toNumDecimal: function (x,n=2) {
              x= Number(x);
              return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
            },
            hasAuth(name){
              var data=JSON.parse(sessionStorage.getItem('userdata')); 
              var authList=[];
              var has =false;
              data.auth.forEach(el => {
                  authList.push(el.name)
                  if(el.next.length>0){
                    el.next.forEach((item)=>{
                        authList.push(item.name)
                    })
                  }
              });
              authList.forEach((el)=>{
                if(el==name){
                  has = true
                  return has
                }
              })
              return has
            }
        }
        
    }
}