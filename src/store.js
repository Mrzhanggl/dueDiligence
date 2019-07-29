import Vue from 'vue'
import Vuex from 'vuex'
import { log } from 'util';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jd_count:0,
    showId:1,
    stepId:1, //尽调流程步骤  默认第一步
    antype:false, //动画开始标记
    unusualSync:false, //异常打开标志
    notAuth:false,
    dueParams:{
      fm_yy:[],
      key_map:{},
      enterprise_id:"",
      company:"",
      investor:"",
      corporate:"",
      aims:"",
      token:"",
      cj_company:"",
      jg_url:"/Common/upload/cos/2019-07-151353281952729.png"
    },           //尽调参数
    isSelectDue:[],
    atlasLoad:false,
    authList:[]
  },
  getters:{
    stepId:(state)=>state.stepId
  },
  mutations: {
      setStep(state,n){
        state.stepId=n;
      },
      setAntype(state,type){
        state.antype=type
      },
      setDueParams(state,params){
        state.dueParams=Object.assign(state.dueParams,params) 
      },
      setIsSelectDue(state,arr){
        state.isSelectDue=arr
      },
      setJdCount(state,n){
        state.jd_count = n
      },
      setShowId(state,id){
        state.showId = id
      },
      setAtlasLoad(state,type){
        state.atlasLoad=type;
      },
      setUnusualSync(state,type){
        state.unusualSync=type;
      },
      setNotAuth(state,type){
        state.notAuth=type
      },
      setAuthList(state,list){
        state.authList=list
      }
  },
  actions: {

  }
})
