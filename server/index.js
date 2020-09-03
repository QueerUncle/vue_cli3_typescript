/**
 @Author: lize
 @Date: 2020/6/9
 @Description :
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/6/9
 **/
const express = require("express");
const app = express();
//获取post传参
const bodyParser = require("body-parser");
const crewler = require('./crawler/crawler');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//设置静态服务地址
app.use(express.static('files'));
app.use(express.static('img'));
//路由
const route = require("./router");
app.use('/node/api',route);
//监听一个端口
app.listen(3001);
console.log(`web server on port 3001`);

