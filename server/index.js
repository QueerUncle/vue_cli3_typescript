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
const buf1 = new Buffer(26);
for (let i = 0 ; i < 26 ; i++) {
    buf1[i] = i + 97; // 97 is ASCII a
}
console.log(buf1.toString())
const buf2 = buf1.slice(0,3);
console.log(buf2.toString())
const buf3 = buf1.slice(3,6);
console.log(buf3.toString())


let buffer=new Buffer('dfghjk+Zxcvbn+dsaf')

Buffer.prototype.split=Buffer.prototype.split||function (spl){
    let arr=[];
    let cur=0;
    let n=0;
    while((n=this.indexOf(spl,cur))!=-1){
        arr.push(this.slice(cur,n));
        cur=n+spl.length
    }
    arr.push(this.slice(cur))
    return arr
}

console.log(buffer.split('+'),'344343434343434343434')
