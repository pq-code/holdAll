<template>
    <div class="frontPage"
         @click="frontPage">
        <threeHome />
    </div>
    <div class="bottom">
        <a href="https://beian.miit.gov.cn"
           style="text-decoration: none"
           class="home-footertypeface3">
            湘ICP备2022002786号
        </a>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import threeHome from "./three.vue";

const router = useRouter();

const frontPage = function () {
    // router.push({
    //     path: "/dashboard",
    // });
};

</script>

<style lang="less" scoped>
.frontPage {
    width: 100vw;
    height: 100vh;


}
.bottom {
        position: absolute;
        width: 100vw;
        z-index: 10;
        bottom: 0;
        color: #000;
    }
</style>
