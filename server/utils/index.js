/**
 @Author: lize
 @Date: 2020/6/15
 @Description :  加密
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/6/15
 **/
const crypto = require('crypto');
module.exports = {
    SHA1(obj) {
        return new Promise((resolve, rejcet) => {
            const content = `${obj.appKey},${obj.path},${obj.T}`
            console.log(content)
            const shasum = crypto.createHash('sha1');
            shasum.update(content);
            const result = shasum.digest('hex');
            resolve(result);
        })
    }
}
