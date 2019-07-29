<template>
   <el-dialog
    title="下载"
    class="public"
    :visible.sync="dialogVisible"
    width="484px"
    top="30vh"
    :before-close="handleClose"
  >
    <div class="text">选择格式</div>
    <div class="download">
        <ul>
            <li :class="is_select == 'word'?'is_select':''">
                <div class="img word"></div>
                <div class="text">WORD</div>
            </li>
            <li class="disabled">
                <div class="img pdf"></div>
                <div class="text">PDF</div>
            </li>
            <li class="disabled">
                <div class="img ppt"> </div>
                <div class="text">PPT</div>
            </li>
        </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="download()">下载</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Cookies from "js-cookie";
export default {
    props:{
        dialogVisible:{
            type:Boolean,
            default:false
        },
        wordId:{
            type:String,
            default:''
        }
    },
  data () {
    return {
        api_word_download:"/Home/Enterprise/downJdWord.json?user_tune_up_id=",
        is_select:"word"
    };
  },


  methods: {
      handleClose(){
          this.$emit('update:dialogVisible',false);
      },
      download(){
        //   Cookies.get('_Token')
          console.log(this.Token);
        
          window.open(this.webUrl+this.api_word_download+this.wordId+"&token="+ Cookies.get('_Token'))
          this.handleClose()
      }
  }
}

</script>
<style lang='scss' scoped>
.download{
    margin-top: 20px;
    & li{
        display: inline-block;
        border-radius:8px;
        width:122px;
        height:122px;
        margin-left: 21px;
        text-align: center;
        .img{
            width: 60px;
            height: 60px;
            margin: 22px 33px 3px 33px; 
        }
        .word{
            background-image: url("../assets/img/due/word_icon_default.png");
            background-repeat:no-repeat;
        }
    }
    & li:nth-child(1){
         margin-left: 0px;
    }
    .is_select{
        border:2px solid rgba(66,133,244,1);
    }
    .disabled{
        border:2px solid rgba(230,233,235,1);
        cursor: not-allowed;
        &>.pdf{
             background-image: url("../assets/img/due/pdf_icon_Ash_disabled.png")
        }
        &>.ppt{
            background-image: url("../assets/img/due/ppt_icon_Ash_disabled.png")
        }
    }
}
</style>