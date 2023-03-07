import { ref, onMounted } from "vue";
import { drawingBoardStore } from "../stores/drawingBoardStore";

export function useMouseOperation(stageRef, layerRef) {
  const store = drawingBoardStore(); // 缩放比例

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
    const newScale = event.evt.deltaY < 0 ? oldScale + 0.12 : oldScale - 0.12;
    store.storeScale(newScale); // 缩放比例
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    if (newScale >= 0.5 && newScale <= 10) {
      scale.value = { x: newScale, y: newScale }; // 更新缩放比例
      event.target.scale(scale.value);
      event.target.position(newPos);
      //   event.target.batchDraw();
    }
  };

  return {
    stageRefHandleMouseDown,
    stageRefHandleMouseMove,
    stageRefHandleMouseUp,
    wheelEvent,
  };
}
