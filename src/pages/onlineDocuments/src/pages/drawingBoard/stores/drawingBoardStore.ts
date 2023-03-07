import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const drawingBoardStore = defineStore("drawingBoardStore", () => {
  const selectDraw = ref();
  const modelList = ref([]);
  const scale = ref(1);

  const addModelList = (e: object) => {
    modelList.value.push(e);
  };

  const storeScale = (e: number) => {
    scale.value = e.toFixed(2) * 1;
  };

  return { selectDraw, modelList, scale, storeScale, addModelList };
});
