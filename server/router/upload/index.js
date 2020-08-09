/**
 @Author: lize
 @Date: 2020/6/11
 @Description : 上传下载服务
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/6/11
 **/
const path = require("path");
const fs = require("fs");
module.exports = {
    UploadMethod(req, res){
        const files = req.files;
        const ids = [];
        for(let i = 0; i < files.length; i++) {
            ids.push({
                fileName:files[i].filename.split("|")[2],
                downloadUrl:`http://127.0.0.1:3001/node/api/download?fileName=${files[i].filename}`
            })
        }
        res.send({
            code: 200,
            success:true,
            data:{
                desc: '成功导入'+files.length+ '张图片',
                ids:ids,
            }
        });
    },
    DownloadMethod(req,res){
        // // 实现文件下载
        const fileName = req.query.fileName;
        const filePath = path.join(__dirname,`../../files/${fileName}`);
        const stats = fs.statSync(filePath);
        if(stats.isFile()){
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename=${encodeURI(fileName.split("|")[2])}`,
                'Content-Length': stats.size
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.end(404);
        }
    }
}
