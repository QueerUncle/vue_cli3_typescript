<!--
  @Author: lize
  @Date: 2020/9/27
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/9/27
 -->
<template>
    <div style="width: 100%" id="flow-container-wrap" />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import G6 from '@antv/g6';
import indexMixins from './Mixins/index';

@Component({
  name: 'FlowChartShows',
})
export default class FlowChartShows extends Mixins(indexMixins) {
  // 定义小地图参数信息
  private minimap: any = new G6.Minimap({
    size: [150, 100],
  });

  // 场景图插件默认配置
  private defaultConfig = {
    width: 1600,
    height: 600,
    modes: {
      default: ['zoom-canvas', 'drag-canvas'],
    },
    plugins: [this.minimap],
    fitView: false,
    animate: true,
    defaultEdge: {
      shape: 'polyline',
      style: {
        lineWidth: 2,
        offset: 30,
        radius: 10,
        endArrow: true,
        stroke: '#ccc',
      },
    },
  };

  mounted(): void {
    this.customRegisterNode();
    this.initialize(this.$props.flowData);
  }

  // 自定义注册节点
  public customRegisterNode(): void {
    G6.registerNode('flow-rect', {
      shapeType: 'flow-rect',
      draw: function drawShape(cfg: any, group: any) {
        const rectConfig = {
          width: 184, // 宽
          height: 74, // 高
          lineWidth: 2, // 边框
          fontSize: 12, // 字体大小
          fill: '#fff', // 填充颜色
          radius: 4, // 边框弧度
          stroke: 'transparent', // 边框颜色
          opacity: 1, // 透明度
        };
        const textConfig = {
          textAlign: 'left', // 居左
          textBaseline: 'top', //
        };
        // 壳子
        const rect = group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            ...rectConfig,
            cursor: cfg.auth ? 'pointer' : 'not-allowed',
            fill: cfg.auth ? '#fff' : '#f7f7f7',
            stroke: cfg.auth ? 'transparent' : '#dcdee2',
          },
          name: 'flow-wrap',
        });
        // 左侧线条
        group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            width: 4,
            height: 74, // 高
            lineWidth: 1, // 边框
            fill: cfg.auth ? cfg.color : '#f7f7f7',
            radius: 4, // 边框弧度
            opacity: 1, // 透明度
          },
          name: 'border-line',
        });
        // 左侧图片
        group.addShape('image', {
          attrs: {
            x: 12,
            y: 30,
            height: 20,
            width: 20,
            cursor: cfg.auth ? 'pointer' : 'not-allowed',
            img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          },
          name: 'node-icon',
        });
        // 文字
        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: 38,
            y: 30,
            text: cfg.name,
            fontSize: 20,
            fill: cfg.auth ? '#000' : '#c5c8ce',
            cursor: cfg.auth ? 'auto' : 'not-allowed',
          },
        });
        this.drawLinkPoints(cfg, group);
        return rect;
      },
      update(cfg: any, item: any) {
        // const group = item.getContainer();
        // this.updateLinkPoints(cfg, group);
      },
      setState(name: any, value: any, item: any) {
        const group = item.getContainer();
        const shape = group.get('children')[0]; // 顺序根据 draw 时确定
        if (name === 'hover') {
          if (value) {
            shape.attr('stroke', '#1890ff');
          } else {
            shape.attr('stroke', '#ffffff');
          }
        }
        if (name === 'selected') {
          if (value) {
            shape.attr('stroke', '#1890ff');
          } else {
            shape.attr('stroke', '#ffffff');
          }
        }
      },
      getAnchorPoints() {
        return [
          [0, 0.5],
          [1, 0.5],
        ];
      },
    }, 'rect');
  }

  // 绑定事件
  private async bindEvent(graph: any): Promise<any> {
    // 点击每个节点
    graph.on('node:click', async (evt: any) => {
      const { item } = evt;
      // 是否有权限
      if (item._cfg.model.auth) {  // eslint-disable-line
        console.log(item);
      }
    });
    // 鼠标划上
    graph.on('node:mouseenter', (evt: any) => {
      const { item } = evt;
      // 是否有权限
      if (item._cfg.model.auth) {  // eslint-disable-line
        graph.setItemState(item, 'hover', true);
      }
    });
    // 鼠标离开
    graph.on('node:mouseleave', (evt: any) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', false);
    });
  }

  // 初始化并注册事件
  public initialize(data: any): void {
    if (!data.length) return;
    this.transformData(data);
    const { config } = this.configData;
    const graph = new G6.Graph({
      container: 'flow-container-wrap',
      ...this.defaultConfig,
      ...config,
    });
    console.log(graph);
    this.bindEvent(graph);
    const backUpData = JSON.parse(JSON.stringify(data));
    graph.data(this.getPosition(data, true));
    graph.render();
    graph.zoom(config.defaultZoom || 1);
    if (data?.length) {
      graph.changeData(this.getPosition(backUpData));
    }
  }
}
</script>

<style scoped lang="less">
.FlowChartShows{
  background: #F7F7F7 !important;
}
</style>
