<!--
  @Author: lize
  @Date: 2020/8/7
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/8/7
 -->
<template>
    <div class = "keep-alive-wrap">
        <PageMenu/>
        <div class = "content-wrap">
            <keep-alive include = "KeepAliveCom1">
<!--                <component :is = "view"></component>-->
                <KeepAliveCom1 v-if="active === 1"></KeepAliveCom1>
                <KeepAliveCom2 v-if="active === 2"></KeepAliveCom2>
                <KeepAliveCom3 v-if="active === 3"></KeepAliveCom3>
            </keep-alive>
            <Button type="primary" @click = "selectComponent">selectComponent</Button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'KeepAliveTem',
        components: {
            PageMenu:() => import('../components/PageMenu.vue'),
            KeepAliveCom1: () => import('../components/KeepAliveCom1.vue'),
            KeepAliveCom2: () => import('../components/KeepAliveCom2.vue'),
            KeepAliveCom3: () => import('../components/KeepAliveCom3.vue'),
        }
    })
    export default class KeepAliveTem extends Vue {
        private active = 1;
        private view = `KeepAliveCom${this.active}`;
        private selectComponent(): any{
            if(this.active === 3){
                this.active = 1;
                this.view = `KeepAliveCom${this.active}`;
                console.log(this.view,'this.viewthis.viewthis.viewthis.view')
                return;
            }
            if (this.active<3) {
                this.active += 1;
                this.view = `KeepAliveCom${this.active}`;
                console.log(this.view,'this.viewthis.viewthis.viewthis.view')
            }
        }
    }
</script>

<style scoped lang="less">
    .keep-alive-wrap{
        height: 100%;
        display: flex;
        .conent-wrap{
            flex: 2;
            overflow: auto;
        }
    }
</style>
