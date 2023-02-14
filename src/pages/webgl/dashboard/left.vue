<template>
    <div id="leftdataOne" class="data-left-dataOne" draggable="true">
        <div class="data-left-titleOne">左数据一</div>
        <div id="leftDataOne" class="leftDataOne"></div>
    </div>

    <div id="leftdataTwo" class="data-left-dataTwo" draggable="true">
        <div class="data-left-titleTwo">左数据二</div>
        <div id="leftDataTwo" class="leftDataTwo"></div>
    </div>

    <div id="leftdataThree" class="data-left-dataThree" draggable="true">
        <div class="data-left-titleThree">左数据三</div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
// import { leftDataOne } from './data/leftOne';
// import { leftDataTwo } from './data/leftTwo';
import { leftTitleSize, topheight } from './assets/css';

onMounted(() => {
    // leftDataOne();
    // leftDataTwo();
});

defineExpose({});
</script>
<style lang="less" scoped>
@left-title-size: v-bind(leftTitleSize);
// @left-title-size: 3vh;
.data-left-dataOne {
    background-color: aqua;
    height: 31vh;
    display: flex;
    flex-direction: column;
    .data-left-titleOne {
        font-size: @left-title-size;
        color: #fff;
    }
    .leftDataOne {
        flex: auto;
        height: 0;
        // width: 100%;
    }
}
.data-left-dataTwo {
    background-color: aqua;
    height: 31vh;
    display: flex;
    flex-direction: column;
    .data-left-titleTwo {
        font-size: @left-title-size;
        color: #fff;
    }
    .leftDataTwo {
        flex: auto;
        height: 0;
        // width: 100%;
    }
}
.data-left-dataThree {
    background-color: aqua;
    height: 31vh;
    display: flex;
    flex-direction: column;
    .data-left-titleThree {
        font-size: @left-title-size;
        color: #fff;
    }
    .leftDataThree {
        flex: auto;
        height: 0;
        // width: 100%;
    }
}
</style>
