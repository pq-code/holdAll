<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { rectangle } from "./addRectangle";
import { drawingBoardStore } from "../stores/drawingBoardStore";
import backGrid from "../component/backGrid.vue";
import { useMouseOperation } from "../hooks/useMouseOperation";

const store = drawingBoardStore(); // 缩放比例

const stageRef = ref();
const layerRef = ref();

const configKonva = ref({
  width: window.innerWidth,
  height: window.innerHeight,
});

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
  }
);

let isDragging = false; // 画布移动开关
let initialMousePosition = { x: 0, y: 0 }; // 鼠标位置

// 画布移动

// 1.开启画布移动
const stageRefHandleMouseDown = (event: any) => {
  isDragging = true;
  initialMousePosition.x = event.evt.clientX;
  initialMousePosition.x = event.evt.clientY;
};

// 2.实现画布移动
const stageRefHandleMouseMove = (event: any) => {
  if (isDragging) {
    const deltaX = event.evt.clientX - initialMousePosition.x;
    const deltaY = event.evt.clientY - initialMousePosition.y;
    event.target.position({ x: deltaX, y: deltaY });
    stageRef.value.getNode().batchDraw();
  }
};

// 3.结束画布移动
const stageRefHandleMouseUp = () => {
  isDragging = false;
  initialMousePosition = { x: 0, y: 0 };
};

// 画布缩放
const scale = ref({ x: 1, y: 1 });

const wheelEvent = (event: any) => {
  event.evt.preventDefault(); // 阻止滚轮默认事件
  const stage = event.target.getStage(); // 节点信息
  const oldScale = scale.value.x; // 放大倍数
  const pointer = stage.getPointerPosition(); // 鼠标位置

  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  const newScale = event.evt.deltaY < 0 ? oldScale + 0.1 : oldScale - 0.1;
  store.storeScale(newScale); // 缩放比例
  const newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };

  if (newScale > 0.6 && newScale < 9.9) {
    scale.value = { x: newScale, y: newScale }; // 更新缩放比例
    event.target.scale(scale.value);
    event.target.position(newPos);
    stageRef.value.getNode().batchDraw();
  }
};

onMounted(() => {
  // 绑定鼠标和触摸事件
  stageRef.value.getStage().on("mousedown touchstart", stageRefHandleMouseDown);
  stageRef.value.getStage().on("mousemove touchmove", stageRefHandleMouseMove);
  stageRef.value.getStage().on("mouseup touchend", stageRefHandleMouseUp);
  stageRef.value.getStage().on("wheel", wheelEvent);
});
</script>

<template>
  <v-stage ref="stageRef" :config="configKonva">
    <v-layer>
      <!-- 网格背景 -->
      <backGrid :stageConfig="configKonva"></backGrid>
    </v-layer>
    <v-layer ref="layerRef">
      <!-- 添加图形 -->
      <v-group>
        <template
          v-for="(item, index) in store.modelList"
          :key="`${item.title}_${index}`"
        >
          <v-rect v-if="item.title == '矩形'" :config="item.option"></v-rect>
          <v-circle
            v-if="item.title == '圆形'"
            :config="item.option"
          ></v-circle>
          <v-line v-if="item.title == '线条'" :config="item.option" />
        </template>
      </v-group>
    </v-layer>
  </v-stage>
</template>
<style lang="less" scoped></style>
