/**
 @Author: lize
 @Date: 2020/6/17
 @Description : 线上签名组件
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/6/17
 **/
import './Signature.css'
import {Component, Vue} from 'vue-property-decorator';
import PageMenu from "@/pages/index/index/components/PageMenu.vue";

@Component({
    name:'Signature'
})
export default class Signature extends Vue {
    private canvas: any;
    private ctx: any;
    private canvasMoveUse = false;
    private cityList: any = [1,2,3,4,5,6,7,8,9];
    private model1 = 1
    private imgUrl: string = ""
    private stageInfo!: object
    mounted(){
        this.show();
    }
    private onChange(value: number){
        this.model1 = value;
        this.ctx.lineWidth = this.model1; // 设置线的宽度
        console.log(this.ctx)
        console.log(this.ctx.lineWidth)
    }
    private show(){
        this.canvas = this.$refs.canvas;// 指定canvas
        this.ctx = this.canvas.getContext("2d") // 设置2D渲染区域
        this.ctx.lineWidth = this.model1; // 设置线的宽度
        this.stageInfo = this.canvas.getBoundingClientRect()
    }
    //PC端
    private canvasDown(e: any,type: string): void{
        this.canvasMoveUse = true;
        const t = e.target;
        let canvasX!: number;
        let canvasY!: number;
        if(type === 'PC'){
             canvasX = e.clientX - t.offsetLeft + document.documentElement.scrollLeft
             canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop
        }
        if(type === 'touchstart'){
             canvasX = e.targetTouches[0].clienX - t.offsetLeft + document.documentElement.scrollLeft
             canvasY = e.targetTouches[0].clienY - t.offsetTop + document.documentElement.scrollTop
        }
        this.ctx.beginPath()  // 移动的起点
        this.ctx.moveTo(canvasX, canvasY)
    }
    private canvasMove(e: any,type: string): void{
        // 只在移动是进行绘制图线
        if (this.canvasMoveUse) {
            const t = e.target;
            let canvasX!: number;
            let canvasY!: number;
            if(type === 'PC'){
                 canvasX =  e.clientX - t.offsetLeft + document.documentElement.scrollLeft;
                 canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
            }
            if(type === 'touchstart'){
                canvasX =  e.targetTouches[0].clientX - t.offsetLeft + document.documentElement.scrollLeft;
                canvasY =  e.targetTouches[0].clientY - t.offsetTop + document.documentElement.scrollTop;
            }
            this.ctx.lineTo(canvasX, canvasY)
            this.ctx.stroke()
        }
    }
    private canvasUp(): void{
        this.canvasMoveUse = false;
    }
    private canvasLeave(): void{
        this.canvasMoveUse = false;
    }
    private clear(): void{
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
    private save(): void{
        const imgBase64 = (this.$refs.canvas as HTMLFormElement).toDataURL();
        this.imgUrl = imgBase64;
        console.log(imgBase64);
    }
    private render() {
        return (
            <div class="Signature" style={{height:"100%",display:"flex"}}>
                <PageMenu />
                <div class = "content-wrap" style={{flex:2,overflow:'auto'}}>
                    <i-select value={this.model1}  style="width:200px" onOn-change={($event: any) =>{this.onChange($event)}}>
                        { this.cityList.map((item: number): any => {
                            return (
                                <i-option value={item} key={item}>{item}</i-option>
                            )
                        })}
                    </i-select>
                    <canvas
                        id="canvas"
                        width="600"
                        height="400"
                        onTouchstart={($event: any) => this.canvasDown($event,'touchstart')}
                        onTouchmove={($event: any) => {this.canvasMove($event,'touchstart')}}
                        onTouchend='touchEnd'
                        onMousedown={($event: any) => this.canvasDown($event,'PC') }
                        onMousemove={($event: any) => {this.canvasMove($event,'PC')}}
                        onMouseup={this.canvasUp}
                        onMouseleave={this.canvasLeave}
                        style={{background:'#ffffff'}}
                        ref="canvas"/>
                    <div class="sign-btn">
                        <div class="clear" onClick={this.clear}>清空</div>
                        <div class="save" onClick={this.save}>保存</div>
                    </div>
                    <div class = "bottom-wrap">
                        <img src={this.imgUrl} alt="" />
                    </div>
                </div>
            </div>
        )
    }
}
