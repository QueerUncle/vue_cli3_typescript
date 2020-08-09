/**
 @Author: lize
 @Date: 2020/5/13
 @Description :
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/5/13
 **/
const axios = require('axios');
const Http = axios.create({
    baseURL: '', // api请求的baseURL
    timeout: 600000,
    withCredentials: true, // 允许跨域 cookie
    headers: {
        "Content-Type": "application/json",
    },
    maxContentLength: 2000,
});

//请求拦截器
Http.interceptors.request.use (
    (config ) => {
        return config;
    },
    (err) => {
        return Promise.reject (err);
    }
);
//响应拦截器
Http.interceptors.response.use (
    (response) => {
        console.log(response,'我是响应拦截器正确返回值！');
        if (response.data.code === 200 || response.data.code === 406) {
            return response.data;
        } else if (response.data.code === 400) {
            return response.data;
        }
    },
    (err) => {
        return Promise.reject (err);
    }
);
module.exports = Http;
