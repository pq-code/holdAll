import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import VueKonva from "vue-konva";

import "./assets/styles/main.css";
import "./assets/iconfont/iconfont.css";

import myDirective from "./instruct/clickoutside";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(VueKonva);

app.directive("clickoutside", myDirective);

app.mount("#app");
