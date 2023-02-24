export const rectangle = {
  addRect: {
    title: "矩形",
    option: {
      x: 200,
      y: 300,
      width: 100,
      height: 100,
      fill: "#ffff",
      draggable: true,
    },
  },
  addCircle: {
    title: "圆形",
    option: {
      x: 300,
      y: 300,
      radius: 70,
      fill: "#ffff",
      stroke: "black",
      strokeWidth: 0,
      draggable: true,
    },
    addLine: {
      title: "线条",
      option: {
        x: 20,
        y: 200,
        points: [0, 0, 100, 0, 100, 100],
        tension: 0.5,
        closed: true,
        stroke: "black",
        fillLinearGradientStartPoint: { x: -50, y: -50 },
        fillLinearGradientEndPoint: { x: 50, y: 50 },
        fillLinearGradientColorStops: [0, "red", 1, "yellow"],
        draggable: true,
      },
    },
  },
};
