<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      name="file"
      :show-file-list="false"
      :headers="headers"
      style="display: none"
      ref="upload"
      v-if="this.uploadUrl"
    >
    </el-upload>
    <div class="editor" ref="editor" :style="styles"></div>
  </div>
</template>

<script>
import Quill from "quill";
import QuillBetterTable from "quill-better-table";
import ImageResize from "quill-better-table";
// import ImageResize from 'quill-image-resize-module';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "quill-better-table/dist/quill-better-table.css";
Quill.register(
  {
    "modules/better-table": QuillBetterTable,
  },
  true
);
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "Editor",
  props: {
    /* 编辑器的内容 */
    value: {
      type: String,
      default: "",
    },
    /* 高度 */
    height: {
      type: Number,
      default: null,
    },
    /* 最小高度 */
    minHeight: {
      type: Number,
      default: 500,
    },
    /* 只读 */
    readOnly: {
      type: Boolean,
      default: false,
    },
    /* 上传地址 */
    uploadUrl: {
      type: String,
      default: process.env.VUE_APP_BASE_API + "/fileC/upload",
    },
  },
  data() {
    return {
      headers: {
        Authorization: "Bearer ",
      },
      Quill: null,
      currentValue: "",
      options: {
        theme: "snow",
        bounds: document.body,
        debug: "warn",
        modules: {
          // 工具栏配置
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["link", "image"],
              [{ table: "TD" }],
            ],
            handlers: {
              table: function () {
                this.Quill.getModule("better-table").insertTable(3, 3);
              },
            },
          },
          table: true,
          "better-table": {
            operationMenu: {
              items: {
                insertColumnRight: {
                  text: "右边插入一列",
                },
                insertColumnLeft: {
                  text: "左边插入一列",
                },
                insertRowUp: {
                  text: "上边插入一行",
                },
                insertRowDown: {
                  text: "下边插入一行",
                },
                mergeCells: {
                  text: "合并单元格",
                },
                unmergeCells: {
                  text: "拆分单元格",
                },
                deleteColumn: {
                  text: "删除列",
                },
                deleteRow: {
                  text: "删除行",
                },
                deleteTable: {
                  text: "删除表格",
                },
              },
              background: {
                color: "#333",
              },
              color: {
                colors: ["green", "red", "yellow", "blue", "white"],
                text: "背景色",
              },
            },
          },
          imageResize: {
            //调整大小组件。
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
          keyboard: {
            bindings: QuillBetterTable.keyboardBindings,
          },
        },
        placeholder: "请输入内容",
        readOnly: this.readOnly,
      },
    };
  },
  computed: {
    styles() {
      let style = {};
      if (this.minHeight) {
        style.minHeight = `${this.minHeight}px`;
      }
      if (this.height) {
        style.height = `${this.height}px`;
      }
      return style;
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.currentValue) {
          this.currentValue = val === null ? "" : val;
          if (this.Quill) {
            this.Quill.root.innerHTML = this.currentValue;
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  beforeDestroy() {
    this.Quill = null;
  },
  methods: {
    init() {
      console.log("_==---0");
      const editor = this.$refs.editor;
      this.Quill = new Quill(editor, this.options);
      console.log(this.Quill, "---------");
      // 如果设置了上传地址则自定义图片上传事件
      if (this.uploadUrl) {
        let toolbar = this.Quill.getModule("toolbar");
        toolbar.addHandler("image", (value) => {
          this.uploadType = "image";
          if (value) {
            this.$refs.upload.$children[0].$refs.input.click();
          } else {
            this.Quill.format("image", false);
          }
        });
        toolbar.addHandler("video", (value) => {
          this.uploadType = "video";
          if (value) {
            this.$refs.upload.$children[0].$refs.input.click();
          } else {
            this.Quill.format("video", false);
          }
        });
      }
      this.Quill.root.innerHTML = this.currentValue;
      this.Quill.on("text-change", (delta, oldDelta, source) => {
        let tableArr = this.$refs.editor.querySelectorAll("table");
        let borderStyle =
          "border:1px solid grey;table-layout:fixed;border-collapse:collapse;text-align:center;";
        tableArr.forEach((table) => {
          table.setAttribute(
            "style",
            table.getAttribute("style") + borderStyle
          );
          table.setAttribute("border", "1");
          table.setAttribute("cellspacing", "0");
        });
        const html = this.$refs.editor.children[0].innerHTML;
        const text = this.Quill.getText();
        const quill = this.Quill;
        this.currentValue = html;
        this.$emit("input", html);
        this.$emit("on-change", { html, text, quill });
      });
      this.Quill.on("text-change", (delta, oldDelta, source) => {
        this.$emit("on-text-change", delta, oldDelta, source);
      });
      this.Quill.on("selection-change", (range, oldRange, source) => {
        this.$emit("on-selection-change", range, oldRange, source);
      });
      this.Quill.on("editor-change", (eventName, ...args) => {
        this.$emit("on-editor-change", eventName, ...args);
      });
    },
    handleUploadSuccess(res, file) {
      // 获取富文本组件实例
      let quill = this.Quill;
      // 如果上传成功
      if (res.code == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.data.filePath);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
    },
    handleUploadError() {
      this.$message.error("图片插入失败");
    },
  },
};
</script>

<style>
.editor,
.ql-toolbar {
  white-space: pre-wrap !important;
  line-height: normal !important;
}
.quill-img {
  display: none;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.qlbt-operation-menu {
  border: solid 1px #dfe4ed;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.qlbt-operation-menu .qlbt-operation-menu-item {
  padding: 2px 8px;
}
</style>
