/**
 @Author: lize
 @Date: 2020/7/30
 @Description :
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/7/30
 **/

function fibonacci(n) {
    return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
}
function getUrl (imgSrc){
    for (let i = 0; i< imgSrc.length; i += 1) {
        const req = new XMLHttpRequest();
        // req.open('GET', `http://localhost:3001/node/api/getImg?fileName=${imgSrc[i]}`, true);
        // req.open('GET', `http://localhost:3001/node/api/getImgHttp?fileName=${imgSrc[i]}`, true);
        // req.open('GET', `http://localhost:3001/node/api/getImgImages?fileName=${imgSrc[i]}`, true);
        req.open('GET', `http://localhost:3001/node/api/ImgSplit?fileName=${imgSrc[i]}`, true);
        // req.responseType = "blob";
        // req.responseType = "arraybuffer";
        req.responseType = "application/json";
        req.onload = () => {
            postMessage(JSON.parse(req.response).files);
            // postMessage(req.response);
        }
        req.send(null);
    }
}
self.onmessage = function (event) {
    const data = event.data;
    if (data.page) {
        const ans = fibonacci(data);
        this.postMessage(ans);
    }
    if (data.imgSrc) {
        getUrl(data.imgSrc);
    }
};

