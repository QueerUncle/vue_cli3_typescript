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
        v-model="$props.ModalOptions.visible"
        :width="$props.ModalOptions.width"
        :title="$props.ModalOptions.title"
        @on-cancel="handleClear">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>

<script lang="ts">
    import {Component,Prop,Emit,Watch, Vue} from 'vue-property-decorator';

    @Component({
        name: 'IViewModal'
    })
    export default class IViewModal extends Vue {
        @Prop ({
            type:Object,
            default:() =>{
                return {
                    visible:false,
                    title:'IViewModal'
                }
            }
        })
        ModalOptions: any
        @Prop ({
            type:Object
        })
        value: any
        private modalValue?: object
        @Watch('$props.value',{deep:true,immediate:true})
        valueChange(newValue: object){
            this.modalValue = newValue;
            console.log(this.modalValue)
        }
        @Emit('input')
        onInput(obj: object): object{
            return obj
        }
        private handleSubmit(): void{
            this.$props.ModalOptions.visible = false;
            this.onInput({
                user:'lize',
                password:'123456'
            })
        }
        private handleClear(): void{
            this.$props.ModalOptions.visible = false;
        }
    }
</script>

<style scoped lang="less">

</style>
