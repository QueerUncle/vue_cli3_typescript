/*
  @Author: lize
  @Date: 2020/11/6
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/11/6
 */
class Fireworks {
  x = null;

  y = null;

  wrap = null;

  startAudioList = [
    'https://www.17sucai.com/preview/945243/2018-02-15/firework/m/launch1.mp3',
    'https://www.17sucai.com/preview/945243/2018-02-15/firework/m/launch4.mp3',
  ];

  endAudioList = [
    'https://www.17sucai.com/preview/945243/2018-02-15/firework/m/exp1.mp3',
    'https://www.17sucai.com/preview/945243/2018-02-15/firework/m/exp2.mp3',
    'https://www.17sucai.com/preview/945243/2018-02-15/firework/m/exp3.mp3',
    'https://www.17sucai.com/preview/945243/2018-02-15/firework/m/exp4.mp3',
    'https://www.17sucai.com/preview/945243/2018-02-15/firework/m/exp5.mp3',
    'https://www.17sucai.com/preview/945243/2018-02-15/firework/m/exp7.mp3',
    'https://www.17sucai.com/preview/945243/2018-02-15/firework/m/exp8.mp3',
  ];

  constructor(options) {
    this.wrap = options.el;
    this.create();
  }

  // 创建烟花
  create() {
    const { offsetWidth, offsetHeight } = this.wrap;
    if (offsetWidth < 40 || offsetHeight < 400) {
      alert('你的可浏览区域过小，请更换更大的显示区域！'); // eslint-disable-line
      return;
    }
    this.x = this.random(offsetWidth - 40, 40);
    this.y = this.random(offsetHeight - 400, 100);
    const el = document.createElement('div');
    el.className = 'fire';
    el.style.left = `${this.x}px`;
    el.style.background = this.randomColor();
    el.style.width = '10px';
    el.style.height = '10px';
    el.style.position = 'absolute';
    el.style.bottom = '0';
    this.wrap.appendChild(el);
    const startAudioIndex = Math.floor(Math.random() * this.startAudioList.length);
    const audio = this.createAudio(this.startAudioList[startAudioIndex]);
    this.fly(el, audio);
  }

  fly(el, audio) {
    this.move(el, { top: this.y }, () => {
      audio.remove();
      const endAudioIndex = Math.floor(Math.random() * this.endAudioList.length);
      const smallAudio = this.createAudio(this.endAudioList[endAudioIndex]);
      el.remove();
      this.creatSmall(smallAudio);
    });
  }

  // 创建小的烟花
  creatSmall(smallAudio) {
    // 圆周烟花的半径
    const r = this.random(100, 200);
    for (let i = 0; i < 12; i += 1) {
      const small = document.createElement('div');
      small.className = 'small';
      small.style.left = `${this.x}px`;
      small.style.top = `${this.y}px`;
      small.style.background = this.randomColor();
      small.style.width = '10px';
      small.style.height = '10px';
      small.style.position = 'absolute';
      small.style.borderRadius = '50%';
      this.wrap.appendChild(small);
      // 计算小烟花运动至指定圆周的位置
      const l = Math.round(Math.sin(Math.PI / 180 * 30 * i) * r) + this.x; // eslint-disable-line
      const t = Math.round(Math.cos(Math.PI / 180 * 30 * i) * r) + this.y; // eslint-disable-line
      // 让小烟花到达目标处后消失不见
      this.move(small, { left: l, top: t }, () => {
        small.remove();
        smallAudio.remove();
      });
    }
  }

  // 随颜色值数
  random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
  }

  // 随机颜色
  randomColor() {
    return `rgb(${this.random(0, 255)}, ${this.random(0, 255)}, ${this.random(0, 255)})`;
  }

  // 移动
  move(ele, json, callback) {
    clearInterval(ele.t);
    ele.t = setInterval(() => {
      let onoff = true;
      for (let i in json) { // eslint-disable-line
        let iNow = parseInt(this.getStyle(ele, i)) // eslint-disable-line
        let speed = (json[i] - iNow) / 6; // eslint-disable-line
        speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);
        if (iNow !== json[i]) { // eslint-disable-line
          onoff = false;
        }
        ele.style[i] = `${iNow + speed }px`; // eslint-disable-line
      }
      if (onoff) {
        clearInterval(ele.t);
        callback && callback(); // eslint-disable-line
      }
    }, 30);
  }

  // 获取样式
  getStyle(ele, attr) {
    if (ele.currentStyle) {
      return ele.currentStyle[attr];
    }
    return getComputedStyle(ele, null)[attr];
  }

  // 创建Audio并播放
  createAudio(src) {
    const audio = new Audio();
    audio.src = src;
    this.wrap.appendChild(audio);
    audio.play();
    return audio;
  }
}
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Fireworks : window.Fireworks = Fireworks; // eslint-disable-line
