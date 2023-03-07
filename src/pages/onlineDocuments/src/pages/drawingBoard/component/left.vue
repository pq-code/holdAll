<script setup lang="ts">
import { ref, watch } from "vue";
import pDropDownButtonVue from "@/components/p-dropDown/p-dropDownButton.vue";
import { drawingBoardStore } from "../stores/drawingBoardStore";
import { vclosePopUp } from "../utils/utils";
import { sideButton } from "../component/staticData/sideButton";

const store = drawingBoardStore();

const list = ref(sideButton);
const rectangle = ref(false);

const oldSideSelect = ref(); // 选中的项

const add = (e: number) => {
  oldSideSelect.value = e;
  rectangle.value = !rectangle.value;
};

// 操作类型抛出
const addRectangle = (e: string) => {
  rectangle.value = !rectangle.value;
  store.selectDraw = e;
};
</script>

<template>
  <div class="leftSide">
    <div
      class="tool"
      v-for="(item, index) in list"
      :key="`${item.title}_${index}`"
    >
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="item.title"
        placement="left-start"
      >
        <div class="tool-rectangle" @click="add(index)">
          <i :class="['iconfont', item.icon]"></i>
          <i
            style="
              position: absolute;
              left: 30px;
              font-size: 20px;
              transform: translateY(10px) rotate(-45deg);
            "
            class="iconfont icon-jiantouxiajiangxia"
          ></i>
        </div>
      </el-tooltip>
      <div
        v-show="index == oldSideSelect && item.options?.length > 0"
        class="openRectangle"
      >
        <pDropDownButtonVue
          v-for="(e, index) in item.options"
          :item="e"
          :key="`${e}_${index}_button`"
          @dropDown="addRectangle(e.fn)"
        ></pDropDownButtonVue>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.leftSide {
  position: fixed;
  z-index: 100;
  left: 10px;
  top: 60px;
  height: 600px;
  width: 50px;
  background-color: #fff;
  border-radius: 6px;
  border: solid 1.4px rgb(239, 239, 239);
  .tool {
    cursor: pointer;
    border-radius: 6px;
    width: 40px;
    height: 40px;
    padding: 5px;
    .tool-rectangle {
      border-radius: 6px;
      width: 40px;
      height: 40px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 22px;
      }
    }
    .tool-rectangle:hover {
      background-color: rgb(220, 220, 220);
    }
    .openRectangle {
      width: 180px;
      height: 200px;
      z-index: 110;
      border-radius: 6px;
      background-color: #ffffff;
      transform: translateX(56px) translateY(-10px);
      box-shadow: 3px 4px 7px 0px rgb(146 146 146 / 50%);
      .dropdownBox {
        height: 40px;
        ::v-deep .button {
          height: 30px;
        }
      }
    }
  }
}
</style>
