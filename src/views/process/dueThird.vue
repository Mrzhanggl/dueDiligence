<template>
  <div class="due-third">
    <due-third-animate ref="antype"></due-third-animate>
    <div class="caption"   >{{$refs.antype?$refs.antype.des:'尽调报告生成中...'}}</div>
    <div class="operat-area">
      <div class="prev-btn" @click="goHome">返回工作台</div>
      <el-button class="btn" type="primary" :disabled="($refs.antype&&$refs.antype.des == '尽调报告已生成')?false:true" @click="openDownload()">下载</el-button>
    </div>
    <due-third-download :dialogVisible.sync="dialogVisible" :wordId="wordId"></due-third-download>
    <el-dialog title="注意" class="public" :visible.sync="dueDialog" width="480px" top="35vh">
      离开当前页面，系统仍会继续尽调
      <span slot="footer" class="dialog-footer">
        <div class="left">
          <span id="not-remind" @click="notRemind()">
            <i class="iconfont icon-done"></i>
          </span>不再提醒
        </div>
        <el-button style="width:130px;height:52px;letter-spacing: 2px;" type="primary" @click="gobackHome()">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import dueThirdAnimate from "./dueThirdAnimate.vue";
import dueThirdDownload from "./dueThirdDownload.vue";
import $ from "jquery";
export default {
  components: {
    dueThirdAnimate,
    dueThirdDownload
  },
  data() {
    return {
      api_creat_word: "/Home/Enterprise/startJdWord.json",
      dialogVisible: false,
      dueDialog: false,
      isCreated: false,
      wordId: ""
    };
  },
  watch: {
    "$store.state.antype": function(newval) {
      console.log(newval);

      this.creatWord();
    }
  },

  methods: {
    creatWord() {
      let params = this.$store.state.dueParams;

      this._postData(this.api_creat_word, params, data => {
        this.isCreated = true;
        this.wordId = data.msg;
      });
    },
    openDownload() {
      this.dialogVisible = true;
    },
    goHome() {
      if (sessionStorage.getItem("notRemind") == "true") {
        this.$router.replace({ name: "homeIndex" });
      } else {
        this.dueDialog = true;
      }
    },
    gobackHome() {
      this.dueDialog = false;
      this.$router.replace({ name: "homeIndex" });
    },
    notRemind() {
      if ($("#not-remind").hasClass("is-active")) {
        $("#not-remind").removeClass("is-active");
        sessionStorage.setItem("notRemind", "false");
      } else {
        $("#not-remind").addClass("is-active");
        sessionStorage.setItem("notRemind", "true");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.due-third {
  .caption {
    margin-top: 51px;
    text-align: center;
  }
  .operat-area {
    margin-top: 29px;
    line-height: 60px;
    text-align: center;
    .btn{
      width: 173px;
      height: 60px;
      letter-spacing: 2px;
      margin-left: 20px;
    }
  }
  .left {
    line-height: 52px;
    vertical-align: middle;
    color:#9EA8B1;
  }
  #not-remind {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 10px;
    line-height: 16px;
    vertical-align: middle;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(230, 233, 235, 1);
    
    border-radius: 4px;
    text-align: center;
    &.is-active {
      background: #4285f4;
      border: 2px solid #4285f4;
      .iconfont.icon-done {
        font-size: 15px;
        display: none;
        color: #fff;
      }
      .iconfont.icon-done::before {
        content: url("../../assets/img/template/done_icon.png");
      }
      &.is-active .iconfont.icon-done,
      &.is-active .iconfont.icon-done {
        display: block;
      }
    }
  }
}
</style>

