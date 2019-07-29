<template>
  <div class="catalog">
    <ul>
      <template v-for="item in $fn.catalog_list">
        <li
          class="catalog-list"
          :id="'catalog-'+item.id"
          v-if="!item.children"
          :key="item.id"
          @click="show(item.id)"
        >
          <div class="list-content">
            <div class="check-list" :id="'check-list'+item.id" @click="check(item.id)">
              <i class="iconfont icon-done"></i>
            </div>{{item.name}}</div>
        </li>
        <template v-if="item.children">
          <li class="catalog-list" :id="'catalog-'+item.id" :key="item.id" @click="show(item.id)">
            <div class="list-content">
              <div class="check-list" :id="'check-list'+item.id" @click="checkfather(item.id)">
                <i class="iconfont icon-done"></i>
              </div>{{item.name}}<div class="search right" :id="'arrow-up-'+item.id" @click="reverse(item.id)">
                <i class="el-icon-arrow-up"></i>
              </div>
            </div>
          </li>
          <div :id="'children-'+item.id" class="children">
            <li
              class="catalog-list"
              :id="'catalog-'+it.id"
              v-for="it in item.children"
              :key="it.id"
              @click="show(it.id)"
            >
              <div class="list-content">
                <div
                  :class="'check-list more-right father-'+item.id"
                  :id="'check-list'+it.id"
                  @click="checkChild(it.id,item.id)"
                >
                  <i class="iconfont icon-done"></i>
                </div>{{it.name}}</div>
            </li>
          </div>
        </template>
      </template>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      idArr: [],
      
      isSelect: ""
    };
  },
  watch:{
    idArr(newVal){
      this.$store.commit("setIsSelectDue", newVal);
    }
  },
  methods: {
    allSelect(type) {
      let vm = this;
      console.log(type);
      
      if (type) {
        $(".check-list").each(params => {
          $(".check-list")[params].classList.add("is-active");
          vm.idArr = [];
          vm.$fn.catalog_list.map(data => {
            vm.idArr.push(data.id);
            if (data.children) {
              data.children.map(item => {
                vm.idArr.push(item.id);
              });
            }
          });
        });
      } else {
        vm.idArr = [];
        $(".check-list").each(params => {
          $(".check-list")[params].classList.remove("is-active");
        });
      }
      // this.$store.commit("setIsSelectDue", 'all');
    },
    checkfather(id) {
      let vm = this;
      if($("#check-list" + id).hasClass("is-active")){
           vm.$fn.catalog_list.map(data => {
            if (data.id == id) {
                   let num = this.idArr.indexOf(data.id);
                      this.idArr.splice(num, 1);
                   data.children.map(item=>{
                     let index = this.idArr.indexOf(item.id);
                     index == -1 ? "" : this.idArr.splice(index, 1);
                   })
            }
          });
      }else{
         vm.$fn.catalog_list.map(data => {
            if (data.id == id) {
                   data.children.map(item=>{
                     this.idArr.indexOf(item.id) > 0 ? "" : this.idArr.push(item.id);
                   })
            }
          });
      }
     

      if ($("#check-list" + id).hasClass("is-active")) {
        $(".father-" + id).removeClass("is-active");
      } else {
        $(".father-" + id).addClass("is-active");
      }
      $("#check-list" + id).toggleClass("is-active");
      this.isAll();
    },
    check(id) {
      this.changeIdArr(id);
      $("#check-list" + id).toggleClass("is-active");

      this.isAll();
    },
    checkChild(id, fatherId) {
      this.changeIdArr(id);
      $("#check-list" + id).toggleClass("is-active");

      if (
        $(".father-" + fatherId).length ==
        $(".is-active.father-" + fatherId).length
      ) {
        $("#check-list" + fatherId).addClass("is-active");
      }
      if (
        $(".father-" + fatherId).length !=
        $(".is-active.father-" + fatherId).length
      ) {
        $("#check-list" + fatherId).removeClass("is-active");
      }
      this.isAll();
    },
    isAll() {
      if ($(".check-list").length == $(".is-active.check-list").length) {
        this.$emit("checkAll", true);
      }
      if ($(".check-list").length !== $(".is-active.check-list").length) {
        this.$emit("checkAll", false);
      }
    },
    reverse(id) {
      $("#arrow-up-" + id + " .el-icon-arrow-up").toggleClass("is-reverse");
      $("#children-" + id).toggleClass("hide");
    },
    show(id) {
      if ($(".is-selected").length > 0) {
        $(".is-selected")[0].classList.remove("is-selected");
      }
      this.$store.commit("setShowId", id);
      $("#catalog-" + id).addClass("is-selected");
    },
    //操作数组id
    changeIdArr(id) {
      if ($("#check-list" + id).hasClass("is-active")) {
        let index = this.idArr.indexOf(id);
        index == -1 ? "" : this.idArr.splice(index, 1);
        
      } else {
        this.idArr.indexOf(id) > 0 ? "" : this.idArr.push(id);
      }
    },
  }
};
</script>
<style lang='scss' scoped>
.catalog {
  .catalog-list {
    width: 100%;
    height: 40px;
    &:hover {
      background: rgba(66, 133, 244, 0.1);
      .check-list {
        border: 2px solid #4285f4;
      }
    }
    &.is-selected {
      background: rgba(66, 133, 244, 0.1);
    }
    .list-content {
      margin-left: 30px;
      line-height: 40px;
      .more-right {
        margin-right: 47px;
      }
    }

    .search {
      display: inline-block;
      line-height: 35px;
      vertical-align: top;
      margin-right: 20px;

     
    }
  }
  .children {
    display: inline-block;
    width: 100%;
    height: auto;
    overflow: hidden;
    transition: all 10.3s;
    &.hide {
      display: none;
      height: 0px;
      transition: all 10.3s;
    }
  }
}
</style>
