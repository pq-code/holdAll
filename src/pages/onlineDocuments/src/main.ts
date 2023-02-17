import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";

import "./assets/styles/main.less"; // 项目样式
import "./assets/styles/main.css";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");
