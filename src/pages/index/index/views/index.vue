<!--
  @Author: lize
  @Date: 2020/5/13
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/5/13
 -->
<template>
    <div class = "index-wrap">
        <PageMenu/>
        <div style="margin:15px; " class = "conent-wrap">
            <p>我是index页面</p>
            <ChildComponents ref = "bbb" />
            <Button type="primary" @click = "Primary">调取子组件方法</Button>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="user">
                    <i-input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </i-input>
                </FormItem>
                <FormItem prop="password">
                    <i-input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </i-input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                </FormItem>
            </Form>
            <Button type="primary" @click="openIViewModal('1')">打开弹窗</Button>
            <Button type="primary" @click="openIViewModal('2')">打开弹窗2</Button>
            <div>
                <input type="text" v-model = "ModalOptions2.data.a" />
                <input type="text" v-model = "ModalOptions2.data.b" />
            </div>
            <div class = "input-wrap">
                <input type="text" @input = "OnInput($event, obj.info, 'day')" v-model = "obj.info.day">
            </div>

            <div class = "Cascader-wrap">
                <Cascader :data="data" v-model="value1"></Cascader>
            </div>
            <Button type="primary" @click="reset('1')">重置</Button>
            <div class = "al-selector">
                <al-selector ref = "selector" v-if="alSelector" data-type="code" level="2" v-model="res_s"/>
            </div>
            <Button type="primary" @click="resetal('1')">重置al-selector</Button>
        </div>s
        <IViewModal :ModalOptions = "ModalOptions" v-model = "formInline"></IViewModal>
        <IViewModal2 v-model = "ModalOptions2"></IViewModal2>

    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import AreaData from '@/common/assets/js/areaData.js';

    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
    ]);

    @Component({
        components:{
            ChildComponents:() => import('./ChildComponents.vue'),
            PageMenu:() => import('../components/PageMenu.vue'),
            IViewModal:() => import('../components/IViewModal.vue'),
            IViewModal2:() => import('../components/IViewModal2.vue')
        }
    })
    export default class IndexPage extends Vue {
        private value1 = [];
        private res_s = ['140000'];
        private alSelector = true;
        public data = [
            {
            value: 'beijing',
            label: '北京',
            children: [
                {
                    value: 'gugong',
                    label: '故宫'
                },
                {
                    value: 'tiantan',
                    label: '天坛'
                },
                {
                    value: 'wangfujing',
                    label: '王府井'
                }
            ]
        }, {
            value: 'jiangsu',
            label: '江苏',
            children: [
                {
                    value: 'nanjing',
                    label: '南京',
                    children: [
                        {
                            value: 'fuzimiao',
                            label: '夫子庙',
                        }
                    ]
                },
                {
                    value: 'suzhou',
                    label: '苏州',
                    children: [
                        {
                            value: 'zhuozhengyuan',
                            label: '拙政园',
                        },
                        {
                            value: 'shizilin',
                            label: '狮子林',
                        }
                    ]
                }
            ],
        }]

        private obj = {
            info:{
                day:'',
            }
        }

        public settingdata(data: any): any{
            const proList: any = data.pcaa[86];
            const newAry = [];
            for(const i in proList){
                const pro: any = {
                    value: i,
                    label: proList[i],
                    children: [],
                };
                const cityList: any = data.pcaa[i];
                for(const j in cityList){
                    const city: any = {
                        value: j,
                        label: cityList[j],
                        children: [],
                    }
                    pro.children.push(city);
                    const areaList: any = data.pcaa[j];
                    for(const o in areaList){
                        const area: any = {
                            value: o,
                            label: areaList[o],
                            children: [],
                        }
                        city.children.push(area);
                    }
                }
                newAry.push(pro)
            }
            console.log(newAry);
            this.data = newAry;
        }

        beforeRouteEnter(to: any, form: any, next: any){
            console.log(to, form, 'beforeRouteEnter')
            next();
        }

        beforeRouteLeave(to: any, form: any, next: any){
            console.log(to, form, 'beforeRouteLeave');
            if (to.name === 'TsPractice') {
                form.meta.keepalive = true;
            }
            if (to.name === 'IviewTable') {
                form.meta.keepalive = false;
            }
            next();
        }

        private formInline: object =  {
            user: '',
            password: ''
        }
        private ruleInline: object =  {
            user: [
                { required: true, message: 'Please fill in the user name', trigger: 'blur' }
            ],
            password: [
                { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
            ]
        }
        private ModalOptions: any = {
            visible:false,
            width:770,
            title:'测试弹窗'
        }
        private ModalOptions2: any = {
            visible:false,
            width:770,
            title:'测试弹窗2',
            data:{
                a:'',
                b:'',
            }
        }
        private handleSubmit(name: string): void {
            (this.$refs[name] as any).validate((valid: boolean) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
        //打开弹窗
        private openIViewModal(type: string): void{
            if(type === '1'){
                this.ModalOptions.visible = true;
            }
            if(type === '2'){
                this.ModalOptions2.visible = true;
            }
        }
        //测试调用自组件方法
        private Primary(): void{
            // (this.$refs.selection as any).selectAll(false)
            //第一种
            // (this.$refs.bbb as HTMLFormElement).asd()
            //第二种
            // (<HTMLFormElement>this.$refs.bbb).asd()
            //第三种
            const childElement: any = this.$refs.bbb;
            childElement.asd();
        }
        public OnInput(event: any, data: any, key: any): void{
            event.target.value = event.target.value.replace(/[^0-9]/g,'');
            console.log(event.target.value)
             data[key] = event.target.value;
        }
        private reset(): void{
            this.value1 = [];
        }
        private resetal(): void{
            // this.alSelector = false;
            // this.res_s = [] // eslint-disable-line
            console.log(this.res_s);
            // setTimeout(() =>{
            //     this.alSelector = true;
            // },100)
            // (this.$refs.selector as any).select = [];
        }
        created(){
            console.log(AreaData);
            this.data = AreaData;
        }
    }
</script>

<style scoped lang="less">
    .index-wrap{
        width: 100%;
        height: 100%;
        display: flex;
        .conent-wrap{
            flex: 2;
            overflow: auto;
        }
    }
</style>

