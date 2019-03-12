<template>
  <div>
        <el-card>
      <p>
        1. 官网：请参考
        <a style="color: #409eff" href="http://www.wangeditor.com/">
          wangeditor，基于javascript和css开发的 Web富文本编辑器， 轻量、简洁、易用、开源免费
        </a>
      </p>
      <p>
        2. 示例：以下示例源代码见
        <a href="https://github.com/TKBnice/vuecli3-res/blob/master/src/views/QuillEditor/WangEditor.vue"
          style="color: #409eff" target="_blank">
          https://github.com/TKBnice/vuecli3-res/blob/master/src/views/QuillEditor/WangEditor.vue
        </a>
      </p>
    </el-card>
    <br/>
    <el-card style="height: 660px;">
        <div name="wangEditor" id="wangEditor"   > 
        </div>
    </el-card>

  </div>
</template>
<script>
  export default {
    name: 'vue-ueditor',
    data () {
      return {
        msg: 'vue-ueditor',

      }
    },
    mounted() {
        this.initHtmlEditor()
    },
    methods: {
        initHtmlEditor(){

            let E = window.wangEditor;

            this.editor  = new E('#wangEditor');

            this.editor.customConfig.menus = [
                'image',  // 插入图片
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                // 'link',  // 插入链接
                'justify',  // 对齐方式
                'undo',  // 撤销
                'redo'  // 重复
            ];

            this.editor.customConfig.uploadImgMaxLength = 5;

            this.editor.customConfig.zIndex = 100;

            this.editor.customConfig.height = 600;

            this.editor.customConfig.customUploadImg =  (files, insert)=> {

                // insert 是获取图片 url 后，插入到编辑器的方法
                this.imageJudge(files[0], (img) => {
                    //图片符合规格要求，准备上传
                    this.uploadImgToBackend(img)
                        .then((data) => {
                            //添加成功
                            this.$messager.success('添加图片成功！');
                            insert(data.ImgFullUrl)
                        })
                        .catch((error) => {
                            console.log(error)
                            this.$messager.error('添加图片失败！');
                        })

                });

            }

            this.editor.create();
    },
    },
    destroyed() {

    }
  }
</script>