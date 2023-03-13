<script setup lang="ts">
import { ref, watch } from "vue";
import pDropDownButtonVue from "@/components/p-dropDown/p-dropDownButton.vue";
import { Search } from "@element-plus/icons-vue";
import { drawingBoardStore } from "../stores/drawingBoardStore";

const store = drawingBoardStore();

const search = ref();
const buttonRefList = {}; // 正常
const oldSelect = ref(); // 选中的项
const color = ref("rgba(225, 225, 225, 1)"); // 选中的颜色
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
const form = ref({
  inputx: "",
  inputy: "",
  inputw: "",
  inputh: "",
  stroke: "",
  fill: "",
});

watch(
  () => store.selectedNode,
  (n, o) => {
    if (n) {
      form.value.inputh = n.height();
      form.value.inputw = n.width();
      form.value.inputx = n.x();
      form.value.inputy = n.y();
      form.value.stroke = n.stroke();
      form.value.fill = n.fill();
    } else {
      form.value.inputh = "";
      form.value.inputw = "";
      form.value.inputx = "";
      form.value.inputy = "";
      form.value.stroke = "";
      form.value.fill = "";
    }
  }
);

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
          <el-input v-model="form.inputx" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-button>X</el-button>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="form.inputy" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-button>Y</el-button>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="form.inputw" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-button>W</el-button>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="form.inputh" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-button>H</el-button>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="search" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-button
                ><i
                  class="iconfont icon-jiazai5"
                  style="
                    transform: translateY(-2px) translateX(-5px) rotate(-90deg);
                    position: absolute;
                  "
                ></i
              ></el-button>
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-actionBars-input">
          <el-input v-model="search" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-button
                ><i
                  class="iconfont icon-jiazai5"
                  style="
                    transform: translateY(-2px) translateX(-10px);
                    position: absolute;
                  "
                ></i
              ></el-button>
            </template>
          </el-input>
        </div>
      </div>
      <div class="rightSide-heard-padding">
        <div class="rightSide-heard-padding-title">填充</div>
        <div class="rightSide-heard-padding-main">
          <el-input v-model="color" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-color-picker
                v-model="form.fill"
                show-alpha
                :predefine="predefineColors"
              />
            </template>
          </el-input>
        </div>
        <div class="rightSide-heard-padding-title" style="margin-top: 10px">
          边框
        </div>
        <div class="rightSide-heard-padding-main">
          <el-input v-model="color" class="w-50 m-2" placeholder="">
            <template #prepend>
              <el-color-picker
                v-model="form.stroke"
                show-alpha
                :predefine="predefineColors"
              />
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
        ::v-deep .el-input-group__prepend {
          width: 20px;
          padding: 0 10px;
        }
      }
    }
    .rightSide-heard-padding {
      height: 60px;
      margin-top: 10px;
      .rightSide-heard-padding-title {
        height: 30px;
        display: flex;
      }
      .rightSide-heard-padding-main {
        height: 30px;
        width: 100%;
        background-color: #c4c4c4;
        ::v-deep .el-input-group__prepend {
          padding: 0;
        }
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
