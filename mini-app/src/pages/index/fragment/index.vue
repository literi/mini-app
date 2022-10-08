<template>
  <AtSearchBar></AtSearchBar>
  <swiper
    class="index-safe"
    indicatorColor="#999"
    indicatorActiveColor="#333"
    current="current"
    :duration="3000"
    :interval="3000"
    :circular="true"
    :autoplay="true"
    :enableFlex="true"
    :indicatorDots="true"
  >
    <swiper-item v-for="(item, idx) in imgUrls" :key="idx">
      <image :src="item" class="slide-image" />
    </swiper-item>
  </swiper>
  <view class="index-safe">
    <AtGrid
      mode="rect"
      :hasBorder="false"
      :data="[
        {
          image:
            'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
          value: '新xxx品首发'
        },
        {
          image:
            'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
          value: '找折扣'
        },
        {
          image:
            'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
          value: '找定制'
        }
      ]"
    />
  </view>
  <view class="index-safe">
    <AtCard
      note="小Tips"
      extra=">>"
      title="热销商品"
      :isFull="true"
      thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
    >
      内容发布区
    </AtCard>
  </view>
  <view class="index-safe">
    <AtCard
      note="小Tips"
      extra=">>"
      title="LOGO设计"
      :isFull="true"
      thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
    >
      内容发布区
    </AtCard>
  </view>
  <view class="index-safe">
    <AtCard
      note="小Tips"
      extra=">>"
      title="其他"
      :isFull="true"
      thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
    >
      内容发布区
    </AtCard>
  </view>
</template>
<script>
import {
  AtTabBar,
  AtSearchBar,
  AtNavBar,
  AtCard,
  AtGrid
} from "taro-ui-vue3/lib";
import Taro, { useReducer, createContext, useMemo } from "@tarojs/taro";
import { ref } from "vue";
export default {
  setup() {
    const tabList = [
      {
        title: "首页",
        iconType: "bullet-list",
        text: "new",
        url: "index"
      },
      { title: "产品", iconType: "camera", url: "product" },
      { title: "广场", iconType: "folder", url: "page/xx/xx" },
      {
        title: "我的",
        iconType: "camera",
        text: "100",
        max: 99,
        url: "mine"
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
      useNavBar: true,
      duration: 200,
      imgUrls: [
        "https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg",
        "https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg",
        "https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg"
      ]
    };
  },
  components: {
    AtSearchBar,
    AtCard,
    AtGrid
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
