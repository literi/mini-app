<template>
  <PageView title="地址编辑">
    <AtForm>
      <AtInput
        name="value"
        title="文本"
        type="text"
        placeholder="单行文本"
        :value="value"
        @change="handleChange"
      />
      <AtButton formType="submit" @click="onSubmit">提交</AtButton>
      <AtButton formType="reset" @click="onReset">取消</AtButton>
    </AtForm>
  </PageView>
</template>
<script>
import PageView from "../../components/PageView.vue";
import {
  AtCard,
  AtList,
  AtListItem,
  AtForm,
  AtInput,
  AtButton
} from "taro-ui-vue3/lib";
import Taro from "@tarojs/taro";
export default {
  components: {
    PageView,
    AtCard,
    AtList,
    AtListItem,
    AtForm,
    AtInput,
    AtButton
  },
  methods: {
    handleChange(value = "value") {
      this.value = value;
    },
    onSubmit(event) {
      console.log(this.value);
      Taro.navigateTo({
        url: "/pages/address/index"
      });
    },
    onReset(event) {
      this.value = "";
    }
  }
};
</script>
