<template>
    <div class="ui-home">
        <div class="pmaoUi" @click="taxClick">
        <span class="pmaoUi-title">
            {{ '这可能是一个UI组件库吧' }}
        </span>
        <br>
        <span class="pmaoUi-title-subtitle">
            {{ '嗯，因该是吧' }}
        </span>
        <br>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

    const router = useRouter();

    const taxClick = () => {
        router.push({
            path: '/pmaoUI/home',
        })
    }
</script>

<style lang="less" scoped>
    .ui-home {
        padding: 8%;
        .pmaoUi {
            cursor:pointer;
            text-align: center;
            font-size: 80px;
            line-height: 1.25;
            font-weight: 900;
            letter-spacing: -1.5px;
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
                color: #a2a2a2;
            }
        }
    }
</style>