<!--
  @Author: lize
  @Date: 2020/12/16
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/12/16
 -->
<template>
  <div ref = "MonacoEditorWrap" class = "monaco-editor-wrap"/>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch, Emit,
} from 'vue-property-decorator';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

@Component({
  name: 'MonacoEditor',
})
export default class MonacoEditor extends Vue {
  @Emit('input') handlerChange<T>(target: T): T {
    return target;
  } // eslint-disable

  @Prop() value: string;

  @Prop({
    type: String,
    default: 'javascript',
  }) language;

  // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
  @Prop({
    type: String,
    default: 'vs-dark',
  }) theme;

  // 编辑器其他的配置
  @Prop({
    type: Object,
    default: () => {
      return {
        minimap: {
          enabled:false
        },
        readOnly: false,
        // selectOnLineNumbers: true,
      }
    }
  }) options

  @Watch('value', { deep: true, immediate: true})
  valueChange(newValue): void {
    if (this.MonacoEditor) {
      this.codeValue = newValue;
      this.MonacoEditor.setValue(newValue);
      // this.MonacoEditor.setSelections(newValue.length);
    }
  }

  private MonacoEditor: any = null;

  private codeValue = '';

  mounted(): void {
    this.MonacoEditor = monaco.editor.create(this.$refs.MonacoEditorWrap, {
      value: this.codeValue, // 见props
      language: this.options.language || 'javascript',
      theme: this.$props.theme,
      editorOptions: this.$props.options,
      automaticLayout: true,
    });
    this.MonacoEditor.onDidChangeModelContent(() => {
      this.handlerChange(this.MonacoEditor.getValue());
    });
  }
}
</script>

<style scoped lang="less">
.monaco-editor-wrap{
  width: 100%;
  height: 100%;
}
</style>
