/**
 @Author: lize
 @Date: 2020/6/9
 @Description :  测试服务
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/6/9
 **/
const utils = require('../../utils/index.js');
const Http = require('../../utils/Ajax.js');
module.exports = {
    testapiGetMethods(req,res) {
        res.send(
            {
                code:200,
                success:true,
                data:req.query
            }
        )
    },
    testapiPostMethods(req,res) {
        res.send(
            {
                code:200,
                success:true,
                data:req.body
            }
        )
    },
    async wangYueTest(req,res){
        const url = req.body.url || 'https://devdes.cbim.org.cn/external/api/taskForm/downloadFile';
        const newDate = new Date().getTime();
        const sign = await utils.SHA1({
            appKey:'b774cfe9fc8776b961a650df3efb3mf3',
            path:'/external/api/taskForm/downloadFile',
            T:newDate
        });
        const config = {
            headers:{
                appid:'8cg78c041b2b28c734c3e5b7534cbb8p',
                sign:sign,
                ts:newDate,
                ticket:'TGT-1436-6l1-OoBzkOFJqdJJCVPf9KYQif5crjYYFsMMnGvgJw5fA30kvZLgfzU4jJO6uk8BMsc-localhost',
            }
        }
        console.log(config);
        const result = await Http.post(url,{fileId:req.body.fileId || '788575868514471936'},config)
        res.send(result);
    }
}
