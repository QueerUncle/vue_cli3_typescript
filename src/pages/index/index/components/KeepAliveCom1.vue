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
    <div class = "keep-alive-com1-wrap">
        <label>
            <span>keepAliveCom1:</span>
            <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
        </label>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'KeepAliveCom1',
    })
    export default class KeepAliveCom1 extends Vue {
        private value = '';
    }
</script>

<style scoped lang="less">

</style>
