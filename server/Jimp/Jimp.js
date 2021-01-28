/*
  @Author: lize
  @Date: 2021/1/19
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/1/19
 */
const Jimp = require('jimp');

/**
 * url 目标图片，需要裁减的图片
 * files 裁剪过后的文件路径，根据文件路径的个数平均切成n等份
 * isVertical 是否纵向均切，默认为true，false就是横向切图
 */
const clipImage = (url, files, isVertical = true) => {
  Jimp.read(url, (err, image) => {
    if(err) {
      console.log(err);
      return;
    }
    const { bitmap = {} } = image;
    const { width, height } = bitmap;
    const len = files.length;
    const delta = isVertical ? (height / len) : (width / len);
    async function cropVerticalOne(i) {
      const file = files[i];
      const _image = image.clone();
      await _image.crop(0, delta * i, width, delta)
        .write(file);
      if(i < len - 1) {
        cropVerticalOne(i + 1);
      }
    }
    async function cropHorizontalOne(i) {
      const file = files[i];
      const _image = image.clone();
      await _image.crop(delta * i, 0, delta, height)
        .write(file);
      if(i < len - 1) {
        cropHorizontalOne(i + 1);
      }
    }
    isVertical ? cropVerticalOne(0) : cropHorizontalOne(0);
  })
}

clipImage('01.png', ['02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png', '09.png'], false);
// clipImage('water.png', ['water5.png', 'water6.png', 'water7.png', 'water8.png'], true);
