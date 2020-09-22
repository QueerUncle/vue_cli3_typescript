<!--
  @Author: lize
  @Date: 2020/7/27
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/7/27
 -->
<template>
    <div class = "vuex-test-wrap main-wrap">
        <PageMenu/>
        <div class = "content-wrap">
            我是VuexTest
            <div>state: {{ABC}}</div>
            <ul>
                <li style="display: flex;padding: 10px;">
                    <div style="margin-right: 15px;">{{hasRender.a}}</div>
                    <Button type="primary" @click = "storeGetters">测试storeGetters</Button>
                </li>
                <li style="display: flex;padding: 10px;">
                    <div style="margin-right: 15px;">{{hasRender}}</div>
                    <Button type="primary" @click = "storeMutations">测试storeMutations</Button>
                </li>
                <li style="display: flex;padding: 10px;">
                    <div style="margin-right: 15px;">{{hasRender}}</div>
                    <Button type="primary" @click = "storeActions">测试storeActions</Button>
                </li>
            </ul>
          <input type="text" @change = "getInputValue">
<!--          <Button type="primary" @click = "getInputValue">获取input值</Button>-->
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import { State, Getter, Mutation, Action } from 'vuex-class';

    @Component({
        name: 'VuexTest',
    })
    export default class VuexTest extends Vue {
        @State((state) => state.customStore.a) private ABC: any;

        @State((state) => state.customStore.c) private C: any;

        @Getter('customStore/addTest') private hasRender: any; // 是否渲染

        // 更新列表的顺序
        @Mutation('customStore/testMutaions') private testMutaions: any;

        @Action('customStore/testAction') private testAction: any;

        // 测试Getters
        storeGetters(){
            console.log(this.hasRender);
        }

        // 测试Mutations
        storeMutations(){
            this.testMutaions(10);
        }

        // 测试 storeActions
        storeActions(){
            this.testAction('testMutaions',20);
        }

      getInputValue(e){
        this.$set(this.hasRender['c'], 0, e.target.value);
        console.log(this.C);
        console.log(this.hasRender);
      }
    }
</script>

<style scoped lang="less">
    .vuex-test-wrap{
        height: 100%;
        display: flex;
        .content-wrap{
            flex:2;
            overflow: auto;
        }
    }
</style>
