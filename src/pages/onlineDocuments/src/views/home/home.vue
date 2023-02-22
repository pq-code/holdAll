<script setup lang="ts">
import { ref } from "vue";
import { navigation } from "./navigation";

const lengthWidth = ref();
</script>

<template>
  <div class="honeContainer">
    <div
      class="honeContainer-side"
      :style="{ width: lengthWidth ? '220px' : '80px' }"
    >
      <Pside :lengthWidth="lengthWidth" :dataList="navigation">
        <template #sideHeadLi>
          <div class="user-info"></div>
        </template>
      </Pside>
    </div>
    <div class="honeContainer-main">
      <div id="main" class="honeContainer-main-center">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.honeContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .honeContainer-side {
    display: flex;
    flex-direction: column;
    background-color: #f5f6f7;
  }
  .honeContainer-main {
    flex: 1;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    .honeContainer-main-center {
      height: 100%;
      display: flex;
    }
  }
}
</style>
