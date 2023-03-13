import mitt from "mitt";

const eventBus = mitt(); //每调用一个mitt,都是一个总线,所以这里为什么要封装为一个工具库,就是只使用一个总线

export default eventBus;
