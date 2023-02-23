<script setup lang="ts">
import { ref } from "vue";
import pDropDownButtonVue from "@/components/p-dropDown/p-dropDownButton.vue";

const rectangle = ref(false);
const emits = defineEmits(["operate"]);

const buttonRefList = {}; // 正常
const oldSelect = ref(); // 选中的项

const add = () => {
  debugger;
};

// 操作类型抛出
const addRectangle = (e: string) => {
  rectangle.value = !rectangle.value;
  emits("operate", e);
};

const list = ref([
  { title: "选择工具 A", fn: add, icon: "icon-yingyong" },
  {
    title: "矩形 R",
    fn: () => (rectangle.value = !rectangle.value),
    icon: "icon-yingyong",
  },
  { title: "画笔 P", fn: add, icon: "icon-yingyong" },
  { title: "文本 T", fn: add, icon: "icon-yingyong" },
  { title: "矩形", fn: add, icon: "icon-yingyong" },
]);

const rectangleList = ref([
  { title: "矩形", fn: "rect", icon: "icon-yingyong" },
  { title: "圆", fn: "circle", icon: "icon-yingyong" },
  { title: "直线", fn: "11", icon: "icon-yingyong" },
  { title: "多边形", fn: "1", icon: "icon-yingyong" },
  { title: "图片", fn: "1", icon: "icon-yingyong" },
]);

const buttonRef = (el: any, key: string) => {
  if (el) {
    buttonRefList[key] = el;
  }
};
</script>

<template>
  <div v-show="rectangle" class="openRectangle">
    <pDropDownButtonVue
      v-for="(item, index) in rectangleList"
      :ref="(el) => buttonRef(el, `${index}_button`)"
      :item="item"
      :key="`${item}_${index}_button`"
      @dropDown="addRectangle(item.fn)"
    ></pDropDownButtonVue>
  </div>
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
        <div class="tool-rectangle" @click="item.fn">
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
    </div>
  </div>
</template>
<style lang="less" scoped>
.leftSide {
  position: absolute;
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
  }
}

.openRectangle {
  position: absolute;
  width: 180px;
  height: 200px;
  z-index: 110;
  border-radius: 6px;
  background-color: #ffffff;
  transform: translateX(70px) translateY(130px);
  box-shadow: 3px 4px 7px 0px rgb(146 146 146 / 50%);
  .dropdownBox {
    height: 40px;
    ::v-deep .button {
      height: 30px;
    }
  }
}
</style>
