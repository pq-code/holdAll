<template>
    <div class="ui-home">
        <div class="pmaoUi" @click="taxClick" v-if="pdata.doorSwitch">
            <span class="pmaoUi-title">
                {{ '这是一个UI组件库' }}
            </span>
            <br>
            <span class="pmaoUi-title-subtitle">
                {{ '' }}
            </span>
            <br>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {reactive} from "vue";

    const router = useRouter();

    const pdata = reactive({
        doorSwitch: true,
    })

    const taxClick = () => {
        openTheDoor();
    }

    // 打开组件库
    const openTheDoor = () => {
        // 弹出侧边栏

        // 隐藏文字
        pdata.doorSwitch = false;
    }


</script>

<style lang="less" scoped>
    .ui-home {
        padding: 8%;
        .pmaoUi {
            position: fixed;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            cursor:pointer;
            text-align: center;
            font-size: 80px;
            line-height: 1.25;
            font-weight: 900;
            letter-spacing: -1.5px;
            //margin:  auto;
            .pmaoUi-title {
                background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
                //background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .pmaoUi-title-subtitle {
                font-size: 40px;
                line-height: 1.25;
                font-weight: 900;
                letter-spacing: -1.5px;
                max-width: 960px;
                margin: 0 auto;
                color: #525252;
            }
        }
    }
</style>