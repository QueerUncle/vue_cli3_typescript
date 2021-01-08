<!--
  @Author: lize
  @Date: 2020/12/16
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/12/16
 -->
<template>
  <div class = "CustomMonaco-wrap">
    <PageMenu/>
    <div class = "conent-wrap">
      <div>{{MonacoEditor}}</div>
      <MonacoEditor v-model = "MonacoEditor" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: 'CustomMonaco',
})
export default class CustomMonaco extends Vue {
  private MonacoEditor = '';
}
</script>

<style scoped lang="less">
.CustomMonaco-wrap {
  height: 100%;
  display: flex;
  .conent-wrap {
    flex: 2;
    overflow: auto;
  }
}
</style>
