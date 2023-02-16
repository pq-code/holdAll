<template>
    <div class="frontPage"
         @click="frontPage">
        <div class="frontPageTile">这是一个首页</div>
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
    router.push({
        path: "/dashboard",
    });
};

</script>

<style lang="less" scoped>
.frontPage {
    width: 100%;
    height: 100vh;



    .frontPageTile {
        background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 200px;
        font-weight: 900;
        z-index: 1000;
        position: absolute;
        top: 20%;
        left: 60%;
        cursor: pointer;
    }
}
.bottom {
        position: absolute;
        width: 100vw;
        z-index: 10;
        bottom: 0;
        color: #000;
    }
</style>
