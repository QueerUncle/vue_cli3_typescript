/**
 @Author: lize
 @Date: 2020/7/29
 @Description : node 爬虫
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/7/29
 **/
const url = 'https://www.liepin.com/zhaopin/?init=-1&headckid=0417b67c8d823dcb&fromSearchBtn=2&sfrom=click-pc_homepage-centre_searchbox-search_new&ckid=0417b67c8d823dcb&degradeFlag=0&key=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&siTag=D_7XS8J-xxxQY6y2bMqEWQ%7EfA9rXquZc5IkJpXC-Ycixw&d_sfrom=search_fp&d_ckId=466b672969a37b2deaf20975f4b05e7c&d_curPage=0&d_pageSize=40&d_headId=466b672969a37b2deaf20975f4b05e7c&curPage=1';
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
// module.exports = {
//     crewler(){
//         axios.get(url)
//             .then((e) =>{
//                 console.log(e);
//                 this.settingDatas(e.data)
//             })
//             .catch((er) =>{
//                 console.log(er);
//             })
//     },
//     settingDatas(data){
//         let $ = cheerio.load(data);
//         let result = [];
//         $('.sojob-list').find('.job-info').each(i => {
//             let map = {};
//             //  个人基本信息
//             map.name = $('.job-info').eq(i).find('h3').attr('title');
//
//             let baseOthersInfo = $('.job-info').eq(i).find('.condition').attr('title');
//             baseOthersInfo = baseOthersInfo.split("_");
//
//             map.reward = baseOthersInfo[0];
//             map.area = baseOthersInfo[1];
//             map.experience = baseOthersInfo[2];
//
//             //  公司信息
//             let companyTagDom = $('.company-info').eq(i).find('.temptation').find('span');
//             let companyTag = [];
//             companyTagDom.each(i => {
//                 companyTag.push(companyTagDom.eq(i).text());
//             });
//             let companyInfo = {
//                 name: $('.company-info').eq(i).find('.company-name a').attr('title'),
//                 href: $('.company-info').eq(i).find('.company-name a').attr('href'),
//                 type: $('.company-info').eq(i).find('.industry-link a').text(),
//                 tag: companyTag.join(',')
//             }
//             map.company = companyInfo;
//             result.push(map);
//             map = {};
//         });
//         console.log(result);
//     },
//     writeFile(url,data){
//         fs.writeFile(url,JSON.stringify(data),(err) =>{
//             if (err) throw err;
//             console.log('文件书写成功！');
//         })
//     }
// }
class crawlData {
    constructor ( page ) {
        this.currentPage = 1;
        this.page = page;
        this.baseUrl = 'https://www.liepin.com/zhaopin/?isAnalysis=&dqs=&pubTime=&salary=&subIndustry=&industryType=&compscale=&key=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&init=-1&searchType=1&headckid=b41b3a1f788e456c&compkind=&fromSearchBtn=2&sortFlag=15&ckid=e0769e995864e9e1&degradeFlag=0&jobKind=&industries=&clean_condition=&siTag=D_7XS8J-xxxQY6y2bMqEWQ%7EfA9rXquZc5IkJpXC-Ycixw&d_sfrom=search_prime&d_ckId=ec6119ede4a8421d04cde68240799352&d_curPage=';
        this.init();
    }
    init(){
        let time = setInterval( () => {
            if(this.currentPage > this.page) {
                clearInterval(time);
            } else{
                console.log(`第${this.currentPage}个爬虫请求发出`);
                this.getDataPackage(`${this.baseUrl}${this.currentPage + 1}&d_pageSize=40&d_headId=ad878683a46e56bca93e6f921e59a95&curPage=${this.currentPage}`,this.currentPage);
                this.currentPage ++;
            }
        }, 1000 * 5);
    }
    getDataPackage(url,curPage){
        console.log(url);
        axios.get(url)
            .then((e) =>{
                this.settingDatas(e.data)
            })
            .catch((er) =>{
                console.log(er);
            })
    }
    settingDatas(data){
        let $ = cheerio.load(data);
        let result = [];
        $('.sojob-list').find('.job-info').each(i => {
            let map = {};
            //  个人基本信息
            map.name = $('.job-info').eq(i).find('h3').attr('title');

            let baseOthersInfo = $('.job-info').eq(i).find('.condition').attr('title');
            baseOthersInfo = baseOthersInfo.split("_");

            map.reward = baseOthersInfo[0];
            map.area = baseOthersInfo[1];
            map.experience = baseOthersInfo[2];

            //  公司信息
            let companyTagDom = $('.company-info').eq(i).find('.temptation').find('span');
            let companyTag = [];
            companyTagDom.each(i => {
                companyTag.push(companyTagDom.eq(i).text());
            });
            let companyInfo = {
                name: $('.company-info').eq(i).find('.company-name a').attr('title'),
                href: $('.company-info').eq(i).find('.company-name a').attr('href'),
                type: $('.company-info').eq(i).find('.industry-link a').text(),
                tag: companyTag.join(',')
            }
            map.company = companyInfo;
            result.push(map);
            map = {};
        });
        console.log(result);
        this.writeFile(`./files/job${new Date().getTime()}.json`,result);
    }
    writeFile(url,data){
        fs.writeFile(url,JSON.stringify(data, null, 2),(err) =>{
            if (err) throw err;
            console.log('文件书写成功！');
        })
    }
}
module.exports = crawlData;
