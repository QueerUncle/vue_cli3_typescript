/**
 @Author: lize
 @Date: 2020/7/31
 @Description :
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/7/31
 **/

const http = require('http');
const path = require("path");
const fs = require("fs");
const ImgMudole = require('./router/img')
http.createServer(function (request, response) {
    ImgMudole.readfileSync(request, response);
    console.log("主程序结束");
}).listen(3002);
console.log(3002)

