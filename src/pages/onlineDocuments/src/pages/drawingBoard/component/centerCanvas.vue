<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { rectangle } from "./addRectangle";
import { drawingBoardStore } from "../stores/drawingBoardStore";

const store = drawingBoardStore();

// 创建图形
watch(
  () => store.selectDraw,
  (n: string, o: string) => {
    if (n == "rect") {
      store.addModelList(rectangle.addRect);
    }
    if (n == "circle") {
      store.addModelList(rectangle.addCircle);
    }
    // if (n == "circle") {
    //   store.addModelList(rectangle.addCircle);
    // }
  }
);

const configKonva = ref({
  width: window.innerWidth,
  height: window.innerHeight,
});

const handleMouseMove = (index: number) => {
  console.log(
    `移入的是${store.modelList[index].title}`,
    store.modelList[index]
  );
};

const handleMouseOut = (index: number) => {
  console.log(
    `移出的是${store.modelList[index].title}`,
    store.modelList[index]
  );
};
</script>

<template>
  <v-stage :config="configKonva">
    <v-layer>
      <template
        v-for="(item, index) in store.modelList"
        :key="`${item.title}_${index}`"
      >
        <v-rect
          v-if="item.title == '矩形'"
          :config="item.option"
          @mousemove="handleMouseMove(index)"
          @mouseout="handleMouseOut(index)"
        ></v-rect>
        <v-circle
          v-if="item.title == '圆形'"
          :config="item.option"
          @mousemove="handleMouseMove(index)"
          @mouseout="handleMouseOut(index)"
        ></v-circle>
        <v-line v-if="item.title == '线条'" :config="item.option" />
      </template>
    </v-layer>
  </v-stage>
</template>
<style lang="less" scoped></style>
