<script setup lang="ts">
import { onMounted, ref } from "vue";
import Konva from "konva";
import left from "./component/left.vue";
import right from "./component/right.vue";
import top from "./component/top.vue";
import bottom from "./component/bottom.vue";

let stage;
let windowWidth;
let windowHeight;
const dataList = ref([{ title: "121" }, { title: "121" }]);
onMounted(() => {
  windowWidth = document.getElementById("container").offsetWidth;
  windowHeight = document.getElementById("container").offsetHeight;

  stage = new Konva.Stage({
    container: "container", // id of container <div> *包裹舞台的DIV元素的ID
    width: windowWidth ? windowWidth : 500,
    height: windowHeight == 0 ? window.innerWidth : windowHeight,
  });

  const layer1 = new Konva.Layer();

  const circle = new Konva.Circle({
    x: 200,
    y: 200,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });

  stage.add(layer1);
  layer1.add(circle);
});

let onWindowResize = function () {
  // 重置渲染器输出画布canvas尺寸
  windowWidth = document.getElementById("container").offsetWidth;
  windowHeight = document.getElementById("container").offsetHeight;
};

window.addEventListener("resize", onWindowResize);
</script>

<template>
  <div class="toolbar">
    <left></left>
    <div class="among">
      <top></top>
      <div id="container" class="drafting-center"></div>
    </div>
    <right :dataList="dataList"></right>
    <bottom></bottom>
  </div>
</template>
<style lang="less" scoped>
.toolbar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  .among {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 440px);
    height: 100%;
    flex: 1 0;
    .drafting-center {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
