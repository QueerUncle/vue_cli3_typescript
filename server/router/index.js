/**
 @Author: lize
 @Date: 2020/6/9
 @Description :  路由服务
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/6/9
 **/
const express = require('express');
const router = express.Router();
const path = require("path");
//formData
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
//上传
const multer  = require('multer');
//磁盘存储引擎（说白了就是指定上传的文件存储到哪，当然你也可以对文件重命名等等）
const storage=multer.diskStorage({
    destination (req, file, cb) {
        // 保存的路径，备注：需要自己创建
        cb(null, path.join(__dirname,'../files'))
    },
    filename (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, `${file.fieldname}|${Date.now()}|${file.originalname}` )
    }
});
const upload = multer({ storage: storage });
const TestModule = require('./test');
const LoginModule = require('./login');
const UploadModule = require('./upload');
const ImgModule = require('./img');
//解决跨域请求
router.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.use((req, res, next)=>{
    // 輸出記錄訊息至終端機
    console.log(req.method, req.url,'+++++++++++++++++++++++++++++++++');
    next()
});
//接口集合
router.get('/testgetapi',TestModule.testapiGetMethods);  //测试接口get
router.post('/testpostapi',TestModule.testapiPostMethods);  //测试接口post
router.post('/wangyueTest',TestModule.wangYueTest);  //王悦接口测试
router.post('/formlogin',multipartMiddleware,LoginModule.LoginFormMethod);  //登陆接口  form表单提交
router.post('/formDatalogin',multipartMiddleware,LoginModule.LoginFormDataMethod);  //登陆接口  new FormData()提交
router.post('/uploads',upload.array("file",1000),UploadModule.UploadMethod);  //上传接口
router.get('/download',UploadModule.DownloadMethod);  //上传接口
router.get('/getImg',ImgModule.getImg);  //返回图片 express
router.get('/getImgHttp',ImgModule.readfileSync);  //返回图片 原生
router.get('/getImgImages',ImgModule.compressImages);  //返回图片 原生
router.get('/ImgSplit',ImgModule.ImgSplit);  // 返回图片切割
module.exports = router;
