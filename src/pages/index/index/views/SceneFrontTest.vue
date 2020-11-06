<!--
  @Author: lize
  @Date: 2020/9/28
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/9/28
 -->
<template>
  <div class = "SceneFrontTest-wrap">
    <FlowChartShows :flowData = "flowData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'SceneFrontTest',
})
export default class SceneFrontTest extends Vue {
  private flowData: Array<any> = [
    {
      id: '1', // 节点id
      uuid: 'q', // 自定义id
      name: '项目报备', // 节点名称
      main: true, // 是否是主节点 是：yes  否：no
      icon: '', // 图标
      nodeType: '', // url ledge:台账
      urlValue: '', // url地址
      color: '', // 颜色
      customColor: '', // 自定义颜色
      auth: true, // 权限,
      buttonList: [], // 按钮集合
      children: [
        {
          id: '2', // 节点id
          uuid: 'w', // 自定义id
          name: '项目立项', // 节点名称
          main: false, // 是否是主节点 是：yes  否：no
          icon: '', // 图标
          nodeType: '', // url ledge:台账
          urlValue: '', // url地址
          color: '', // 颜色
          customColor: '', // 自定义颜色
          auth: true, // 权限,
          buttonList: [], // 按钮集合
          children: [
            {
              id: '3', // 节点id
              uuid: 'e', // 自定义id
              name: '临时任务单', // 节点名称
              main: false, // 是否是主节点 是：yes  否：no
              icon: '', // 图标
              nodeType: '', // url ledge:台账
              urlValue: '', // url地址
              color: '', // 颜色
              customColor: '', // 自定义颜色
              auth: true, // 权限,
              buttonList: [], // 按钮集合
              children: [], // 子集数组
              selectList: [], // 筛选字段
              ledge: {
                id: '',
                name: '',
                code: '',
                type: '',
              }, // 台账集合
            },
            {
              id: '4', // 节点id
              uuid: 'r', // 自定义id
              name: '投标任务单', // 节点名称
              main: false, // 是否是主节点 是：yes  否：no
              icon: '', // 图标
              nodeType: '', // url ledge:台账
              urlValue: '', // url地址
              color: '', // 颜色
              customColor: '', // 自定义颜色
              auth: true, // 权限,
              buttonList: [], // 按钮集合
              children: [], // 子集数组
              selectList: [], // 筛选字段
              ledge: {
                id: '',
                name: '',
                code: '',
                type: '',
              }, // 台账集合
            },
            {
              id: '5', // 节点id
              uuid: 't', // 自定义id
              name: '正式任务单', // 节点名称
              main: false, // 是否是主节点 是：yes  否：no
              icon: '', // 图标
              nodeType: '', // url ledge:台账
              urlValue: '', // url地址
              color: '', // 颜色
              customColor: '', // 自定义颜色
              auth: true, // 权限,
              buttonList: [], // 按钮集合
              children: [], // 子集数组
              selectList: [], // 筛选字段
              ledge: {
                id: '',
                name: '',
                code: '',
                type: '',
              }, // 台账集合
            },
          ], // 子集数组
          selectList: [], // 筛选字段
          ledge: {
            id: '',
            name: '',
            code: '',
            type: '',
          }, // 台账集合
        },
      ], // 子集数组
      selectList: [], // 筛选字段
      ledge: {
        id: '',
        name: '',
        code: '',
        type: '',
      }, // 台账集合
    },
  ];
}
</script>

<style scoped lang="less">
.SceneFrontTest-wrap{
  background: #f7f7f7;
}
</style>
