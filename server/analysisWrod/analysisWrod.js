/*
  @Author: lize
  @Date: 2020/11/21
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/11/21
 */
const admZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
module.exports = {
    analysisWord(filePath,cb){
        // console.log(filePath);
        if (!filePath) cb(null);
        // 解压word文档
        const zip = new admZip(path.join(__dirname,'12.docx'));
        zip.extractAllTo('./output/2', true);
        // 提取内容
        let contentXml = zip.readAsText("word/document.xml");
        // 正则匹配文字
        let matchWT = contentXml.match(/(<w:t>.*?<\/w:t>)|(<w:t\s.[^>]*?>.*?<\/w:t>)/gi);
        matchWT = this.filterFn(matchWT);
        cb(matchWT);
    },
    /**
     * 去除空白行
     */
    filterFn(matchWT) {
        let res = [];
        matchWT.forEach((item) => {
            if (item !== '<w:t xml:space="preserve"> </w:t>') {
                item = item.split('>');
                item = item[1].split('<');
                res.push(item[0]);
            }
        })
        return res;
    }
}
