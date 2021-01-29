<!--
  @Author: lize
  @Date: 2021/1/28
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/1/28
 -->
<template>
  <div class="custom-antv-g6">
    <PageMenu/>
    <div class = "content-wrap">
      <TTT/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'CustomAntvG6',
  components: {
    TTT: () => import('./TTT.vue'),
  }
})
export default class CustomAntvG6 extends Vue {

}
</script>

<style scoped lang="less">
.custom-antv-g6{
  display: flex;
  width: 100%;
  height: 100%;
  .content-wrap{
    flex: 2;
    height: 100%;
  }
}
</style>
