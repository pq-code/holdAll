import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import compressPlugin from "vite-plugin-compression"; //静态资源压缩

// https://vitejs.dev/config/

export default defineConfig(({ command }) => {
    return {
        plugins: [
            vue(),
            vueJsx(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
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
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        build: {
            chunkSizeWarningLimit: 1500,
        },
        css: {
            // css预处理器
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    lessOptions: {
                        modifyVars: {
                            "primary-color": "#ec6800",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    };
});
// export default defineConfig({
//     plugins: [
//         vue(),
//         vueJsx(),
//         AutoImport({
//             resolvers: [ElementPlusResolver()],
//         }),
//         Components({
//             resolvers: [ElementPlusResolver()],
//         }),
//         compressPlugin({
//             ext: ".gz",
//             verbose: true,
//             disable: false,
//             threshold: 10240,
//             algorithm: "gzip",
//             deleteOriginFile: command !== "serve", // 是否删除原始文件
//         }),
//     ],
//     resolve: {
//         alias: {
//             "@": fileURLToPath(new URL("./src", import.meta.url)),
//         },
//     },
//     css: {
//         // css预处理器
//         preprocessorOptions: {
//             less: {
//                 javascriptEnabled: true,
//                 lessOptions: {
//                     modifyVars: {
//                         "primary-color": "#ec6800",
//                     },
//                     javascriptEnabled: true,
//                 },
//             },
//         },
//     },
// });
