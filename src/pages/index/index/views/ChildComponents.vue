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
    <div>我是自组件</div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class ChildComponents extends Vue {
        private asd(): void{
            console.log("我是字组件")
        }
    }
</script>

<style scoped lang="less">

</style>
