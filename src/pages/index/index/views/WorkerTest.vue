<!--
  @Author: lize
  @Date: 2020/7/30
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/7/30
 -->
<template>
    <div class = "Worker-wrap main-wrap" style="height:100%;display:flex">
        <PageMenu />
        <div class = "content-wrap" style="flex:2;overflow:auto;display:flex;justify-content:space-between;">
<!--            <div class = "left-wrap">-->
<!--                <p>leftList</p>-->
<!--                <p v-for="item in leftList" :key = "item" :title = "item">{{item}}</p>-->
<!--            </div>-->
<!--            <div class = "center-wrap">-->
<!--                <p>centerList</p>-->
<!--                <p v-for="item in centerList" :key = "item" :title = "item">{{item}}</p>-->
<!--            </div>-->
<!--            <div class = "right-wrap">-->
<!--                <p>rightList</p>-->
<!--                <p v-for="item in rightList" :key = "item" :title = "item">{{item}}</p>-->
<!--            </div>-->

            <div style="width: 100%;">
                <div v-for="item in imgListUrl" :key = "item" style="width: 200px;height: 100px;margin: 10px;">
                    <img style="width: 100%;height: 100%" :src="item" alt=""/>
                </div>
            </div>
           <div style="width: 100%">
               <div v-for="item in imgSrcList" :key = "item" style="width: 200px;height: 100px;margin: 10px;">
                   <img style="width: 100%;height: 100%" :src="item" alt=""/>
               </div>
           </div>
            <input type="file"  @change = "imgChange($event)"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
// import axios from 'axios'

@Component({
    name: 'WorkerTest',
})
export default class WorkerTest extends Vue {
    private leftList: number[] = [1,2,3];
    private centerList: number[] = [4,5,6];
    private rightList: number[] = [7,8,9];
    private imgNameList = [
        '08.jpg'
    ]
    // '01.jpg','02.jpg','03.png','04.jpg','05.jpg','06.png','07.png',
    private imgListUrl = [
        'http://localhost:3001/08.jpg',
    ]
    private imgSrcList: any = []

    imgChange(event: any){
        console.log(event.target.files[0]);
        console.log(window.URL.createObjectURL(event.target.files[0]));
        this.imgSrcList.push(window.URL.createObjectURL(event.target.files[0]))
    }

    created() {
        const worker = new Worker('./worker.js');
        // const worker = new Worker('../../../../common/assets/js/worker.js');
        // worker.postMessage({page:40});
        worker.postMessage({imgSrc:this.imgNameList});
        worker.onmessage =  (event: any) => {
            const data = event.data;
            console.log(data,' 我是返回参数')
            // console.log(data.length)
            // console.log(window.URL.createObjectURL(event.data));
            for (let i = 0; i<data.length;i++ ) {
                const bytes = new Uint8Array(data[i].data);
                // console.log(bytes,'bytesbytesbytes')
                let datas = ""
                const len = bytes.byteLength;
                for (let j = 0; j < len; j++) {
                    datas += String.fromCharCode(bytes[j]);
                }
                this.imgSrcList.push("data:image/jpg;base64," + window.btoa(datas))
                // image.src = "data:image/png;base64," + window.btoa(data);
                // const uint8Array = new Uint8Array(data[i].length);
                // for(let j = 0; i<data[i].data.length; j +=1 ){
                //     uint8Array[i] = data[i].data[j];
                // }
                // const blob = new Blob([uint8Array],{type:'image/jpeg'})
                // this.imgSrcList.push(window.URL.createObjectURL(blob))
                // let fineRender = new FileReader();
                // fineRender.readAsDataURL(new Blob([data[i]]));
                // fineRender.onload = (e: any) =>{
                //     console.log(e);
                //     this.imgSrcList.push(e.target.result);
                // }
            }
            console.log(this.imgSrcList);


            // this.imgSrcList.push(window.URL.createObjectURL(new Blob([event.data])))
            // this.imgSrcList.push('data:image/jpeg;base64,'+event.data);
        };
        worker.onerror =  (event: any) => {
            console.log(event.fileName, event.lineo, event.message);
        }
    }
}
</script>

<style></style>
