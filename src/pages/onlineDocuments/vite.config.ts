import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import compressPlugin from "vite-plugin-compression"; //静态资源压缩
import visualizeer from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      visualizeer({
        open: true,
        gzipSize: true,
      }),
      compressPlugin({
        ext: ".gz",
        verbose: true,
        disable: false,
        threshold: 1024,
        algorithm: "gzip",
        deleteOriginFile: command !== "serve", // 是否删除原始文件
      }),
    ],
    server: {
      host: "0.0.0.0", // ← 新增内容 ←
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      chunkSizeWarningLimit: 1500,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
