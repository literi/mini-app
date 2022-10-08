<template>
  <PageView title="话题广场">
    <view class="index-safe">
      <AtCard
        note="小Tips"
        extra="额外信息ss"
        title="张老三家的牛肉汤真好喝"
        thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
        :isFull="true"
      >
        这也是张老三家的牛肉汤照片
      </AtCard>
    </view>
    <view class="index-safe">
      <at-virtual-scroll
        :enable-flex="true"
        bench="5"
        height="300"
        :items="items"
        :item-height="itemHeight"
      >
        <template #default>
          <MsgItem />
        </template>
      </at-virtual-scroll>
    </view>
    <view>
      发布我的消息
    </view>
  </PageView>
</template>
<script>
import PageView from "../../components/PageView.vue";
import MsgItem from "../../components/MsgItem.vue";
import { AtCard, AtVirtualScroll, AtListItem } from "taro-ui-vue3/lib";
import { ref } from "vue";
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
    PageView,
    AtListItem,
    MsgItem,
    AtVirtualScroll,
    AtCard
  }
};
</script>
<style lang="scss">
.index-safe {
  margin: 16rpx 0;
  background: #fff;
}
</style>
