<template>
  <AtNavBar
    class="top-nav-bar"
    :style="{ paddingTop: topHeight }"
    fixed
    @clickLeftIcon="handleNavClick"
    color="#000"
    :leftText="tabList[current].title || '返回'"
  />
  <view class="at-tab-bar-height">
    <slot></slot>
  </view>
  <AtTabBar fixed :tabList="tabList" @click="handleClick" :current="current" />
</template>
<script>
import { AtNavBar, AtTabBar } from "taro-ui-vue3/lib";
import Taro, { useReducer, createContext, useMemo } from "@tarojs/taro";
import { ref } from "vue";
export default {
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
    const handleNavClick = e => {
      console.log(e);
    };
    return {
      current,
      tabList,
      handleNavClick,
      topHeight: Taro.$navBarMarginTop + "px",
      useNavBar: true
    };
  },
  emits: ["updateView"],
  components: {
    AtTabBar,
    AtNavBar
  },
  methods: {
    handleClick(e) {
      this.current = e;
      this.$emit("updateView", this.tabList[e].url);
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
