<template>
  <view style="position:relative">
    <AtNavBar
      class="top-nav-bar"
      :style="{ paddingTop: topHeight }"
      fixed
      @clickLeftIcon="handleNavClick"
      :title="title"
      color="#000"
      leftIconType="chevron-left"
    />
    <view class="at-tab-bar-height">
      <slot></slot>
    </view>
    <slot name="actionBar"></slot>
  </view>
</template>
<script>
import { AtTabBar, AtNavBar } from "taro-ui-vue3/lib";
import Taro, { useReducer, createContext, useMemo } from "@tarojs/taro";
import { ref } from "vue";
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup() {
    const tabList = [
      {
        title: "首页",
        iconType: "bullet-list",
        text: "new",
        url: "Index"
      },
      { title: "产品", iconType: "camera", url: "Product" },
      { title: "消息", iconType: "folder", url: "Msg" },
      {
        title: "我的",
        iconType: "camera",
        text: "100",
        max: 99,
        url: "Mine"
      }
    ];
    let current = ref(0);
    return {
      current,
      tabList,
      topHeight: Taro.$navBarMarginTop + "px",
      useNavBar: true
    };
  },
  components: {
    AtTabBar,
    AtNavBar
  },
  methods: {
    handleClick(e) {
      this.current = e;
      this.$emit("updateView", this.tabList[e].url);
    },
    handleNavClick(e) {
      console.log(e);
      Taro.navigateBack();
    }
  }
};
</script>
<style>
.at-tab-bar-height {
  background: #eee;
  margin-top: 150px;
  margin-bottom: 135px;
}
</style>
