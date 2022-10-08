<template>
  <view>
    <AtList>
      <AtListItem
        title="我的消息"
        arrow="right"
        @click="goMsgPage"
        thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
      />
    </AtList>
    <view class="index-safe playground">
      <view style="display:flex;just-content:space-between">
        <text>超级广场</text>
        <text>
          发布
        </text>
      </view>
      <at-virtual-scroll
        bench="5"
        height="300"
        :enable-flex="true"
        :items="items"
        :item-height="itemHeight"
      >
        <template #default="{ index, item }">
          <at-list-item
            arrow="right"
            :key="index"
            :title="item.title || 'title'"
            :note="item.text || 'text'"
            :thumb="item.imgURL"
            :extraText="`第 ${index} / ${items.length} 条`"
            @click="handleClick"
          />
        </template>
      </at-virtual-scroll>
    </view>
  </view>
</template>
<script>
import {
  AtList,
  AtListItem,
  AtVirtualScroll,
  AtFlex,
  AtFlexItem,
  AtButton
} from "taro-ui-vue3/lib";
import { ref } from "vue";
import Taro from "@tarojs/taro";
export default {
  setup() {
    const itemHeight = ref(64);
    const items = [{}, {}, {}];
    return {
      items,
      itemHeight
    };
  },
  components: {
    AtList,
    AtListItem,
    AtVirtualScroll,
    AtFlex,
    AtFlexItem
  },
  methods: {
    handleClick() {
      Taro.navigateTo({
        url: "/pages/playground/index"
      });
    },
    onClickTopic() {
      console.log("xxxxxxx,--");
      Taro.navigateTo({
        url: "/pages/topic/index"
      });
    },
    goMsgPage() {
      Taro.navigateTo({
        url: "/pages/msgBox/index"
      });
    }
  }
};
</script>
<style>
.playground {
  padding: 16px;
}
</style>
