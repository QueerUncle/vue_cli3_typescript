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
    <div class = "login-wrap main-wrap">
        <PageMenu/>
        <div class = "conent-wrap">
            我是login页面
            <div class="form-wrap">
                <h2>form</h2>
                <form action="/node/api/formlogin" method="post" target="stop">
                    <p>UserName: <input type="text" name="userName" /></p>
                    <p>PassWord: <input type="password" name="passWord"/></p>
                    <input type="submit" value="Submit" />
                </form>
                <iframe name="stop" style="display:none;"></iframe>
            </div>

            <div class = "formData-wrap" style="margin-top: 100px;">
                <h2>formData</h2>
                <form action="/node/api/formlogin" ref = "formSubmit" method="post" target="stop" style="display: none">
                   <input type="text" name="userName" v-model = "FormDataSubmitDatas.userNames" style = "display: none" />
                   <input type="password" name="passWord" v-model = "FormDataSubmitDatas.passWords" style = "display: none"  />
                   <input type="submit" value="Submit" style = "display: none" />
                </form>
                <iframe name="stop" style="display:none;"></iframe>
                <p>UserName: <input type="text" v-model = "FormDataSubmitDatas.userNames" /></p>
                <p>PassWord: <input type="password" v-model = "FormDataSubmitDatas.passWords" /></p>
                <p>a: <input type="text" v-model = "FormDataSubmitDatas.a" /></p>
                <p>b: <input type="text" v-model = "FormDataSubmitDatas.b" /></p>
                <Button @click = "FormDataSubmit">FormDataSubmit</Button>
                <Button @click = "FormSubmit">FormSubmit</Button>
                <button id = "btn">czxcwfsdfsfdsa</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Login extends Vue {
        private FormDataSubmitDatas: any = {
            userNames:'',
            passWords:'',
            a:'',
            b:''
        }
        created(){
            this.testHttpGetAjax();
            this.testHttpPostAjax();
        }
        mounted(){
            this.$nextTick(() =>{
                (document.querySelector("#btn") as any).onclick = ()=>{
                    console.log("asdasdasdas")
                }
                console.log()
            })
        }
        private testHttpGetAjax(): void{
            const url = "/node/api/testgetapi"
           this.$Http.get(url,{
               params:{
                   a:1,
               }
           })
            .then((e: object) =>{
                console.log(e);
            })
            .catch((er: any) =>{
                console.log(er);
            })
        }
        private testHttpPostAjax(): void{
            const url = "/node/api/testpostapi"
           this.$Http.post(url,{a:1})
            .then((e: object) =>{
                console.log(e);
            })
            .catch((er: any) =>{
                console.log(er);
            })
        }
        private FormDataSubmit(): void{
            console.log('wolaile ')
            const formData = new FormData();
            for(const i in this.FormDataSubmitDatas){
                if(!this.FormDataSubmitDatas[i])return
                formData.append(i,this.FormDataSubmitDatas[i]);
            }
            const url = '/node/api/formDatalogin'
            this.$Http.post(url,formData)
            .then((e: object) =>{
                console.log(e);
            })
            .catch((er: any) =>{
                console.log(er);
            })
        }
        private FormSubmit(): void{
            (this.$refs.formSubmit as any).submit();
        }
    }
</script>

<style scoped lang="less">
    .login-wrap{
        height: 100%;
        display: flex;
        .conent-wrap{
            flex: 2;
            overflow: auto;
        }
    }
</style>
