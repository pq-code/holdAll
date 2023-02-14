<script setup lang='ts'>
import { nextTick, onMounted, ref } from 'vue';
import { generateRectangleMeta } from './drawingBoard'



let ctx: HTMLElement
let canvas: any
const cardOffset = ref({ x: 0, y: 0 });

let toolBox = ref([
    { label: '选择' },
    { label: '矩形' },
    { label: '钢笔' },
    { label: '文本' },
    { label: '连接线' },
    { label: '移动视图' },
])

nextTick(() => {
    const main = document.getElementById('main')
    canvas = document.getElementById('drawingBoard');
    ctx = canvas.getContext("2d");

    canvas.white = (main?.clientWidth || 0) - 50
    canvas.height = main?.clientHeight
    generateRectangleMeta([100, 100], 200, 100)
    console.log(generateRectangleMeta([100, 100], 200, 100));

    // ctx.fillRect(100, 100, 200, 100);
    // ctx.stroke();

    // 获取画布左上角距离页面左上角的距离
    const { offsetTop, offsetLeft } = document.querySelector("#boundCard") as HTMLElement;
    cardOffset.value.x = offsetLeft;
    cardOffset.value.y = offsetTop;
})


</script>

<template>
    <div class="drawingBoard-center">
        <div class="drawingBoard-tool">
            <ul class="drawingBoard-tool-ul">
                <li v-for="(item, index) in toolBox"
                    :key="index"
                    class="drawingBoard-tool-li">{{ item.label }}</li>
            </ul>
        </div>
        <div class="drawingBoard-main">
            <canvas id="drawingBoard">当前浏览器不支持canvas元素，请升级或更换浏览器！</canvas>
        </div>
    </div>
</template>
<style scoped lang="less">
.drawingBoard-center {
    display: flex;
    flex-direction: row;
    background-color: rgb(234, 236, 238);
    ;

    .drawingBoard-tool {
        width: 50px;
        height: 100%;
        z-index: 100;
        background-color: rgb(234, 236, 238);

        .drawingBoard-tool-ul {
            width: 50px;
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            flex-direction: column;

            .drawingBoard-tool-li {
                height: 47px;
                background-color: rgb(234, 236, 238);
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .drawingBoard-main {
        width: 100%;
        height: 100%;
        background-color: #e8e8e8;
    }
}
</style>
