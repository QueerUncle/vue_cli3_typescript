<!--
  @Author: lize
  @Date: 2020/8/27
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/8/27
 -->
<template>
    <div class = "custom-tree-vue">
        <PageMenu/>
        <div class = "content-wrap">
            <CustomTree :data = "CustomTreeData" />
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'CustomTreeVue',
        components: {
            CustomTree: () => import('@/pages/index/index/components/CustomTree.vue'),
        }
    })
    export default class CustomTreeVue extends Vue {
        public CustomTreeData: Array<any> = [
            {
                name:'节点1',
                children:[
                    {
                        name:'节点2',
                        children:[
                            {
                                name:'节点3',
                                children:[
                                    {
                                        name:'节点3',
                                        children:[
                                            {
                                                name:'节点3'
                                            },
                                            {
                                                name:'节点4'
                                            }
                                        ]
                                    },
                                    {
                                        name:'节点4',
                                        children:[
                                            {
                                                name:'节点3',
                                                children:[
                                                    {
                                                        name:'节点3'
                                                    },
                                                    {
                                                        name:'节点4',
                                                        children:[
                                                            {
                                                                name:'节点3'
                                                            },
                                                            {
                                                                name:'节点4'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                name:'节点4'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name:'节点4'
                            },
                            {
                                name:'节点5'
                            }
                        ]
                    }
                ]
            },
        ]
    }
</script>

<style scoped lang="less">
    .custom-tree-vue{
        height: 100%;
        display: flex;
        .content-wrap {
            flex: 2;
            overflow: auto;
        }
    }
</style>
