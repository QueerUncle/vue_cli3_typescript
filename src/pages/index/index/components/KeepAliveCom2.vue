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
    <div class = "keep-alive-com2-wrap">
        <label>
            <span>keepAliveCom2:</span>
            <Input v-model="value2" placeholder="Enter something..." style="width: 300px" />
        </label>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'KeepAliveCom2',
    })
    export default class KeepAliveCom2 extends Vue {
        private value2 = '';
    }
</script>

<style scoped lang="less">

</style>
