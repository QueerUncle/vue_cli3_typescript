/*
 @Author: lize
 @Date: 2020/7/30
 @Description :
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/7/30
 */
function fibonacci(n) {
    return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
}
self.onmessage = function (event) {
    console.log(event,'asdasdasdasdasdasd')
    const data = event.data;
    const ans = fibonacci(data);
    this.postMessage(ans);
};

