<template>
    <router-view />
</template>

<script lang="ts">
export default {
    name: "App",
    components: {},
};
</script>
<style>
#app {
    width: 100vw;
    height: 100vh;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* background-color: #008cff1c; */
}

body {
    font-family: "微软雅黑";
    /*  设置字体 */
    margin: 0 auto;
    /* 去除上下的边距*/
    --color: #f5f5f7;
    background-color: #f5f5f7;
}
</style>
