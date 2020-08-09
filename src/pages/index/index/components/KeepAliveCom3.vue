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
    <div class = "keep-alive-com3-wrap">
        <label>
            <span>keepAliveCom3:</span>
            <Input v-model="value3" placeholder="Enter something..." style="width: 300px" />
        </label>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'KeepAliveCom3',
    })
    export default class KeepAliveCom3 extends Vue {
        private value3 = '';
    }
</script>

<style scoped lang="less">

</style>
