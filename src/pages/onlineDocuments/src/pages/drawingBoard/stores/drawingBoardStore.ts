import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const drawingBoardStore = defineStore("drawingBoardStore", () => {
  const selectDraw = ref();
  const modelList = ref([]);

  const addModelList = (e: object) => {
    modelList.value.push(e);
  };

  return { selectDraw, modelList, addModelList };
});
