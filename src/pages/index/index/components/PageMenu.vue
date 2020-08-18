<!--
  @Author: lize
  @Date: 2020/5/18
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/5/18
 -->
<template>
    <div class = "page-menu-wrap">
<!--        <Button-->
<!--            v-for="(item,index) in menuData"-->
<!--            :key = "index"-->
<!--            :class = "{'activeMenuItem':activeIndex === index}"-->
<!--            style="margin: 0 5px;"-->
<!--            @click="linkTo(item,index)">-->
<!--            {{item.title}}-->
<!--        </Button>-->
        <Menu theme="dark" style="height: 100%;" :active-name="activeName">
            <MenuItem
                v-for = "(item,index) in menuData"
                :key = "index"
                :name="item.router"
                @click.native="linkTo(item)">
                {{item.title}}
            </MenuItem>
        </Menu>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'PageMenu',
    })
    export default class PageMenu extends Vue {
        private activeName: string = '/';
        private menuData: any[] = [
            {
                title:'首页',
                href:'',
                router:'/'
            },
            {
                title:'IviewTable测试',
                href:'',
                router:'/IviewTable'
            },
            {
                title:'ts练习',
                href:'',
                router:'/TsPractice'
            },
            {
                title:'VueTsxTemplate练习',
                href:'',
                router:'/VueTsxTemplate'
            },
            {
                title:'Login',
                href:'',
                router:'/Login'
            },
            {
                title:'NavComponent',
                href:'',
                router:'/NavComponent'
            },
            {
                title:'UploadAndDownload',
                href:'',
                router:'/UploadAndDownload'
            },
            {
                title:'Signature',
                href:'',
                router:'/Signature'
            },
            {
                title:'VuexTest',
                href:'',
                router:'/VuexTest'
            },
            {
                title:'Antv',
                href:'',
                router:'/Antv'
            },
            {
                title:'WorkerTest',
                href:'',
                router:'/WorkerTest'
            },
            {
                title:'KeepAliveTem.vue',
                href:'',
                router:'/KeepAliveTem'
            },
            {
                title:'ScrollIvewTable.vue',
                href:'',
                router:'/ScrollIvewTable'
            },
            {
                title:'ES6.vue',
                href:'',
                router:'/ES6'
            },
        ]
        created(): void{
            this.initialize();
        }
        private initialize(){
            this.activeName = this.$route.path;
        }
        private linkTo(item: any): void{
            if(this.activeName === item.router){
                return;
            }
            this.activeName = item.router;
            this.$router.push({path:item.router});
        }
    }
</script>

<style scoped lang="less">
.page-menu-wrap{
    .ivu-menu{
        overflow: auto;
    }
    .activeMenuItem{
        background: #2d8cf0;
        color: #ffffff;
    }
}
</style>
