<script setup lang="ts">
import { onMounted, ref } from "vue";
import Konva from "konva";
import left from "./component/left.vue";
import right from "./component/right.vue";
import top from "./component/top.vue";
import bottom from "./component/bottom.vue";
import { rectangle } from "./component/addRectangle";

const dataList = ref([]);

let stage: object, layer;

onMounted(() => {
  const windowWidth = document.getElementById("container").offsetWidth;
  const windowHeight = document.getElementById("container").offsetHeight;

  stage = new Konva.Stage({
    container: "container",
    width: windowWidth ? windowWidth : 500,
    height: windowHeight == 0 ? window.innerWidth : windowHeight,
  });

  layer = new Konva.Layer();
  stage.add(layer);
});

const operate = (e) => {
  if (e == "rect") {
    const a = rectangle.addRect();
    dataList.value.push({ title: "矩形", object: a });
    layer.add(a);
  }
  if (e == "circle") {
    const b = rectangle.addCircle();
    dataList.value.push({ title: "圆形", object: b });
    layer.add(b);
  }
};
</script>

<template>
  <div class="toolbar">
    <left @operate="operate"></left>
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
  background-color: rgb(217, 217, 217);
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
