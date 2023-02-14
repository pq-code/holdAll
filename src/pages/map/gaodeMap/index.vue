<script setup lang="ts">
import { ref } from 'vue';
import Map from './map/map.vue';

const mapRef = ref();

const drawPolygon = () => {
  mapRef.value?.drawPolygon();
};
const cuttingFn = () => {
  mapRef.value?.cuttingFn();
};
const editFn = () => {
  mapRef.value?.editFn();
};
const mergeFn = () => {
  mapRef.value?.mergeFn();
};
const boxSelectionFn = () => {
  mapRef.value?.boxSelectionFn();
};
const deleteFn = () => {
  mapRef.value?.deleteFn();
};
</script>
<template>
  <div class="map-center">
    <div class="map">
      <div class="map-tool">
        <div class="leftControlPanel" id="leftControlPanel">
          <div class="button1" @click.stop="drawPolygon()">
            <div style="color: white">绘制</div>
          </div>
          <div class="button1" @click.stop="cuttingFn()">
            <div style="color: white">切割</div>
          </div>
          <div class="button1" @click.stop="editFn()">
            <div style="color: white">编辑</div>
          </div>
          <div class="button1" @click.stop="mergeFn()">
            <div style="color: white">合并</div>
          </div>
          <div class="button1" @click.stop="boxSelectionFn()">
            <div style="color: white">框选</div>
          </div>
          <div class="button1" @click.stop="deleteFn()">
            <div style="color: white">删除</div>
          </div>
        </div>
      </div>
      <Map ref="mapRef"></Map>
    </div>
    <div class="mapData-Tabel"></div>
  </div>
</template>
<style scoped lang="less">
:deep(.hemeMain) {
  overflow: auto;
}

.map-center {
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: auto;
  height: calc(100% - 40px);

  .map {
    height: 600px;

    .map-tool {
      position: absolute;
      // z-index: auto; // auto是不会创建一个新的层叠上下文的,而z-index:0能够创建一个新的
      z-index: 100;

      .leftControlPanel {
        width: 40px;
        background-color: #4b4d5c;
        display: flex;
        flex-direction: column;

        .button1 {
          height: 40px;
          background-color: #353744;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button1:hover {
          cursor: pointer;
          background-color: #529cfd;
        }
      }
    }
  }

  .mapData-Tabel {
    margin-top: 20px;
    height: 600px;
    background-color: aquamarine;
  }
}
</style>
