<!--
  @Author: lize
  @Date: 2020/8/11
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/8/11
 -->
<template>
    <div class = "ScrollIvewTable-wrap main-wrap">
        <PageMenu/>
        <div class = "content-wrap">

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'ScrollIvewTable',
    })
    export default class ScrollIvewTable extends Vue {

    }
</script>

<style scoped lang="less">
    .ScrollIvewTable-wrap{
        height: 100%;
        display: flex;
        .conent-wrap{
            flex: 2;
            overflow: auto;
        }
    }
</style>
