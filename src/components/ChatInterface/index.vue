<template>
    <div class="chat-main">
        <div class="chat-view">
            <div class="chat-view-title">
                {{ targetName }}
            </div>
            <div class="chat-border">
                <ul class="chat-border-ul">
                    <li class="chat-border-li" v-for="item of dataList">
                        <div class="chat-border-li-block-pick" v-if="item.pickupAccept == 'pick'">
                            <div class="headPortrait">
                            </div>
                            <div class="textContent">
                                <div class="textContent-top">
                                    {{item.user}}
                                </div>
                                <div class="textContent-bottom">
                                    {{item.text}}
                                </div>
                            </div>
                        </div>
                        <div class="chat-border-li-block-send" v-if="item.pickupAccept == 'send'">
                            <div class="send-textContent">
                                {{item.text}}
                            </div>
                            <div class="send-headPortrait">

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="chat-send">
            <div class="chat-send-title">
                12321
            </div>
            <div class="chat-send-input">
<!--                <el-input-->
<!--                    rows="5"-->
<!--                    v-model="textarea"-->
<!--                    type="textarea"-->
<!--                    autocomplete="off"-->
<!--                    @keyup.enter.ctrl.native="SendOut()"-->
<!--                />-->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'

const textarea = ref() // 输入框信息
const targetName = ref('pp') // 标题名称
const props = defineProps({
    usr_info: {
        type: Object,
        default() {
            return {}
        },
    },
    dataList: {
        type: Array,
        default() {
            return []
        }
    }
})

onMounted(()=>  {
    // targetName.value = props.usr_info.targetName
    // dataList.value = props.dataList
})

const dataList = ref([
    {
        user: 'pqdasdadasd1e1',
        pickupAccept: 'pick',
        text: '121'
    },
    {
        user: 'pq',
        pickupAccept: 'pick',
        text: '121'
    },
    {
        user: 'ppp',
        pickupAccept: 'send',
        text: '121'
    },
    {
        user: 'pq',
        pickupAccept: 'pick',
        text: '121'
    },
    {
        user: 'ppp',
        pickupAccept: 'send',
        text: '121'
    },
    {
        user: 'pq',
        pickupAccept: 'pick',
        text: '121'
    },
    {
        user: 'pq',
        pickupAccept: 'pick',
        text: '121'
    },
    {
        user: 'pq',
        pickupAccept: 'pick',
        text: '121'
    },
    {
        user: 'ppp',
        pickupAccept: 'send',
        text: '121'
    },
    {
        user: 'pq',
        pickupAccept: 'pick',
        text: '121'
    },
    {
        user: 'ppp',
        pickupAccept: 'send',
        text: '121'
    },
    {
        pickupAccept: 'pick',
        text: '121'
    },
    {
        pickupAccept: 'pick',
        text: '121'
    }
])

const SendOut = () => {

}
</script>

<style lang="less" scoped>
.chat-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .chat-view {
        display: flex;
        flex-direction: column;
        height: calc(100% - 160px);
        background-color: #cbcbcb;
        .chat-view-title {
            line-height: 50px;
            height: 50px;
            font-size: 20px;
        }
        .chat-border {
            height: calc(100% - 50px);
            flex: 1;
            background-color: white;
            .chat-border-ul {
                display: flex;
                flex-direction: column;
                height: 100%;
                padding: 0;
                margin: 0;
                overflow-y: auto;
                list-style-type: none;
                .chat-border-li {
                    flex: 1;
                    background-color: #e1e1e1;
                    .chat-border-li-block-pick {
                        margin: 10px 0;
                        //height: 40px;
                        display: flex;
                        flex-direction: row;
                        .headPortrait {
                            border-radius: 4px;
                            width: 40px;
                            margin: 0px 20px;
                            background-color: #8f8f8f;
                        }
                        .textContent {
                            height: 40px;
                            display: flex;
                            text-align: left;
                            flex-direction: column;
                            .textContent-top {
                                font-size: 10px;
                                //justify-content: center;
                            }
                            .textContent-bottom {
                                padding: 0 10px;
                                margin-top: 2px;
                                font-size: 16px;
                                height: 40px;
                                line-height: 30px;
                                background-color: white;
                                border-radius: 4px;
                            }

                        }
                    }
                    .chat-border-li-block-send {
                        margin: 10px 0;
                        height: 40px;
                        float: right;
                        display: flex;
                        flex-direction: row;
                        .send-headPortrait {
                            float: right;
                            border-radius: 4px;
                            width: 40px;
                            margin: 0px 20px;
                            background-color: #8f8f8f;
                        }
                        .send-textContent {
                            padding: 0 10px;
                            font-size: 16px;
                            height: 40px;
                            line-height: 30px;
                            background-color: #18ffd9;
                            border-radius: 4px;
                        }
                    }
                }
            }
        }
    }
    .chat-send {
        display: flex;
        flex-direction: column;
        height: 160px;
        background-color: #575757;
        .chat-send-title {
            flex: 1;
            height: 50px;
            background-color: #0077aa;
        }
        .chat-send-input {
            height: 120px;
            flex: 1;
        }

    }
}
</style>
