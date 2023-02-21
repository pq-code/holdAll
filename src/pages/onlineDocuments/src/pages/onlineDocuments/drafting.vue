<script setup lang="ts">
import { ref } from "vue";
import Konva from "konva";

let stage = new Konva.Stage({
  container: "app", // id of container <div> *包裹舞台的DIV元素的ID
  width: 500,
  height: 500,
});

const layer1 = new Konva.Layer();
stage.add(layer1);

const circle = new Konva.Circle({
  x: 200,
  y: 200,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
});
layer1.add(circle);
</script>

<template>
  <div id="container" class="drafting-center"></div>
</template>
<style lang="less" scoped>
.drafting-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .honeContainer-side {
    display: flex;
    flex-direction: column;
    background-color: #f5f6f7;
  }
  .honeContainer-main {
    flex: 1;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    .honeContainer-main-center {
      opacity: auto;
    }
  }
}
</style>
