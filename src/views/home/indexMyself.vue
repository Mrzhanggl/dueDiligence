<template>
  <div class="myself-dd container-card">
    <div class="main">
      <div class="main-left">我的尽调</div>
      <router-link :to="{name:'dueIndex'}">
        <div class="main-right">查看更多</div>
      </router-link>
      <ul class="main-card clear">
        <li class="card-list container" v-for="(item,index) in law_arr.slice(0,3)" :key="index">
          <div class="ls-tl">
            <div class="ls-tl-img" @click="goQixinbao(item.enterprise_data.qxb_id,item.enterprise_id,item.company,item)">
              <img
                v-if="item"
                class="logo"
                :class="[item.logo == 'http://dd.falv58.com/Common/upload/cos/2019-06-2618085669834095.png'?'':'shadow']"
                :src="item.logo?item.logo:_default_logo"
              />
            </div>
            <div class="ls-tl-explain" @click="goQixinbao(item.enterprise_data.qxb_id,item.enterprise_id,item.company,item)">{{item.aims}}</div>
            <div class="ls-tl-dl" v-show="item.status_generate=='已完成'">
              <el-button
                type="primary"
                class="download"
                circle
                icon="el-icon-bottom"
                @click="openDownload(item.id)"
              ></el-button>
            </div>
          </div>
          <div class="ls-dt">
            <ul class="dt-box">
              <li class="dt-list">
                <span class="caption left">公司</span>
                <span class="text right">{{item.company}}</span>
              </li>
              <li class="dt-list">
                <span class="caption left">时间</span>
                <span class="text right Din-M">{{item.jd_time}}</span>
              </li>
              <li class="dt-list">
                <span class="caption left">状态</span>
                <span class="text right">
                  <div class="point" :class="{ active: item.status_generate=='已完成', }"></div>
                  {{item.status_generate=='已完成'?"已生成":"生成中..."}}
                </span>
              </li>
            </ul>
          </div>
        </li>
        <div class="noMore" v-if='law_arr.length==0'>
            暂无记录
        </div>
      </ul>
    </div>
    <download :wordId="downloadId" :dialogVisible.sync="dialogVisible"></download>
  </div>
</template>
<script>
import download from "@@/download.vue";
export default {
  components: {
    download
  },
  data() {
    return {
      api_download: "/Home/Enterprise/downJdWord.json?user_tune_up_id=",
      law_arr: [],
      dialogVisible: false,
      downloadId: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var vm = this;
      var json = {
        token: vm.Token,
        page: "1"
      };
      vm._postData("/Home/User/allJdNumber.json", json, data => {
        vm.law_arr = data.data.data;
        vm.$store.commit("setJdCount", data.data.count);
        vm.$emit('load')
      });
    },
    openDownload(id) {
    var vm = this
      if(!vm.$fn.hasAuth('下载尽调报告')){
        vm.$store.commit("setNotAuth",true)
          return false
        }
      this.downloadId = id;
      this.dialogVisible = true;
    },
    goQixinbao(eid,id,name,business){
      var vm = this
      business.enterprise_data.start_date = business.business_data.start_date
      sessionStorage.setItem('business',JSON.stringify(business.enterprise_data))
      var json={
        enterprise_id:id,
        token:vm.Token
      }
      vm._postData('/Home/User/markFastCheck.json',json,(data)=>{
         this.$router.push({name: 'qixinbaoIndex',query:{eid:eid,id:id,name:name}})
      })
     
    },
  }
};
</script>
<style lang="scss" scoped>
.myself-dd {
  margin-top: 43px;
  height: 340px;
  background-color: transparent;

  .main-card {
    width: 100%;
    height: 302px;
    padding-top: 21px;
    .noMore{
      width: 100%;
      height: 100%;
      border: 2px solid #e6e9eb;
      border-radius: 8px;
      text-align: center;
      font-size: 30px;
      background: white;
          line-height: 300px;
    letter-spacing: 10px;
    }
    & > li {
      display: inline-block;
    }
    .card-list {
      border: 2px solid rgba(230, 233, 235, 1);
      border-radius: 8px;
      margin-left: 45px;
      transition: all .5s;
      cursor: pointer;
      &:nth-child(1) {
        margin-left: 0;
      }
      &:hover {
        box-shadow:0px 12px 24px 0px rgba(13,26,38,0.08);
        transform: translateY(-5px);
      }
    }
  }
}

.card-list {
  .ls-tl {
    position: relative;
    border-radius: 8px 8px 0px 0px;
    width: 546px;
    height: 118px;
    border-bottom: 2px solid rgba(230, 233, 235, 1);
    .ls-tl-img {
      @include position-vertical-center(31px);
      left: 30px;
      width: 62px;
      height: 62px;
      background-color: rgba(66, 133, 244, 0.15);
      border-radius: 50%;
      text-align: center;
      line-height: 75px;
    }
    .ls-tl-explain {
      @include position-vertical-center(10px);
      left: 110px;
      font-size: 20px;
      font-weight: bold;
      line-height: 20px;
    }
    .ls-tl-dl {
      @include position-vertical-center(16px);
      right: 30px;
    }
  }
  .ls-dt {
    .dt-box {
      .dt-list {
        height: 16px;
        padding: 22px 30px;
        .text {
          display: inline-block;
          max-width: 400px;
          overflow: hidden;
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
        }
        .point {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 10px;
          margin-top: -2px;
          background: rgba(234, 79, 79, 1);
          border-radius: 50%;
          vertical-align: middle;
          &.active {
            background: #00a88b;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  .main-card {
    & > li:nth-child(3) {
      display: none;
    }
    .card-list {
      .ls-tl {
        width: 623px;
      }
    }
  }
  .text {
      max-width: 500px;
  }
}
</style>

