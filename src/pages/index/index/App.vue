<template>
  <div id="app">
    <div class = "header-wrap">
      <Header/>
    </div>
    <div class = "iframe-wrap" v-if = "$store.state.iframeurl">
      <iframe
              :src="$store.state.iframeurl"
              :style="{minHeight:IframeHeight+'px'}"
              id="cbim2_iframe"
              frameborder="0"
              width="100%"/>
    </div>
    <div class = "router-view-content-wrap" v-if = "!$store.state.iframeurl">
      <keep-alive>
        <router-view v-if="$route.meta.keepalive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepalive"/>
    </div>
  </div>
</template>
<script lang = "ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  @Component({
    components:{
      Header: (): any => import("@/common/components/Header.vue"),
    }
  })
  export default class App extends Vue{
    private list!: Array<any>;
    private flag!: boolean;
    private IframeHeight: number =  window.innerHeight - 48;  //iframe 高
    created(): void {
      this.$Message.config({
        top:50,
      })
      this.getNavMenu();
      this.flag = true;
    }
    private getNavMenu(): void {
      const url = 'common/navMenu';
      this.$Http.post(url)
        .then((e: any) => {
          if (e.success) {
            this.list = e.data;
            console.log(this.list)
          }
        })
        .catch((er: any) => {
          console.log(er);
        });
    }
  }
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header-wrap{
    height: 48px;
  }
  .iframe-wrap{
    flex: 2;
    width: 100%;
    overflow: auto;
  }
  .router-view-content-wrap{
    flex: 2;
    overflow: hidden;
    height: 100%;
  }
}

</style>
