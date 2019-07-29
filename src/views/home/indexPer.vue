<template>
  <div class="per-detail">
    <ul class="container-card">
      <li class="hd-img">
        <img :src="person_info.header_img" />
      </li>
      <li class="info">
        <div class="info-box">
          <div class="greet">
            {{person_info.nowHours}}，{{person_info.id==person_info.admin_id?"管理员":person_info.username}}，今天是
            <span class="Din-M">{{person_info.time}}</span>
            {{weeklist[person_info.week]?',星期'+weeklist[person_info.week]:'星期一'}}
          </div>
          <div class="office">{{person_info.role_name}} | {{person_info.enterprise}}</div>
        </div>
      </li>
      <li class="number">
        <div class="num-box">
          <div class="num-top Din-M">{{count}}</div>
          <div class="num-footer">尽调次数</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      person_info: {
        header_img: "../../../src/assets/header.png",
        name: "Jackson",
        time: "2019-06-13",
        week: "星期四",
        role_name: "资深律师",
        law_office: "中伦律师事务所",
        number: 1223,
        nowHours: ""
      },
      weeklist: {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "日"
      }
    };
  },
  props: {},
  created() {},
  watch: {},
  computed: {
    count() {
      return this.$store.state.jd_count;
    }
  },
  methods: {
    init() {
      var now = new Date();
      var person = JSON.parse(sessionStorage.getItem("userdata"));
      this.person_info = person;
      var hour = now.getHours();
      var week = now.getDay();
      if (hour < 6) {
        this.person_info.nowHours = "凌晨好";
      } else if (hour < 9) {
        this.person_info.nowHours = "早上好";
      } else if (hour < 12) {
        this.person_info.nowHours = "上午好";
      } else if (hour < 14) {
        this.person_info.nowHours = "中午好";
      } else if (hour < 17) {
        this.person_info.nowHours = "下午好";
      } else if (hour < 19) {
        this.person_info.nowHours = "傍晚好";
      } else if (hour < 22) {
        this.person_info.nowHours = "晚上好";
      } else {
        this.person_info.nowHours = "夜里好";
      }
      
      this.person_info.week = week
      this.person_info.role_name = this.person_info.role_name.replace("分组","")
      this.person_info.time = this.getsj();

    },
    getsj() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  }
};
</script>
<style lang="scss">
$height: 182px;
$con-height: $height - 50px;

.per-detail {
  //   width: $big-srceen;
  //   height: $height;
  .container-card {
    width: 1736px;
    height: $con-height;

    background-color: #fff;
    border: 2px solid rgba(230, 233, 235, 1);
    border-radius: 8px;
    & li {
      display: inline-block;
      vertical-align: top;
    }
    .hd-img {
      width: 110px;
      & img {
        margin: 30px 8px 30px 30px;
        width: 72px;
        height: 72px;
        border-radius: 50%;
      }
    }

    .info {
      height: $con-height;
      margin-left: 10px;
      .info-box {
        margin-top: 31px;
        .greet {
          color: #556675;
          font-size: 24px;
        }
        .office {
          margin-top: 12px;
          vertical-align: bottom;
          color: #9ea8b1;
        }
      }
    }
    .number {
      float: right;
      width: 124px;
      height: $con-height;

      .num-box {
        height: $con-height;
        @include display_flex;
        @include flex-direction_column;
        @include justify-content_flex-center;
        @include align-items_center;
        .num-top {
          font-size: 24px;
          color: #0d1a26;
          font-weight: 500;
        }
        .num-footer {
          color: #9ea8b1;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  .container-card {
    width: 1300px;
  }
}
</style>


