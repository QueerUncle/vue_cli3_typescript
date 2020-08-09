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
    <div class = "ts-practice-wrap">
        <PageMenu/>
        <div class = "content-wrap">
            我是ts-practice-wrap
        </div>
    </div>
</template>

<script lang="ts">
    interface LabelledValue {
        label: string;
        size?: number;
        [propName: string]: any;
    }
    import { Component, Vue } from 'vue-property-decorator';
    // import '../interface'
    @Component({
        components:{
            PageMenu:() => import('../components/PageMenu.vue')
        }
    })
    export default class TsPractice extends Vue {

        private myObj = { sizesssssss: 20, label: "Size 10 Object" };
        private myIdentity: GenericIdentityFn = this.identity;
        private x: object = { a: "asdasdasdasdasd", b: 2, c: 3, d: 4 };
        created(): void{
            this.printLabel(this.myObj);
            this.identity(89)
            this.loggingIdentity([8,9,'asdasd'])
            this.myIdentity(34234234234234)
            this.loggingIdentityTest(["a","s","v","asdasd"])
            this.loggingIdentityTest({length:120,a:'b'})
            // this.getProperty(this.x,'a');
        }
        //接口测试
        private printLabel(labelledObj: LabelledValue): void {
            const olgbj = {size:10,label:'lize'};
            if(labelledObj.size){
                olgbj.size = labelledObj.size;
            }
            console.log(olgbj)
        }
        //泛型测试
        private identity<T>(age: T): T{
            console.log(age);
            return age;
        }
        private loggingIdentity<T>(arg: T[]): T[] {
            console.log(arg.length);  // Array has a .length, so no more error
            return arg;
        }
        private loggingIdentityTest<T extends Lengthwise>(arg: T): T {
            console.log(arg.length);  // Now we know it has a .length property, so no more error
            return arg;
        }
        // 不知道啥意思还报错，但不影响使用      这里用到了key of关键字，再结合上篇文章中介绍的extends关键字
        private getProperty<T, K extends keyof T>(obj: T, key: K): T[K]{
            console.log('我来啦',obj,key)
            return obj[key];
        }
    }
</script>

<style scoped lang="less">
.ts-practice-wrap{
    height: 100%;
    display: flex;
    .content-wrap{
        flex:2;
        overflow: auto;
    }
}
</style>
