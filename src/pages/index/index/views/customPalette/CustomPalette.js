/*
  @Author: lize
  @Date: 2020/9/16
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/9/16
 */
export default class CustomPalette {
    constructor(create, elementFactory, palette) {
        this.create = create;
        this.elementFactory = elementFactory;
        palette.registerProvider(this);
    }


    // 这个是绘制palette的核心，函数名不要变
    getPaletteEntries() {
        const elementFactory = this.elementFactory;
        const create = this.create;

        function dragEventFactory(type) {
            return function (event) {
                const taskShape = elementFactory.create('shape', {
                    type: type
                });
                create.start(event, taskShape);
            };
        }

        return {
            'create.cake': {
                title: '我是自定义节点-草莓蛋糕',    // 鼠标悬浮到节点上显示的文字
                className: 'icon-custom bpmn-icon-cake',   // 样式名
                action: {      // 操作该节点时会触发的事件，此时只注册一个拖动事件即可，否则拖动时没有效果
                    dragstart: dragEventFactory('bpmn:Task')
                }
            }
        };
    }
}
CustomPalette.$inject = [
    'create',
    'elementFactory',
    'palette'
];
