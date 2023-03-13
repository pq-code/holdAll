import { ref, onMounted, onUnmounted } from "vue";
import { drawingBoardStore } from "../stores/drawingBoardStore";

export function useMoveZoom(stageRef: any, layerRef: any) {
  const store = drawingBoardStore(); // 存储缩放比例

  let isDragging = false; // 画布移动开关
  const initialMousePosition = { x: 0, y: 0 }; // 鼠标位置
  let mouseOffset = { x: 0, y: 0 }; // 画布位置
  let mouse = { x: 0, y: 0 }; // 暂存画布位置
  // 画布移动

  // 1.开启画布移动
  const stageRefHandleMouseDown = (event: any) => {
    isDragging = true;
    initialMousePosition.x = event.evt.clientX;
    initialMousePosition.y = event.evt.clientY;
  };

  // 2.实现画布移动
  const stageRefHandleMouseMove = (event: any) => {
    if (isDragging) {
      if (mouseOffset.x == 0 && mouseOffset.y == 0) {
        // 第一次移动
        const deltaX = event.evt.clientX - initialMousePosition.x;
        const deltaY = event.evt.clientY - initialMousePosition.y;
        event.target.position({ x: deltaX, y: deltaY });
        stageRef.value.getStage().batchDraw();
        store.initialMousePosition = { x: deltaX, y: deltaY };
        mouse = { x: deltaX, y: deltaY };
      } else {
        // 第二次移动加上上一次位置，避免回到原点
        const deltaX =
          event.evt.clientX + mouseOffset.x - initialMousePosition.x;
        const deltaY =
          event.evt.clientY + mouseOffset.y - initialMousePosition.y;
        event.target.position({ x: deltaX, y: deltaY });
        stageRef.value.getStage().batchDraw();
        store.initialMousePosition = { x: deltaX, y: deltaY };
        mouse = { x: deltaX, y: deltaY };
      }
    }
  };

  // 3.结束画布移动
  const stageRefHandleMouseUp = () => {
    isDragging = false;
    mouseOffset = mouse;
    mouse = { x: 0, y: 0 };
  };

  // 画布缩放

  const scale = ref({ x: 1, y: 1 });

  const wheelEvent = (event: any) => {
    event.evt.preventDefault(); // 阻止滚轮默认事件
    const stage = stageRef.value.getStage(); // 节点信息
    const oldScale = scale.value.x; // 放大倍数
    const pointer = stage.getPointerPosition(); // 鼠标位置

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = event.evt.deltaY < 0 ? oldScale + 0.1 : oldScale - 0.1;
    store.storeScale(newScale); // 存放缩放比例
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    if (newScale > 0.6 && newScale < 9.9) {
      scale.value = { x: newScale, y: newScale }; // 更新缩放比例
      stageRef.value.getStage().scale(scale.value);
      stageRef.value.getStage().position(newPos);
      stageRef.value.getStage().batchDraw();
    }
  };

  // 页面加载挂载画布移动缩放事件
  stageRef.value.getStage().on("wheel", wheelEvent);
  stageRef.value.getStage().on("mousedown", stageRefHandleMouseDown);
  stageRef.value.getStage().on("mousemove", stageRefHandleMouseMove);
  stageRef.value.getStage().on("mouseup", stageRefHandleMouseUp);

  // 页面卸载移除画布移动缩放事件
  //   onUnmounted(() => {
  //     stageRef.value.getStage().off("wheel", wheelEvent);
  //     stageRef.value.getStage().off("mousedown", stageRefHandleMouseDown);
  //     stageRef.value.getStage().off("mousemove", stageRefHandleMouseMove);
  //     stageRef.value.getStage().off("mouseup", stageRefHandleMouseUp);
  //   });

  // 解除移动事件
  const removeMoveEvent = (
    a: Array<"wheel" | "mousedown" | "mousemove" | "mouseup">
  ) => {
    if (a.find((e: string) => e == "wheel")) {
      stageRef.value.getStage().off("wheel", wheelEvent);
    }
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
  const bindCanvasMove = (
    a: Array<"wheel" | "mousedown" | "mousemove" | "mouseup">
  ) => {
    if (a.find((e: string) => e == "wheel")) {
      layerRef.value.getStage().on("wheel", wheelEvent);
    }
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

  //   onMounted(() => {
  //     stageRef.value.getStage().on("mousedown");
  //     stageRef.value.getStage().on("mousemove");
  //     stageRef.value.getStage().on("mousemove");
  //     stageRef.value.getStage().on("wheel", wheelEvent);
  //   });
  return {
    stageRefHandleMouseDown,
    stageRefHandleMouseMove,
    stageRefHandleMouseUp,
    wheelEvent,
    removeMoveEvent,
    bindCanvasMove,
    initialMousePosition,
  };
}
