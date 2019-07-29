<!--  -->
<template>
 <!-- v-infinite-scroll="load" infinite-scroll-disabled="disabled" -->
  <div ref="a" class="qc-all"  v-loading="bigLoading"
        element-loading-text="企业生命树生成中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="qc-main">
      <img class="qc-topimg" src="@img/quickCheck/companytree_bg.png" alt />
      <div class="qc-sx  " @click="dialogVisible = true">
        筛选数据
        <img src="@img/quickCheck/preparation_icon_default.png" alt />
      </div>
      <div class="qc-checkbox clearfix">
        <div class="qc-checkbox-tt">
          {{$route.query.name}}-企业生命树
        </div>
        <div class="qc-timeline">
          <div class="qc-timeline-tt">时间轴</div>
          <div class="qc-timelinebox">
            <div
              v-for="item in yearlist"
              :key="item"
              @click="changeYear(item)"
              :class="{'active':item==now_year}"
            >
              {{item}}
              <span v-if="item==now_year"></span>
            </div>
          </div>
        </div>
        <div class="qc-box-box">
          <div id='line' style=""></div>
          <div class="qc-timetree">
            <div class="qc-timeitem animated  flash" v-for="(i,k) in tree" :key="k">
              <div class="qc-timeitem-tt">
                {{i.section_name}}
                <span>/&nbsp{{second_bind[i.section_name]}}</span>
                <div :class="color(i.section_name)"></div>
              </div>
              <div class="qc-timeitem-textbox " :class="{'hei':!showMore(i.section_name)}">
                <div v-if="i.section_name=='工商信息'">
                  <div class="qc-timeitem-text">成立日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">统一社会信用代码：{{i.credit_no}}</div>
                  <div class="qc-timeitem-text">组织机构代码：{{i.org_no}}</div>
                  <div class="qc-timeitem-text">企业经营状态：{{i.status}}</div>
                  <div class="qc-timeitem-text">企业类型：{{i.econ_kind}}</div>
                  <div class="qc-timeitem-text">法定代表人：{{i.oper_name}}</div>
                  <div class="qc-timeitem-text">注册资本：{{i.regist_capi}}</div>
                  <div class="qc-timeitem-text">所属工商局：{{i.belong_org}}</div>
                  <div class="qc-timeitem-text">地址：{{i.address}}</div>
                  <div class="qc-timeitem-text">经营范围：{{i.scope}}</div>
                  <div class="qc-timeitem-text">营业结束时间：{{i.term_end}}</div>
                </div>
                <div v-if="i.section_name=='经营异常'">
                  <div class="qc-timeitem-text">做出决定机关：{{i.department}}</div>
                  <div class="qc-timeitem-text">列入日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">列入原因：{{i.in_reason}}</div>
                </div>
                <div v-if="i.section_name=='行政处罚'">
                  <div class="qc-timeitem-text">行政处罚决定日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">决定书文号：{{i.number}}</div>
                  <div class="qc-timeitem-text">违法行为类型：{{i.illegal_type}}</div>
                  <div class="qc-timeitem-text">行政处罚内容：{{i.content}}</div>
                  <div class="qc-timeitem-text">决定机关名称：{{i.department}}</div>
                </div>
                <div v-if="i.section_name=='股权出质'">
                  <div class="qc-timeitem-text">股权出质登记日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">出质人：{{i.pledgor}}</div>
                  <div class="qc-timeitem-text">质权人：{{i.pawnee}}</div>
                  <div class="qc-timeitem-text">状态：{{i.status}}</div>
                  <div class="qc-timeitem-text">标的方：{{i.object_company}}</div>
                  <div class="qc-timeitem-text">备注：{{i.remark}}</div>
                  <div class="qc-timeitem-text">出质股权数：{{i.pledgor_amount}}</div>
                  <div class="qc-timeitem-text">变更日期：{{i.change_date}}</div>
                  <div class="qc-timeitem-text">变更内容：{{i.change_content}}</div>
                </div>
                <div v-if="i.section_name=='开庭公告'">
                  <div class="qc-timeitem-text">开庭时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">案号：{{i.case_no}}</div>
                  <div class="qc-timeitem-text">案由：{{i.case_reason}}</div>
                  <div class="qc-timeitem-text">原告：{{i.plaintiff}}</div>
                  <div class="qc-timeitem-text">被告：{{i.defendant}}</div>
                  <div class="qc-timeitem-text">审判人：{{i.Judge}}</div>
                </div>
                <div v-if="i.section_name=='商标信息'">
                  <div class="qc-timeitem-text">申请时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">商标图片：{{i.image_url}}</div>
                  <div class="qc-timeitem-text">商标名：{{i.name}}</div>
                  <div class="qc-timeitem-text">状态：{{i.status}}</div>
                  <div class="qc-timeitem-text">注册号：{{i.reg_number}}</div>
                  <div class="qc-timeitem-text">分类名：{{i.trademarktype}}</div>
                </div>
                <div v-if="i.section_name=='融资信息'">
                  <div class="qc-timeitem-text">融资时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">融资轮次：{{i.financing_round}}</div>
                  <div class="qc-timeitem-text">融资金额：{{i.financing_amount}}</div>
                  <div class="qc-timeitem-text">投资机构：{{i.org_name}}</div>
                  <div class="qc-timeitem-text">融资新闻：{{i.title}}</div>
                </div>
                <div v-if="i.section_name=='资质认证'">
                  <div class="qc-timeitem-text">发证日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">证书类型：{{i.type}}</div>
                  <div class="qc-timeitem-text">证书编号：{{i.num}}</div>
                  <div class="qc-timeitem-text">备注：{{i.remarks}}</div>
                  <div class="qc-timeitem-text">截止日期：{{i.validity_end}}</div>
                </div>
                <div v-if="i.section_name=='域名信息'">
                  <div class="qc-timeitem-text">登记批准日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">网址：{{i.home_url}}</div>
                  <div class="qc-timeitem-text">网站名称：{{i.site_name}}</div>
                  <div class="qc-timeitem-text">网站备案：{{i.number}}</div>
                </div>
                <div v-if="i.section_name=='工商变更'">
                  <div class="qc-timeitem-text">变更日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">变更项目：{{i.change_item}}</div>
                  <div class="qc-timeitem-text">变更前内容：{{i.before_content}}</div>
                  <div class="qc-timeitem-text">变更后内容：{{i.after_content}}</div>
                </div>
                <div v-if="i.section_name=='分支机构'">
                  <div class="qc-timeitem-text">成立日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">企业名称：{{i.name}}</div>
                  <div class="qc-timeitem-text">法定代表人/负责人：{{i.oper_name}}</div>
                  <div class="qc-timeitem-text">企业经营状态：{{i.status}}</div>
                </div>
                <div v-if="i.section_name=='对外投资'">
                  <div class="qc-timeitem-text">成立日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">企业名称：{{i.name}}</div>
                  <div class="qc-timeitem-text">法定代表人/负责人：{{i.oper_name}}</div>
                  <div class="qc-timeitem-text">注册资本：{{i.reg_capi_desc}}</div>
                  <div class="qc-timeitem-text">注册地址：{{i.addresses}}</div>
                  <div class="qc-timeitem-text">企业状态：{{i.status}}</div>
                  <div class="qc-timeitem-text">出资比例：{{i.percent}}</div>
                </div>
                <div v-if="i.section_name=='企业年报'">
                  <div class="qc-timeitem-text">发布日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">年报年份：{{i.report_year}}</div>
                </div>
                <!-- <div v-if="i.section_name=='严重违法失信'">
                  <div class="qc-timeitem-text">列入日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">列入原因：{{i.in_reason}}</div>
                  <div class="qc-timeitem-text">作出决定机关：{{i.in_department}}</div>
                </div> -->
                <div v-if="i.section_name=='环保处罚'">
                  <div class="qc-timeitem-text">处罚日期/处罚生效期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">作出处罚单位名称：{{i.punishment_dept}}</div>
                  <div class="qc-timeitem-text">文书号：{{i.document_no}}</div>
                  <div class="qc-timeitem-text">环保处罚类型：{{i.illegal_type}}</div>
                </div>
                <div v-if="i.section_name=='抽查信息'">
                  <div class="qc-timeitem-text">日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">检查实施机关：{{i.department}}</div>
                  <div class="qc-timeitem-text">类型：{{i.type}}</div>
                  <div class="qc-timeitem-text">结果：{{i.result}}</div>
                </div>
                <div v-if="i.section_name=='立案信息'">
                  <div class="qc-timeitem-text">立案时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">案号：{{i.case_no}}</div>
                  <div class="qc-timeitem-text">承办人：{{i.agent}}</div>
                  <div class="qc-timeitem-text">助理法官：{{i.assistant}}</div>
                  <div class="qc-timeitem-text">开庭日期：{{i.hearing_date}}</div>
                  <div class="qc-timeitem-text">结束时间：{{i.end_date}}</div>
                  <div class="qc-timeitem-text">{{i.role_ori}}：{{i.enterprise_name_ori}}</div>
                  <div class="qc-timeitem-text">{{i.role_be}}：{{i.enterprise_name_be}}</div>
                </div>
                <div v-if="i.section_name=='法院公告'">
                  <div class="qc-timeitem-text">发布时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">公告类型：{{i.type}}</div>
                  <div class="qc-timeitem-text">法院：{{i.court}}</div>
                  <div class="qc-timeitem-text">当事人：{{i.person}}</div>
                  <div class="qc-timeitem-text">公告内容：{{i.content}}</div>
                </div>
                <div v-if="i.section_name=='裁判文书'">
                  <div class="qc-timeitem-text">判断时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">案号：{{i.case_no}}</div>
                  <div class="qc-timeitem-text">案由：{{i.case_cause}}</div>
                  <div class="qc-timeitem-text">判决结果：{{i.judgeresult}}</div>
                </div>
                <div v-if="i.section_name=='被执行人'">
                  <div class="qc-timeitem-text">立案时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">执行依据文号：{{i.case_number==''?'-':i.case_number}}</div>
                  <div class="qc-timeitem-text">执行金额：{{i.amount==''?'-':i.amount}}</div>
                  <div class="qc-timeitem-text">执行法院：{{i.court}}</div>
                  <div class="qc-timeitem-text">执行状态：{{i.status}}</div>
                </div>
                <div v-if="i.section_name=='失信信息'">
                  <div class="qc-timeitem-text">发布时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">案号：{{i.case_number}}</div>
                  <div class="qc-timeitem-text">执行依据文号：{{i.doc_num}}</div>
                  <div class="qc-timeitem-text">立案时间：{{i.date}}</div>
                  <div class="qc-timeitem-text">执行法院：{{i.court}}</div>
                  <div class="qc-timeitem-text">被执行人履行情况：{{i.execution_status}}</div>
                </div>
                <div v-if="i.section_name=='专利信息'">
                  <div class="qc-timeitem-text">授权公布日：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">授权号：{{i.outhor_num}}</div>
                  <div class="qc-timeitem-text">发明人：{{i.designer}}</div>
                  <div class="qc-timeitem-text">名称：{{i.patent_name}}</div>
                  <div class="qc-timeitem-text">类型：{{i.type_name}}</div>
                  <div class="qc-timeitem-text">申请日期：{{i.request_date}}</div>
                  <div class="qc-timeitem-text">专利申请号：{{i.request_num}}</div>
                </div>
                <div v-if="i.section_name=='著作权信息'">
                  <div class="qc-timeitem-text">著作登记批准日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">著作名称：{{i.name}}</div>
                  <div class="qc-timeitem-text">著作注册号：{{i.number}}</div>
                  <div class="qc-timeitem-text">著作类别名称：{{i.type_name}}</div>
                  <div class="qc-timeitem-text">著作完成日期：{{i.success_date}}</div>
                  <div class="qc-timeitem-text">最后更新时间：{{i.last_updated_time}}</div>
                </div>
                <div v-if="i.section_name=='软件著作权信息'">
                  <div class="qc-timeitem-text">著作登记批准日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">软件著作名称：{{i.name}}</div>
                  <div class="qc-timeitem-text">简称：{{i.short_name}}</div>
                  <div class="qc-timeitem-text">软件著作注册号：{{i.number}}</div>
                  <div class="qc-timeitem-text">版本号：{{i.version}}</div>
                  <div class="qc-timeitem-text">分类号：{{i.type_num}}</div>
                </div>
                <div v-if="i.section_name=='行政许可'">
                  <div class="qc-timeitem-text">开始时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">结束时间：{{i.end_date}}</div>
                  <div class="qc-timeitem-text">许可机关：{{i.department}}</div>
                  <div class="qc-timeitem-text">许可文件编号：{{i.number}}</div>
                  <div class="qc-timeitem-text">许可文件名称：{{i.name}}</div>
                  <div class="qc-timeitem-text">内容：{{i.content}}</div>
                </div>
                <div v-if="i.section_name=='新闻动态'">
                  <div class="qc-timeitem-text">发布日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">标题：{{i.title}}</div>
                  <div class="qc-timeitem-text">来源：{{i.source}}</div>
                  <div class="qc-timeitem-text">原文链接：{{i.url}}</div>
                  <div class="qc-timeitem-text">情感属性：{{i.sentiment}}</div>
                  <div class="qc-timeitem-text">舆情标签：{{i.tag}}</div>
                  <div class="qc-timeitem-text">简介：{{i.content}}</div>
                </div>
                <div v-if="i.section_name=='招投标'">
                  <div class="qc-timeitem-text">发布时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">招标标题：{{i.title}}</div>
                  <div class="qc-timeitem-text">公告类型：{{i.notice_type}}</div>
                </div>
                <div v-if="i.section_name=='海关进出口'">
                  <div class="qc-timeitem-text">注册日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">注册海关：{{i.customs_reg}}</div>
                  <div class="qc-timeitem-text">海关编码：{{i.customs_num}}</div>
                  <div class="qc-timeitem-text">报关有效期：{{i.vail_date}}</div>
                  <div class="qc-timeitem-text">行业种类：{{i.industry_type}}</div>
                  <div class="qc-timeitem-text">经营类别：{{i.business_category}}</div>
                </div>
                <div v-if="i.section_name=='高管信息'">
                  <div class="qc-timeitem-text">任职时间：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">姓名：{{i.name}}</div>
                  <div class="qc-timeitem-text">职务：{{i.position}}</div>
                  <div class="qc-timeitem-text">学历：{{i.education}}</div>
                  <div class="qc-timeitem-text">年龄：{{i.age}}</div>
                </div>
                <div v-if="i.section_name=='企业公告'">
                  <div class="qc-timeitem-text">公告日期：{{i.sort_time}}</div>
                  <div class="qc-timeitem-text">公告标题：{{i.title}}</div>
                  <div class="qc-timeitem-text">公告类型：{{i.cate}}</div>
                  <div class="qc-timeitem-text">公告链接：{{i.url}}</div>
                </div>
                <div v-if="i.section_name=='股票信息'">
                  <div class="qc-timeitem-text">总市值：{{i.gross_value}}</div>
                  <div class="qc-timeitem-text">市净率：{{i.pb_ratio}}</div>
                  <div class="qc-timeitem-text">总股本：{{i.total_capital}}</div>
                  <div class="qc-timeitem-text">净利润：{{i.net_profit}}</div>
                  <div class="qc-timeitem-text">流通市值：{{i.trad_value}}</div>
                  <div class="qc-timeitem-text">每股收益：{{i.per_profit}}</div>
                  <div class="qc-timeitem-text">流通股本：{{i.trad_shares}}</div>
                  <div class="qc-timeitem-text">市盈率：{{i.pe_ratio}}</div>
                  <div class="qc-timeitem-text">行业：{{i.industry}}</div>
                </div>
              </div>
              <div v-show="showMore(i.section_name)" @click="lookmore(k)" class="qc-lookmore">
                {{i.more=='false'?'查看更多':'点击收起'}}
                <b :class="{'active':i.more=='true'}"></b>
              </div>
              <div class="qc-timeitem-showmon" style="z-index:1000;">
                <div class="qc-timeitem-showbox">{{setmou(i.sort_time)}}</div>
                {{setDay(i.sort_time)}}
              </div>
            </div>
            <!-- <div class="qc-timetree-line"></div> -->
          </div>
        </div>
      </div>
        <div class="qc-load"  v-loading="loading"
        element-loading-text="企业生命树生成中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.0)">
        </div>
         <div v-if="noMore" class="qc-load-nomore">企业生命树已加载完成！</div>
    </div>
   
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose">
      <div class="qc-tc-main">
        <div class="qc-tc-tt">数据分类</div>
        <div class="qc-tc-box">
          <div class="qc-tc-box3">
            <div
              v-for="(item,index) in check_list"
              :key="index"
              class="qc-tc-boxone-item"
              :class="{'active':check_first==Object.keys(item)[0]}"
              @click="changeFlist(index)"
            >
              {{Object.keys(item)[0]}}
              <span
                @click="check_one(Object.keys(item)[0],index)"
                class="qc-tc-boxone-item-check"
                :class="{'active':haveOne(Object.keys(item)[0])}"
              >
                <img src="@img/quickCheck/gougouicon.png" alt />
              </span>
            </div>
          </div>
          <div class="qc-tc-box3">
            <div v-for="(item,index) in check_second" :key="index" class="qc-tc-boxone-item">
              {{item}}
              <span
                @click="check_finsh(item,index)"
                class="qc-tc-boxone-item-check"
                :class="{'active':check_two.indexOf(item)!=-1}"
              >
                <img src="@img/quickCheck/gougouicon.png" alt />
              </span>
            </div>
          </div>
          <div class="qc-tc-box3 qc-tc-boxts">
            <div class="qc-tc-boxlast-tt">该类型包含的业务细则有：</div>
            <dir class="qc-tc-boxlast-item" v-for="(item,index) in check_two" :key="index">
              {{item}}
              <span></span>
            </dir>
          </div>
        </div>
        <div class="qc-tc-allcheck">
          全选
          <span :class="{'active':check_two.length==31}" @click="allCheck()">
            <img src="@img/quickCheck/gougouicon.png" alt />
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitArr()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="upTop"  @click="backUp()">
          <div class="upTop-img"></div>
          <div class="upTop-tt">
            返回<br>
            顶部
          </div>
    </div>
    <!-- <infinite-loading @infinite="load">
    </infinite-loading> -->
  </div>
</template>

<script>
import $ from "jquery";
import InfiniteLoading from "vue-infinite-loading";
import { setTimeout } from "timers";
import animate from 'animate.css';
export default {
  data() {
    return {
      bigLoading:false,//全屏重新加载
      loading:false,//下拉加载
      now_page:1,//当前页
      box: "",
      dialogVisible: false,
      yearlist: [],
      mou: [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May.",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dec."
      ],
      now_year: "",
      allTree: [],
      tree: [],
      // 所有分类
      check_list: [
        {
          基本信息: ["工商信息", "工商变更", "分支机构", "对外投资", "企业年报"]
        },
        {
          风险信息: [
            "经营异常",
            "行政处罚",
            "环保处罚",
            "抽查信息",
            "股权出质"
          ]
        },
        {
          涉诉信息: [
            "立案信息",
            "开庭公告",
            "法院公告",
            "裁判文书",
            "被执行人",
            "失信信息"
          ]
        },
        {
          知识产权: [
            "专利信息",
            "商标信息",
            "著作权信息",
            "软件著作权信息",
            "域名信息",
            "资质认证"
          ]
        },
        {
          经营信息: [
            "融资信息",
            "行政许可",
            "招聘信息",
            "新闻动态",
            "招投标",
            "海关进出口"
          ]
        },
        {
          上市信息: ["股票信息", "高管信息", "企业公告"]
        }
      ],
      // 当前预览选中的一级分类
      check_first: "基本信息",
      // 当前勾选中的一级分类
      check_first_list: [],
      // 当前二级分类展示数组
      check_second: [],
      //当前选择的所有二级分类
      check_two: [],
      second_bind: {
        工商信息: "基本信息",
        工商变更: "基本信息",
        分支机构: "基本信息",
        对外投资: "基本信息",
        企业年报: "基本信息",
        经营异常: "风险信息",
        行政处罚: "风险信息",
        环保处罚: "风险信息",
        抽查信息: "风险信息",
        股权出质: "风险信息",
        立案信息: "涉诉信息",
        开庭公告: "涉诉信息",
        法院公告: "涉诉信息",
        裁判文书: "涉诉信息",
        被执行人: "涉诉信息",
        失信信息: "涉诉信息",
        专利信息: "知识产权",
        商标信息: "知识产权",
        著作权信息: "知识产权",
        软件著作权信息: "知识产权",
        域名信息: "知识产权",
        资质认证: "知识产权",
        融资信息: "经营信息",
        行政许可: "经营信息",
        招聘信息: "经营信息",
        新闻动态: "经营信息",
        招投标: "经营信息",
        海关进出口: "经营信息",
        股票信息: "上市信息",
        高管信息: "上市信息",
        企业公告: "上市信息"
      },
      noMore:false,
    };
  },

  components: { InfiniteLoading },

  computed: {
    //滚动加载节流
      disabled () {
        return this.loading || this.bigLoading
      }
  },

  mounted() {
    var _this = this;
    _this.init();
    _this.allCheck(1);
    _this.changeFlist(0);
    // 查看更多改变高度
    
    // 滚动条监听滚动底部
     window.addEventListener('scroll',this.handleScroll)
  },
  beforeRouteLeave(to, from , next){
       window.removeEventListener('scroll',this.handleScroll)
      next()
    
      
  },
  methods: {
    showMore(name){
      var list=[
        '经营异常','域名信息','工商变更','分支机构','企业年报','环保处罚','抽查信息','裁判文书','招投标','企业公告'
      ]
      for(var i=0;i<list.length;i++){
        if(name==list[i]){
          return false
        }
      }
      return true
    },
    handleScroll(e){
      var vm = this
         var scrollTop =document.documentElement.scrollTop ||document.body.scrollTop||window.pageYOffset;
         var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
         var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
         if ($(window).scrollTop()>400){
                    $(".upTop").fadeIn(1500);
                    $('.qc-timeline').addClass('flex')
                    // $('#line').css('left','111px')
         }else{
                    $(".upTop").fadeOut(1500);
                    $('.qc-timeline').removeClass('flex')
                    // $('#line').css('left','-53px')
                }
          if(scrollTop+windowHeight==scrollHeight){
                //写后台加载数据的函数
           console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
           if(vm.disabled){
             return false
           }
           vm.load()
          }  

      },
    backUp(){
       if ($('html').scrollTop()) {
                $('html').animate({ scrollTop: 0 }, 1000);
                return false;
            }
            $('body').animate({ scrollTop: 0 }, 1000);
                 return false;            
    },
      watchLine(){
        var vm = this
       
        setTimeout(()=>{
            //  $(".qc-lookmore").click(function() {
            //   $(this).siblings(".qc-timeitem-textbox").toggleClass("hei");
            //   vm.setLine();
            // });
            vm.setLine();
        },100)
        
      },
      // 下拉加载
      load(){
          var vm = this
          vm.loading = true
          setTimeout(()=>{
            vm.now_page++
            var sum = vm.now_page*10
            if(sum >= vm.allTree.length){
              if(vm.now_year==vm.yearlist[vm.yearlist.length-1]){
                  vm.noMore=true;
                  vm.loading = false
                   return
              }else{
                 vm.noMore=false;
              }
                vm.now_year--
                var json = {
                    company: vm.$route.query.name,
                    enterprise_id: vm.$route.query.id,
                    token: vm.Token,
                    year: vm.now_year,
                    key_map:vm.check_two
                };
                vm._postData("/Home/LifeTree/displayLifeTree.json", json, (data)=> {
                    console.log( data.data)
                    vm.allTree = vm.allTree.concat(data.data)
                    vm.tree = vm.allTree.slice(0, sum);
                     vm.loading = false
                     console.log(vm.allTree)
                     setTimeout(()=>{
                        vm.setLine();
                     },30)
                    setTimeout(()=>{
                      console.log($('.qc-timetree')[0].offsetHeight)
                      var h = $('.qc-timetree')[0].offsetHeight
                      $(".qc-box-box").css("height",h+'px');
                    },20)
                });
            }else{
                  vm.tree = vm.allTree.slice(0, sum);
                     vm.loading = false
                     setTimeout(()=>{
                        vm.setLine();
                     },30)
                     setTimeout(()=>{
                      console.log($('.qc-timetree')[0].offsetHeight)
                      var h = $('.qc-timetree')[0].offsetHeight
                      $(".qc-box-box").css("height",h+'px');
                    },20)
            }
          
            console.log('当前页数：'+sum,'当前树长度：'+vm.allTree.length)
          },30)
          
        // alert(sum)
      },
      allCheck(type){
          if(this.check_two.length==31){
              this.check_two=[]
              this.check_first_list=[]
          }else{
              this.check_two=[]
              this.check_first_list=[]
              for(var key in this.second_bind){
                  if(key=='新闻动态'&&type==1){
                    
                  }else{
                    this.check_two.push(key)
                  }
                  
              }
              this.check_list.forEach((el,index)=>{
                  for(var k in el){
                       this.check_first_list.push(k)
                  }
              })
              
          }
      },
      color(name){
          var s = {
              '基本信息':'gs-blue',
              '风险信息':'jy-green',
              '涉诉信息':'la-pink',
              '知识产权':'zl-yellow',
              '经营信息':'xw-pp',
              '上市信息':'zy',
          }
          return s[this.second_bind[name]]
      },
    haveOne(name) {
      if (this.check_first_list.indexOf(name) == -1) {
        return false;
      } else {
        return true;
      }
    },
    haveTwo(name) {
      if (this.check_two.indexOf(name) == -1) {
        return false;
      } else {
        return true;
      }
    },
    // 点击二级分类勾勾
    check_finsh(name,i){
        var vm = this
        // 检查已选数组里是否有此项
      if (this.check_two.indexOf(name) == -1) {
        this.check_two.push(name)
        //  选二级分类如果一级没勾，则把一级勾上
        if(this.check_first_list.indexOf(this.second_bind[name])==-1){
            this.check_first_list.push(this.second_bind[name])
        }
      } else {
        this.check_two.splice(this.check_two.indexOf(name),1)
        var have = false
        // 检查已选数组里是否有此项所属的一级数组里的二级数组，如果一项都没有，则把一级取消勾选
        // have为一个开关   下面循环如果有 则会把开关设为开  如果没有则为关  就会执行取消一级勾选操作
        this.check_two.forEach((el,index)=>{
            for(var c=0;c<vm.check_second.length;c++){
                if(vm.check_second[c]==el){
                    have =true
                }else{
                    
                }
            }
        })
        if(!have){
            // 这里为取消一级勾选操作
            this.check_first_list.splice(this.check_first_list.indexOf(this.second_bind[name]),1)
        }
      }
    },
    //   点击一级分类勾勾
    check_one(name, i) {
        var vm = this
      if (this.check_first_list.indexOf(name) == -1) {
        this.check_first_list.push(name);
        for (var k = 0; k < this.check_list[i][name].length; k++) {
          this.check_two.push(this.check_list[i][name][k]);
        }
      } else {
        this.check_first_list.splice(this.check_first_list.indexOf(name), 1);
        for (var k = 0; k < this.check_list[i][name].length; k++) {
          this.check_two.forEach((el,index,ar)=>{
              if(el==this.check_list[i][name][k]){
                  ar.splice(index,1)
              }
          })
        }
      }

    //   console.log(this.check_two);
    },
    // 点击一级分类文字预览二级分类
    changeFlist(i) {
      var vm = this;
      vm.check_first = Object.keys(vm.check_list[i])[0];

      for (var p in vm.check_list[i]) {
        vm.check_second = vm.check_list[i][p];
      }
    },
    setYearLine(){
      var vm = this
      var start = JSON.parse(sessionStorage.getItem('business')).start_date
      var day = new Date(start)
      var startYear = day.getFullYear()
      var now = new Date()
      var nowYear =now.getFullYear() 
      console.log(start)
      for(var i=nowYear;i>=startYear;i--){
        
        vm.yearlist.push(i)
      }
      console.log("aaaaaaaaa",vm.yearlist)
    },
    //返回月份对应英文
    setmou(m) {
      // var a = /-\d{1,2}-/g.exec(m);
      // var b = /\d{1,2}/g.exec(a);
      var day = new Date(m);
      var d = day.getMonth()
      // var c = parseInt(b, 10);
      return this.mou[d];
    },
    setDay(m) {
      var day = new Date(m);
      var d = day.getDate();
      return d;
      // console.log(this.mou[c-1])
    },
    //动态设置左边蓝色时间轴高度
    setLine() {
      var h = 0;
      for (var i = 0; i < $(".qc-timeitem").length - 1; i++) {
        h += document.getElementsByClassName("qc-timeitem")[i].clientHeight;
      }
      h = h + 32 * ($(".qc-timeitem").length - 1);
      console.log('高度为：'+h);
      $("#line").css("height", h + "px");
    },
    //初始化
    init() {
      var vm = this;
      vm.setYearLine();
      this.bigLoading = true
      vm.now_year = vm.yearlist[0];
      var json = {
        company: vm.$route.query.name,
        enterprise_id: vm.$route.query.id,
        token: vm.Token,
        year: vm.now_year,
      };
      vm._postData("/Home/LifeTree/displayLifeTree.json", json, data => {
        vm.allTree = data.data;
        vm.tree = vm.allTree.slice(0, 10);

        vm.now_page = 1;
        vm.setLine();
        vm.watchLine();
        vm.bigLoading = false
        setTimeout(()=>{
          console.log($('.qc-timetree')[0].offsetHeight)
          var h = $('.qc-timetree')[0].offsetHeight
           $(".qc-box-box").css("height",h+'px');
        },20)

      });
    },
    //切换年份
    changeYear(year) {
      this.now_year = year;
      var vm = this;
      this.bigLoading = true
      var json = {
        company: vm.$route.query.name,
        enterprise_id: vm.$route.query.id,
        token: vm.Token,
        year: vm.now_year,
        key_map:vm.check_two
      };
      $(".qc-box-box").css("height","0px");
      vm._postData("/Home/LifeTree/displayLifeTree.json", json, data => {
        vm.allTree = data.data;
        vm.tree = vm.allTree.slice(0, 10);
        vm.now_page = 1;
         vm.bigLoading = false
         
         setTimeout(()=>{
          console.log($('.qc-timetree')[0].offsetHeight)
          var h = $('.qc-timetree')[0].offsetHeight
           $(".qc-box-box").css("height",h+'px');
           
           vm.setLine();
           vm.watchLine();
        },20)
        console.log(vm.allTree.length);
        console.log(vm.tree);
      });
    },
    //查看更多
    lookmore(k) {
      if (this.tree[k].more=='true') {
        this.tree[k].more = 'false';
      } else {
        this.tree[k].more = 'true';
      }
      if($('.qc-timeitem-textbox')[k].classList.contains('hei')){
         $('.qc-timeitem-textbox')[k].classList.remove("hei")
      }else{
        $('.qc-timeitem-textbox')[k].classList.add("hei")
      }

      setTimeout(()=>{
                      console.log($('.qc-timetree')[0].offsetHeight)
                      var h = $('.qc-timetree')[0].offsetHeight
                      $(".qc-box-box").css("height",h+'px');
                    },20)
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 筛选提交
    submitArr(){
        var vm = this;
        vm.dialogVisible = false;
        this.bigLoading = true
      var json = {
        company: vm.$route.query.name,
        enterprise_id: vm.$route.query.id,
        token: vm.Token,
        year: vm.now_year,
        key_map:vm.check_two
      };
       $(".qc-box-box").css("height","0px");
      vm._postData("/Home/LifeTree/displayLifeTree.json", json, data => {
        vm.allTree = data.data;
        vm.tree = vm.allTree.slice(0, 10);
        vm.now_page = 1;
        vm.bigLoading = false
        setTimeout(()=>{
          console.log($('.qc-timetree')[0].offsetHeight)
          var h = $('.qc-timetree')[0].offsetHeight
           $(".qc-box-box").css("height",h+'px');
           vm.setLine();
           vm.watchLine();
        },20)
        console.log(vm.allTree.length);
        console.log(vm.tree);
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.qc-all {
  // width: 1920px;
  padding-bottom: 30px;
  padding-top: 30px;
  position: relative;
  .qc-tc-main {
    width: 100%;
    position: relative;
    > .qc-tc-allcheck {
      position: absolute;
      bottom: -48px;
      left: 50px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(13, 26, 38, 1);
      line-height: 20px;
      box-sizing: border-box;
      position: relative;
      width: 50px;
      > span {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: -30px;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(230, 233, 235, 1);
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;
        > img {
          display: block;
          width: 100%;
        }
      }
      > .active {
        background: $theme-color;
        border: none;
      }
    }
    .qc-tc-tt {
      font-size: 20px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: rgba(13, 26, 38, 1);
      line-height: 72px;
      margin-left: 30px;
    }
    .qc-tc-box {
      width: 100%;
      height: 360px;
      border-bottom: 2px solid #e6e9eb;
      border-top: 2px solid #e6e9eb;

      .qc-tc-box3 {
        float: left;
        box-sizing: border-box;
        width: 248px;
        height: 100%;
        border-right: 2px solid #e6e9eb;
        overflow-y: auto;

        .qc-tc-boxone-item {
          width: 100%;
          height: 60px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(13, 26, 38, 1);
          line-height: 60px;
          box-sizing: border-box;
          padding-left: 50px;
          position: relative;
          cursor: pointer;
          .qc-tc-boxone-item-check {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            left: 20px;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 1);
            border: 2px solid rgba(230, 233, 235, 1);
            border-radius: 4px;
            cursor: pointer;
            > img {
              display: block;
              width: 100%;
            }
          }
          .active {
            background: $theme-color;
            border: none;
          }
        }
        .qc-tc-boxone-item:hover {
          background: #edf3fe;
        }
        > .active {
          background: #d9e7fd;
        }
      }
      .qc-tc-box3::-webkit-scrollbar-button {
        display: none;
      }
      .qc-tc-boxts {
        border-right: none;
        background: rgba(247, 249, 251, 1);
        .qc-tc-boxlast-tt {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(85, 102, 117, 1);
          line-height: 1;
          margin-top: 21px;
          margin-bottom: 5px;
          margin-left: 20px;
        }
        .qc-tc-boxlast-item {
          width: 100%;
          box-sizing: border-box;
          padding-left: 40px;
          height: 26px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(85, 102, 117, 1);
          line-height: 26px;
          position: relative;
          span {
            width: 4px;
            height: 4px;
            background: rgba(85, 102, 117, 1);
            border-radius: 50%;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            left: 20px;
          }
        }
      }
    }
  }

  .qc-main {
    width: 1740px;
    min-height: 873px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(230, 233, 235, 1);
    border-radius: 8px;
    margin: auto;
    position: relative;
    .qc-load{
        position: absolute;
        bottom: -40px;
        left: 0;
        width: 100%;
        height: 20px;
    }
    .qc-load-nomore{
        position: absolute;
        bottom: -34px;
        left: 0;
        width: 100%;
        height:15px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(66,133,244,1);
        line-height:1;
        text-align: center;
    }
    .qc-topimg {
      display: block;
      width: 1680px;
      margin: auto;
      margin-top: 30px;
    }
    .qc-sx {
      float: right;
      width: 240px;
      height: 52px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(230, 233, 235, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(158, 168, 177, 1);
      line-height: 52px;
      box-sizing: border-box;
      padding-left: 20px;
      position: relative;
      margin-top: 30px;
      margin-right: 30px;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 20px;
        margin: auto;
      }
    }
    .qc-checkbox {
      width: 1680px;
      margin: auto;
      margin-top: 48px;
      .qc-checkbox-tt{
        height:16px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(85,102,117,1);
        line-height:16px;
        margin-bottom: 48px;
        margin-right: 270px;
      }
      .qc-timeline {
        // position: fixed;
        // left: 120px;
        // top: 448px;
        float: left;
        z-index: 333;
        .qc-timeline-tt {
          font-size: 20px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: rgba(13, 26, 38, 1);
          line-height: 1;
          margin-left: 20px;
          margin-bottom: 30px;
        }
        .qc-timelinebox {
          width: 160px;
          height: 340px;
          overflow-x: hidden;
          overflow-y: auto;
          .active {
            color: $theme-color;
            background: #e4eefd;
          }
          > div:first-of-type {
            border-top: 2px solid #e6e9eb;
          }
          > div {
            width: 160px;
            height: 68px;
            position: relative;
            border-bottom: 2px solid #e6e9eb;
            font-size: 16px;
            font-family: DIN-Medium;
            font-weight: 500;
            color: rgba(85, 102, 117, 1);
            line-height: 68px;
            box-sizing: border-box;
            padding-left: 20px;
            cursor: pointer;
            > span {
              position: absolute;
              top: 0;
              bottom: 0;
              right: 20px;
              margin: auto;
              width: 0;
              height: 0;
              border-top: 6px solid transparent;
              border-left: 6px solid $theme-color;
              border-bottom: 6px solid transparent;
            }
          }
        }
      }
      .flex{
         position: fixed;
        top: 110px;
      }
      .qc-box-box{
        height: 0px;
        // overflow: hidden;
        float: right;
        transition: all .5s;
        position: relative;
        #line{
          width: 2px;
          background: #d1e2fc;
          display: inline-block;
          position: absolute;
          top: 0;
          left: -53px;
        }
      }
      .qc-timetree {
        float: right;
        width: 1388px;
        position: relative;
        height: auto;
        .qc-timeitem {
          border-bottom: 2px solid #e6e9eb;
          min-height: 214px;
          width: 100%;
          position: relative;
          margin-bottom: 30px;
          padding-bottom: 55px;
          box-sizing: border-box;
          .qc-timeitem-tt {
            height: 20px;
            font-size: 20px;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            display: inline-block;
            color: rgba(13, 26, 38, 1);
            line-height: 1;
            position: relative;
            margin-bottom: 11px;
            > span {
              font-size: 16px;
              color: #9ea8b1;
              letter-spacing: .5px;
            }
            > div {
              position: absolute;
              bottom: -5px;
              left: 0;
              width: 100%;
              height: 14px;
            }
            .gs-blue {
              background: linear-gradient(
                0deg,
                rgba(66, 133, 244, 0.7) 0%,
                rgba(66, 133, 244, 0.3) 10%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            .jy-green {
              background: linear-gradient(
                0deg,
                rgba(0, 164, 92, 0.7) 0%,
                rgba(0, 164, 92, 0.3) 10%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            .la-pink {
              background: linear-gradient(
                0deg,
                rgba(255, 20, 75, 0.7) 0%,
                rgba(255, 20, 75, 0.3) 10%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            .zl-yellow {
              background: linear-gradient(
                0deg,
                rgba(255, 102, 0, 0.7) 0%,
                rgba(255, 102, 0, 0.3) 10%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            .xw-pp {
              background: linear-gradient(
                0deg,
                rgba(142, 0, 215, 0.7) 0%,
                rgba(142, 0, 215, 0.3) 10%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            .zy {
              background: linear-gradient(
                0deg,
                rgba(104, 104, 104, 0.7) 0%,
                rgba(138, 138, 138, 0.3) 10%,
                rgba(255, 255, 255, 0) 100%
              );
            }
          }
          .qc-timeitem-textbox {
            overflow: hidden;
            height: 120px;

            .qc-timeitem-text {
              font-size: 16px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(85, 102, 117, 1);
              line-height: 32px;
              width: 100%;
            }
          }
          .hei {
            height: auto;
          }
          .qc-lookmore {
            position: absolute;
            height: 16px;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(66, 133, 244, 1);
            line-height: 16px;
            right: 0;
            bottom: 30px;
            
            cursor: pointer;
            > b {
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid $theme-color;
              display: inline-block;
              margin-left: 10px;
              margin-bottom: 3px;
              transition: all 1s;
            }
            .active {
              // border-top: none;
              // border-bottom: 6px solid $theme-color;
              transform:rotate(180deg);
              -ms-transform:rotate(180deg); 	/* IE 9 */
              -moz-transform:rotate(180deg); 	/* Firefox */
              -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
              -o-transform:rotate(180deg); 
            }
          }
          .qc-timeitem-showmon {
            position: absolute;
            top: 0;
            left: -73px;
            width: 44px;
            height: 48px;
            background: rgba(227, 237, 253, 1);
            border: 2px solid rgba(198, 218, 252, 1);
            font-size: 18px;
            font-family: DIN-Medium;
            font-weight: 500;
            color: rgba(66, 133, 244, 1);
            line-height: 20px;
            text-align: center;
            box-sizing: border-box;
            z-index: 10;
            > .qc-timeitem-showbox {
              width: 40px;
              height: 22px;
              background: rgba(66, 133, 244, 1);
              font-size: 14px;
              font-family: DIN-Medium;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 22px;
            }
          }
        }
        .qc-timetree-line {
          position: absolute;
          left: -52px;
          width: 2px;
          height: 0px;
          background: rgba(209, 226, 252, 1);
          top: 0;
        }
      }
    }
  }
}
// 滚动条样式
.qc-timelinebox::-webkit-scrollbar  
{  
    width: 6px;  
}  
.qc-timelinebox::-webkit-scrollbar-thumb{  
    background-color: #556675;  
}  
.qc-tc-box3::-webkit-scrollbar{  
    width: 6px;  
}  
.qc-tc-box3::-webkit-scrollbar-thumb{  
    background-color: #556675;  
}  
.upTop{
    position: fixed;
    right: 14px;
    bottom: 155px;
    width:62px;
    height:93px;
    background:rgba(255,255,255,1);
    border:2px solid rgba(66,133,244,1);
    border-radius:4px;
    display: none;
    cursor: pointer;
    .upTop-img{
          margin-bottom: 13px;
          width: 20px;
          height: 12px;
          background: url('../../assets/img/quickCheck/top.png');
          margin: auto;
          margin-top: 19px;
          margin-bottom: 8px;
          transition: all .8s;
    }
    .upTop-tt{
      text-align: center;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(66,133,244,1);
      line-height:21px;
      transition: all .8s;
    }
    &:hover{
      box-shadow: 0px 4px 10px 0px rgba(66, 133, 244, 0.24);
    border-radius: 4px;
    }
     &:active{
        background:$theme-color;
        box-shadow:0px 4px 10px 0px rgba(66,133,244,0.24);
     }
    &:active .upTop-img{
      background: url('../../assets/img/quickCheck/topact.png');
    }
     &:active .upTop-tt{
       color: white;
     }
}
</style>
<style lang="scss" scoped>
@media screen and(max-width: $large-srceen){
     
      .qc-all{
       
        .qc-main{
           width: 1300px;
          .qc-topimg{
            width: 1240px;
          }
          .qc-checkbox {
            width:1240px;
            .qc-timeline{
              // left: 50px;
              //  top:412px;
            }
            .qc-box-box{
              #line{
                // left: 46px!important;;
              }
            }
            
             .qc-timetree{
               width: 981px;
             }
          }
        }
      }
        
}
</style>
