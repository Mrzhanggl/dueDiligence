<template>
  <div class="main">
    <!-- <canvas id="canvas"></canvas> -->
    <div class="logo-7anb"></div>
    <div class="login-box">
      <div class="title">
        <div class="sm-tl">欢迎来到</div>
        <div class="lg-tl">企安宝-智能化法律尽职调查系统</div>
      </div>
      <div class="login">
        <div id="account" class="account">账号：</div>
        <el-input
          v-model="account"
          class="acc-input"
          :autocomplete="'new-password'"
          @focus="hoverAccount"
          @blur="leaveAccount"
          @keyup.enter.native="login()"
        ></el-input>
        <div id="password" class="password">密码：</div>
        <el-input
          v-model="password"
          type="password"
          class="acc-input"
          :autocomplete="'new-password'"
          @focus="hoverPassword"
          @blur="leavePassword"
          @keyup.enter.native="login()"
        ></el-input>
        <div class="userPt" @click="goUser()">《用户协议》</div>
        <div class="button">
          <div class="lg-bt primary-btn" @click="login()">登录</div>
          <el-button
            type="text"
            style="margin-left:30px;letter-spacing: 2px;"
            @click="dialogFg=true"
          >忘记密码?</el-button>
        </div>
      </div>
    </div>

    <div class="cp-rg">法律尽职调查系统-Copyright 晓法网络科技(上海)有限公司 沪ICP备18048606号</div>

    <el-dialog title="提示" :visible.sync="dialogFg" class="public" width="480px" top="40vh">
      <span>请联系管理员重置密码</span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogEr" class="public" width="480px" top="40vh">
      <span>账号或密码错误</span>
    </el-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import Cookies from "js-cookie";
import animate from "animate.css";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      account: "",
      password: "",
      dialogFg: false,
      dialogEr: false
    };
  },
  mounted() {
    var vm = this;
    this.setHight();
    setTimeout(() => {
      $(".login-box").addClass("animated fadeInLeft");
    }, 20);
    $(document).ready(function(e) {});
  },
  beforeRouteLeave(to, from, next) {
    $("#app").removeClass("h");
    next();
  },
  methods: {
    setHight() {
      $("#app").addClass("h");
      // $('.main').css('min-height',$('body')[0].clientHeight)
      console.log($("body")[0].clientHeight);
    },
    hoverAccount() {
      $("#account").css("transform", "translateY(0px)");
    },
    leaveAccount() {
      if (!this.account) {
        $("#account").css("transform", "translateY(50px)");
      }
    },
    hoverPassword() {
      $("#password").css("transform", "translateY(0px)");
    },
    leavePassword() {
      if (!this.password) {
        $("#password").css("transform", "translateY(50px)");
      }
    },
    login() {
      var vm = this;
      vm.account = vm.account.replace(/\s+/g, "");
      vm.password = vm.password.replace(/\s+/g, "");
      var json = {
        phone: vm.account,
        password: vm.password
      };
      vm._postData(
        "/Home/User/userLogin.json",
        json,
        data => {
          
            vm.$fn.setLoginToken(data.data.token)
            vm.setUserData(data.data.token);
          
          
        },
        data => {
          if (data.code == -1) {
            this.dialogEr = true;
          }
        }
      );
    },
    goUser() {
      this.$router.push("userPt");
    },
    setUserData(token) {
      var vm = this;
      var json = {
        token: token
      };
      
      vm._postData("/Home/User/getUserInfo.json", json, data => {
        vm.person = user;
        var user = JSON.stringify(data.data.data);
        sessionStorage.setItem("userdata", user);
        vm.$message({
          message: "登录成功！",
          type: "success"
        });
        if (vm.$route.query.redirect) {
          vm.$router.push(vm.$route.query.redirect);
        } else {
          vm.$router.push("/index/homeIndex");
        }
      });
      
      
    }
  }
};
</script>
<style lang="scss" scoped>
$img_bg: "../../assets/img/login/bg.png";
$logo: "../../assets/img/login/logo.png";
$left: 146px;
%position-common {
  position: absolute;
  left: $left;
}
.h {
  height: 100%;
}
.main {
  position: relative;

  // width: 100vw;
  // height: 56.25vw;
  width: 100%;
  min-width: 1300px;
  // min-height: 850px;
  height: 100%;
  background-image: url($img_bg);
  // background-size: 100vw  56.25vw;
  background-size: 100%;
  .logo-7anb {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 78px;
    height: 24px;
    background-image: url($logo);
  }
  .userPt {
    padding: 20px 0 0 0;
    color: rgba(66, 133, 244, 1);
    line-height: 1;
    cursor: pointer;
  }
  .login-box {
    position: absolute;
    margin: auto;
    left: 260px;
    opacity: 0;
    // right: 0;
    // width: 1380px;
  }
  .title {
    // @extend %position-common;
    margin-top: 120px;

    width: 348px;
    letter-spacing: 2px;
    text-align: left;
    color: $theme-color;
    .sm-tl {
      line-height: 16px;
    }
    .lg-tl {
      width: 760px;
      line-height: 40px;
      margin-top: 20px;
      font-size: 40px;
      font-weight: bold;
    }
  }

  .login {
    // @extend %position-common;
    margin-top: 90px;
    width: 360px;
    // height: 338px;
    .account {
      width: 100%;
      height: 16px;
      color: rgba(158, 168, 177, 1);
      line-height: 16px;
      font-weight: bold;
      transition: all 0.6s;
      transform: translateY(50px);
    }
    .password {
      width: 100%;
      height: 16px;
      margin-top: 20px;

      color: rgba(158, 168, 177, 1);
      line-height: 16px;
      font-weight: bold;
      transition: all 0.6s;
      transform: translateY(50px);
    }
    .acc-input {
      border-bottom: 2px solid #4285f4;
    }
    .button {
      width: 100%;
      height: 60px;
      letter-spacing: 2px;
      padding-top: 60px;
    }
  }

  .cp-rg {
    @extend %position-common;
    bottom: 79px;
    left: 260px;
    line-height: 1;
    height: 19px;
    color: rgba(158, 168, 177, 1);
  }
}

.button {
  .lg-bt {
    display: inline-block;
    width: 116px;
    font-weight: bold;
    background-color: $theme-color;
    color: #fff;
    line-height: 60px;
    text-align: center;
    vertical-align: middle;
    border-radius: 4px;
    cursor: pointer;
  }
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 1600px) {
  .main {
    // min-height:auto;
  }
  .main .title {
    margin-top: 50px;
    .lg-tl {
      font-size: 32px;
      line-height: 32px;
    }
  }
  .main .login-box {
    left: 150px;
  }
  .main .cp-rg {
    left:150px;
    bottom: 60px;
  }
}
@media screen and (max-width: $large-srceen) and (min-width: 1600px) {
  .main {
    // min-height:auto;
  }
  .main .title {
    margin-top: 80px;
    .lg-tl {
      font-size: 32px;
      line-height: 32px;
    }
  }
  .main .login-box {
    left: 200px;
  }
  .main .cp-rg {
    left: 200px;
    bottom: 70px;
  }
}
@media screen and (max-width: 1366px){
  .main .cp-rg {
    left: auto;
    right: 150px;
    bottom: 39px;
  }
}
</style>
