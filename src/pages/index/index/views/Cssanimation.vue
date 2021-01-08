<!--
  @Author: lize
  @Date: 2020/11/16
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/11/16
 -->
<template>
  <div class = "css-animation-wrap">
    <PageMenu/>
    <div class = "conent-wrap">
      <div class = "box-wrap">
        <div class = "slice-wrap">
          <div class = "one-wrap tDiv"></div>
          <div class = "two-wrap tDiv"></div>
          <div class = "three-wrap tDiv"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: 'Cssanimation',
})
export default class Cssanimation extends Vue {

}
</script>

<style scoped lang="less">
.css-animation-wrap{
  height: 100%;
  display: flex;

  .conent-wrap {
    flex: 2;
    overflow: auto;
    background: #000000;
    .box-wrap{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .slice-wrap{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 10px solid #7A7A7A;
        position: relative;
        .tDiv{
          //width: 100px;
          //height: 100%;
          position: absolute;
          background: #2f54eb;
          border-radius: 50%;
          animation: go 5s ease-in-out 0s infinite alternate;
        }
        .one-wrap{
          right:50%;
          bottom: 40%
        }
        .two-wrap{
          left: 50%;
          bottom:40%;
        }
        .three-wrap{
          top: 40%;
          left:22%
        }
      }
    }
  }
}
@keyframes go{
  0% {width: 0;height: 0; right: 50%;bottom:40%}
  50% {width: 100px;height: 100px;left: 50%;bottom:40%}
  100% {width: 200px;height: 200px;top: 40%;left:50%}
}
</style>
