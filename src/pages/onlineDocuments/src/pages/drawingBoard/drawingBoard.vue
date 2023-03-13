<script setup lang="ts">
import { onMounted, ref } from "vue";
import left from "./component/left.vue";
import right from "./component/right.vue";
import top from "./component/top.vue";
import bottom from "./component/bottom.vue";
import centerCanvas from "./component/centerCanvas.vue";
import eventBus from "./eventBus";

const centerCanvasRef = ref();
</script>

<template>
  <div class="toolbar">
    <left></left>
    <div class="among">
      <top></top>
      <centerCanvas ref="centerCanvasRef"></centerCanvas>
    </div>
    <right></right>
    <!-- <bottom></bottom> -->
  </div>
</template>
<style lang="less" scoped>
.toolbar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: hsl(0deg 0% 94%);
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
