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
    <div class = "tree-vue-wrap">
        <PageMenu/>
        <div class = "content-wrap">
            <ProcessTree :treeData = "treeData" />
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable*/
    import {Component, Vue} from 'vue-property-decorator';
    // import ProcessTree from 'process-tree-vue';
    const { ProcessTree } = require('process-tree-vue');

    console.log(ProcessTree, 'ProcessTreeProcessTree');

    @Component({
        name: 'TreeVue',
        components: {
            ProcessTree,
        }
    })
    export default class TreeVue extends Vue {

        public treeData = [
            {
                name:'节点1'
            },
            {
                name:'节点1',
                children:[
                    {name:'节点2'}
                ]
            },
            {
                name:'节点1',
                children:[
                    {name:'节点2',children:[{name:'节点3'}]}
                ]
            },
            {
                name:'节点1',
                children:[
                    {name:'节点5'},
                    {name:'节点5',isLong:true},
                    {name:'节点26',children:[
                            {name:'节点3'},
                            {name:'节点3'},
                            {name:'节点33',
                                children:[
                                    {name:'节点3'},
                                    {name:'节点3',
                                        children:[
                                            {name: '节点44'}
                                        ]
                                    },
                                    {name:'节点3'}
                                ]
                            }
                        ]},
                    {name:'节点3',children:[{name:'节点3'},{name:'节点3'}]},
                    {name:'节点4',children:[{name:'节点3'}]},
                    {name:'节点5',isLong:true},
                ]
            }]
    }
</script>

<style scoped lang="less">
.tree-vue-wrap{
    height: 100%;
    display: flex;
    .content-wrap {
        flex: 2;
        overflow: auto;
        position: relative;
    }
}
</style>
