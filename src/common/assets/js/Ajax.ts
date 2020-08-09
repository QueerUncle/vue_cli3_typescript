/**
 @Author: lize
 @Date: 2020/5/13
 @Description :
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/5/13
 **/
import axios, {AxiosRequestConfig} from 'axios'
import { Message,MessageConfig} from 'view-design'
// (Message.config as any)({top:55})
// (<any>Message).success('成功啦');
const filterUrlAry = [];
const Http = axios.create({
    baseURL: process.env.VUE_APP_API, // api请求的baseURL
    timeout: 600000,
    withCredentials: true, // 允许跨域 cookie
    headers: {
        "Content-Type": "application/json",
    },
    maxContentLength: 2000,
});

//请求拦截器
Http.interceptors.request.use (
    (config: any ) => {
        config.baseURL ? config.url.includes('index/userLogout') ? config.baseURL = "/" : config.baseURL = process.env.VUE_APP_API : false;
        config.baseURL ? config.url.includes('/node/api') ? config.baseURL = "" : config.baseURL = process.env.VUE_APP_API : false;
        return config;
    },
    (err: AxiosRequestConfig) => {
        return Promise.reject (err);
    }
);
//响应拦截器
Http.interceptors.response.use (
    (response: AxiosRequestConfig) => {
        if (response.data.code === 200 || response.data.code === 406) {
            return response.data;
        } else if (response.data.code === 400) {
            // (<any>Message).error(response.data.message);
            return response.data;
        } else {
            if (response.data.errorUrl) {
                window.location.href = response.data.errorUrl;
            } else {
                window.location.href=`/errorPage/index.html?error=${response.data.errorMessage}`
            }
        }
    },
    (err: AxiosRequestConfig) => {
        return Promise.reject (err);
    }
);
export default {
    install(Vue: any,option: any){
        Object.defineProperty(Vue.prototype,option ? `$${option}` : '$Http',{value:Http})
    }
}
