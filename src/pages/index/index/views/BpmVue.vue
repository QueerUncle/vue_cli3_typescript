<!--
  @Author: lize
  @Date: 2020/9/16
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/9/16
 -->
<template>
    <div class = "bpm-vue-wrap">
        <PageMenu/>
        <div class = "content-wrap">
            <vue-bpmn
                    url="/public/diagram.bpmn"
                    v-on:error="handleError"
                    v-on:shown="handleShown"
                    v-on:loading="handleLoading"
            ></vue-bpmn>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'BpmVue',
        components:{
            VueBpmn: () => import('vue-bpmn'),
        }
    })
    export default class BpmVue extends Vue {

        handleError(err): void {
            console.error('failed to show diagram', err);
        }
        handleShown(): void {
            console.log('diagram shown');
        }
        handleLoading(): void {
            console.log('diagram loading');
        }
    }
</script>

<style scoped lang="less">
.bpm-vue-wrap{
    display: flex;
    width: 100%;
    height: 100%;
    .content-wrap {
        flex: 2;
        height: 100%;
    }
}
</style>
