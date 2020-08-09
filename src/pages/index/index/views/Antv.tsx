/*
  @Author: lize
  @Date: 2020/7/29
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/7/29
 */
import {Component, Vue} from 'vue-property-decorator';
import G6 from '@antv/g6';
import PageMenu from "@/pages/index/index/components/PageMenu.vue";

@Component({
    name: 'Antv',
})
export default class Antv extends Vue {
    private imgSrc = '';

    // 定义数据源
    private data: any = {
        id: 'root',
        label: 'root',
        children: [
            {
                id: 'c1',
                label: 'c1',
                children: [
                    {
                        id: 'c1-1',
                        label: 'c1-1',
                    },
                    {
                        id: 'c1-2',
                        label: 'c1-2',
                        children: [
                            {
                                id: 'c1-2-1',
                                label: 'c1-2-1'
                            },
                            {
                                id: 'c1-2-2',
                                label: 'c1-2-2'
                            },
                        ]
                    },
                ]
            },
            {
                id: 'c2',
                label: 'c2'
            },
            // {
            //     id: 'c3',
            //     label: 'c3',
            //     // children: [
            //     //     {
            //     //         id: 'c3-1',
            //     //         label: 'c3-1'
            //     //     },
            //     //     {
            //     //         id: 'c3-2',
            //     //         label: 'c3-2',
            //     //         children: [
            //     //             {
            //     //                 id: 'c3-2-1',
            //     //                 label: 'c3-2-1'
            //     //             },
            //     //             {
            //     //                 id: 'c3-2-2',
            //     //                 label: 'c3-2-2'
            //     //             },
            //     //             {
            //     //                 id: 'c3-2-3',
            //     //                 label: 'c3-2-3'
            //     //             },
            //     //         ]
            //     //     },
            //     //     {
            //     //         id: 'c3-3',
            //     //         label: 'c3-3'
            //     //     },
            //     // ]
            // }
        ]
    };

    public COLLAPSE_ICON(x: any, y: any, r: any): Array<any>{
        return [
            ['M', x - r, y - r],
            ['a', r, r, 0, 1, 0, r * 2, 0],
            ['a', r, r, 0, 1, 0, -r * 2, 0],
            ['M', x + 2 - r, y - r],
            ['L', x + r - 2, y - r],
        ];
    }

    public EXPAND_ICON(x: any, y: any, r: any): Array<any>{
        return [
            ['M', x - r, y - r],
            ['a', r, r, 0, 1, 0, r * 2, 0],
            ['a', r, r, 0, 1, 0, -r * 2, 0],
            ['M', x + 2 - r, y - r],
            ['L', x + r - 2, y - r],
            ['M', x, y - 2 * r + 2],
            ['L', x, y - 2],
        ];
    }

    mounted(){
        // const graph: any = new G6.Graph({
        //     container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
        //     // 画布宽高
        //     width: 800,
        //     height: 500,
        // });
        //
        // console.log(graph,'graphgraphgraph')
        // // 读取数据
        // graph.data(this.data);
        // // 渲染图
        // graph.render();
        // G6.Util.traverseTree(this.data, (d: any)  => {
        //     d.leftIcon = {
        //         style: {
        //             fill: '#e6fffb',
        //             stroke: '#e6fffb'
        //         },
        //         img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ'
        //     }
        //     return true
        // })

        // 设置icon样式
        G6.registerNode('icon-node', {
            options: {
                size: [60, 20],
                stroke: '#91d5ff',
                fill: '#91d5ff'
            },
            draw(cfg: any, group: any) {
                const styles = this.getShapeStyle(cfg)
                const { labelCfg = {} } = cfg

                const keyShape = group.addShape('rect', {
                    attrs: {
                        ...styles,
                        x: 0,
                        y: 0
                    }
                })

                /**
                 * leftIcon 格式如下：
                 *  {
                 *    style: ShapeStyle;
                 *    img: ''
                 *  }
                 */
                if (cfg.leftIcon) {
                    const { style, img } = cfg.leftIcon
                    // group.addShape('rect', {
                    //     attrs: {
                    //         x: 1,
                    //         y: 1,
                    //         width: 38,
                    //         height: styles.height - 2,
                    //         fill: '#8c8c8c',
                    //         ...style
                    //     }
                    // })

                    // group.addShape('image', {
                    //     attrs: {
                    //         x: 8,
                    //         y: 8,
                    //         width: 24,
                    //         height: 24,
                    //         img: img || 'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
                    //     },
                    //     name: 'image-shape',
                    // });
                }

                // // 如果不需要动态增加或删除元素，则不需要 add 这两个 marker
                // group.addShape('marker', {
                //     attrs: {
                //         x: 40,
                //         y: 52,
                //         r: 6,
                //         stroke: '#73d13d',
                //         cursor: 'pointer',
                //         symbol: this.EXPAND_ICON
                //     },
                //     name: 'add-item'
                // })
                //
                // group.addShape('marker', {
                //     attrs: {
                //         x: 80,
                //         y: 52,
                //         r: 6,
                //         stroke: '#ff4d4f',
                //         cursor: 'pointer',
                //         symbol: this.COLLAPSE_ICON
                //     },
                //     name: 'remove-item'
                // })

                if (cfg.label) {
                    group.addShape('text', {
                        attrs: {
                            ...labelCfg.style,
                            text: cfg.label,
                            x: 50,
                            y: 25,
                        }
                    })
                }

                return keyShape
            }
        }, 'rect')

        G6.registerEdge('flow-line', {
            draw(cfg: any, group: any) {
                const startPoint = cfg.startPoint;
                const endPoint = cfg.endPoint;

                const { style } = cfg
                const shape: any = group.addShape('path', {
                    attrs: {
                        stroke: style.stroke,
                        endArrow: style.endArrow,
                        path: [
                            ['M', startPoint.x, startPoint.y],
                            ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                            ['L', endPoint.x, (startPoint.y + endPoint.y) / 2,],
                            ['L', endPoint.x, endPoint.y],
                        ],
                    },
                });
                return shape;
            }
        });

        // 设置鼠标划过边框的样式
        const defaultStateStyles = {
            hover: {
                stroke: '#1890ff',
                lineWidth: 2
            }
        }

        // 设置元素样式
        const defaultNodeStyle = {
            fill: '#91d5ff',
            stroke: '#40a9ff',
            radius: 5
        }

        // 设置连接线样式
        const defaultEdgeStyle = {
            stroke: '#91d5ff',
            endArrow: {
                path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
                fill: '#91d5ff',
                d: -20
            }
        }

        const defaultLayout = {
            type: 'compactBox',
            direction: 'TB',
            getId: function getId(d: any) {
                return d.id;
            },
            getHeight: function getHeight() {
                return 16;
            },
            getWidth: function getWidth() {
                return 16;
            },
            getVGap: function getVGap() {
                return 40;
            },
            getHGap: function getHGap() {
                return 70;
            },
        }

        // 设置元素内字体样式
        const defaultLabelCfg = {
            style: {
                fill: '#000',
                fontSize: 12
            }
        }

        const width: any = (document.getElementById('container') as any).scrollWidth;
        const height: any = (document.getElementById('container') as any).scrollHeight || 500;

        // 设置缩略图
        const minimap = new G6.Minimap({
            size: [150, 100]
        })

        // 设置 tooltip
        const tooltip = new G6.Tooltip({
            offset: 10,
            getContent(e: any) {
                const outDiv = document.createElement('div');
                outDiv.style.width = '180px';
                outDiv.innerHTML = `<div>${e.item.getModel().label}</div>`
                return outDiv
            },
        })

        const graph = new G6.TreeGraph({
            container: 'container',
            width,
            height,
            linkCenter: true,
            // plugins: [tooltip],
            modes: {
                default: [
                    'drag-canvas',
                    // 'zoom-canvas', // 是痘可以放大
                ],
            },
            defaultNode: {
                type: 'icon-node',
                size: [120, 40],
                style: defaultNodeStyle,
                labelCfg: defaultLabelCfg
            },
            defaultEdge: {
                type: 'flow-line',
                style: defaultEdgeStyle,
            },
            nodeStateStyles: defaultStateStyles,
            edgeStateStyles: defaultStateStyles,
            layout: defaultLayout
        });

        graph.data(this.data);
        graph.render();
        graph.fitView();

        graph.on('node:mouseenter', (evt: any) => {
            const { item } = evt
            graph.setItemState(item, 'hover', true)
        })

        graph.on('node:mouseleave', (evt: any) => {
            const { item } = evt
            graph.setItemState(item, 'hover', false)
        })
        graph.on('node:afterlayout', (evt: any) => {
           console.log(evt,'asdasdasdasd')
        })

        this.$nextTick(() =>{
            // setTimeout(() =>{
            //     const canvas: any = (document.querySelector('#container canvas'));
            //     console.log(canvas.toDataURL("image/png"));
            //     this.imgSrc = canvas.toDataURL("image/png")
            // },6000)
        })

        // graph.on('node:click', evt => {
        //     const { item, target } = evt
        //     const targetType = target.get('type')
        //     const name = target.get('name')
        //
        //     // 增加元素
        //     if (targetType === 'marker') {
        //         const model = item.getModel()
        //         if (name === 'add-item') {
        //             if (!model.children) {
        //                 model.children = []
        //             }
        //             const id = `n-${Math.random()}`;
        //             model.children.push({
        //                 id,
        //                 label: id.substr(0, 8),
        //                 leftIcon: {
        //                     style: {
        //                         fill: '#e6fffb',
        //                         stroke: '#e6fffb'
        //                     },
        //                     img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ'
        //                 }
        //             })
        //             graph.updateChild(model, model.id)
        //         } else if (name === 'remove-item') {
        //             graph.removeChild(model.id)
        //         }
        //     }
        // })
    }

    render(){
        return (
            <div class="Antv-wrap" style={{height:"100%",display:"flex"}}>
                <PageMenu />
                <div class = "content-wrap" style={{flex:2,overflow:'auto'}}>
                    {/*<i-poptip title="Title" content="content">*/}
                    {/*    <i-button>Click</i-button>*/}
                        <div style={"width:400px:height:500px"}>
                            <div style={"width:100%"} id="container"/>
                        </div>
                    {/*</i-poptip>*/}
                </div>
                <img src={this.imgSrc} alt=""/>
            </div>
        )
    }
}
