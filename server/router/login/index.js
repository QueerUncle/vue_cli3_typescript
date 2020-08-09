/**
 @Author: lize
 @Date: 2020/6/9
 @Description :  登陆服务
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/6/9
 **/
module.exports = {
    LoginFormMethod(req,res){
        console.log(req.body)
        res.send(
            {
                code:200,
                success:true,
                message:'提交成功',
                data:req.body
            }
        )
    },
    LoginFormDataMethod(req,res){
        console.log(req.body)
        res.send(
            {
                code:200,
                success:true,
                message:'提交成功',
                data:req.body
            }
        )
    }
}
