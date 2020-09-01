<!--
  @Author: lize
  @Date: 2020/8/28
  @Description : 流程图组件
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/8/28
 -->
<template>
    <div class = "flow-chart-wrap">
        <div
                class = "flow-item-wrap"
                v-for="(item, index) in renderData"
                :class = "index?'noFirstChild':'firstChild'"
                :key="item.uuid">
            <div class = "item-info-wrap">
                <div class = "text-wrap" @click = "handleItemClick(item)">
                    <Tooltip :content="item.name" placement="top" transfer>
                        <Icon v-if="item.main" class="icon-wrap" type="logo-freebsd-devil" />
                        <span
                            class = "title-wrap"
                            :style = "{width: item.main ? '100%' : '80px'}">
                            {{item.name}}
                        </span>
                    </Tooltip>
                </div>
                <div class = "active-wrap">
                    <span v-if="item.children&& item.children.length" class = "line-solid-wrap">
              <span></span>
            </span>
                    <span
                        v-if="
                         (!item.children
                          || !item.children.length)
                          &&  $props.type === 'edit'"
                          class = "line-dashes-wrap">
                        <span></span>
                    </span>
                    <span v-if="item.children&& item.children.length" class = "line-solid-wrap">
                        <span />
                    </span>
                </div>
            </div>
            <div
                class = "flow-chart-children-wrap"
                :class="item.children.length>1?'multiply-node':'single-node'"
                v-if="item.children && item.children.length">
                <FlowChart
                    childNode = "true"
                    :searchRenderList = "$props.searchRenderList"
                    :flowChartData = "item.children"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        Component, Vue, Prop, Watch, Emit,
    } from 'vue-property-decorator';

    @Component({
        name: 'FlowChart',
    })
    export default class FlowChart extends Vue {
        // 点击树节点
        @Emit('on-flowItem-click') onFlowItemClick(item: any): any {} // eslint-disable-line

        // 当前状态
        @Prop() type: string;

        // 流程图数据
        @Prop() flowChartData: Array<any>;

        // 是否是自节点
        @Prop() childNode: boolean;

        // 搜索组件数据
        @Prop() searchRenderList: Array<any>;

        private renderData: Array<any> = [];

        @Watch('$props.flowChartData', { deep: true, immediate: true })
        flowChartDataChange(newValue): void {
            if (newValue && newValue.length) {
                this.renderData = this.convert(JSON.parse(JSON.stringify(newValue)));
            }
        }

        // 添加自定义id
        convert(arr: Array<any>): any {
            return arr.map((item: any) => {
                item.uuid = this.$UtilsTools.uuid();
                if (item.children && item.children.length > 0) {
                    item.children = this.convert(item.children);
                }
                return item;
            });
        }

        // 点击每个节点
        public handleItemClick(item: any): void {
            console.log(item);
            this.onFlowItemClick(item);
        }

        // 自定义搜索组件Chang
        public CustomAccountSearchChange(checkedList: Array<any>, status: boolean): void {
            console.log(checkedList, status);
        }
    }
</script>

<style scoped lang="less">
    @import "./CustomTree.less";
</style>
