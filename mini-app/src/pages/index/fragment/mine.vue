<template>
  <view style="height:100vh;background:#eee;">
    <view class="mine-top">
      <view class="mine-img"></view>
      <view class="mine-name">User Name</view>
      <view class="mine-vip">
        VIP会员
      </view>
    </view>
    <Card>
      <AtGrid
        :hasBorder="false"
        mode="square"
        :columnNum="4"
        :data="[
          {
            image:
              'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            value: '全部订单'
          },
          {
            image:
              'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '待付款'
          },
          {
            image:
              'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '待收货'
          },
          {
            image:
              'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '退款售后'
          }
        ]"
      />
    </Card>
    <AtList class="component-card">
      <AtListItem
        title="个人信息"
        arrow="right"
        thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
      />
      <AtListItem
        title="收货地址"
        note="描述信息"
        arrow="right"
        thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
      />
      <AtListItem
        title="分享"
        note="描述信息"
        extraText="详细信息"
        arrow="right"
        thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
      />
    </AtList>
    <AtList class="component-card">
      <AtListItem
        title="使用协议"
        arrow="right"
        thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
      />
      <AtListItem
        title="关于"
        arrow="right"
        thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
      />
    </AtList>
  </view>
</template>
<script>
import Card from "../../../components/Card.vue";
import { AtList, AtListItem, AtGrid } from "taro-ui-vue3/lib";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    Card,
    AtGrid,
    AtList,
    AtListItem
  }
};
</script>
<style lang="scss">
.index-safe {
  margin: 16rpx 0;
  background: #fff;
}
.mine-top {
  position: relative;
  background: #fff;
  height: 200px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  .mine-msg {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .mine-img {
    position: absolute;
    top: 10px;
    left: 30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 1px solid red;
  }
  .mine-name {
    position: absolute;
    top: 50px;
    left: 180px;
    font-size: 30px;
  }
  .mine-vip {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 30px;
  }
}
.component-card {
  border: 1px solid rgb(236, 234, 234);
  margin: 25px 16px;
  padding: 8px;
  border-radius: 8px;
  background: #fff;
}
</style>
