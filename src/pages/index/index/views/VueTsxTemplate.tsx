import { Component, Vue } from 'vue-property-decorator';
import PageMenu from '../components/PageMenu.vue';/**/
@Component({
    components:{
        PageMenu
    }
})
export default class VueTsxTemplate extends Vue{
    private a: number = 1;
    private result!: string
    private aUrl: string = "";
    private ee: any = {}
    async created(): Promise<void>{
        setTimeout(async () =>{
            this.a++;
        },1000)
          this.getArrayBuff();
    }
    // buffAry转string
    private asd(arrayBuffer: Array<any>): string{
        const byteArray = new Uint8Array(arrayBuffer);
        let binary  = "";
        for (let i = 0; i < byteArray.byteLength; i++) {
            binary += String.fromCharCode(byteArray[i]);
        }
        return binary
    }
    //获取getArrayBuff文件
    private async getArrayBuff(): Promise<void>{
        const url = 'aaa.json';
        const config = {
            baseURL:'',
        }
        const res = await this.$Http.get(url,config);
        this. ee = new Blob([res.data.data],{type:'audio/mp3'})
        // this.aUrl = `data:audio/wav;base64,${Buffer.from(res.data.data).toString('base64')}`
    }
    //转换base64
    // private deCode(bytes: any): string{
    //     let bString = "";
    //     for(let i = 0, len = bytes.length; i < len; ++i){
    //         bString+= String.fromCharCode(bytes[i]);
    //     }
    //     return `data:audio/wav;base64,${window.btoa(bString)}`
    //     // return `data:audio/wav;base64,${Buffer.from(res.data.data).toString('base64')}`
    // }
    //创建下载链接
    private saveAs(obj: any): any {
        //当然可以自定义简单的下载文件实现方式
        const tmpa = document.createElement("a");
        tmpa.download =  "下载";
        tmpa.href = URL.createObjectURL(obj); //绑定a标签
        tmpa.click(); //模拟点击实现下载
        setTimeout(function() {
            //延时释放
            URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
    }
    //渲染模版
    private render(){
        console.log(this.aUrl,'render')
        return (
            <div class = "vueTxTemplate-wrap" style={{height:"100%",display:"flex"}}>
                <PageMenu />
                <div class = "content-wrap" style={{flex:2,overflow:'auto'}}>
                    <div>{this.a}</div>
                    <button onClick={() => {this.saveAs(this.ee);}}>下载</button>
                    {this.aUrl?<audio src={this.aUrl} controls={true} />:null}
                </div>
            </div>
        )
    }
}

