<!--
  @Author: lize
  @Date: 2020/6/9
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/6/9
 -->
<template>
    <div class = "NavComponent-wrap">
        <PageMenu/>
        <div class = "conent-wrap">
            <ul>
                <li :key = "index" v-for = "(item,index) in navList">
                    <span>{{item.title}}</span>
                    <div class = "child-wrap">
                        <ol>
                            <li :key = "j_index" v-for = "(j,j_index) in item.child">{{j.title}}</li>
                        </ol>
                    </div>
                </li>
                <div class = "mock-wrap"></div>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components:{
            PageMenu:() => import('../components/PageMenu.vue')
        }
    })
    export default class NavComponent extends Vue {
        private navList = [
            {
                title:'资源',
                child:[
                    {
                        title:'我的资源'
                    },
                    {
                        title:'收藏的工具'
                    },
                    {
                        title:'我的回复'
                    }
                ]
            },
            {
                title:'工具',
                child:[
                    {
                        title:'我的工具'
                    },
                    {
                        title:'收藏工具'
                    }
                ]
            },
            {
                title:'培训'
            }
        ]
    }
</script>

<style scoped lang="less">
.NavComponent-wrap {
    height: 100%;
    display: flex;
    .conent-wrap {
        flex: 2;
        overflow: auto;
        ul {
            width: 100%;
            display: flex;
            background: #2b85e4;
            .mock-wrap {
                display: none;
                position: fixed;
                width: calc(100% - 240px);
                left: 240px;
                top: 85px;
                height: 100%;
                background: #000000;
                opacity: 0;
            }
            li {
                width: 50px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                .child-wrap {
                    display: none;
                    position: fixed;
                    width: calc(100% - 240px);
                    left: 240px;
                    top: 85px;
                    z-index: 2;
                    ol {
                        width: 100%;
                        background: pink;
                        opacity: 1;
                        z-index: 2;

                        li {
                            width: 50px;
                            height: 40px;
                            text-align: center;
                            line-height: 40px;
                            cursor: pointer;
                        }
                    }
                }
                &:hover {
                    color: #ffffff;
                    .child-wrap {
                        display: block;
                        ol {
                            li {
                                transition: all 0.3s;
                                width: 100px;
                                &:hover {
                                    transition: all 0.3s;
                                    background: #9a6e3a;
                                }
                            }
                        }
                    }
                    ~.mock-wrap{
                        display: block;
                        opacity: 0.3;
                        transition: all 0.3s;
                    }
                }
            }
            /*li:hover{*/
            /*    color: #ffffff;*/
            /*}*/
            /*li:hover .child-wrap {*/
            /*    display: block;*/
            /*    ol {*/
            /*        li {*/
            /*            width: 100px;*/
            /*            &:hover {*/
            /*                background: #9a6e3a;*/
            /*            }*/
            /*        }*/
            /*    }*/
            /*}*/
            /*li:hover ~ .mock-wrap{*/
            /*    display: block!important;*/
            /*}*/
        }
    }
}
</style>
