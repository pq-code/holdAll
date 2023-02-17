<template>
    <el-menu :router="true"
             class="menu">
        <el-sub-menu :key="item.router + index"
                     :index="item.router"
                     v-for="(item, index) of pdata.dataList">
            <template #title>
                {{ item.title }}
            </template>
            <el-menu-item :key="e.router"
                          :index="e.router"
                          v-for="e of item.options">
                {{ e.title }}
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { navigation } from '@/views/home/navigation';

let pdata = reactive({
    dataList: navigation,
});
</script>
<style scoped>

</style>
