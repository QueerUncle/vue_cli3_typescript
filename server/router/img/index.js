/**
 @Author: lize
 @Date: 2020/7/30
 @Description :
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/7/30
 **/
const path = require("path");
const fs = require("fs");
const images = require("images");
module.exports = {
    getImg(req, res){
        const fileName = req.query.fileName;
        const type = fileName.split('.')[1];
        const filePath = path.join(__dirname,`../../img/${fileName}`);
        // res.header({'Content-Type':`image/${type ==='jpg' ? 'jpeg' : 'png'}`});
        // res.sendFile(filePath);
        const data = fs.readFileSync(filePath);
        res.send(Buffer.from(data,'base64'))
    },
    // 读取图片
    readfileSync(req,res) {//同步读取
        console.log(req.url);
        const fileName = req.query.fileName;
        const type = fileName.split('.')[1]
        const filePath = path.join(__dirname,`../../img/${fileName}`);
        console.log(filePath);
        res.writeHead(200, {
            'Content-Type': `image/${type ==='jpg'? 'jpeg': 'png'}`,
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Content-type,Content-Length,Authorization,Accept,X-Requested-Width',
            'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
            'X-Powered-By':' 3.2.1'
        });
        const stream = fs.createReadStream(filePath);
        const responseData = [];//存储文件流
        if (stream) {//判断状态
            stream.on( 'data', function( chunk ) {
                responseData.push( chunk );
            });
            stream.on( 'end', function() {
                const finalData = Buffer.concat( responseData );
                res.write(finalData);
                res.end('ok');
            });
        }
    },
    // images
    compressImages(req,res){
        const fileName = req.query.fileName;
        if (fileName !== '06.png' && fileName !== '07.png' && fileName !== '08.png') {
            const type =fileName.split('.')[1];
            const filePath = path.join(__dirname,`../../img/${fileName}`);
            const result = images(filePath).size(400).encode('jpg',{quality:50}).toString('base64');
            // res.header({'Content-Type':`image/${type ==='jpg' ? 'jpeg' : 'png' }`});
            res.send(Buffer.from(result));
            return;
        }
        res.send('');
    },
    // 图片切割返回
    ImgSplit(req,res){
        const fileName = req.query.fileName;
        const type = fileName.split('.')[1];
        const filePath = path.join(__dirname,`../../img/${fileName}`);
        const data = fs.readFileSync(filePath);
        console.log(data.toJSON());
        console.log(data.length);
        let files = [];
        let s = 1000000;
        let start = 0;
        let end = 1000000;
        while (start<data.length && data.length>end) {
            let concatBuffer;
            if (start === 0){
                concatBuffer = Buffer.from(data.slice(start,end),'binary');
            }else{
                const inBuffer = Buffer.from(data.slice(0,100000),'binary')
                const endBuffer = Buffer.from(data.slice(start,end),'binary');
                concatBuffer = Buffer.from(Buffer.concat([inBuffer,endBuffer]),'binary');
            }
            files.push(concatBuffer);
            start = end;
            end +=s;
        }
        console.log(files,'a=====',files.length);
        // res.send(files);
        res.send({
            code: 200,
            success:true,
            files: files,
        })
    },
}
