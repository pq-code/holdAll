import { http } from '../index';
import { LoginData, LoginRes } from '../types/types';

export const login = (params: LoginData) => {
    return new Promise((resolve, reject) => {
        http.post<LoginRes>('api/users/login', params).then(res => {
            if (res.code == 0) {
                sessionStorage.setItem('token', res.result.token);
            }
            resolve(res);
            reject(res);
        });
    });
};

export const dologin = (params: any) => {
    return http.post('api/users/register', params);
};

export const getUerInfo = (params: any) => {
    return http.post('api/users/getUerInfo', params);
};

export const addFriends = (params: any) => {
    return http.post('api/users/addFriends', params);
};

export const deleteFriends = (params: any) => {
    return http.post('api/users/deleteFriends', params);
};

export const getFriends = (params: any) => {
    return http.post('api/users/getFriends', params);
};

export const addChatRecord = (params: any) => {
    return http.post('api/users/addChatRecord', params);
};

export const getChatRecord = (params: any) => {
    return http.post('api/users/getChatRecord', params);
};

export const deleteChatRecord = (params: any) => {
    return http.post('api/users/deleteChatRecord', params);
};
