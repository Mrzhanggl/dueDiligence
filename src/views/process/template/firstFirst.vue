<template>
  <div class="template-box">
    <slot></slot>
    <h1>一、基本情况</h1>
    <h3>1.工商信息</h3>
    <div class="article">
      根据公司提供的
      <span class="theme-text">【目标公司】</span>登记证书和说明，截至尽调截止日，【目标公司】的基本情况如下：
    </div>
    <ul class="info-tb">
      <li v-for="(item,index) in info_arr" :key="index">
        <div class="title" :class="[isTheme(item)?'theme-text':'']">{{item}}</div>
        <div class="word"></div>
      </li>
    </ul>
    <h3>2.股东信息</h3>
    <div class="article">根据公开渠道①的查询，截至尽调截止日，目标公司的股东包括【股东1】、【股东2】…等【*】名股东。具体信息如下：</div>

    <table class="resetTem">
      <tr>
        <th>编号</th>
        <th>股东名</th>
        <th>
          <span class="theme-text">认缴</span>出资金额
        </th>
        <th>实缴出资金额</th>
        <th>出资比例</th>
      </tr>
      <tr>
        <td>1</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <h3>3.股权结构图</h3>
    <img style="width:100%"  src="../../../assets/img/template/stock.png">
    <div class="fixed">
    <atlas></atlas>
    </div>
  </div>
</template>
<script>
import atlas from './atlas.vue'
export default {
  components: {
    atlas
  },
  data() {
    return {
      info_arr: [
        "名称",
        "统一社会信用代码",
        "组织机构代码",
        "注册号",
        "经营状态",
        "所属行业",
        "住所",
        "法定代表人",
        "出资人",
        "注册资金",
        "企业类型",
        "经营范围",
        "成立日期",
        "有效期限",
        "登记机关"
      ]
    };
  },
  methods: {
    isTheme(item) {
      return item === "出资人" ? true : false;
    }
  }
};
</script>
<style lang="scss" scoped>
.fixed{
  position:fixed;
  top: -10000px;
}

.stock{
      width: 860px;
      height: auto;
      margin: 20px auto;
  }
  @media screen and(max-width: $large-srceen){
    .stock{
        width: 100%;
        height: auto;
        margin: 20px auto;
    }
  }
</style>

