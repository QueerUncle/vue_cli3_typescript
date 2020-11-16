/**
 @Author: lize
 @Date: 2020/5/13
 @Description :
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/5/13
 **/
import Vue from 'vue'
declare module "vue/types/vue" {
    interface Vue {
        $Http: any
        selectAll: Function,
        $UtilTools: any,
        AreaData: any,
        ProcessTree: any,
    }
}
declare namespace Global {
    interface IResult {
        code?: number,
        success?: boolean,
        data?: any,
        message?: string
    }
}
declare module "cbimui";
declare module "MessageConfig"
declare module 'ProcessTreeVue';
declare module 'process-tree-vue'
declare module 'bpmn-js'
