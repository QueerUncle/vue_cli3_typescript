/*
  @Author: lize
  @Date: 2020/11/15
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/11/15
 */
class Timer {
    constructor(options) {
        this.timerTarget = null; // 定时器实例
        this.hour = 0; // 定时器实例
        this.minutes = 0; // 分钟的显示值
        this.seconds = 0; // 秒的显示值
        this.millisecond = 0; // 好默庵的显示值
        this.hourWrap = options.hourWrap || '' ; // 小时所在的容器
        this.minutesWrap = options.minutesWrap || '' ; // 分钟所在的容器
        this.secondsWrap = options.secondsWrap || ''; // 秒所在的容器
        this.millisecondWrap = options.millisecondWrap || ''; // 毫秒所在的容器
        this.settingWrapVal(); // 调用设置容器显示结果的方法
    }
    // 开始
    start(){
        if (this.timer) return;
        this.timer = this.timing(10); // 开始记时
        // 这里为什么是10（1000ms等于1s）
        //  那么如果1秒调用一次，那么需要等毫秒加到1000，
        //  那么如果10秒调用一次，那么需要等毫秒加到100，
    }
    // 重置
    reset(){
        clearInterval(this.timerTarget); // 清除定时器
        this.hour = this.minutes = this.seconds = this.millisecond = 0; // 并清空数据
        this.settingWrapVal();  // 调用设置容器显示结果的方法
    }
    // 暂停
    stop(){
        clearInterval(this.timerTarget); // 清除定时器
        if (this.seconds === 10 && this.millisecond === 0) {
            alert('恭喜你，中奖啦！');
        } else {
            alert('很遗憾，没中奖！');
        }
    }
    // 计时器
    timing(num){
        this.timerTarget = window.setInterval(() =>{ // 这个是es6的新语法剪头函数，在剪头函数里this指向他父级作用域的window
            // 因为前面每10秒调用函数一次，所以这里加到100就好
            this.millisecond += 1; // 每10毫秒加1
            if (this.millisecond > 99) { // 如果大于99 代表已经到100
                this.seconds += 1; // 秒数加1
                this.millisecond = 0; // 毫秒清0，重新计算
            }
            if ( this.seconds > 59) { // 如果秒数大于60，代表够1分钟
                this.minutes += 1; // 分钟数加1
                this.seconds = 0; // 秒数清0， 重新计算
            }
            if (this.minutes > 59) { // 如果分钟大于60，代表够 1小时
                this.hour += 1; // 小时数加1
                this.minutes = 0; // 分钟数清0，重新计算
            }
            if (this.hour > 24) { // 如果小时大于24 代表1天啦
                alert('已经一天啦，实在是跑不动啦，求求你放过我吧，让我休息一会吧');
                this.reset(); // 清除定时器
            }
            this.settingWrapVal(); // 调用设置容器显示结果的方法
        }, num);
    }
    // 设置页面上的容器显示结果
    settingWrapVal(){
        this.hourWrap ? this.hourWrap.innerHTML = Number(this.hour) <= 9 ? '0' + String(this.hour) : String(this.hour) : false; // 如果有小时容器，把小时的变量赋值到容器里，否则不执行。
        this.minutesWrap ? this.minutesWrap.innerHTML = Number(this.minutes) <= 9 ? '0' + String(this.minutes) : String(this.minutes) : false; // 如果有分钟容器，把分钟的变量赋值到容器里，否则不执行。
        this.secondsWrap ? this.secondsWrap.innerHTML = this.seconds <= 9 ? '0' + String(this.seconds) : String(this.seconds) : false; // 如果有秒容器，把秒的变量赋值到容器里，否则不执行。
        this.millisecondWrap ? this.millisecondWrap.innerHTML = this.millisecond <= 9 ? '0' + String(this.millisecond) : String(this.millisecond) : false; // 如果有毫秒容器，把毫秒的变量赋值到容器里，否则不执行。
    }
}
// 导出去或者往window上挂在一个叫做Timer的方法,支持es6的import引入。（这个你们后续kennel会了解，现在不知道啥意思没关系);
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Timer : window.Timer = Timer; // eslint-disable-line
