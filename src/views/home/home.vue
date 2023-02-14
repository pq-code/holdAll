<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
// import screenfull from 'screenfull';
import { debounce } from '../../utils/index';
import Pside from '@/components/p-side/side.vue';
import { navigation } from './navigation';

let lengthWidth = ref(window.innerWidth > 1000 ? true : false);
const fn = function (fnName: string) {
  if (screen) {
    // if (screenfull.isEnabled) {
    //     const element: any = document.getElementById('main');
    //     screenfull.request(element);
    // }
  }
};

const data = ref({
  search: '',
  homeScreen: [],
  searchSelect: [],
  iconUl: [
    { icon: 'icon-quanping', fn: 'screen' },
    { icon: 'icon-quanping', fn: 'screen' },
  ],
});

// const cache = (e: string) => {
//     data.value.homeScreen.push(e)
//     console.log(data.value.homeScreen)
//     sessionStorage.setItem('homeScreen', data.value.homeScreen);
// }

const homeScreenFn = (e: string) => {};

let onWindowResize = () => {
  return (lengthWidth.value = window.innerWidth >= 1000);
};

window.addEventListener('resize', onWindowResize);

</script>
<template>
  <div class="honeContainer">
    <div class="honeContainer-side" :style="{ width: lengthWidth ? '220px' : '80px' }">
      <Pside :lengthWidth="lengthWidth" :dataList="navigation">
        <template #sideHeadLi>
          <div class="user-info"></div>
        </template>
      </Pside>
    </div>
    <div class="honeContainer-main">
      <div class="honeContainer-main-heard">
        <div class="homeHeard-left">
          <el-input v-model="data.search" class="w-50 m-2" placeholder="搜索" @input="homeScreenFn(data.search)">
            <template #prefix>
              <el-icon class="el-input__icon">
                <search />
              </el-icon>
            </template>
          </el-input>
        </div>
        <div class="homeHeard-right">
          <ol class="homeHeard-icon">
            <li v-for="(item, index) in data.iconUl" :key="`${item}-${index}`">
              <i :class="['iconfont', item.icon]" @click="fn(item.fn)"></i>
            </li>
            <div class="user-info"></div>
          </ol>
        </div>
      </div>
      <div id="main" class="honeContainer-main-center">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.honeContainer {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;

  .honeContainer-side {
    // width: 260px;
    background-color: #f5f6f7;

    .user-info {
      height: 46px;
      width: 46px;
      border-radius: 50%;
      background-color: #2ed7fd;
    }
  }

  .honeContainer-main {
    flex: 1;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;

    .honeContainer-main-heard {
      height: 60px;
      background-color: rgb(238, 238, 238);
      display: flex;
      flex-direction: row;
      padding: 0px 24px;
      justify-content: space-between;

      .homeHeard-left {
        width: 40%;
        display: flex;
        align-items: center;

        .el-input__icon {
          color: rgb(35, 35, 35);
        }
      }

      .homeHeard-right {
        height: 100%;
        display: flex;
        align-items: center;

        .homeHeard-icon {
          // height: 100%;
          display: flex;
          flex-direction: row;
          -webkit-box-align: center;
          align-items: center;
          list-style: none;
          margin-left: auto;
          flex: 0 0 auto;

          .user-info {
            margin: 0 10px;
            height: 26px;
            width: 26px;
            border-radius: 50%;
            background-color: #2ed7fd;
            cursor: pointer;
          }

          li {
            margin-left: 8px;
          }

          .iconfont {
            font-size: 26px;
          }
        }
      }
    }

    .honeContainer-main-center {
      overflow: auto;
      // flex: 1;
    }
  }
}
</style>
