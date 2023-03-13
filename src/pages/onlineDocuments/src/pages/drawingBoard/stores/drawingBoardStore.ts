import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const drawingBoardStore = defineStore("drawingBoardStore", () => {
  const selectDraw = ref(); // 左侧添加图形的类型
  const modelList = ref([]); // 已经添加的图形
  const stageModelList = ref([]); // 已经添加的图形
  const scale = ref(100); // 缩放比例
  const selectedNode = ref(); // 选中的数据
  const initialMousePosition = ref({ x: 0, y: 0 }); // 鼠标位置

  const addModelList = (e: object) => {
    modelList.value.push(e);
  };

  const storeScale = (e: number) => {
    scale.value = (e * 100).toFixed(2) * 1;
  };

  return {
    selectDraw,
    modelList,
    stageModelList,
    scale,
    selectedNode,
    storeScale,
    addModelList,
    initialMousePosition,
  };
});
