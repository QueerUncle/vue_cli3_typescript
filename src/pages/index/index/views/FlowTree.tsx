/*
  @Author: lize
  @Date: 2020/9/24
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/9/24
 */
import {Component, Vue} from 'vue-property-decorator';
import G6 from '@antv/g6';
import PageMenu from "@/pages/index/index/components/PageMenu.vue";

type STATUS = 'I' | 'C' | 'S';

interface ListItem {
    id: string;
    name: string;
    count: number;
    label: string;
    rate: number;
    status: STATUS; // 状态
    childList?: ListItem[];
}

export interface CProps {
    data?: ListItem[];
    config?: any;
    onInit?: (instance: any) => void;
    nodeClick?: (nodeItem: ListItem) => void;
}

interface GraphData {
    nodes: object[];
    edges: object[];
}

const minimap = new G6.Minimap({
    size: [150, 100],
});

@Component({
    name: 'FlowTree',
})
export default class FlowTree extends Vue {
    // 模拟数据
    private mockData: any = {
        id: '1',
        uuid: '1', // 自定义id
        name: '项目报备',
        main: true, // 是否是主节点 是：yes  否：no
        icon: '', // 图标
        color: '#4edf78', // 颜色
        customColor: '', // 自定义颜色
        auth: true, // 权限,
        childList: [
            {
                id: '2',
                uuid: '2', // 自定义id
                name: '项目立项',
                main: false, // 是否是主节点 是：yes  否：no
                icon: '', // 图标
                color: 'yellow', // 颜色
                customColor: '', // 自定义颜色
                auth: true, // 权限,
                childList: [
                    {
                        id: '3',
                        uuid: '3', // 自定义id
                        name: '临时任务单',
                        main: false, // 是否是主节点 是：yes  否：no
                        icon: '', // 图标
                        color: 'red', // 颜色
                        customColor: '', // 自定义颜色
                        auth: false, // 权限,
                        childList: [
                            {
                                id: '36',
                                uuid: '36', // 自定义id
                                name: '临时任务单',
                                main: false, // 是否是主节点 是：yes  否：no
                                icon: '', // 图标
                                color: 'red', // 颜色
                                customColor: '', // 自定义颜色
                                auth: true, // 权限,
                                childList: [],
                            },
                            {
                                id: '37',
                                uuid: '37', // 自定义id
                                name: '临时任务单',
                                main: false, // 是否是主节点 是：yes  否：no
                                icon: '', // 图标
                                color: 'red', // 颜色
                                customColor: '', // 自定义颜色
                                auth: false, // 权限,
                                childList: [
                                    {
                                        id: '345',
                                        uuid: '3756', // 自定义id
                                        name: '临时任务单',
                                        main: false, // 是否是主节点 是：yes  否：no
                                        icon: '', // 图标
                                        color: 'red', // 颜色
                                        customColor: '', // 自定义颜色
                                        auth: true, // 权限,
                                        childList:[
                                            {
                                                id: '3435',
                                                uuid: '37456', // 自定义id
                                                name: '临时任务单',
                                                main: false, // 是否是主节点 是：yes  否：no
                                                icon: '', // 图标
                                                color: 'red', // 颜色
                                                customColor: '', // 自定义颜色
                                                auth: true, // 权限,
                                                childList: [],
                                            }
                                        ],
                                    }
                                ],
                            }
                        ],
                    },
                    {
                        id: '4',
                        uuid: '4', // 自定义id
                        name: '投标任务单',
                        main: false, // 是否是主节点 是：yes  否：no
                        icon: '', // 图标
                        color: 'pink', // 颜色
                        customColor: '', // 自定义颜色
                        auth: true, // 权限,
                        childList: [],
                    },
                    {
                        id: '5',
                        uuid: '5', // 自定义id
                        name: '正式任务单',
                        main: false, // 是否是主节点 是：yes  否：no
                        icon: '', // 图标
                        color: '', // 颜色
                        customColor: '', // 自定义颜色
                        auth: true, // 权限,
                        childList: [],
                    }
                ]
            }
        ],
    };

    private props: CProps = {
        data: this.mockData,
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

    // 默认配置
    private defaultConfig = {
        width: 1600,
        height: 600,
        modes: {
            default: ['zoom-canvas', 'drag-canvas'],
        },
        plugins:[minimap],
        fitView: false,
        animate: true,
        defaultEdge: {
            shape:'polyline',
            style: {
                lineWidth:2,
                offset:30,
                radius:10,
                endArrow:true,
                stroke: '#ccc',
            },
        },
    };

    /**
     * 简易get，项目中请使用lodash的get
     * @param {Object} object 查找对象
     * @param {string} path 查找路径
     * @param {*} defaultValue 默认值
     */
    private get = (object: any, path: string, defaultValue?: any) => {
        return object[path] || defaultValue;
    };

    private maxMatrixY = 0;

    private initGraph(data?: ListItem[]) {
        if (!data?.length) return;
        this.transformData(data);
        const { onInit, config } = this.props;
        const graph = new G6.Graph({
            container: 'container',
            ...this.defaultConfig,
            ...config,
        });
        this.initEvent(graph);
        if (typeof onInit === 'function') {
            onInit(graph);
        }
        const backUpData = JSON.parse(JSON.stringify(data));
        graph.data(this.getPosition(data, true));
        graph.render();
        graph.zoom(config.defaultZoom || 1);
        if (data?.length) {
            console.log(1);
            graph.changeData(this.getPosition(backUpData));
        }
    }

    private async initEvent (graph: any): Promise<any>{
        // 点击每个节点
        graph.on('node:click', async (evt: any) => {
            console.log(evt, 'evtevtevt');
        });
        // 鼠标划上
        graph.on('node:mouseenter', (evt: any) => {
            const { item } = evt;
            if(item._cfg.model.auth) { // 是否有权限
                graph.setItemState(item, 'hover', true);
            }
        });
        // 鼠标离开
        graph.on('node:mouseleave', (evt: any) => {
            const { item } = evt;
            graph.setItemState(item, 'hover', false);
        });
    }

     // 计算位置
    private getPosition(data: ListItem[] | undefined, init?: boolean): any{
        console.log('我来了')
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
        console.log(graphData)
        return graphData;
    }

    /**
     * 数据转换，生成图表数据
     */
    private transformData(data: any[], parentIndex?: string): void{
        if (!data || !data.length) return;
        const {
            config: { defaultLevel = 10, padding = [20, 20] },
        } = this.props;
        data.forEach((item, index) => {
            const { status, rate } = item;
            const children = this.get(item, 'childList', []);
            const recordIndex = parentIndex !== undefined ? parentIndex + '-' + index : index + '';
            this.maxMatrixY = index === 0 ? this.maxMatrixY : this.maxMatrixY + 1;
            const recordLength = recordIndex.split('-').length;
            const childrenKeys: string[] = [];
            if (children.length) {
                this.getKeys(children, childrenKeys);
            }
            let lightColor: string;
            if (status === 'I') {
                lightColor = '#DCDFE5';
            } else {
                lightColor = rate >= 0.95 ? '#1890FF' : '#EB2F96';
            }
            item = {
                ...item,
                lightColor,
                id: item.id,
                label:item.name,
                x: padding[0],
                y: padding[1],
                recordIndex,
                collapsed: recordLength >= defaultLevel,
                hasChildren: children.length,
                childrenKeys,
            };
            data[index] = item;
            if (children.length) {
                this.transformData(this.get(item, 'childList', []), recordIndex);
            }
        });
    }

    /**
     * 生成初始化数据，为了动画而动画
     */
    private initAnimateData(data: any[], graphData: GraphData): void{
        if (!data || !data.length) return;
        data.forEach((item) => {
            const children = this.get(item, 'childList', []);
            const collapsed = this.get(item, 'collapsed');
            const { childList, ...model } = item;
            graphData.nodes.push(model);
            if (children.length && !collapsed) {
                this.initAnimateData(this.get(item, 'childList', []), graphData);
            }
        });
    }
    /**
     * 递归
     */
    private recursion(
        data: any[],
        parentMatrixX: number,
        graphData: GraphData,
        parentId?: string,
        parentX?: number,
        parentY?: number,
        parentAnimate?: string,
    ): void{
        if (!data || !data.length) return;
        const {
            config: { padding = [20, 20], nodesMargin = [250, 100], coefficient = [0.2, -0.1] },
        } = this.props;
        data.forEach((item, index) => {
            const matrixX = parentMatrixX || 0;
            const children = this.get(item, 'childList', []);
            const animate = this.get(item, 'animate', false);
            const afterDrawHidden = this.get(item, 'afterDrawHidden', false);
            const collapsed = this.get(item, 'collapsed');
            this.maxMatrixY = index === 0 || afterDrawHidden ? this.maxMatrixY : this.maxMatrixY + 1;

            const currentX =
                afterDrawHidden || parentAnimate === 'expand'
                    ? parentX
                    : matrixX * nodesMargin[0] + padding[0];
            const currentY =
                afterDrawHidden || parentAnimate === 'expand'
                    ? parentY
                    : this.maxMatrixY * nodesMargin[1] + padding[1];

            item = {
                ...item,
                id: item.id,
                label:item.name,
                matrixX,
                matrixY: this.maxMatrixY,
                x: currentX,
                y: currentY,
                type: 'flow-rect',
                coefficientX: coefficient[0],
                coefficientY: coefficient[1],
                hasChildren: children.length,
                collapsed: item.collapsed || false,
            };
            data[index] = item;
            const { childList, ...model } = item;
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
            if ((children.length && animate) || (children.length && !collapsed)) {
                this.recursion(
                    children,
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

    // 获取keys, 折叠、展开时直接使用
    private getKeys(data: ListItem[], keys: string[]): void{
        if (!data || !data.length) return;
        data.forEach((item) => {
            const { id } = item;
            const children = this.get(item, 'childList', []);
            keys.push(id);
            if (children.length) {
                this.getKeys(children, keys);
            }
        });
    }

    mounted(){
        this.registerFn();
        this.initGraph([this.mockData]);
    }

    public registerFn(): void {
        G6.registerNode('flow-rect', {
            shapeType: 'flow-rect',
            draw: function drawShape(cfg: any, group: any) {
                const rectConfig = {
                    width: 184, // 宽
                    height: 74, // 高
                    lineWidth: 2, // 边框
                    fontSize: 12, // 字体大小
                    fill: '#fff', //填充颜色
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
                        stroke:cfg.auth ? 'transparent' : '#dcdee2'
                    },
                    name: 'flow-wrap'
                });
                // 左侧线条
                group.addShape('rect', {
                    attrs: {
                        x: 0,
                        y: 0,
                        width:4,
                        height: 74, // 高
                        lineWidth: 1, // 边框
                        fill: cfg.auth ? cfg.color : '#f7f7f7',
                        radius: 4, // 边框弧度
                        opacity: 1, // 透明度
                    },
                    name: 'border-line'
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
                if(name === 'hover') {
                    if(value) {
                        shape.attr('stroke', '#1890ff');
                    } else {
                        shape.attr('stroke', '#ffffff');
                    }
                }
                if (name === 'selected') {
                    if(value) {
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
        },'rect');
    }
    render(){
        return (
            <div class="FlowTree" style={{height:"100%",display:"flex"}}>
                <PageMenu />
                <div class = "content-wrap" style={{flex:2,overflow:'auto'}}>
                    <div style={"width:400px:height:500px"}>
                        <div style={"width:100%"} id="container"/>
                    </div>
                </div>
            </div>
        )
    }
}
