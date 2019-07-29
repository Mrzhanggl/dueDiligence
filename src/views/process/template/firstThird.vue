<template>
  <div class="template-box">
    <slot></slot>
    <h1>三、对外投资</h1>
    <div class="article">
      根据公开渠道的查询，【目标公司】作为出资人设立了【公司名称】。
      【公司名称】以【公司性质】形式设立，其基本情况如下：
    </div>
    <ul class="info-tb">
      <li v-for="(item,index) in info_arr" :key="index">
        <div class="title">{{item}}</div>
        <div class="word"></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
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
  methods: {}
};
</script>

