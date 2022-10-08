<template>
  <view class="at-tab-bar--fixed bottom-btn-action">
    <view class="item-btm">
      <view
        style="font-size: 20px;padding:0 5px;"
        class="at-icon at-icon-help"
      ></view>
      <view>客服</view>
    </view>
    <view class="item-btm">
      <view
        style="font-size: 20px;padding:0 5px;"
        class="at-icon at-icon-heart"
      ></view>
      <view>收藏</view>
    </view>
    <view class="item-btm">
      <view
        style="font-size: 20px;padding:0 5px;"
        class="at-icon at-icon-shopping-cart"
      ></view>
      <view>购物车</view>
    </view>

    <view class="flex-btn">
      <AtButton>加入购物车</AtButton>
      <AtButton>立即购买</AtButton>
    </view>
  </view>
</template>
<script>
import { AtTabBar, AtButton } from "taro-ui-vue3/lib";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AtTabBar,
    AtButton
  }
};
</script>
<style lang="scss">
.bottom-btn-action {
  border-top: 1px solid rgb(190, 186, 186);
  height: 100px;
  display: flex;
  align-items: center;
  .item-btm {
    flex: 1 0 auto;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.flex-btn {
  display: flex;
  width: 100%;
  align-items: center;
  align-content: flex-end;
  justify-content: flex-end;
  justify-items: flex-end;
}
</style>
