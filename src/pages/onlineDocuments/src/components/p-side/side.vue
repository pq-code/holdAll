<script setup lang="ts">
import { onMounted, ref, useSlots, computed } from "vue";
import pDropDownButtonVue from "../p-dropDown/p-dropDownButton.vue";

const props = defineProps({
  dataList: {
    type: Array,
    default() {
      return [
        {
          icon: "",
          label: "121",
        },
        {
          icon: "",
          label: "121",
        },
      ];
    },
  },
  lengthWidth: {
    type: Boolean,
    default() {
      return true;
    },
  },
});

const foldSwitch = ref(false); // 鼠标是否在侧边栏上
const selectIndex = ref(); // 选中的数据
const buttonRefList = {}; // 正常
const floatButtonRefList = {}; //悬浮
const oldSelect = ref(); // 选中的项
const floatOldSelect = ref();

const emits = defineEmits(["lengthWidthFn"]);
const isFloat = ref(true);

// 判断slot是否有值
const useSlotsFn = (e: string) => {
  return !!useSlots()[e];
};

// 鼠标移出
const mouseleaveFn = () => {
  foldSwitch.value = false;
};
// 鼠标移入
const mouseenterFn = () => {
  foldSwitch.value = true;
};

// 点击折叠按钮
const lengthWidthFn = (e) => {
  dropDown(e);
  return emits("lengthWidthFn", !props.lengthWidth);
};

// 收回下拉按钮
const backDropDown = () => {
  if (!isFloat.value) {
    isFloat.value = !isFloat.value;
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

  if (isFloat.value) {
    if (floatOldSelect.value) {
      floatButtonRefList[oldSelect.value].uncheck();
      floatOldSelect.value = `float_${index}_button`;
    }
  }

  if (!props.lengthWidth && props.dataList[index].options.length > 1) {
    isFloat.value = !isFloat.value; // 打卡侧边栏
    floatOldSelect.value = `float_${index}_button`;
  }
};

// 动态ref
const buttonRef = (el: any, key: string) => {
  if (el) {
    buttonRefList[key] = el;
  }
};
// 选中
const floatButtonRef = (el: any, key: string) => {
  if (el) {
    floatButtonRefList[key] = el;
  }
};

onMounted(() => {});
</script>

<template>
  <div
    class="p-side-float"
    :style="{
      opacity: isFloat ? 0 : 1,
      'pointer-events': isFloat ? 'none' : 'auto',
    }"
    @click.stop="backDropDown"
  >
    <div
      class="side-ul"
      :style="{
        'pointer-events': isFloat ? 'none' : 'auto',
      }"
    >
      <div class="side-head-li" v-if="useSlotsFn('sideHeadLi')">
        <div @click="lengthWidthFn('head')" style="cursor: pointer">
          <i class="iconfont icon-return"></i>
        </div>
        <!-- <slot name="sideHeadLi"></slot> -->
      </div>
      <div
        class="side-body-li"
        v-for="(item, index) in dataList"
        :key="`${item}-${index}`"
      >
        <pDropDownButtonVue
          :ref="(el) => floatButtonRef(el, `float_${index}_button`)"
          :item="item"
          :key="`${index}_button`"
          :lengthWidth="!lengthWidth"
          @dropDown="dropDown(index)"
        ></pDropDownButtonVue>
      </div>
    </div>
  </div>

  <div class="p-side" @mouseleave="mouseleaveFn" @mouseenter="mouseenterFn">
    <div class="side-ul">
      <div class="side-head-li" v-if="useSlotsFn('sideHeadLi')">
        <div
          v-if="!lengthWidth && foldSwitch"
          @click="lengthWidthFn('head')"
          style="cursor: pointer"
        >
          <i class="iconfont icon-hanbaocaidanzhedie"></i>
        </div>
        <slot v-else name="sideHeadLi"></slot>
      </div>

      <template v-if="useSlotsFn('sideBodyLi')">
        <slot name="sideBodyLi"></slot>
      </template>

      <div
        class="side-body-li"
        v-else
        v-for="(item, index) in dataList"
        :key="`${item}-${index}`"
      >
        <pDropDownButtonVue
          :ref="(el) => buttonRef(el, `${index}_button`)"
          :item="item"
          :key="`${index}_button`"
          :lengthWidth="lengthWidth"
          @dropDown="dropDown(index)"
        ></pDropDownButtonVue>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.p-side {
  height: 100%;

  .side-ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .side-head-li {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 100%;
      height: 88px;

      .iconfont {
        font-size: 22px;
      }
    }

    .side-body-li {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 100%;
      height: 50px;

      .button {
        cursor: pointer;
        width: 100%;
        height: 40px;
        margin: 10px 6px;
        background: none;
        border-style: none;
        display: flex;
        align-items: center;

        .iconfont {
          font-size: 22px;
        }

        .button-dropDown {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
      }

      .button:hover {
        border-radius: 4px;
        background-color: rgb(215, 215, 215);
      }
    }
  }
}

.p-side-float {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 998;
  background: rgba(109, 109, 109, 0.775);

  .side-ul {
    transform: translate(100, 0, 0);
    transition: opacity 0.15s ease 0s;

    z-index: 999;
    position: relative;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 220px;
    height: 100vh;
    background-color: #fff;

    .side-head-li {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 100%;
      height: 88px;

      .iconfont {
        font-size: 22px;
      }
    }

    .side-body-li {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 100%;
      height: 50px;

      .button {
        cursor: pointer;
        width: 100%;
        height: 40px;
        margin: 10px 6px;
        background: none;
        border-style: none;
        display: flex;
        align-items: center;

        .iconfont {
          font-size: 22px;
        }

        .button-dropDown {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
      }

      .button:hover {
        border-radius: 4px;
        background-color: rgb(215, 215, 215);
      }
    }
  }
}
</style>
