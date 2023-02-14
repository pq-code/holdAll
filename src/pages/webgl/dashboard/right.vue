<template>
    <div id="rightdataOne" class="data-right-dataOne" draggable="true">
        <div class="data-right-titleOne">右数据一</div>
    </div>
    <div id="rightdataTwo" class="data-right-dataTwo" draggable="true">
        <div class="data-right-titleTwo">右数据二</div>
    </div>
    <div id="rightdataThree" class="data-right-dataThree" draggable="true">
        <div class="data-right-titleThree">右数据三</div>
    </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
@right-title-size: 3vh;
.data-right-dataOne {
    background-color: aqua;
    height: 31vh;
    .data-right-titleOne {
        font-size: @right-title-size;
        color: #fff;
    }
}
.data-right-dataTwo {
    background-color: aqua;
    height: 31vh;
    .data-right-titleTwo {
        font-size: @right-title-size;
        color: #fff;
    }
}
.data-right-dataThree {
    background-color: aqua;
    height: 31vh;
    .data-right-titleThree {
        font-size: @right-title-size;
        color: #fff;
    }
}
</style>
