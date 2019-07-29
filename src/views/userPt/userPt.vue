<template>
    <div class="us-all">
        <div class="us-tt">
            <div class="us-box">
                    <div class="us-name fl" @click="go()">企安宝-智能化法律尽职调查系统</div>
                <el-button type="primary" class="us-login" style="width:116px;height:52px;letter-spacing:2px;" @click="go()">登录</el-button>
            </div>
        </div>
         <user-pot></user-pot>
        <foot></foot>
    </div>
</template>
<script>
import foot from '../public/footer'
import userPot from '@@/userPot.vue'
export default {
    data(){
        return{
            tableData: [{
            date: '1',
            name: '软件使用费',
            address: '80万/年',
            tip:'本项系律师事务所使用本软件及网站的使用费[ 为免歧义，此项所涵盖之服务范围为调查服务及一键式法律尽职调查报告，不包含定制式法律尽职调查报告。](一次性赠送10个一年有效期的端口使用费名额，及20份一键式法律尽职调查报告的使用额度)。'
            }, {
            date: '2',
            name: '部署定制费',
            address: '30万/次起',
            tip:'根据每家律师事务所私有化部署环境的不同，定制完整的部署及定制需求方案的使用费[ 为免歧义，此项所涵盖之服务范围为定制式法律尽职调查报告。]。'
            }, {
            date: '3',
            name: '端口使用费',
            address: '800/年/个',
            tip:'本项系个人用户账号的使用费，已购用户可在一年有效期内无限次查看调查服务项下企业信息、股权结构等企业数据。'
            }, {
            date: '4',
            name: '尽调报告费',
            address: '1000/份',
            tip:'本项系一键式法律尽职调查报告的费用，用户可查看并下载；按份收费。'
            }]
        }
    },
    components:{
       foot,userPot
    },
    methods:{
        go(){
            this.$router.push('login')
        }
    }
}
</script>

<style  lang="scss" scoped>
.us-all{
    width: 100%;
    position: relative;
    .us-tt{
        width: 100%;
        height: 74px;
        box-sizing: border-box;
        background: white;
        .us-box{
            width: 1740px;
            margin: auto;
        }
        .us-name{
        float: left;
        font-size:20px;
        font-family:Alibaba-PuHuiTi-M;
        font-weight: bold;
        color:rgba(66,133,244,1);
        line-height:74px;
        cursor: pointer;
        }
        .us-login{
        float: right;
        margin-top: 11px;
        box-shadow:0px 4px 10px 0px rgba(66,133,244,0.24);
        font-size:16px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        cursor: pointer;
         transition: all .4s;
            &:hover{
                transform: translateY(-3px);
            }
        }
    }
}
</style>
<style lang="scss" scoped>
@media screen and(max-width: 1800px) {
    .us-all .us-tt  .us-box{
            width: 1300px;
            margin: auto;
        }
}
</style>
