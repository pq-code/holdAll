<script setup lang="ts">
import { onMounted, ref, useSlots, computed } from "vue";

const props = defineProps({
    dataList: {
        type: Array,
        default() {
            return [
                {
                    icon: "",
                    label: "121",
                },
                {
                    icon: "",
                    label: "121",
                },
            ];
        },
    },
    lengthWidth: {
        type: Boolean,
        default() {
            return true;
        },
    },
});

const foldSwitch = ref(false); // 鼠标是否在侧边栏上

const emits = defineEmits(["lengthWidthFn"]);
const isFloat = ref(true);

// 判断slot是否有值
const useSlotsFn = (e: string) => {
    return !!useSlots()[e];
};
// 判断head是否有slot
const sideHeadLi = computed(() => {
    return useSlotsFn("sideHeadLi");
});
// 判断body是否有slot
const sideBodyLi = computed(() => {
    return useSlotsFn("sideBodyLi");
});
// 鼠标移出
const mouseleaveFn = () => {
    foldSwitch.value = false;
};
// 鼠标移入
const mouseenterFn = () => {
    foldSwitch.value = true;
};
// 点击折叠按钮
const lengthWidthFn = () => {
    return emits("lengthWidthFn", !props.lengthWidth);
};
// 下拉按钮
const dropDown = () => {
    if (!props.lengthWidth) {
        isFloat.value = !isFloat.value;
    }
};

// 收回下拉按钮
const backDropDown = () => {
    debugger;
    if (!isFloat.value) {
        isFloat.value = !isFloat.value;
    }
};

onMounted(() => { });
</script>

<template>
    <div class="p-side-float"
         :style="{
             opacity: isFloat ? 0 : 1,
             'pointer-events': isFloat ? 'none' : 'auto',
         }"
         @click.stop="backDropDown">
        <div class="side-ul"
             :style="{
                 'pointer-events': isFloat ? 'none' : 'auto',
             }">
            <div class="side-body-li"></div>
        </div>
    </div>
    <div class="p-side"
         @mouseleave="mouseleaveFn"
         @mouseenter="mouseenterFn">
        <div class="side-ul">
            <div class="side-head-li"
                 v-if="sideHeadLi">
                <div v-if="!lengthWidth && foldSwitch"
                     @click="lengthWidthFn"
                     style="cursor: pointer">
                    <i class="iconfont icon-hanbaocaidanzhedie"></i>
                </div>
                <slot v-else
                      name="sideHeadLi"></slot>
            </div>
            <template v-if="sideBodyLi">
                <slot name="sideBodyLi"></slot>
            </template>
            <div class="side-body-li"
                 v-else
                 v-for="(item, index) in dataList"
                 :key="`${item}-${index}`">
                <button class="button"
                        @click="dropDown"
                        :style="{ 'justify-content': lengthWidth ? 'flex-start' : 'center' }">
                    <i :class="['iconfont', item.icon]"></i>
                    <div v-if="lengthWidth"
                         style="margin-left: 10px">
                        {{ item.title }}
                    </div>
                    <div class="button-dropDown"
                         @click="dropDown"
                         v-if="item.options && item.options.length > 1 && lengthWidth">
                        <i class="iconfont icon-arrow-down"></i>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.p-side {
    height: 100%;

    .side-ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .side-head-li {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            width: 100%;
            height: 88px;

            .iconfont {
                font-size: 22px;
            }
        }

        .side-body-li {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            width: 100%;
            height: 50px;

            .button {
                cursor: pointer;
                width: 100%;
                height: 40px;
                margin: 10px 6px;
                background: none;
                border-style: none;
                display: flex;
                align-items: center;

                .iconfont {
                    font-size: 22px;
                }

                .button-dropDown {
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                }
            }

            .button:hover {
                border-radius: 4px;
                background-color: rgb(215, 215, 215);
            }
        }
    }
}

.p-side-float {
    opacity: 1;
    // transition: opacity 0.15s ease 0s;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 998;
    background: rgba(109, 109, 109, 0.775);

    .side-ul {
        z-index: 999;
        position: absolute;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 220px;
        background-color: #fff;

        .side-body-li {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            width: 100%;
            height: 100vh;
        }
    }
}
</style>
