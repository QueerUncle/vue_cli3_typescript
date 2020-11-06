/*
  @Author: lize
  @Date: 2020/9/27
  @Description : 前台场景组件Mixins
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/9/27
 */
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FlowChartShows extends Vue {
  // 场景数据
  @Prop() flowData: Array<any>;

  // 全局默认配置
  public configData: any = {
    data: this.$props.flowData,
    config: {
      padding: [20, 50],
      defaultLevel: 3,
      defaultZoom: 0.8,
      modes: { default: ['zoom-canvas', 'drag-canvas'] },
    },
    nodeClick: (item: any) => {
      console.log(item);
    },
  };

  // 偏移量
  public maxMatrixY = 0;

  // 查找对象下的某个属性是否存在，存在返回，不存在返回默认值
  public findAttributeOfObject(object: any, key: string, defaultValue?: any): any {
    return object[key] || defaultValue;
  }

  // 获取对象下所有子集的某个属性
  public getKeys(data: Array<any>, keys: string[]): void{
    if (!data || !data.length) return;
    for (let i = 0; i < data.length; i += 1) {
      const { id } = data[i];
      const children = this.findAttributeOfObject(data[i], 'children', []);
      keys.push(id);
      if (children.length) {
        this.getKeys(children, keys);
      }
    }
  }

  // 转换数据，生成图标数据
  public transformData(data: any[], parentIndex?: string): void{
    if (!data || !data.length) return;
    const {
      config: { defaultLevel = 10, padding = [20, 20] },
    } = this.configData;
    data.forEach((item: any, index: number) => {
      const children = this.findAttributeOfObject(item, 'children', []);
      const recordIndex = parentIndex !== undefined ? parentIndex + '-' + index : index + ''; // eslint-disable-line
      this.maxMatrixY = index === 0 ? this.maxMatrixY : this.maxMatrixY + 1;
      const recordLength = recordIndex.split('-').length;
      const childrenKeys: string[] = [];
      if (children.length) {
        this.getKeys(children, childrenKeys);
      }
      item = {
        ...item,
        id: item.id,
        x: padding[0],
        y: padding[1],
        recordIndex,
        collapsed: recordLength >= defaultLevel,
        hasChildren: children.length,
        childrenKeys,
      };
      data[index] = item;
      if (children.length) {
        this.transformData(this.findAttributeOfObject(item, 'children', []), recordIndex);
      }
    });
  }

  // 计算位置
  public getPosition(data: any, init?: boolean): any {
    this.maxMatrixY = 0;
    const graphData = {
      nodes: [],
      edges: [],
    };
    if (!data) return graphData;
    if (init) {
      this.initAnimateData(data, graphData);
    } else {
      this.recursion(data, 0, graphData);
    }
    console.log(graphData, 'graphDatagraphData');
    return graphData;
  }

  // 重新计算位置
  public recursion(
    data: any[],
    parentMatrixX: number,
    graphData: GraphData,
    parentId?: string,
    parentX?: number,
    parentY?: number,
    parentAnimate?: string,
  ): void {
    if (!data || !data.length) return;
    const {
      config: { padding = [20, 20], nodesMargin = [250, 100], coefficient = [0.2, -0.1] },
  } = this.configData;
    data.forEach((item: any, index: number) => {
      const matrixX = parentMatrixX || 0;
      const CopyChildren = this.findAttributeOfObject(item, 'children', []);
      const animate = this.findAttributeOfObject(item, 'animate', false);
      const afterDrawHidden = this.findAttributeOfObject(item, 'afterDrawHidden', false);
      const collapsed = this.findAttributeOfObject(item, 'collapsed');
      this.maxMatrixY = index === 0 || afterDrawHidden ? this.maxMatrixY : this.maxMatrixY + 1;
      const currentX = afterDrawHidden || parentAnimate === 'expand'
          ? parentX
          : matrixX * nodesMargin[0] + padding[0];
      const currentY = afterDrawHidden || parentAnimate === 'expand'
          ? parentY
          : this.maxMatrixY * nodesMargin[1] + padding[1];
      item = {
        ...item,
        id: item.id,
        matrixX,
        matrixY: this.maxMatrixY,
        x: currentX,
        y: currentY,
        type: 'flow-rect',
        coefficientX: coefficient[0],
        coefficientY: coefficient[1],
        hasChildren: CopyChildren.length,
        collapsed: item.collapsed || false,
      };
      data[index] = item;
      const { children , ...model } = item; // eslint-disable-line
      console.log(item, '234234234234');
      graphData.nodes.push(model);
      if (parentId) {
        graphData.edges.push({
          source: parentId,
          target: item.id,
          targetAnchor: 0,
          sourceAnchor: 1,
          type: index === 0 ? 'line' : 'flow-cubic',
        });
      }
      if ((CopyChildren.length && animate) || (CopyChildren.length && !collapsed)) {
        this.recursion(
          CopyChildren,
          afterDrawHidden ? matrixX : matrixX + 1,
          graphData,
          item.id,
          currentX,
          currentY,
          animate,
        );
      }
    });
  }

  // 生成初始化数据，为了动画而动画
  public initAnimateData(data: any[], graphData: GraphData): void{
    console.log('asdasdasd');
    if (!data || !data.length) return;
    data.forEach((item) => {
      const CopyChildren = this.findAttributeOfObject(item, 'children', []);
      const collapsed = this.findAttributeOfObject(item, 'collapsed');
      const { children, ...model } = item;
      graphData.nodes.push(model);
      if (CopyChildren.length && !collapsed) {
        this.initAnimateData(this.findAttributeOfObject(item, 'children', []), graphData);
      }
    });
    // for (let i = 0; i < data.length; i += 1) {
    //   const CopyChildren = this.findAttributeOfObject(data[i], 'children', []);
    //   const collapsed = this.findAttributeOfObject(data[i], 'collapsed');
    //   const { children, ...model } = data[i]; // eslint-disable-line
    //   graphData.nodes.push(model);
    //   if (children.length && !collapsed) {
    //     this.initAnimateData(this.findAttributeOfObject(data[i], 'children', []), graphData);
    //   }
    // }
  }
}
