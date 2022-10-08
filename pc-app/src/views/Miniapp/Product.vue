<template>
  <div class="page-container">
    <!--工具栏-->
    <div
      class="toolbar"
      style="float: left; padding-top: 10px; padding-left: 15px"
    >
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input
            v-model="filters.name"
            placeholder="输入产品名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button
            icon="fa fa-search"
            :label="$t('action.search')"
            type="primary"
            @click="findPage(null)"
          />
        </el-form-item>
        <el-form-item>
          <kt-button
            icon="fa fa-plus"
            :label="$t('action.add')"
            type="primary"
            @click="handleAdd"
          />
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <kt-table
      :data="pageResult"
      :columns="columns"
      :showOperation="true"
      @findPage="findPage"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    >
    </kt-table>
    <!--新增编辑界面-->
    <el-dialog
      :title="'产品' + (operation ? '新增' : '编辑')"
      width="80%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dataForm"
        label-width="80px"
        :rules="dataFormRules"
        ref="dataForm"
        :size="size"
        label-position="right"
      >
        <el-row type="flex">
          <el-col>
            <el-form-item label="产品名称" prop="name">
              <el-input v-model="dataForm.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="产品类型" prop="type">
              <el-select
                v-model="dataForm.type"
                auto-complete="off"
                style="width: 100%"
              >
                <el-option value="电子产品" label="电子产品"></el-option>
                <el-option value="日化用户" label="日化用品"></el-option>
                <el-option value="五金杂货" label="五金杂货"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="简介" prop="descr">
          <el-input
            v-model="dataForm.descr"
            type="textarea"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="detail">
          <div style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor"
              :defaultConfig="{}"
              mode="default"
            />
            <Editor
              style="height: 500px; overflow-y: hidden"
              v-model="dataForm.detail"
              :defaultConfig="{}"
              mode="default"
              @onCreated="onCreated"
            />
          </div>
        </el-form-item>
        <el-form-item label="图片" prop="imgs">
          <div style="display: flex">
            <el-upload
              action="#"
              ref="refUpload"
              list-type="picture-card"
              :auto-upload="false"
              :file-list="fileList"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisibleImg">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="视频" prop="moves">
          <el-input v-model="dataForm.moves" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="mark">
          <el-input
            v-model="dataForm.mark"
            type="textarea"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">{{
          $t("action.cancel")
        }}</el-button>
        <el-button
          :size="size"
          type="primary"
          @click.native="submitForm"
          :loading="editLoading"
          >{{ $t("action.submit") }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable";
import KtButton from "@/views/Core/KtButton";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { format } from "@/utils/datetime";
import "@wangeditor/editor/dist/css/style.css";
export default {
  components: {
    KtTable,
    KtButton,
    Editor,
    Toolbar,
  },
  data() {
    return {
      size: "small",
      filters: {
        name: "",
      },
      dialogImageUrl: "",
      dialogVisibleImg: false,
      disabled: false,
      fileList: [],
      columns: [
        { prop: "id", label: "ID", minWidth: 60 },
        { prop: "name", label: "产品名称" },
        { prop: "type", label: "分类" },
        { prop: "descr", label: "简介" },
        { prop: "url", label: "图片" },
        { prop: "moves", label: "视频" },
        {
          prop: "createTime",
          label: "创建时间",
          minWidth: 120,
          formatter: this.dateFormat,
        },
      ],
      dataForm: {},
      dataFormRules: {},
      operation: false, // true:新增, false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},
      showOperation: false,
      editor: null,
    };
  },
  destroyed() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    updateRichText(val) {
      console.log(val);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImg = true;
    },
    handleFiles(event) {
      this.fileList = event.target.files;
    },
    onBeforeUploadImage(file) {
      // const isIMAGE = file.type === "image/jpeg" || "image/jpg" || "image/png";
      // const isLt1M = file.size / 1024 / 1024 < 1;
      // if (!isIMAGE) {
      //   this.$message.error("上传文件只能是图片格式!");
      // }
      // if (!isLt1M) {
      //   this.$message.error("上传文件大小不能超过 1MB!");
      // }
      // return isIMAGE && isLt1M;
    },
    UploadImage(param) {
      // const formData = new FormData();
      // formData.append("file", param.file);
      // UploadImageApi(formData)
      //   .then((response) => {
      //     console.log("上传图片成功");
      //     param.onSuccess(); // 上传成功的图片会显示绿色的对勾
      //     // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
      //   })
      //   .catch((response) => {
      //     console.log("图片上传失败");
      //     param.onError();
      //   });
    },
    fileChange(file) {
      // this.$refs.upload.clearFiles(); //清除文件对象
      // this.logo = file.raw; // 取出上传文件的对象，在其它地方也可以使用
      // this.fileList = []; // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },
    handleAdd: function () {
      this.dialogVisible = true;
      this.operation = true;
      this.dataForm = {};
    },
    // 获取分页数据
    findPage: function (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [{ name: "name", value: this.filters.name }];
      this.$api.product
        .findPage(this.pageRequest)
        .then((res) => {
          this.pageResult = res.data;
        })
        .then(data != null ? data.callback : "");
    },
    handleEdit: function (params) {
      this.dialogVisible = true;
      this.operation = false;
      this.dataForm = Object.assign({}, params.row);
      let userRoles = [];
      for (let i = 0, len = params.row.userRoles.length; i < len; i++) {
        userRoles.push(params.row.userRoles[i].roleId);
      }
      this.dataForm.userRoles = userRoles;
    },
    handleDelete: function (data) {
      this.$api.product
        .deleteById({ id: data.params[0].id })
        .then(data != null ? data.callback : "");
    },
    submitForm() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //      const html = this.$refs.editor.children[0].innerHTML;
            // const text = this.Quill.getText();
            console.log(this.$refs.refEditor);
            let params = Object.assign({}, this.dataForm);
            this.$api.product.save(params).then(async (res) => {
              this.editLoading = false;
              if (res.code == 200) {
                const { uploadFiles } = this.$refs.refUpload;
                // console.log(this.$refs.refUpload);
                const formData = new FormData();
                formData.append("file", uploadFiles[0].raw);
                formData.append(
                  "json",
                  new Blob(
                    [
                      JSON.stringify({
                        linkId: res.data.id,
                      }),
                    ],
                    {
                      type: "application/json",
                    }
                  )
                );
                await this.$api.file.save(formData);
                this.$message({ message: "操作成功", type: "success" });
                this.dialogVisible = false;
                this.$refs["dataForm"].resetFields();
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
              this.findPage(null);
            });
          });
        }
      });
    },
    // 时间格式化
    dateFormat: function (row, column, cellValue, index) {
      return format(row[column.property]);
    },
  },
};
</script>
