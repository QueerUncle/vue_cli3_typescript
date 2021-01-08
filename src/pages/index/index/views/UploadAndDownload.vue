<!--
  @Author: lize
  @Date: 2020/6/11
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/6/11
 -->
<template>
    <div class = "UploadAndDownLoad-wrap main-wrap">
        <PageMenu/>
        <div class = "conent-wrap">
            UploadAndDownLoad
            <div>
                <input id = "inputFile" type="file" value="" @change="inputFileChange" style = "display: none" />
                <p class = "btn-wrap" @click = "upload">文件上传</p>
            </div>
            <div>
                <p>文件列表</p>
                <ul>
                    <li class = "ulLi" :key = "index" v-for = "(item,index) in uploadFiles" @click = "download(item)">
                      <span>{{item.fileName}}</span>
                      <div>{{item.content.join()}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class UploadAndDownload extends Vue {
        private uploadFiles = [];
        created(){
            // this.getWangangyueTest();
        }
        public upload(){
            (document.querySelector("#inputFile") as any).click();
        }
        private inputFileChange(event: any){
            console.log(event);
            if(!event.target.files[0])return;
            const formdata = new FormData();
            formdata.append('file',event.target.files[0]);
            const url = "/node/api/uploads";
            this.$Http.post(url,formdata)
                .then((e: any) =>{
                    console.log(e);
                    if(e.success){
                        this.uploadFiles = e.data.ids;
                    }
                })
                .catch((er: string)=>{
                    console.log(er);
                })
        }
        public download(item: any){
            // window.location.href = item.downloadUrl;
            window.open(item.downloadUrl,'_blank')
        }
        //王悦测试服务
        private getWangangyueTest(){
            const url = "/node/api/wangyueTest";
            this.$Http.post(url,{fileId:'788575868514471936'})
                .then((e: object) =>{
                    console.log(e,'我是王悦测试接口返回')
                })
                .catch((er: string) =>{
                    console.log(er);
                })
        }
    }
</script>

<style scoped lang="less">
.UploadAndDownLoad-wrap{
    height: 100%;
    display: flex;
    .conent-wrap{
        flex: 2;
        overflow: auto;
        .btn-wrap{
            width: 100px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border: 1px solid #dedede;
            cursor: pointer;
            border-radius: 5px;
            &:hover{
                border:1px solid #2b85e4;
                color: #2b85e4;
            }
        }
        .ulLi{
            cursor: pointer;
            &:hover{
                color: #2b85e4;
            }
        }
    }
}
</style>
