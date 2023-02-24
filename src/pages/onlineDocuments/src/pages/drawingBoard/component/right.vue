<script setup lang="ts">
import { ref } from "vue";
import pDropDownButtonVue from "@/components/p-dropDown/p-dropDownButton.vue";
import { Search } from "@element-plus/icons-vue";
import { drawingBoardStore } from "../stores/drawingBoardStore";

const store = drawingBoardStore();

const search = ref();
const buttonRefList = {}; // 正常
const oldSelect = ref(); // 选中的项
const aaa = ref(); // 当前修改的图形数据

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
    <div class="rightSide-heard">
      <div class="rightSide-heard-actionBars">
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="input2" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-butto>X</el-butto>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="input2" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-butto>Y</el-butto>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="input2" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-butto>W</el-butto>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="input2" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-butto>H</el-butto>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="input2" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-butto><i class="iconfont icon-jiazai5"></i></el-butto>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="input2" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-butto><i class="iconfont icon-jiazai5"></i></el-butto>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="hierarchyList">
      <div class="hierarchyList-search">
        <el-input
          v-model="search"
          class="w-50 m-2"
          placeholder="搜索"
          :prefix-icon="Search"
        />
      </div>
      <div class="ul">
        <div class="li" v-for="(item, index) in store.modelList" :key="index">
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
  position: absolute;
  z-index: 100;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background-color: rgb(255, 255, 255);
  border-width: 0 1.4px 0 0;
  border-color: #e7e7e7;
  border-style: solid;
  .rightSide-heard {
    display: flex;
    flex-direction: column;
    height: 300px;
    padding: 10px;
    .rightSide-heard-actionBars {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 30px 30px;
      grid-gap: 10px;
      .rightSide-heard-actionBars-input {
        height: 30px;
        border-radius: 4px;
        background-color: #c4c4c4;
      }
    }
  }
  .hierarchyList {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 300px);
    border-width: 1.4px 0 0 0;
    border-color: #e7e7e7;
    border-style: solid;

    .hierarchyList-search {
      width: 90%;
      margin: 10px auto;
    }
    .ul {
      height: 100%;
      overflow: auto;
      padding-bottom: 10px;
      .li {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        width: 100%;
        height: 30px;
        .dropdownBox {
          height: 30px;
          ::v-deep .button {
            height: 30px;
          }
        }
      }
    }
  }
}
</style>
