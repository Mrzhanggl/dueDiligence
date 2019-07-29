<template>
  <div class="box-template ">
       <slot></slot>
       <div class="big">
           <h2 class="title">目录</h2>
            <h3>引  言    <span class="right">............................................................2</span></h3>
            <h3>第一部分	公开渠道获得之信息  <span class="right">............................................................4</span></h3>
            <h3 class="children"> 一、	基本情况<span class="right">..................................................................4</span></h3>
            <h3 class="children"> 二、	设立及变更<span class="right">..................................................................5</span></h3>
            <h3 class="children"> 三、	对外投资<span class="right">..................................................................6</span></h3>
            <h3 class="children"> 四、	业务经营<span class="right">..................................................................6</span></h3>
            <h3 class="children"> 五、	知识产权<span class="right">..................................................................7</span></h3>
            <h3 class="children"> 六、	融资信息<span class="right">..................................................................8</span></h3>
            <h3 class="children"> 七、	诉讼仲裁和行政处罚<span class="right">..................................................8</span></h3>
            <!-- <h3> 第二部分	手动输入之信息<span class="right">.............................10</span></h3>
            <h3 class="children"> 一、	财务及税务事项<span class="right">.................................10</span></h3>
            <h3 class="children"> 二、	劳动员工<span class="right">......................................11</span></h3>
            <h3 class="children"> 三、	保险<span class="right">..........................................12</span></h3> -->
       </div>
       <div class="small">
           <h2 class="title">目录</h2>
            <h3>引  言    <span class="right">..........................................................2</span></h3>
            <h3>第一部分	公开渠道获得之信息  <span class="right">...........................4</span></h3>
            <h3 class="children"> 一、	基本情况<span class="right">.................................4</span></h3>
            <h3 class="children"> 二、	设立及变更<span class="right">.................................5</span></h3>
            <h3 class="children"> 三、	对外投资<span class="right">.................................6</span></h3>
            <h3 class="children"> 四、	业务经营<span class="right">.................................6</span></h3>
            <h3 class="children"> 五、	知识产权<span class="right">.................................7</span></h3>
            <h3 class="children"> 六、	融资信息<span class="right">.................................8</span></h3>
            <h3 class="children"> 七、	诉讼仲裁和行政处罚<span class="right">..................8</span></h3>
            <!-- <h3> 第二部分	手动输入之信息<span class="right">.............................10</span></h3>
            <h3 class="children"> 一、	财务及税务事项<span class="right">.................................10</span></h3>
            <h3 class="children"> 二、	劳动员工<span class="right">......................................11</span></h3>
            <h3 class="children"> 三、	保险<span class="right">..........................................12</span></h3> -->
       </div>
  </div>
</template>
<style lang='scss' scoped>
.box-template{
    padding: 0 50px;
    position: relative;
    
}


.title{
    width: 100%;
    text-align: center;
}
.children{
    margin-left: 80px;
}
.right{
    vertical-align: bottom;
}
.big{
        display: block;
}
.small{
    display: none;
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $large-srceen) {
    .big{
        display: none;
    }
    .small{
        display: block;
    }
}
</style>
