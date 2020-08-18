<!--
  @Author: lize
  @Date: 2020/5/18
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/5/18
 -->
<template>
    <div class = "iview-table-wrap main-wrap">
        <PageMenu/>
        <div class = "conent-wrap">
            <div style="display: flex;align-items: flex-start;margin: 20px;">
                <span style="margin-right: 20px;">表格单选、多选切换:</span>
                <RadioGroup v-model="checkboxType">
                    <Radio label="radio">单选</Radio>
                    <Radio label="multiple">多选</Radio>
                </RadioGroup>
            </div>

            <Table
                    border
                    ref="selection"
                    :columns="columns4"
                    :data="data1">
                <template slot-scope="{ row, index }" slot="checkbox">
                    <Checkbox v-model="data1[index].checked" @on-change = "rowCheckboxChange($event,row)" />
                </template>
            </Table>

            <pre id = "pre" v-html = "syntaxHighlight(selectAry) === '[]' ? '' : syntaxHighlight(selectAry)" />
            <pre id = "pre1" v-html = "JSON.stringify(selectAry,null,4) === '[]' ? '' : JSON.stringify(selectAry,null,4) " />
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class IviewTable extends Vue {
        private tableAllCheckboxStatus: boolean = false;   //全选按钮状态
        private checkboxType: string = "radio"  //radio 单选 multiple  多选
        private selectAry: Array<any> = [];  //当前选中的数组
        private columns4: Array<any>  = [
            {
                width: 60,
                align: 'center',
                slot:'checkbox',
                renderHeader: this.renderHeader
            },
            {
                title: 'Name',
                key: 'name'
            },
            {
                title: 'Age',
                key: 'age'
            },
            {
                title: 'Address',
                key: 'address'
            }
        ]  //表头
        private data1: Array<any> = [
            {
                id:1,
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            },
            {
                id:2,
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park',
                date: '2016-10-01'
            },
            {
                id:3,
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
            },
            {
                id:4,
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            }
        ]  //数据

        created(): void{
            this.settingRowData("checked",false,this.data1);
            this.tableAllCheckboxStatus = false;
            for(let i = 0; i<this.data1.length;i++){
                if(i ===1 || i === 2){
                    this.selectAry.push(this.data1[i]);
                }
            }
        }

        //监听checkboxType
        @Watch("checkboxType")
        checkboxTypeChange() {
            this.tableAllCheckboxStatus = false;
            this.settingRowData("checked",false,this.data1);
        }
        //监听选中数组
        @Watch("selectAry",{immediate:true,deep:true})
        selectAryChange(newValue: any){
            const newAry = [];
            for(let i = 0; i<newValue.length;i++){
                newAry.push(newValue[i].id);
            }
            for(let i = 0; i<this.data1.length;i++){
                this.data1.splice(i,1,Object.assign(this.data1[i],{"checked":newAry.includes(this.data1[i].id)}))
            }
        }

        //动态渲染iviewtable头部
        private renderHeader(h: Function, params: any, type?: string): void{
            type = type || this.checkboxType || "multiple";
            return h('span', [
                h('Checkbox', {
                    props: {
                        type: 'person',
                        value:this.tableAllCheckboxStatus,
                        disabled:type === 'radio'
                    },
                    on:{
                        "on-change":(status: boolean) =>{
                            this.tableAllCheckboxStatus = status;
                            this.settingRowData('checked',status,this.data1);
                        }
                    }
                })
            ])
        }
        //设置 iviewtable数据
        private settingRowData(rowKey: string, rowKeyValue: boolean | string, tableData: Array<any>, type?: string): undefined{
            type = type || this.checkboxType || "multiple";
            if(!tableData || !tableData.length)return;
            const obj: any = {};
            obj[rowKey] = rowKeyValue;
            this.selectAry.splice(0,this.selectAry.length);
            if(type === 'radio')return;
            // if(type === 'radio') {
            //     tableData.splice(0,1,Object.assign(tableData[0],obj))
            //     rowKeyValue ? this.selectAry.push(tableData[0]) : false ;
            //     return;
            // }
            for(let i = 0; i< tableData.length; i++){
                tableData.splice(i,1,Object.assign(tableData[i],obj));
                rowKeyValue ? this.selectAry.push(tableData[i]) : false ;
            }
        }
        //iviewtable每条checkbox发生变化
        private rowCheckboxChange(status: boolean, row: any, type?: string): undefined{
            type = type || this.checkboxType || "multiple";
            const orgData: Array<any> = this.data1;
            if(type === "radio"){
                this.selectAry.splice(0,this.selectAry.length);
                for(let i = 0;i<orgData.length;i++){
                    const target: any = JSON.parse(JSON.stringify(orgData[i]));
                    target.checked = orgData[i].id === row.id;
                    orgData.splice(i,1,target);
                    status ? orgData[i].id === row.id ? this.selectAry.push(orgData[i]) : false : false ;
                }
                return;
            }
            const findtarget: number = this.selectAry.findIndex( i => i.id === row.id );
            findtarget === -1 ? this.selectAry.push(row) : !status ? this.selectAry.splice(findtarget,1) : false ;
            this.tableAllCheckboxStatus = orgData.every(i=>i.checked);
        }
        //格式化数据
        private syntaxHighlight(json: string): string {
            if (typeof json !== 'string') {
                json = JSON.stringify(json, undefined, 2);
            }
            json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                (match: any) =>{
                    let cls: string = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                }
            );
        }
    }
</script>

<style scoped lang = "less">

</style>
<style lang = "less">
.iview-table-wrap{
    height: 100%;
    display: flex;
    .conent-wrap{
        flex: 2;
        overflow: auto;
    }
}
    #pre,#pre1 {
        outline: 1px solid #ccc;
        background: #000000;
        color: #ffffff;
        font-weight: bold;
        padding: 30px;
        text-align: left;
        min-height: 220px;
        max-height: 450px;
        overflow: auto;
        .string {
            color: green;
        }        /*字符串的样式*/
        .number {
            color: darkorange;
        }    /*数字的样式*/
        .boolean {
            color: blue;
        }        /*布尔型数据的样式*/
        .null {
            color: magenta;
        }        /*null值的样式*/
        .key {
            color: red;
        }            /*key值的样式*/
    }
</style>
