import { ref, onMounted, onUnmounted } from "vue";
import { drawingBoardStore } from "../stores/drawingBoardStore";

export function useMoveZoom(stageRef: any, layerRef: any) {

  // 解除移动事件
    const removeMoveEvent = (a: Array<"mousedown" | "mousemove" | "mouseup">) => {
      
    if (a.find((e: string) => e == "mousedown")) {
      stageRef.value.getStage().off("mousedown", stageRefHandleMouseDown);
    }
    if (a.find((e: string) => e == "mousemove")) {
      stageRef.value.getStage().off("mousemove", stageRefHandleMouseMove);
    }
    if (a.find((e: string) => e == "mouseup")) {
      stageRef.value.getStage().off("mouseup", stageRefHandleMouseUp);
    }
  };

  // 添加移动事件
  const bindCanvasMove = (a: Array<"mousedown" | "mousemove" | "mouseup">) => {
    if (a.find((e: string) => e == "mousedown")) {
      layerRef.value.getStage().on("mousedown", stageRefHandleMouseDown);
    }
    if (a.find((e: string) => e == "mousemove")) {
      layerRef.value.getStage().on("mousemove", stageRefHandleMouseMove);
    }
    if (a.find((e: string) => e == "mouseup")) {
      layerRef.value.getStage().on("mouseup", stageRefHandleMouseUp);
    }
  };
  return {
    removeMoveEvent,
    bindCanvasMove,
  };
}
