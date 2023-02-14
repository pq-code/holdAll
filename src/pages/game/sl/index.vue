<template>
    <div class="sl-center">
        <div class="sl-main">
            <div class="sl-game">
                <div class="sl-game-background">
                    <!-- <gameFile></gameFile> -->
                    <el-form ref="ruleFormRef"
                             :model="ruleForm"
                             status-icon
                             label-width="80px"
                             class="demo-ruleForm">
                        <el-form-item label="用户名"
                                      prop="username">
                            <el-input v-model="ruleForm.username"
                                      placeholder="请输入用户名"
                                      autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="密码"
                                      prop="password">
                            <el-input v-model="ruleForm.password"
                                      type="password"
                                      placeholder="请输入密码"
                                      autocomplete="off"
                                      show-password></el-input>
                        </el-form-item>

                        <el-button type="primary"
                                   @click="submitForm()"
                                   style="width: 80%; margin-top: 40px"
                                   round>
                            注册
                        </el-button>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { login, dologin } from '@/api/apis/user';
// import gameFile from './gameFile/index.vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const ruleForm = ref({
    username: '',
    password: '',
});

// login({
//     user_name: 'qqq1',
//     user_password: '123',
// }).then((res: any) => {
//     if (res.code == 0) {
//         ElMessage({
//             message: '登陆成功',
//             type: 'success',
//         });
//     } else {
//         ElMessage.error(res.message);
//     }
// });

const submitForm = () => {
    dologin({
        user_name: ruleForm.value.username,
        user_password: ruleForm.value.password,
    }).then((res: any) => {
        if (res.code == 0) {
            ElMessage({
                message: '注册成功',
                type: 'success',
            });
        } else {
            ElMessage.error(res.message);
        }
    });
};

var ws = new WebSocket(`ws://localhost:3005`);
//连接成功后的回调函数
ws.onopen = () => {
    //发送消息给服务器
    ws.send('客户端连接成功');
    console.log('客户端连接成功');
};
//监听服务器发来的消息
ws.onmessage = res => {
    console.log('服务端：', res.data);
};
//关闭连接的回调
ws.onclose = function () {
    console.log('客户端断开连接');
};
</script>
<style scoped lang="less">
.sl-center {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    padding: 10px;

    .sl-main {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: rgb(222, 233, 234);
        text-align: center;

        // position: relative;
        .sl-game {
            display: inline-block;
            width: calc(100% - 360px);
            height: calc(100% - 360px);
            padding: 80px;
            margin: 100px auto;
            background-color: aquamarine;
            overflow: hidden;

            .sl-game-background {
                width: 360px;
                height: 500px;
                border-radius: 6px;
                background-color: #fff;
            }
        }
    }
}
</style>
