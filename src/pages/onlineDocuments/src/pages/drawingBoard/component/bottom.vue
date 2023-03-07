<script setup lang="ts">
import { computed, ref } from "vue";
import { drawingBoardStore } from "../stores/drawingBoardStore";

const store = drawingBoardStore();
</script>
<template>
  <div class="bottom">
    <div class="bottom-left">
      <div style="margin-left: 10px; width: 50%; cursor: pointer">
        <i class="iconfont icon-shezhi2"></i>
      </div>
      <div style="margin-right: 10px; width: 50%; cursor: pointer">
        <i class="iconfont icon-shezhi2"></i>
      </div>
    </div>
    <div class="bottom-right">
      <div class="percentage">{{ `${store.scale} %` }}</div>
      <i
        style="width: 20px; cursor: pointer"
        class="iconfont icon-jiantouxiaxiao"
      ></i>
    </div>
  </div>
</template>
<style lang="less" scoped>
.bottom {
  display: flex;
  bottom: 10px;
  right: 10px;
  position: absolute;
  height: 40px;
  width: 160px;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  border: solid 1.4px rgb(239, 239, 239);
  .bottom-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    // background-color: rgb(207, 207, 207);
  }
  .bottom-right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    .percentage {
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
    }
    // background-color: rgb(232, 232, 232);
  }
}
</style>
