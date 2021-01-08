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
import FlowChartShows from './FlowChartShows/index.vue'; // 流程图显示组件
import MonacoEditor from './MonacoEditor/index.vue'; // 代码编辑器

const components: any = {
    FlowChartShows,
    MonacoEditor,
}

export {
    UtilsTools,
    MyPromise,
    FlowChartShows,
};

const install = (Vue: any) => {
    Vue.prototype.$UtilTools = UtilsTools;
    Vue.prototype.$MyPromise = MyPromise;
    Object.keys(components).forEach((item: any): void => {
        Vue.component(components[item].options.name, components[item]);
    });
}

export default {
    install,
    UtilsTools,
    MyPromise,
    FlowChartShows,
};
