/*
  @Author: lize
  @Date: 2020/7/18
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/7/18
 */

import UtilsTools from './utils/index';
import MyPromise from './utils/Mypromise';

export {
    UtilsTools,
    MyPromise,
};

const install = (Vue: any) => {
    Vue.prototype.$UtilsTools = UtilsTools;
    Vue.prototype.$MyPromise = MyPromise;
}

export default {
    install,
    UtilsTools,
    MyPromise,
};
