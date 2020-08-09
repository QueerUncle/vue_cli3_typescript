<!--
  @Author: lize
  @Date: 2020/5/13
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/5/13
 -->
<template>
    <div class = "header-wrap">
        <div class="logo-warp">
            <Tooltip content="菜单" placement="top" style="width: 60px;">
<!--                <i class = "iconfont icongengduocaozuo-hengxiang" @click = "openMenu"></i>-->
                <i class = "iconfont iconview-list" @click = "openMenu"></i>
            </Tooltip>
            <img src="../assets/img/cbim_logo_transverse.png" @click="goHome" alt="Cbim Logo">
        </div>
        <div class="user-warp">
            <div class="app" @click="goToApp"><i class="iconfont iconyingyonghui"></i></div>
            <!-- 待办组件 -->
            <div class="app">
                <i class="iconfont iconwodedaiban"></i>
            </div>
            <!-- 消息组件 -->
            <div class="app"></div>
            <span class="division"></span>
            <div class="portrait" v-if="$store.state.userInfo">
                <img v-if="$store.state.userInfo.image === '' " src="../assets/img/default_portrait.png" alt="default">
                <img v-else :src="$store.state.userInfo.image" alt="img">
            </div>
            <Dropdown trigger="click" @on-visible-change="dropdownChange" @on-click="onDropdownItemClick">
                <div class="user">
                    <span class="name">{{$store.state.userInfo && $store.state.userInfo.name ? $store.state.userInfo.name : ''}}</span>
<!--                    <i class="iconfont iconpersonalinfo-nav"></i>-->
                </div>
                <DropdownMenu slot="list">
                    <DropdownItem name="#/">个人首页</DropdownItem>
                    <DropdownItem name="#/userInfo?active=2">个人信息</DropdownItem>
                    <DropdownItem name="#/passwordManagement?active=3"> 密码管理</DropdownItem>
                    <DropdownItem name="logout">安全退出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <couMenu :menuOption = "menuOption" @on-menuItem-click = "onMenuItemClick"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    @Component({
        components:{
            couMenu:() => import("@/common/components/Menu.vue")
        }
    })
    export default class Header extends Vue {
        private menuItemState = false;
        private menuOption: any = {
            title:'菜单',
            validate:false
        }
        created(): void{
            this.getUserInfo();
        }
        // 获取用户信息
         getUserInfo(): void{
            const url = "/common/userInfo";
            this.$Http.post(url)
             .then((res: any) =>{
                 if(res.success){
                     this.$store.state.userInfo = res.data;
                 }
             })
             .catch((err: any) =>{
                 console.log(err);
             })
        }
        //打开菜单
        private openMenu(): void{
            this.menuOption.validate = !this.menuOption.validate
        }
        //跳转至首页
        private goHome(): void {
            this.$router.push({path:'/'});
        }
        //跳转App
        private goToApp(): void {
            console.log("跳转网站",this);
        }
        // 用户下拉状态 控制样式
        private dropdownChange(): void {
            this.menuItemState = !this.menuItemState;
        }
        //用户点击
        private onDropdownItemClick(name: string): void {
            if (name === 'logout') {  //退出
                this.$Http.get('/common/userLogout')
                    .then((res: any) => {
                            if (res.code === 200) {
                                window.location.href = res.data;
                            }
                    })
            } else {  //其他
                console.log("跳转页面");
                // window.location.href = `${process.env.VUE_APP_PAGE}user.html${name}`;
            }
        }
        //用户点击菜单回调
        onMenuItemClick(item: string,index: number): void{
            console.log(item,index,'menuItem')
        }
    }
</script>

<style scoped lang="less">
.header-wrap{
    z-index: 1200;
    padding: 0px 25px;
    height: 48px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    .logo-warp {
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
            height: 25px;
        }
    }
    .user-warp {
        /*position: relative;*/
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .app {
            margin-left: 20px;
            position: relative;
            .iconfont {
                font-size: 24px !important;
                color: #768189;
                &:hover {
                    transition: all linear 0.3s;
                    color: #0084FF;
                }
            }
            .num {
                transform: scale(0.8);
                display: block;
                position: absolute;
                right: -14px;
                top: -1px;
                width: 24px;
                text-align: center;
                z-index: 2;
                border-radius: 5px;
                padding: 2px;
                background: #dc1212;
                line-height: initial;
                color: #fff;
                font-size: 12px;
                pointer-events: none;
            }
        }
        .division {
            display: inline-block;
            height: 21px;
            border-right: 1px solid #EDEDED;
            margin: 0 30px;

        }
        .portrait {
            margin-right: 15px;
            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
        }
        .user {
            cursor: pointer;
            display: flex;
            align-items: center;
            user-select: none;
            .name {
                margin-right: 8px;
            }
            .rotate {
                transition: all linear 0.2s;
                transform: rotateX(180deg);
            }
        }
        /deep/ .ivu-select-dropdown {
            width: 110px;
            top: 48px !important;
            left: calc(100% - 130px) !important;
            right: 20px !important;
            .ivu-dropdown-item {
                text-align: center;
            }
        }
    }
    .iconfont {
        font-size: 24px !important;
        color: #768189;
        &:hover {
            transition: all linear 0.3s;
            color: #0084FF;
        }
    }
}
</style>
