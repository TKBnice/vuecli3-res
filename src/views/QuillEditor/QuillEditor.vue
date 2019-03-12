<template>
  <div v-title="'富文本编辑器'">
    <el-card>
      <p>
        1. 实现：请参考
        <a style="color: #409eff" href="https://www.awesomes.cn/repo/surmon-china/vue-quill-editor">
          vue-quill-editor
        </a>
      </p>
      <p>
        2. 示例：以下示例源代码见
        <a href="https://github.com/TKBnice/vuecli3-res/blob/master/src/views/QuillEditor/QuillEditor.vue"
          style="color: #409eff" target="_blank">
          https://github.com/TKBnice/vuecli3-res/blob/master/src/views/QuillEditor/QuillEditor.vue
        </a>
      </p>
      
    </el-card>
    <br/>
    <el-card style="height: 610px;">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        style="height: 500px;"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
      </quill-editor>
    </el-card>
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'FuncFormsEdit',
  components: {
    quillEditor
  },
  data () {
    return {
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
      editorOption: {}
    }
  },
  computed: {
    editor() {
        return this.$refs.myQuillEditor.quill
      },
  },
  mounted() {
     console.log('this is my editor', this.editor)
      setTimeout(() => {
        this.content = `<h1 class="ql-align-center">
                          <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p>
                        `
      }, 1300)
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    }
  },
}
</script>

<style scoped>
</style>