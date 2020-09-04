<!--
  @Author: lize
  @Date: 2020/5/14
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/5/14
 -->
<template>
    <div>
        <p @click = "textClick">{{$props.title}}</p>
    </div>
</template>

<script lang="ts">
    import {
        Component, Vue, Prop, Emit,
    } from 'vue-property-decorator';

    @Component
    export default class ChildComponents extends Vue {
        @Prop({
            type: String,
        }) title;

        @Emit('update:title')
        titleChange(newValue: any): any{
            return newValue
        }

        private asd(): void{
            console.log("我是字组件")
        }

        private textClick(): void {
            this.titleChange('我是自组件返回来的！');
        }
    }
</script>

<style scoped lang="less">

</style>
