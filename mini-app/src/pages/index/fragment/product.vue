<template>
  <view>
    <AtSearchBar></AtSearchBar>
    <AtTabs
      :enable-flex="true"
      :current="current"
      scroll
      :tabList="[
        { title: '产品1' },
        { title: '产品2' },
        { title: '产品3' },
        { title: '产品4' },
        { title: '产品5' },
        { title: '产品6' }
      ]"
      @click="handleClick"
    >
      <AtTabsPane
        :current="current"
        :index="0"
        style="width:100%;height:calc(100vh - 208px);overflow-y:auto;"
      >
        <flow-img></flow-img>
      </AtTabsPane>
      <AtTabsPane
        :current="current"
        :index="1"
        style="width:100%;height:calc(100vh - 208px);overflow-y:auto;"
      >
        标签页二的内容
      </AtTabsPane>
      <AtTabsPane
        :current="current"
        :index="2"
        style="width:100%;height:calc(100vh - 208px);overflow-y:auto;"
      >
        标签页三的内容
      </AtTabsPane>
      <AtTabsPane
        :current="current"
        :index="3"
        style="width:100%;height:calc(100vh - 208px);overflow-y:auto;"
      >
        签页四的内容
      </AtTabsPane>
    </AtTabs>
  </view>
</template>
<script>
import {
  AtTabs,
  AtTabsPane,
  AtVirtualScroll,
  AtButton
} from "taro-ui-vue3/lib";
import FlowImg from "../../../components/FlowImg.vue";
export default {
  components: {
    AtTabs,
    AtTabsPane,
    FlowImg,
    AtVirtualScroll,
    AtButton
  },
  data() {
    return {
      current: 0
    };
  },
  methods: {
    handleClick(e) {
      this.current = e;
      console.log(e, "-==___");
    }
  }
};
</script>
