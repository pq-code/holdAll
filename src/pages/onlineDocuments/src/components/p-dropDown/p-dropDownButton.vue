<script setup lang='ts'>
import { dialogEmits } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const props = defineProps({
    lengthWidth: {
        type: Boolean,
        default() {
            return true
        }
    },
    item: {
        type: Object,
        default: {
            icon: '',
            label: '121'
        }
    },
    router: {
        type: String,
        default() {
            return ''
        }
    }
})

const routers = useRouter();

const foldOpen = ref(false)
const selectedStatus = ref(false)
const select = ref(false)

const emits = defineEmits(['dropDown'])

const dropDown = () => {
    select.value = true
    emits('dropDown')
}

//折叠打开
const foldOpenFn = () => {
    foldOpen.value = true
}

// 路由跳转
const routerFn = () => {
    if (props.router) {
        routers.push({
            path: props.router,
        });
    }
    dropDown()
}

// 鼠标移出
const mouseleaveFn = () => {
    selectedStatus.value = false
}
// 鼠标移入
const mouseenterFn = () => {
    if (!select.value) {
        selectedStatus.value = true
    }
}
// 取消选中
const uncheck = () => {
    select.value = false
}


defineExpose({
    uncheck
})

</script>

<template>
    <div class="dropdownBox"
         @click="routerFn">
        <button class="button"
                :class="{ 'selectedStatus': selectedStatus, 'backColor': select }"
                @mouseleave="mouseleaveFn"
                @mouseenter="mouseenterFn"
                :style="{ 'justify-content': lengthWidth ? 'flex-start' : 'center' }">
            <i :class="['iconfont', item.icon]"></i>
            <div v-if="lengthWidth"
                 style="margin-left: 10px;">{{ item.title }}</div>
            <div class="button-dropDown"
                 @click="foldOpenFn"
                 v-if="item.options && item.options.length > 1 && lengthWidth">
                <i class="iconfont icon-arrow-down"></i>
            </div>
        </button>
    </div>
</template>


<style lang="less" scoped>
.dropdownBox {
    width: calc(100% - 20px);
    height: 50px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;

    padding: 0 10px;

    .button {
        cursor: pointer;
        width: 100%;
        height: 40px;
        // margin: 10px;
        background: none;
        border-style: none;
        display: flex;
        align-items: center;
        border-radius: 4px;

        .iconfont {
            font-size: 22px;
        }

        .button-dropDown {
            flex: 1;
            display: flex;
            justify-content: flex-end;
        }

        &.backColor {
            background-color: rgb(220, 220, 220);
        }
    }

    .selectedStatus {
        border-radius: 4px;
        background-color: rgb(215, 215, 215);
    }
}
</style>
