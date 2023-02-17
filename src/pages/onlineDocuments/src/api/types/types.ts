/* 服务器返回数据的的类型 */
export interface Result<T = any> {
    code: number;
    message: string;
    result: T;
}

/* 登录接口参数类型 */
export interface LoginData {
    user_name: string;
    user_password: string;
}

/* 登录接口返回值类型 */
export interface LoginRes<T = any> {
    code: number;
    message: string;
    token: string;
    result: T;
}

/* 用户信息接口返回值类型 */
export interface UserInfoRes {
    id: string;
    user_name: string;
    avatar: string;
    description: string;
}
