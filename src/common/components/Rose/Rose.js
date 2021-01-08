/*
  @Author: lize
  @Date: 2021/1/8
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/1/8
 */

class Rose {
  constructor(el,options) {
    if (!el) {
      alert('请选择容器！');
      return;
    }
    this.el = el;
    this.options = options;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.a = this.context;
    this.b = document.body;
    this.c = this.canvas;
    this.zBuffer = [];
    this.SIZE = 777;
    this.canvas.width = this.canvas.height = this.SIZE;
    this.h = -350;
    this.el.append(this.canvas);
    this.start();
  }

  start(){
    setInterval(() => {
      for ( let i = 0; i < 10000; i++) {
        const part = i % 46;
        const c = part / .74;
        const point = this.surface(Math.random(), Math.random(), c);
        if (point) {
          const z = point.z;
          const x = parseInt(point.x * this.SIZE / z - this.h);
          const y = parseInt(point.y * this.SIZE / z - this.h);
          const zBufferIndex = y * this.SIZE + x;
          if ((typeof this.zBuffer[zBufferIndex] === "undefined")  || (this.zBuffer[zBufferIndex] > z)) {
            this.zBuffer[zBufferIndex] = z;
            const r = -parseInt(point.r * this.h);
            const g = -parseInt(point.g * this.h);
            const b = -parseInt(point.r * point.r * -80);
            this.context.fillStyle = "rgb(" + r + "," + g + "," + b  + ")";
            this.context.fillRect(x, y, 1, 1);
          }
        }
      }
    }, 0);
  }

  surface(a, b, c){
    if (c > 60) {
      return {
        x : Math.sin(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4)))  - Math.sin(b) * 50,
        y : b * this.SIZE + 50,
        z : 625 + Math.cos(a * 7)   * (13 + 5 / (.2 + Math.pow(b * 4, 4))) + b * 400,
        r : a * 1 - b / 2,  g : a  };
    }

    const A = a * 2 - 1;
    const B = b * 2 - 1;
    if (A * A + B * B < 1) {
      if (c > 37) {
        const j = c & 1;
        const n = j ? 6 : 4;
        const o = .5 / (a + .01) + Math.cos(b * 125) * 3 - a * 300;
        const w = b * this.h;
        return {
          x : o * Math.cos(n) + w * Math.sin(n) + j * 610 - 390,
          y : o * Math.sin(n) - w * Math.cos(n) + 550 - j * 350,
          z : 1180 + Math.cos(B + A) * 99 - j * 300,
          r : .4  - a  * .1   + Math.pow(1 - B * B, - this.h * 6)  * .15  - a  * b  * .4   + Math.cos(a + b)  / 5   + Math.pow(Math.cos((o * (a + 1) + (B > 0 ? w  : -w)) / 25), 30) * .1 * (1 - B * B),  g : o / 1e3 + .7 - o * w * 3e-6
        };
      }

      if (c > 32) {
        c = c * 1.16 - .15;
        const o = a * 45 - 20;
        const w = b * b * this.h;
        const z = o * Math.sin(c) + w * Math.cos(c) + 620;
        return {
          x : o * Math.cos(c) - w * Math.sin(c),
          y : 28 + Math.cos(B * .5) * 99 - b * b * b * 60 - z / 2  - this.h,
          z : z,
          r : (b * b * .3 + Math.pow((1 - (A * A)), 7) * .15 + .3)  * b,
          g : b * .7
        };
      }
      const o = A * (2 - b) * (80 - c * 2);
      const w = 99 - Math.cos(A) * 120 - Math.cos(b) * (-this.h - c * 4.9)  + Math.cos(Math.pow(1 - b, 7)) * 50 + c * 2;
      const z = o * Math.sin(c) + w * Math.cos(c) + 700;
      return {
        x : o * Math.cos(c) - w * Math.sin(c),
        y : B * 99 - Math.cos(Math.pow(b, 7)) * 50 - c / 3 - z  / 1.35 + 450,
        z : z,
        r : (1 - b / 1.2) * .9 + a * .1,
        g : Math.pow((1 - b), 20) / 4 + .05
      };
    }
  }
}

typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = module.exports.default = Rose : window.Fireworks = Rose; // eslint-disable-line
