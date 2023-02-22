<script setup lang="ts">
import { ref } from "vue";
import pDropDownButtonVue from "@/components/p-dropDown/p-dropDownButton.vue";
import { Search } from "@element-plus/icons-vue";

const props = defineProps({
  dataList: {
    type: Array,
    default() {
      return [];
    },
  },
});
const search = ref();
const buttonRefList = {}; // 正常
const oldSelect = ref(); // 选中的项

// 动态ref
const buttonRef = (el: any, key: string) => {
  if (el) {
    buttonRefList[key] = el;
  }
};

// 下拉按钮
const dropDown = (index: number) => {
  if (oldSelect.value) {
    buttonRefList[oldSelect.value].uncheck();
    oldSelect.value = `${index}_button`;
  } else {
    oldSelect.value = `${index}_button`;
  }
};
</script>
<template>
  <div class="rightSide">
    <div class="rightSide-heard"></div>
    <div class="rightSide-lamination">
      <div class="ul">
        <div class="ul-search">
          <el-input
            v-model="search"
            class="w-50 m-2"
            placeholder="搜索"
            :prefix-icon="Search"
          />
        </div>
        <div class="li" v-for="(item, index) in dataList" :key="index">
          <pDropDownButtonVue
            :ref="(el) => buttonRef(el, `${index}_button`)"
            :item="item"
            :key="`${index}_button`"
            @dropDown="dropDown(index)"
          ></pDropDownButtonVue>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.rightSide {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background-color: rgb(255, 255, 255);
  border-width: 0 1.4px 0 0;
  border-color: #e7e7e7;
  border-style: solid;
  .rightSide-heard {
    height: 100px;
  }
  .rightSide-lamination {
    border-width: 1.4px 0 0 0;
    border-color: #e7e7e7;
    border-style: solid;
    .ul {
      .ul-search {
        width: 90%;
        margin: 10px auto;
      }
      .li {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        width: 100%;
        height: 40px;
        .dropdownBox {
          height: 40px;
          ::v-deep .button {
            height: 30px;
          }
        }
      }
    }
  }
}
</style>
