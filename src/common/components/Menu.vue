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
    <Drawer
        :title="$props.menuOption.title"
        :closable="false"
        v-model="$props.menuOption.validate"
        placement="left">
        <p
            @click = "onMenuitem(`跳转至测试页面`,0,'special')"
            class = "menu-item special-menu-item">
            跳转至测试页面
        </p>
        <p
            :key = "item"
            @click = "onMenuitem(`自定义菜单${item}`,item)"
            class = "menu-item"
            v-for = "item in 100">
            自定义菜单{{item}}
        </p>
    </Drawer>
</template>

<script lang="ts">
    import {Component, Prop, Watch, Emit, Vue} from 'vue-property-decorator';

    @Component
    export default class Menu extends Vue {
        @Prop ({
            type:Object,
            default:() =>{
                return {
                    validate:false,
                    title:'菜单'
                }
            }
        })
        menuOption: any

        @Watch('$props.menuOption',{ immediate: true, deep: true })
        menuOptionChange(newValue: any) {
            console.log(newValue,'newValue')
        }
        //点击菜单
        @Emit("on-menuItem-click")
        private onMenuitem(item: string,index: number, type?: string): string{
            this.$props.menuOption.validate = false;
            if(type === 'special'){
                this.$store.state.iframeurl = '';
                return item
            }
            const htmlName: number = +index.toString().charAt(index.toString().length-1)
            this.$store.state.iframeurl = `html/${htmlName}.html`;
            return item
        }
    }
</script>

<style scoped lang="less">
    /deep/.ivu-drawer-wrap{
        .ivu-drawer {
            height: calc(100% - 42px) !important;
            top: 42px!important;
            background: rgba(255, 255, 255, 1);
            box-shadow: -2px 0 12px 0 rgba(0, 0, 0, 0.05), 1px 0px 0px 0px rgba(234, 235, 236, 1);
            .ivu-drawer-header {
                height: 56px;
                div:first-child {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    height: 100%;
                    .title {
                        font-size: 16px;
                        font-weight: 500;
                        color: #33475F;
                    }
                    .title-sub {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding-top: 5px;
                        cursor: pointer;
                        margin-left: 15px;
                        color: #89939F;
                        font-size: 12px;
                        &:hover {
                            transition: all linear 0.3s;
                            color: #2e8bf0;
                            /*.iconfont{*/
                            /*    transform: rotate(90deg);*/
                            /*}*/
                        }
                    }
                }
            }
            .todo-list {
                /deep/ .ivu-scroll-container {
                    .ivu-scroll-loader {
                        &:first-child {
                            height: 0;
                            padding: 0;
                        }
                    }
                }
                .item {
                    &:last-child {
                        margin-bottom: 0;
                    }
                    margin-bottom: 10px;
                    background: #F7F9FB;
                    border-radius: 2px;
                    padding: 10px 15px 10px 10px;
                    .header-item {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .iconfont {
                            font-size: 13px;
                        }
                        .title {
                            font-size: 14px;
                            font-weight: 400;
                            color: rgba(51, 71, 95, 1);
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            margin-left: 5px;
                            cursor: pointer;

                            &:hover {
                                text-decoration: underline;
                                color: #2e8bf0;
                            }
                        }
                    }
                    .detail {
                        padding-left: 25px;
                        width: calc(100%);
                        overflow: hidden;
                        span {
                            float: left;
                            display: inline-block;
                            &:first-child {
                                width: 30px;
                                display: inline-block;
                                color: #B3BAC1;
                                margin-right: 5px;
                            }
                            &:nth-child(2) {
                                width: calc(100% - 50px);
                                color: #89939F;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
            /deep/ .ivu-divider {
                margin: 10px 0 25px 0;
                .ivu-divider-inner-text {
                    font-size: 12px;
                    font-weight: 400;
                    color: #b6babf;
                }
            }
        }
        .special-menu-item{
            color: red;
            font-size: 20px;
        }
        .menu-item{
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            &:hover{
                color: #2d8cf0;
                background: #f0faff;
            }
        }
    }
</style>
