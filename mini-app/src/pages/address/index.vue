<template>
  <PageView title="地址管理">
    <AtCard
      title="地址管理"
      :isFull="true"
      thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
    >
      <AtList>
        <AtListItem title="地址1" @click="handleClick" />
        <AtListItem title="地址2" />
        <AtListItem title="地址3" note="描述信息" extraText="默认地址" />
      </AtList>
    </AtCard>
  </PageView>
</template>
<script>
import PageView from "../../components/PageView.vue";
import { AtCard, AtList, AtListItem } from "taro-ui-vue3/lib";
import Taro from "@tarojs/taro";
export default {
  components: {
    PageView,
    AtCard
  },
  methods: {
    handleClick() {
      Taro.navigateTo({
        url: "/pages/address/form"
      });
    }
  }
};
</script>
