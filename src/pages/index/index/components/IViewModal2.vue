<!--
  @Author: lize
  @Date: 2020/6/24
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/6/24
 -->
<template>
    <Modal
        v-model="$props.value.visible"
        :width="$props.value.width"
        :title="$props.value.title"
        @on-cancel="handleClear">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit">确定</Button>
            <Button type="error" @click="handleClear">取消</Button>
        </div>s
    </Modal>
</template>

<script lang="ts">
    import {Component,Prop,Emit,Watch, Vue} from 'vue-property-decorator';

    @Component({
        name: 'IViewModal'
    })
    export default class IViewModal extends Vue {
        @Prop ({
            type:Object
        })
        value: any
        private modalValue?: object
        @Watch('$props.value',{deep:true,immediate:true})
        valueChange(newValue: any){
            this.modalValue = newValue.data;
        }
        @Emit('input')
        onInput(obj: object): object{
            return obj
        }
        private handleSubmit(): void{
            this.onInput(
                Object.assign(this.$props.value,{
                    visible:false,
                    data:{
                        a:'lize',
                        b:'123456'
                    }
                })
            )
        }
        private handleClear(): void{
            this.onInput(
                Object.assign(this.$props.value,{
                    visible:false
                })
            )
        }
    }
</script>

<style scoped lang="less">

</style>
