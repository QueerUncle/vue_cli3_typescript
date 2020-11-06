<!--
  @Author: lize
  @Date: 2020/11/6
  @Description : 意外的惊喜（vue）
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/11/6
 -->
<template>
  <div class = "fireworks-wrap">
    <button @click = "handlerClick">意外的惊喜</button>
  </div>
</template>

<script>
import Fireworks from './Fireworks';

export default {
  name: 'Fireworks',
  data() {
    return {
      firework: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.firework = new Fireworks({
        el: document.querySelector('.fireworks-wrap'),
      });
    });
  },
  methods: {
    handlerClick() {
      this.firework.create();
    },
  },
};
</script>

<style scoped>
.fireworks-wrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000000;
  position: relative;
}
</style>
