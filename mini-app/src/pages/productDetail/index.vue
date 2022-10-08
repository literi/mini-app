<template>
  <PageView title="产品详情">
    <view class="index-safe">
      <view>产品详情</view>
      <view>简介</view>
      <view>
        <view>详情</view>
        <view>图片，段落</view>
      </view>
      <view>视频</view>
    </view>
    <ActionBtn></ActionBtn>
  </PageView>
</template>
<script>
import PageView from "../../components/PageView.vue";
import ActionBtn from "../../components/ActionBtn.vue";
export default {
  components: {
    PageView,
    ActionBtn
  }
};
</script>
<style lang="scss">
.index-safe {
  margin: 16rpx 0;
  background: #fff;
}
</style>
