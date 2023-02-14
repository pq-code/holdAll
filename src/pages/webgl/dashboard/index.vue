<template>
    <div class="dashboard-page">
        <!-- 标题 -->
        <div class="header">
            <div class="header-title">DOM</div>
        </div>
        <!-- 地图 -->
        <Map class="map"></Map>
        <!-- 左 -->
        <div class="left">
            <dataFeft ref="dataFeftRef"></dataFeft>
        </div>
        <!-- 右 -->
        <div class="right">
            <dataRight ref="dataRightRef"></dataRight>
        </div>
        <!-- 中间上 -->
        <div class="top"
             v-if="isTop"
             id="top">
            <Three :width="threeWidth"
                   :height="threeHeight"
                   ref="visualLargeScreenThree"
                   id="visualLargeScreenThree"
                   class="visualLargeScreenThree" />
        </div>
        <!-- 中间下 -->
        <div class="bottom"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import dataFeft from './left.vue';
import dataRight from './right.vue';
import Map from './map/index.vue';
import Three from './three/index.vue';
import { topheight } from './assets/css';

let threeWidth = ref(window.innerWidth * 0.5);
let threeHeight = ref(window.innerHeight * 0.53);
const isTop = ref(true);
const visualLargeScreenThree = ref();
const dataFeftRef = ref();
const dataRightRef = ref();

const onWindowResize = () => {
    console.log(window.innerWidth);
};

window.addEventListener('resize', onWindowResize);
</script>

<style lang="less" scoped>
@top-height: v-bind(topheight);

// @top-height: 7vh;
.dashboard-page {
    // width: 1920px;
    // height: 1080px;
    width: 100vw;
    height: 100vh;
    // background: blue;
    position: relative;
    display: flex;
    flex-direction: column;

    .header {
        height: @top-height;
        width: 100vw;
        background: rgb(70, 117, 255);
        opacity: 0.8;

        .header-title {
            height: @top-height;
            font-size: 3vw;
            color: #000000;
            font-weight: 900;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .map {
        width: 100vw;
        flex: 1;
    }

    .left {
        width: 25vw;
        position: absolute;
        top: @top-height;
        height: calc(100vh - @top-height);
        background: yellow;
        opacity: 0.8;
    }

    .right {
        width: 25vw;
        position: absolute;
        top: @top-height;
        right: 0;
        height: calc(100vh - @top-height);
        background: yellow;
        opacity: 0.8;
    }

    .top {
        width: 50vw;
        position: absolute;
        top: @top-height;
        left: 50%;
        height: calc(60vh - @top-height);
        transform: translateX(-50%);
        background: white;
        opacity: 1;
    }

    .bottom {
        width: 50vw;
        position: absolute;
        bottom: 0px;
        left: 50%;
        height: 40vh;
        transform: translateX(-50%);
        background: rgb(8, 7, 65);
        opacity: 0.7;
    }
}
</style>
