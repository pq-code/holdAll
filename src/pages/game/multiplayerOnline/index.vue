<template>
    <div class="onLine-main">
        <div class="onLine-game-login">
            <div class="onLine-game-login-main">
                <el-form ref="ruleFormRef"
                         :model="leftFrom"
                         status-icon
                         label-width="0"
                         class="demo-ruleForm">
                    <el-form-item label=""
                                  prop="username">
                        <el-input v-model="leftFrom.username"
                                  placeholder="用户名"
                                  autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label=""
                                  prop="password">
                        <el-input v-model="leftFrom.password"
                                  type="password"
                                  placeholder="密码"
                                  autocomplete="off"
                                  show-password
                                  @keyup.enter.native="loging()"></el-input>
                    </el-form-item>

                    <el-button type="primary"
                               @click="loging()"
                               style="width: 100%"
                               round>
                        登陆
                    </el-button>
                </el-form>
                <div class="friendsList">
                    <p class="friendsList-title">好友列表</p>
                    <ul class="friendsList-ul">
                        <li class="friendsList-li"
                            v-for="item of leftFrom.friendsList">
                            <p style="margin: 0">{{ item.name }}</p>
                        </li>
                    </ul>
                </div>
                <!--                <el-button-->
                <!--                    type="primary"-->
                <!--                    @click="getInfo()"-->
                <!--                    style="width: 80%; margin-top: 40px"-->
                <!--                    round-->
                <!--                >-->
                <!--                    获取登陆信息-->
                <!--                </el-button>-->
                <!--                <el-button-->
                <!--                    type="primary"-->
                <!--                    @click="addFriend()"-->
                <!--                    style="width: 80%; margin-top: 40px"-->
                <!--                    round-->
                <!--                >-->
                <!--                    添加好友-->
                <!--                </el-button>-->
                <!--                <el-button-->
                <!--                    type="primary"-->
                <!--                    @click="deleteFriend()"-->
                <!--                    style="width: 80%; margin-top: 40px"-->
                <!--                    round-->
                <!--                >-->
                <!--                    删除好友-->
                <!--                </el-button>-->
                <!--                <el-button-->
                <!--                    type="primary"-->
                <!--                    @click="getFriend()"-->
                <!--                    style="width: 80%; margin-top: 40px"-->
                <!--                    round-->
                <!--                >-->
                <!--                    获取好友列表-->
                <!--                </el-button>-->
            </div>
        </div>
        <div class="onLine-game-input">
            <!--            <chat></chat>-->
            <chat1></chat1>
        </div>
        <!--        <div class="onLine-game-sidebar">-->
        <!--            <p class="onlineNumber">当前在线人数:{{ onlineNumber }}</p>-->
        <!--            <p-->
        <!--                class="lsftState"-->
        <!--                :style="{-->
        <!--                            'background-color':-->
        <!--                                lsftState == 1 ? 'rgb(6 255 8)' : 'rgb(255 116 116)',-->
        <!--                        }"-->
        <!--            >-->
        <!--                连接状态:{{ lsftState == 1 ? '在线' : '离线' }}-->
        <!--            </p>-->
        <!--            <p class="lsftState">当前在线用户</p>-->
        <!--            <ul>-->
        <!--                <li></li>-->
        <!--            </ul>-->
        <!--        </div>-->
    </div>
</template>
<script setup lang="ts">
// import gameFile from './gameFile/index.vue';
import { ElMessage } from 'element-plus';
import { reactive, ref, watch } from 'vue';
import {
    login,
    getUerInfo,
    addFriends,
    deleteFriends,
    getFriends,
    addChatRecord,
} from '@/api/apis/user';
import { Result } from '@/api/types/types';
import chat1 from '@/components/ChatInterface/index1.vue';

import { SocketUtils } from '@/utils/socket';

const leftFrom = ref({
    username: '',
    password: '',
    friendsList: [
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
        {
            name: 'aaaaa',
            id: 'aaaaaaa',
        },
    ],
});
const rightFrom = ref({
    textarea: '',
    time: '',
    name: '',
});

const leftData = reactive([]);
const rightData = reactive([]);

const lsftState = ref(0);
const rightState = ref(0);

const onlineNumber = ref(0);
const socketUtils = ref();
const socket = ref();

// const leftSendOut = () => {
//     const sendOut = {
//         objective: 'sendOut',
//         user_name: '',
//         text: leftFrom.value?.textarea,
//     };
//     leftData.push(sendOut);
//     leftFrom.value.textarea = '';
// };

const loging = () => {
    login({
        user_name: leftFrom.value.username,
        user_password: leftFrom.value.password,
    }).then((res: any) => {
        ElMessage({
            message: `${res.result.user_name}登陆成功`,
            type: 'success',
        });
        establishSocket(res.result.user_id);
    });
};

// 建立socket连接
const establishSocket = (user_id: any) => {
    socketUtils.value = new SocketUtils(user_id);
    socket.value = socketUtils.value.linkStart();
    // // 接收全域信息
    // socket.value = socketUtils.value.socket.on('broadcast', (e: Array<object>) => {
    //     onlineNumber.value = e.NumberOnline;
    // });
    // // 接收信息
    // socket.value = socketUtils.value.socket.on('fresh-message', (e: object) => {
    //     console.log(e.id, e.chatList);
    // });
};
// 发送消息
const SendOut = () => {
    const chatMessage = {
        user: leftFrom.value.username,
        value: rightFrom.value.textarea,
        id: '9c60fbac-d471-4f29-badb-52d741a53ce8',
    };
    socketUtils.value.sendMessage(chatMessage);
    addChatRecord({
        user_name: leftFrom.value.username,
        user_id: leftFrom.value.username,
        user_friends_name: leftFrom.value.username,
        user_friends_id: chatMessage.id,
        chat_record: rightFrom.value.textarea,
    }).then(res => {
        console.log(res.result.message);
    });
};

const getInfo = () => {
    getUerInfo({
        user_name: leftFrom.value.username,
    }).then((res: any) => {
        console.log(res);
    });
};

const friend = ref({
    user_name: 'pq',
    user_id: 'ef428e48-2947-4458-9144-514d16c6e7c7',
    user_friends_name: 'ppp',
    user_friends_id: '9c60fbac-d471-4f29-badb-52d741a53ce8',
});

const addFriend = () => {
    addFriends({
        user_name: friend.value.user_name,
        user_id: friend.value.user_id,
        user_friends_name: friend.value.user_friends_name,
        user_friends_id: friend.value.user_friends_id,
    }).then(res => {
        console.log(res);
    });
};

const deleteFriend = () => {
    deleteFriends({
        user_name: friend.value.user_name,
        user_id: friend.value.user_id,
        user_friends_name: friend.value.user_friends_name,
        user_friends_id: friend.value.user_friends_id,
    }).then((res: any) => {
        console.log(res);
    });
};

const getFriend = () => {
    getFriends({
        user_name: friend.value.user_name,
        user_id: friend.value.user_id,
    }).then(res => {
        console.log(res);
    });
};
</script>
<style scoped lang="less">
.onLine-main {
    width: 80%;
    height: 80%;
    min-height: 600px;
    border-radius: 20px;
    background-color: rgb(222, 233, 234);
    display: flex;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);

    .onLine-game-login {
        padding: 10px;

        //flex: 1;
        .onLine-game-login-main {
            display: flex;
            width: 160px;
            margin-top: 20px;
            flex-direction: column;

            .friendsList {
                height: 300px;
                margin-top: 10px;

                .friendsList-title {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 500;
                }

                .friendsList-ul {
                    height: 300px;
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                    overflow-y: auto;

                    .friendsList-li {
                        padding: 0;
                        margin: 2px 0;
                        height: 20px;
                        border-radius: 4px;
                        background-color: #8f8f8f;
                    }
                }
            }
        }
    }

    .onLine-game-input {
        padding: 0 0 0 10px;
        height: 100%;
        width: 100%;

        .onLine-game-input-main {
            height: 100%;
        }
    }

    .onLine-game-sidebar {
        width: 200px;

        .onlineNumber {
            font-size: 14px;
            font-weight: 800;
            margin: 10px;
            border-radius: 4px;
            background-color: aqua;
        }

        .lsftState {
            font-size: 14px;
            font-weight: 800;
            // width: 100%;
            margin: 10px;
            border-radius: 4px;
        }

        .rightState {
            font-size: 14px;
            font-weight: 800;
            // width: 100%;
            margin: 10px;
            border-radius: 4px;
        }
    }
}
</style>
