/*
  @Author: lize
  @Date: 2020/11/5
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/11/5
 */
/* eslint-disable */
  /**
  *
  * @param {Object} obj 目标对象
  * @param {Object} json 要改变的属性
  * @param {Object} extend {buffer,callback} 当buffer为true时为弹性运动
  *  callback会在运动结束时，被执行
  * animate(obj, {top:500, left: 300}, {callback:function(){}, buffer: true})
  */
  function animate(obj, json, extend){
    extend = extend || {};
    if(obj.isMoving){
    return;
  } else {
    stop();
    obj.isMoving = true;
  }
    //obj = Object.assgin(obj,extend);
    obj.buffer = extend.buffer;
    obj.callback = extend.callback;
    obj.timerlist = {};
    //为每一个属性添加一个定时器
    for(var attr in json){
    (function(attr){
    obj.timerlist[attr] = {speed:0};
    obj.timerlist[attr].timer = setInterval(function(){
    //首先得到当前值
    var iNow = 0;
    if(attr == "opacity"){
    iNow = getStyle(obj, attr) * 100;
  } else {
    iNow = getStyle(obj, attr);
  }
    var speed = obj.timerlist[attr].speed;
    //根据目标值，计算需要的速度
    if(obj.buffer==true){
    speed += (json[attr] - iNow)/5;
    speed *= 0.75;
  } else {
    speed = (json[attr] - iNow)/5;
  }
    //当无限接近目标值时，停止定时器
    if(Math.abs(iNow - json[attr]) < 0.5){
    clearInterval(obj.timerlist[attr].timer);
    delete obj.timerlist[attr];
    if(getObjLength(obj.timerlist)==0){//所有定时器已停止
    stop();
    obj.callback ? obj.callback() : "";
  }
  } else {
    //根据速度，修改当前值
    if(attr == "opacity"){
    obj.style.opacity = (iNow+speed)/100;
    obj.style.filter = 'alpha(opacity=' + parseFloat(iNow+speed) + ')';
  } else {
    obj.style[attr] = iNow+speed+"px";
  }
    obj.timerlist[attr].speed = speed;
  }
  }, 30);
  })(attr);
  }

    function clearTimer(){
    for(var i in obj.timerlist){
    clearInterval(obj.timerlist[i]);
  }
  }
    function getStyle(obj, attr){
    if(obj.currentStyle){
    return isNaN(parseFloat(obj.currentStyle[attr])) ? obj.style[attr]=0 : parseFloat(obj.currentStyle[attr]);
  } else {
    return isNaN(parseFloat(getComputedStyle(obj, null)[attr])) ? obj.style[attr]=0 : parseFloat(getComputedStyle(obj, null)[attr]);
  }
  }
    function getObjLength(obj){
    var n = 0;
    for(var i in obj){
    n++;
  }
    return n;
  }
    function stop(){
    clearTimer();//清除所有定时器
    obj.isMoving = false;
  }
  }
