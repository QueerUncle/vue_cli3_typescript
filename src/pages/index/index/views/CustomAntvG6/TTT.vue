<!--
  @Author: lize
  @Date: 2021/1/28
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/1/28
 -->
<template>
  <div class="TTT-wrap" id = "container"></div>
</template>

<script lang="ts">
/* eslint-disable */
import {Component, Vue} from 'vue-property-decorator';
import G6 from '@antv/g6';
// import insertCss from 'insert-css';
const badgeImg = require('./img/badge.svg'); //eslint-disable-line


@Component({
  name: 'TTT'
})
export default class TTT extends Vue {
  private mockData = {
    id: 'g1',
    name: 'Name1',
    count: 123456,
    label: '538.90',
    currency: 'Yuan',
    rate: 1.0,
    status: 'B',
    variableName: 'V1',
    variableValue: 0.341,
    variableUp: false,
    children: [
      {
        id: 'g12',
        name: 'Deal with LONG label LONG label LONG label LONG label',
        count: 123456,
        label: '338.00',
        rate: 0.627,
        status: 'R',
        currency: 'Yuan',
        variableName: 'V2',
        variableValue: 0.179,
        variableUp: true,
        children: [
          {
            id: 'g121',
            name: 'Name3',
            collapsed: true,
            count: 123456,
            label: '138.00',
            rate: 0.123,
            status: 'B',
            currency: 'Yuan',
            variableName: 'V2',
            variableValue: 0.27,
            variableUp: true,
            children: [
              {
                id: 'g1211',
                name: 'Name4',
                count: 123456,
                label: '138.00',
                rate: 1.0,
                status: 'B',
                currency: 'Yuan',
                variableName: 'V1',
                variableValue: 0.164,
                variableUp: false,
                children: [],
              },
            ],
          },
          {
            id: 'g122',
            name: 'Name5',
            collapsed: true,
            count: 123456,
            label: '100.00',
            rate: 0.296,
            status: 'G',
            currency: 'Yuan',
            variableName: 'V1',
            variableValue: 0.259,
            variableUp: true,
            children: [
              {
                id: 'g1221',
                name: 'Name6',
                count: 123456,
                label: '40.00',
                rate: 0.4,
                status: 'G',
                currency: 'Yuan',
                variableName: 'V1',
                variableValue: 0.135,
                variableUp: true,
                children: [
                  {
                    id: 'g12211',
                    name: 'Name6-1',
                    count: 123456,
                    label: '40.00',
                    rate: 1.0,
                    status: 'R',
                    currency: 'Yuan',
                    variableName: 'V1',
                    variableValue: 0.181,
                    variableUp: true,
                    children: [],
                  },
                ],
              },
              {
                id: 'g1222',
                name: 'Name7',
                count: 123456,
                label: '60.00',
                rate: 0.6,
                status: 'G',
                currency: 'Yuan',
                variableName: 'V1',
                variableValue: 0.239,
                variableUp: false,
                children: [],
              },
            ],
          },
          {
            id: 'g123',
            name: 'Name8',
            collapsed: true,
            count: 123456,
            label: '100.00',
            rate: 0.296,
            status: 'DI',
            currency: 'Yuan',
            variableName: 'V2',
            variableValue: 0.131,
            variableUp: false,
            children: [
              {
                id: 'g1231',
                name: 'Name8-1',
                count: 123456,
                label: '100.00',
                rate: 1.0,
                status: 'DI',
                currency: 'Yuan',
                variableName: 'V2',
                variableValue: 0.131,
                variableUp: false,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'g13',
        name: 'Name9',
        count: 123456,
        label: '100.90',
        rate: 0.187,
        status: 'B',
        currency: 'Yuan',
        variableName: 'V2',
        variableValue: 0.221,
        variableUp: true,
        children: [
          {
            id: 'g131',
            name: 'Name10',
            count: 123456,
            label: '33.90',
            rate: 0.336,
            status: 'R',
            currency: 'Yuan',
            variableName: 'V1',
            variableValue: 0.12,
            variableUp: true,
            children: [],
          },
          {
            id: 'g132',
            name: 'Name11',
            count: 123456,
            label: '67.00',
            rate: 0.664,
            status: 'G',
            currency: 'Yuan',
            variableName: 'V1',
            variableValue: 0.241,
            variableUp: false,
            children: [],
          },
        ],
      },
      {
        id: 'g14',
        name: 'Name12',
        count: 123456,
        label: '100.00',
        rate: 0.186,
        status: 'G',
        currency: 'Yuan',
        variableName: 'V2',
        variableValue: 0.531,
        variableUp: true,
        children: [],
      },
    ],
  };

  private flowList = null;

//  组件props
  private props = {
    data: this.mockData,
    config: {
      padding: [20, 50],
      defaultLevel: 100,
      defaultZoom: 0.8,
      modes: { default: ['zoom-canvas', 'drag-canvas'] },
      // padding: [20, 50],
      // defaultLevel: 100,
      // defaultZoom: 0.8,
      // modes: { default: ['zoom-canvas', 'drag-canvas'] },
    },
  };

// 默认配置
  private defaultConfig = {
    modes: {
      default: ['zoom-canvas', 'drag-canvas'],
    },
    fitView: false, // 是否开启画布自适应
    animate: true, // 是否开启动画
    maxZoom: 3, // 最大缩放
    defaultNode: {
      type: 'flow-rect',
    },
    defaultEdge: {
      type: 'polyline',
      style: {
        lineWidth: 2,
        offset: 24,
        radius: 10,
        endArrow: true,
        stroke: '#afbdd0',
      },
    },
    // defaultEdge: {
    //   shape: 'polyline',
    //   style: {
    //     lineWidth: 2,
    //     offset: 24,
    //     radius: 10,
    //     endArrow: true,
    //     stroke: '#afbdd0',
    //   },
    // },
    layout: {
      type: 'indented',
      direction: 'LR',
      dropCap: false,
      indent: 300,
      getHeight: () => {
        return 60;
      },
    },
  };

// 自定义节点、边
  public registerFn() {
    /**
     * 自定义节点
     */
    G6.registerNode(
        'flow-rect',
        {
          shapeType: 'flow-rect',
          draw(cfg, group) {
            // 截取汉字
            const textAry = (str, num, max) => {
              if (str.length <= num) return [str];
              const newAry = [];
              while (str.length && newAry.length < max) {
                newAry.push(str.substr(0, str.length > num ? num : str.length));
                if (newAry.length === max) {
                  const target = newAry[newAry.length - 1];
                  newAry[newAry.length - 1] = target.substr(0, target.length - 3) + '...'; // eslint-disable-line
                }
                str = str.substr(str.length > num ? num : str.length, str.length);
              }
              return newAry;
            };
            // 文字特殊配置
            const textData = {
              y: textAry(cfg.name, 10, 3).length === 3 ? 8 : textAry(cfg.name, 10, 3).length === 2 ? 16 : 24, // eslint-disable-line
              str: textAry(cfg.name, 10, 3).join('\n'),
            };
            // 文字基础配置
            const textDefaultConfig = {
              textAlign: 'left', // 居左
              textBaseline: 'top', //
            };
            // 逻辑不应该在这里判断
            const rectConfig = {
              width: 200, // 宽
              height: 60, // 高
              lineWidth: 2, // 边框
              fontSize: 12, // 字体大小
              fill: '#fff', // 填充颜色
              radius: 4, // 边框弧度
              stroke: 'transparent', // 边框颜色
              opacity: 1, // 透明度
            };
            // 节点的原始位置
            const nodeOrigin = {
              x: 50,
              y: 50,
            };
            // 最外层的盒子
            const rect = group.addShape('rect', {
              attrs: {
                x: nodeOrigin.x,
                y: nodeOrigin.y,
                ...rectConfig,
                cursor: cfg.auth ? 'pointer' : 'not-allowed',
                fill: cfg.auth ? '#fff' : '#f7f7f7',
                stroke: cfg.auth ? 'transparent' : '#afbdd0',
              },
            });
            // 左侧边线
            group.addShape('rect', {
              attrs: {
                x: nodeOrigin.x,
                y: nodeOrigin.y,
                ...rectConfig,
                width: 4,
                lineWidth: 1, // 边框
                fill: cfg.auth ? cfg.customBorderColor || cfg.borderColor || 'transparent' // eslint-disable-line
                    : cfg.customBorderColor || cfg.borderColor ? '#afbdd0' : 'transparent', // eslint-disable-line
                radius: [2, 0, 0, 2], // 边框弧度
                opacity: 1, // 透明度
              },
              name: 'border-line',
            });
            // 文字
            group.addShape('text', {
              attrs: {
                ...textDefaultConfig,
                x: nodeOrigin.x + 16,
                y: nodeOrigin.y + textData.y,
                text: textData.str,
                fontSize: 14,
                fill: cfg.auth ? '#000' : '#afbdd0',
                cursor: cfg.auth ? 'pointer' : 'not-allowed',
              },
              name: 'name-shape',
            });
            // 角标
            // if (cfg.badge !== '' && cfg.badge !== undefined && cfg.badge !== null && cfg.auth && cfg.badge > 0) {
              // 角标图片
              group.addShape('image', {
                attrs: {
                  x: nodeOrigin.x + 160,
                  y: nodeOrigin.y - 4,
                  height: 20,
                  width: 40,
                  img: badgeImg,
                },
                name: 'badge-icon',
              });
              // 角标文字
              group.addShape('text', {
                attrs: {
                  ...textDefaultConfig,
                  x: nodeOrigin.x + 160 + (cfg.badge.length === 3 ? 20 : cfg.badge.length === 2 ? 14 : 8), // eslint-disable-line
                  y: nodeOrigin.y,
                  width: 20,
                  height: 14,
                  // text: cfg.badge,
                  text: 234,
                  fontSize: 10,
                  // fill: '#ffffff',
                  fill: '#000000',
                },
              });
            // }
            // 展开收缩按钮
            if (cfg.children && cfg.children.length) {
              group.addShape('rect', {
                attrs: {
                  x: nodeOrigin.y + rectConfig.width - 8,
                  y: nodeOrigin.y + (rectConfig.height / 2) - 8,
                  width: 16,
                  height: 16,
                  stroke: 'rgba(0, 0, 0, 0.25)',
                  cursor: 'pointer',
                  fill: '#fff',
                },
                name: 'collapse-back',
                modelId: cfg.id,
              });
              // 展开收缩按钮的文字
              group.addShape('text', {
                attrs: {
                  x: nodeOrigin.y + rectConfig.width,
                  y: nodeOrigin.y + (rectConfig.height / 2),
                  textAlign: 'center',
                  textBaseline: 'middle',
                  text: cfg.collapsed ? '+' : '-',
                  fontSize: 16,
                  cursor: 'pointer',
                  fill: 'rgba(0, 0, 0, 0.25)',
                },
                name: 'collapse-text',
                modelId: cfg.id,
              });
            }
            this.drawLinkPoints(cfg, group);
            return rect;
          },
          update(cfg, item) {
            const group = item.getContainer();
            this.updateLinkPoints(cfg, group);
          },
          setState(name, value, item) {
            if (name === 'collapse') {
              const group = item.getContainer();
              const collapseText = group.find((e) => e.get('name') === 'collapse-text');
              if (collapseText) {
                if (!value) {
                  collapseText.attr({
                    text: '-',
                  });
                } else {
                  collapseText.attr({
                    text: '+',
                  });
                }
              }
            }
          },
          getAnchorPoints() {
            return [
              [0, 0.5],
              [1, 0.5],
            ];
          },
        },
        'rect',
    );
  };

  private initGraph = (data, width, height) => {
    if (!data) {
      return;
    }
    const { onInit, config } = this.props;
    const tooltip = new G6.Tooltip({
      // offsetX and offsetY include the padding of the parent container
      // offsetX 与 offsetY 需要加上父容器的 padding
      offsetX: 20,
      offsetY: 30,
      // the types of items that allow the tooltip show up
      // 允许出现 tooltip 的 item 类型
      itemTypes: ['node'],
      // custom the tooltip's content
      // 自定义 tooltip 内容
      getContent: (e) => {
        const outDiv = document.createElement('div');
        //outDiv.style.padding = '0px 0px 20px 0px';
        const nodeName = e.item.getModel().name;
        let formatedNodeName = '';
        for (let i = 0; i < nodeName.length; i++) {
          formatedNodeName = `${formatedNodeName}${nodeName[i]}`;
          if (i !== 0 && i % 20 === 0) formatedNodeName = `${formatedNodeName}<br/>`;
        }
        outDiv.innerHTML = `${formatedNodeName}`;
        return outDiv;
      },
      shouldBegin: (e) => {
        if (e.target.get('name') === 'name-shape') return true;
        return false;
      },
    });

    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      ...this.defaultConfig,
      ...config,
      plugins: [tooltip],
    });
    if (typeof onInit === 'function') {
      onInit(graph);
    }
    graph.data(data);
    graph.render();
    graph.zoom(config.defaultZoom || 1);

    const handleCollapse = (e) => {
      const target = e.target;
      const id = target.get('modelId');
      const item = graph.findById(id);
      const nodeModel = item.getModel();
      nodeModel.collapsed = !nodeModel.collapsed;
      graph.layout();
      graph.setItemState(item, 'collapse', nodeModel.collapsed);
    };
    graph.on('collapse-text:click', (e) => {
      handleCollapse(e);
    });
    graph.on('collapse-back:click', (e) => {
      handleCollapse(e);
    });
};

  private container = null;

  mounted() {
    this.$nextTick(() => {
    this.getTreeList(() => {
      this.container = document.getElementById('container');
      const width = this.container.scrollWidth || 600;
      const height = this.container.scrollHeight || 500;
      this.registerFn();
      // const { data } = this.props;
      this.initGraph(this.flowList, width, height);
    })
    });
  }

  // 获取数据
  async getTreeList (cb) {
    const url = '/resource/policy/res/list';
    const obj = {
      "resCode":"sceneNode",
      "params":{
        "sceneId":"420470860026216449",
        "versionId":"420470860026740737",
        "parentId":"420470860026740737"
      }
    }
    const result: any = await this.$Http.post(url, obj);
    this.flowList = result.data[0].sceneNodeList[0]; // eslint-disable-line
    console.log(this.flowList);
    cb();
  }
}
</script>

<style scoped lang="less">
@import "index";
</style>
