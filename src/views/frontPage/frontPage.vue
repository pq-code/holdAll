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
import threeHome from "./threeHome/index.vue";

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

    .bottom {
        bottom: 0;
        color: #000;
    }

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
</style>
