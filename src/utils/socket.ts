import io from 'socket.io-client';

interface usrData {
    user: string;
    value: string;
    id: string;
}

export class SocketUtils {
    private socket: any;
    private userID;
    constructor(userID: string) {
        this.userID = userID;
    }
    // 建立连接
    linkStart() {
        this.socket = io('http://localhost:3005'); // 连接后端的 socket.io 方法里面传服务端的ip
        this.socket.on('connect', () => {
            console.log(this.socket.id, '监听客户端连接成功-connect');
            console.log(this.userID); // 创建用户Id房间
            this.socket.volatile.timeout(5000).emit('logIn', this.userID);
        });
        return this.socket;
    }
    // 发送消息
    sendMessage(chatMessage: usrData) {
        this.socket.volatile
            .timeout(5000)
            .emit('send-message', chatMessage.user, chatMessage.value, chatMessage.id);
    }
}
