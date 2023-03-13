<script setup lang="ts">
import { ref } from "vue";
import { drawingBoardStore } from "../stores/drawingBoardStore";
const fileName = ref("未命名文件");
const showTooltip = ref(false);
const showInput = ref(true);
const fileNameInput = ref();
// 修改文件名
const editFileName = () => {
  showInput.value = true;
  // 调用保存接口
  console.log("调用保存接口");
};

const store = drawingBoardStore();
</script>
<template>
  <div class="top">
    <div class="top-left">
      <div class="top-backIcon">
        <i class="iconfont icon-jiantouzuo"></i>
      </div>
      <div class="top-partition">
        <i class="iconfont icon-jian"></i>
      </div>
      <div class="top-fileTitle">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="fileName"
          v-model="showTooltip"
          placement="bottom-start"
        >
          <div>
            <div
              class="top-fileTitle-name"
              v-show="showInput"
              @click.stop="
                () => {
                  showInput = false;
                  fileNameInput.focus();
                }
              "
            >
              {{ fileName }}
            </div>
            <el-input
              v-show="!showInput"
              ref="fileNameInput"
              v-model.lazy="fileName"
              maxlength="10"
              size="small"
              @blur="editFileName"
              >{{ fileName }}
            </el-input>
          </div>
        </el-tooltip>
      </div>
    </div>

    <div class="topright">
      <div class="topright-left">
        <div style="margin-left: 10px; width: 50%; cursor: pointer">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="撤回"
            v-model="showTooltip"
            placement="bottom-start"
          >
            <i class="iconfont icon-shezhi2"></i>
          </el-tooltip>
        </div>
        <div style="margin-right: 10px; width: 50%; cursor: pointer">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="撤回"
            v-model="showTooltip"
            placement="bottom-start"
          >
            <i class="iconfont icon-shezhi2"></i>
          </el-tooltip>
        </div>
      </div>
      <div class="topright-right">
        <div class="percentage">{{ `${store.scale} %` }}</div>
        <i
          style="width: 20px; cursor: pointer"
          class="iconfont icon-jiantouxiaxiao"
        ></i>
      </div>
    </div>

    <div class="mousePosition">
      {{ `X:${store.initialMousePosition.x * -1}`
      }}{{ `Y:${store.initialMousePosition.y * -1}` }}
    </div>
  </div>
</template>
<style lang="less" scoped>
.top {
  position: absolute;
  z-index: 100;
  top: 10px;
  left: 10px;
  display: flex;

  .top-left {
    height: 40px;
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    border: solid 1.4px rgb(239, 239, 239);
    display: flex;
    .top-backIcon {
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        cursor: pointer;
        font-size: 20px;
      }
    }
    .top-partition {
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 20px;
        transform: translateX(-6px) rotate(90deg);
      }
    }
    .top-fileTitle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 10px;
      .top-fileTitle-name {
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        color: rgb(20, 20, 20);
        width: 120px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      ::v-deep .el-input__wrapper {
        box-shadow: none;
        width: 120px;
        padding: 0;
        .el-input__inner {
          color: rgb(20, 20, 20) !important;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }

  .topright {
    display: flex;
    height: 40px;
    width: 160px;
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    border: solid 1.4px rgb(239, 239, 239);
    margin-left: 10px;
    .topright-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60%;
      // background-color: rgb(207, 207, 207);
    }
    .topright-right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40%;
      .percentage {
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
      }
      // background-color: rgb(232, 232, 232);
    }
  }
  .mousePosition {
    margin-left: 10px;
    text-align: center;
    line-height: 40px;
    width: 100px;
    height: 40px;
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    border: solid 1.4px rgb(239, 239, 239);
  }
}
</style>
