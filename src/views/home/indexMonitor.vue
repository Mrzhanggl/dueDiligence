<template>
  <div class="monitor container-card">
    <div class="main">
      <div class="main-left">监控动态</div>
     
      <div class="main-right">查看更多</div>
    </div>
    <div class="mi-box clear">
      <ul class="ct-box container">
        <li class="ct-list" v-for="(item,index) in monitor_list" :key="index">
          <div class="step">
            <div class="line"></div>
            <div class="point border-radius-half"></div>
          </div>
          <div class="info">
            <div class="info-msg left">
              <div class="mg-name">{{item.name}}</div>
              <div class="mg-type caption">{{item.type}}</div>
            </div>
            <div class="info-time right Din-M">{{item.time}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      monitor_list: [
        {
          name: "晓法网络科技（上海）有限公司",
          type: "工商变更",
          time: "2019-04-23"
        },
        {
          name: "晓法网络科技（上海）有限公司",
          type: "工商变更",
          time: "2019-04-23"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.monitor {
  margin-top: 42px;
  .mi-box {
    width: 1736px;

    padding-top: 22px;
    .ct-box {
      border: 2px solid rgba(230, 233, 235, 1);
      background-color: #fff;
      padding: 30px 40px;
      border-radius: 12px;
      .ct-list {
        width: 1680px;
        height: 88px;
        & > div {
          display: inline-block;
        }
        .step {
          $length: 12px;
          position: relative;
          width: $length;
          height: 100%;
          .line {
            position: absolute;
            left: 5px;
            width: 2px;
            height: 100%;
            background-color: #e6e9eb;
          }
          .point {
            position: absolute;
            top: 38px;
            width: $length;
            height: $length;
            background-color: $theme-color;
            box-shadow: 0px 2px 6px 0px rgba(66, 133, 244, 0.4);
          }
        }
        .info {
          width: 1639px;
          height: 48px;
          padding: 20px 0 20px 18px;
          .mg-name {
            line-height: 16px;
            font-weight: bold;
          }
          .mg-type {
            margin-top: 12px;
            line-height: 16px;
          }
          .info-time {
            width: 108px;
            line-height: 48px;
            color: #556675;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
  .monitor .mi-box {
    width: 1300px;
    .ct-box {
      .ct-list {
        width: 1240px;
        .info {
          width: 1198px;
        }
      }
    }
  }
}
</style>

