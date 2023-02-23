import Konva from "konva";

export const rectangle = {
  addRect: () => {
    const a = new Konva.Rect({
      x: 200,
      y: 200,
      width: 200,
      height: 100,
      fill: "#ffff",
      stroke: "#ffff",
      strokeWidth: 0,
      draggable: true,
    });
    a.on("mouseover", function () {
      console.log("移入");
    });
    a.on("mouseout", function () {
      console.log("移出");
    });
    return a;
  },
  addCircle: () => {
    const a = new Konva.Circle({
      x: 200,
      y: 200,
      radius: 70,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
      draggable: true,
    });
    a.on("mouseover", function () {
      console.log("移入");
    });
    a.on("mouseout", function () {
      console.log("移出");
    });
    return a;
  },
};
