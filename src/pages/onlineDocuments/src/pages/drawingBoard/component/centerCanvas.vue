<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { rectangle } from "./addRectangle";
import { drawingBoardStore } from "../stores/drawingBoardStore";
import backGrid from "../component/backGrid.vue";
import { useMoveZoom } from "../hooks/useMoveZoom";
import eventBus from "../eventBus";
const store = drawingBoardStore(); // 缩放比例

const stageRef = ref();
const layerRef = ref();
const refGroup = ref();
const transformerRef = ref();
const selectedShapeName = ref();
const cursorShape = ref(
  "-webkit-image-set(url(data:image/png;base64,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)2x)4 4, auto"
);
let operationType = "";

const configKonva = ref({
  width: window.innerWidth,
  height: window.innerHeight,
  //   draggable: true,
});

let isDragging = false; // 画笔开关
let initialMousePosition = { x: 0, y: 0 }; // 鼠标位置

const handleMouseMove = (event: any, index: number) => {
  let box = event.target;
  box.stroke("#6aa7ff");
  box.strokeWidth(5);
  box.draw();
};

const handleMouseOut = (event: any, index: number) => {
  let box = event.target;
  box.stroke("#ffff");
  box.strokeWidth(0);
  box.draw();
};

// 进入编辑状态
const transformerFn = (e) => {
  // 单击阶段-清除选择
  if (e.target === e.target.getStage()) {
    selectedShapeName.value = "";
    updateTransformer();
    return;
  }

  // 点击-什么都不做
  const clickedOnTransformer = e.target.getParent().className === "Transformer";
  if (clickedOnTransformer) {
    return;
  }

  // 按名称查找单击的矩形
  const name = e.target.name();
  refGroup.value;
  const rect = refGroup.value
    .getStage()
    .children.find((r: any) => r.name() == name);

  if (rect) {
    selectedShapeName.value = name;
  } else {
    selectedShapeName.value = "";
  }
  updateTransformer();
};

const updateTransformer = () => {
  // here we need to manually attach or detach Transformer node
  const transformerNode = transformerRef.value.getNode();
  const stage = transformerNode.getStage();

  const selectedNode = stage.findOne("." + selectedShapeName.value);
  // do nothing if selected node is already attached
  if (selectedNode === transformerNode.node()) {
    return;
  }

  if (selectedNode) {
    // attach to another node
    transformerNode.nodes([selectedNode]);
    store.selectedNode = selectedNode;
  } else {
    // remove transformer
    transformerNode.nodes([]);
    store.selectedNode = "";
  }
};

// 创建图形
const addRectangle = () => {
  const stage = stageRef.value.getStage(); // 节点信息
  const pointer = stage.getPointerPosition(); // 鼠标位置
  let type = {};
  if (operationType == "rect") {
    type = JSON.parse(JSON.stringify(rectangle.addRect));
  }
  if (operationType == "circle") {
    type = JSON.parse(JSON.stringify(rectangle.addCircle));
  }
  if (operationType == "line") {
    type = JSON.parse(JSON.stringify(rectangle.addLine));
  }
  cursorShape.value =
    "-webkit-image-set(url(data:image/png;base64,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)2x)4 4, auto";
  if (type.option) {
    type.option.x = pointer.x * (store.scale / 100);
    type.option.y = pointer.y * (store.scale / 100);
    type.option.name = `${type.option.name}_${store.modelList.length}`;
    store.addModelList(type);
    store.stageModelList = refGroup.value.getStage().children;
  }
  document
    .getElementById("stageRef")
    ?.removeEventListener("click", addRectangle);
};

// 画笔工具开启
const paintingBrushDown = (event) => {
  isDragging = true;
  const stage = stageRef.value.getStage(); // 节点信息
  const pointer = stage.getPointerPosition(); // 鼠标位置
  let type = {};
  if (operationType == "pencil") {
    type = JSON.parse(JSON.stringify(rectangle.addLine));
  }
  type.option.x = pointer.x * (store.scale / 100);
  type.option.y = pointer.y * (store.scale / 100);
  type.option.name = `${type.option.name}_${store.modelList.length}`;
  type.option.points = [pointer.x, pointer.y];
  store.addModelList(type);
  store.stageModelList = refGroup.value.getStage().children;
  console.log(store.stageModelList);
};

// 画笔工具绘制
const paintingBrushMove = (event) => {
  if (!isDragging) {
    return;
  }
  const stage = stageRef.value.getStage(); // 节点信息
  const pointer = stage.getPointerPosition(); // 鼠标位置
  const a = store.stageModelList.find((e) => e.name() == "line_0");
  console.log(a);
  const newPoints = a.points().concat([pointer.x, pointer.y]);
  a.points(newPoints);
  stageRef.value.getStage().batchDraw();
};

onMounted(() => {
  // hooks绑定画布移动缩放事件
  const { removeMoveEvent } = useMoveZoom(stageRef, layerRef);

  // 使用事件总线监听添加图形操作
  eventBus.on("addRectangle", (e) => {
    operationType = e;
    cursorShape.value =
      "-webkit-image-set(url(data:image/png;base64,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)2x)4 4, auto";
    document
      .getElementById("stageRef")
      ?.addEventListener("click", addRectangle, false);
  });
  // 使用事件总线监听画笔工具
  eventBus.on("paintingBrush", (e) => {
    operationType = e;
    cursorShape.value =
      "-webkit-image-set(url(data:image/png;base64,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)2x) 4 27, auto";
    // 监听鼠标/触摸事件
    stageRef.value.getStage().on("mousedown touchstart", paintingBrushDown);
    stageRef.value.getStage().on("mousemove touchmove", paintingBrushMove);
    stageRef.value.getStage().on("mouseup touchend", (event) => {
      isDragging = false;
    });
  });
});
</script>

<template>
  <div
    :style="{
      cursor: cursorShape,
    }"
    id="stageRef"
  >
    <v-stage
      ref="stageRef"
      :config="configKonva"
      @click="transformerFn($event)"
    >
      <v-layer ref="layerRef" :config="configKonva">
        <!-- 网格背景 -->
        <v-group ref="backGroupRef">
          <backGrid :stageConfig="configKonva"></backGrid>
        </v-group>
        <!-- 添加图形 -->
        <v-group ref="refGroup">
          <template
            v-for="(item, index) in store.modelList"
            :key="`${item.title}_${index}`"
          >
            <v-rect
              v-if="item.title == '矩形'"
              :config="item.option"
              @mousemove="handleMouseMove($event, index)"
              @mouseout="handleMouseOut($event, index)"
            ></v-rect>
            <v-circle
              v-if="item.title == '圆形'"
              :config="item.option"
              @mousemove="handleMouseMove($event, index)"
              @mouseout="handleMouseOut($event, index)"
            ></v-circle>
            <v-line v-if="item.title == '线条'" :config="item.option" />
          </template>
          <v-transformer ref="transformerRef" />
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>
<style lang="less" scoped></style>
