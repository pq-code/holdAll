<template>
    <div id="visualLargeScreen" class="visualLargeScreen">
        <!-- 图表 -->
        <div class="visualLargeScreenChart">
            <!-- 标题 -->
            <div class="visualLargeScreenTitle">DOM</div>
            <!-- 主体 -->
            <div class="visualLargeScreen-data">
                <!-- 左边 -->
                <div class="visualLargeScreen-data-left">
                    <div
                        id="leftdataOne"
                        class="data-left-dataOne"
                        draggable="true"
                        @dragstart="ondragstart"
                        @dragover.prevent=""
                        @drop.stop="ondrop"
                    >
                        <div class="data-left-titleOne">左数据一</div>
                    </div>
                    <div
                        id="leftdataTwo"
                        class="data-left-dataTwo"
                        draggable="true"
                        @dragstart="ondragstart"
                        @dragover.prevent=""
                        @drop.stop="ondrop"
                    >
                        <div class="data-left-titleOne">左数据二</div>
                    </div>
                    <div
                        id="leftdataThree"
                        class="data-left-dataThree"
                        draggable="true"
                        @dragstart="ondragstart"
                        @dragover.prevent=""
                        @drop.stop="ondrop"
                    >
                        <div class="data-left-titleOne">左数据三</div>
                    </div>
                </div>
                <!-- 中间 -->
                <div class="visualLargeScreen-data-middle">
                    <div class="visualLargeScreen-data-middle-3d">
                        <!-- <Three id="visualLargeScreenThree" class="visualLargeScreenThree" /> -->
                    </div>
                </div>
                <!-- 右边 -->
                <div class="visualLargeScreen-data-right">
                    <div
                        id="rightdataOne"
                        class="data-right-dataOne"
                        draggable="true"
                        @dragstart="ondragstart"
                        @dragover.prevent=""
                        @drop.stop="ondrop"
                    >
                        <div class="data-right-titleOne">右数据一</div>
                    </div>
                    <div
                        id="rightdataTwo"
                        class="data-right-dataTwo"
                        draggable="true"
                        @dragstart="ondragstart"
                        @dragover.prevent=""
                        @drop.stop="ondrop"
                    >
                        <div class="data-right-titleOne">右数据二</div>
                    </div>
                    <div
                        id="rightdataThree"
                        class="data-right-dataThree"
                        draggable="true"
                        @dragstart="ondragstart"
                        @dragover.prevent=""
                        @drop.stop="ondrop"
                    >
                        <div class="data-right-titleOne">右数据三</div>
                    </div>
                </div>
            </div>
            <!-- 地图 -->
            <div class="visualLargeScreen-view">
                <map></map>
            </div>
        </div>
    </div>
</template>

<script setup>
import Three from './three/index.vue';
import Map from './map/index.vue';

const ondragstart = e => {
    const id = e.target.getAttribute('id');
    console.log('ondragstart', id);
};
const ondrop = e => {
    const id = e.target.getAttribute('id');
    console.log('drop', id);
};
</script>

<style lang="less" scoped>
.visualLargeScreen {
    // width: 100vh;
    // height: 100vh;
    .visualLargeScreenChart {
        width: 100%;
        height: 100vh;
        z-index: 1000;
        // position: absolute;
        // background-color: rgb(255, 85, 85);
        .visualLargeScreenTitle {
            width: 100%;
            height: 60px;
            font-size: 40px;
            color: white;
            font-weight: 900;
            display: flex;
            justify-content: center;
            align-items: center;

            // background-color: rgb(137, 172, 255);
        }
        // 数据
        .visualLargeScreen-data {
            display: flex;
            height: calc(100vh - 60px);
            opacity: 0.2;
            // position: absolute;
            .visualLargeScreen-data-left {
                width: 25%;
                background-color: rgb(255, 85, 85);

                .data-left-dataOne {
                    background-color: aqua;
                    height: 35%;
                    .data-left-titleOne {
                        font-size: 20px;
                        color: #fff;
                    }
                }
                .data-left-dataTwo {
                    background-color: aqua;
                    height: 30%;
                    .data-left-titleOne {
                        font-size: 20px;
                        color: #fff;
                    }
                }
                .data-left-dataThree {
                    background-color: aqua;
                    height: 35%;
                    .data-left-titleOne {
                        font-size: 20px;
                        color: #fff;
                    }
                }
            }
            .visualLargeScreen-data-middle {
                width: 50%;
                .visualLargeScreen-data-middle-3d {
                }
                // background-color: rgb(137, 172, 255);
            }
            .visualLargeScreen-data-right {
                width: 25%;
                // background-color: rgb(253, 255, 137);
                .data-right-dataOne {
                    background-color: aqua;
                    height: 35%;
                    .data-right-titleOne {
                        font-size: 20px;
                        color: #fff;
                    }
                }
                .data-right-dataTwo {
                    background-color: aqua;
                    height: 30%;
                    .data-right-titleOne {
                        font-size: 20px;
                        color: #fff;
                    }
                }
                .data-right-dataThree {
                    background-color: aqua;
                    height: 35%;
                    .data-right-titleOne {
                        font-size: 20px;
                        color: #fff;
                    }
                }
            }
        }
        // 视图
        .visualLargeScreen-view {
        }
    }
}
</style>
