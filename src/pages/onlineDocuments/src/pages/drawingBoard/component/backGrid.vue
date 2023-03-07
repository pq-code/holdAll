<script setup lang="ts">
import { ref } from "vue";
const gridSize = 50; // 网格大小
const gridRows = ref(100);
const gridColumns = ref(60);

const props = defineProps({
  stageConfig: {
    type: Object,
    default() {
      return {};
    },
  },
  backType: {
    type: String,
    default: "line",
  },
});
</script>
<template>
  <!-- 网格线 -->
  <template v-if="backType == 'line'">
    <v-line
      v-for="(item, index) in gridRows"
      :key="`${item}-row`"
      :stroke="'#ccc'"
      :points="[0, item * gridSize, stageConfig.width, item * gridSize]"
      :strokeWidth="1"
      :dash="[5, 5]"
    />

    <v-line
      v-for="(item, index) in gridColumns"
      :key="`${item}-column`"
      :stroke="'#ccc'"
      :points="[item * gridSize, 0, item * gridSize, stageConfig.height]"
      :strokeWidth="1"
      :dash="[5, 5]"
    />
  </template>
  <!-- <template v-if="backType == 'drop'">
    <v-circle
      v-for="(item, index) in gridColumns"
      :key="`${item}-drop`"
      :config="item.option"
    ></v-circle>
  </template> -->
</template>
<style lang="less" scoped></style>
