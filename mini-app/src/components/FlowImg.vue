<template>
  <view id="refFlow" style="position:relative;width:100vw;">
    <view
      v-for="(item, index) in dataList"
      :key="index"
      :style="{
        position: 'absolute',
        top: item.top + 'px',
        left: item.left + 'px',
        width: item.width + 'px',
        height: item.height + 'px',
        margin: '10px'
      }"
      @tap="goProductDetail"
    >
      <image :src="item.url" style="width:100%;height:100%;" />
      <view class="img-sub-title">
        这是产品标题ww
      </view>
    </view>
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui-vue3/lib";
export default {
  data() {
    return {
      dataList: [],
      imgList: [
        {
          url:
            "https://tse3-mm.cn.bing.net/th/id/OIP-C.fxLzt8M17e4U4CdyIuVjcwHaNJ?pid=ImgDet&rs=1",
          width: 11,
          height: 15
        },
        {
          url:
            "https://ts1.cn.mm.bing.net/th/id/R-C.298516eea9810b5f0ab7024d991004de?rik=Heplf5sUP4Gjew&riu=http%3a%2f%2fimgs.bzw315.com%2fuploadfiles%2fimage%2f2017%2f12%2f11%2f201712111733468475.jpg&ehk=P%2bv9f8GZx7jN%2f7ys1%2fsvmhQGBG6LMisBIO2VoRzxsVo%3d&risl=&pid=ImgRaw&r=0",
          width: 15,
          height: 10
        },
        {
          url:
            "https://ts1.cn.mm.bing.net/th/id/R-C.cd119483b6fa8b5ca297a2e64f5b6051?rik=%2fBaVpSjY%2bKkwQg&riu=http%3a%2f%2ffiles.nowre.com%2farticles%2f2021%2f02%2fWechatIMG856.jpg&ehk=g1bC3BE1vwMDuVpdaAKOE8%2fZ%2flsee3TmPpv%2fnSs4RXY%3d&risl=&pid=ImgRaw&r=0",
          width: 10,
          height: 10
        },
        {
          url:
            "https://tse3-mm.cn.bing.net/th/id/OIP-C.fxLzt8M17e4U4CdyIuVjcwHaNJ?pid=ImgDet&rs=1",
          width: 11,
          height: 20
        },
        {
          url:
            "https://tse3-mm.cn.bing.net/th/id/OIP-C.fxLzt8M17e4U4CdyIuVjcwHaNJ?pid=ImgDet&rs=1",
          width: 11,
          height: 20
        },
        {
          url: "https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg",
          width: 15,
          height: 10
        },
        {
          url: "https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg",
          width: 10,
          height: 10
        },
        {
          url: "https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg",
          width: 10,
          height: 10
        }
      ]
    };
  },
  components: {
    AtButton
  },
  mounted() {
    // const query = Taro.createSelectorQuery();
    // query
    //   .select("#refFlow")
    //   .boundingClientRect(rec => {
    //     console.log(rec, "xxxxxxxxxxxx--==");
    const windowInfo = Taro.getWindowInfo();

    // console.log(windowInfo.pixelRatio);
    // console.log(windowInfo.screenWidth);
    // console.log(windowInfo.screenHeight);
    const tempW = windowInfo.windowWidth;
    // console.log(windowInfo.windowHeight);
    // console.log(windowInfo.statusBarHeight);
    // console.log(windowInfo.safeArea);
    // console.log(windowInfo.screenTop);
    const w = Math.floor((tempW - 25) / 2);
    this.initList(w);
    // 宽度确定
    // 高度是上一个数组的高度
    // })
    // .exec();
  },
  onReady() {},
  methods: {
    goProductDetail() {
      console.log("xxxx--===-");
      Taro.navigateTo({
        url: "/pages/productDetail/index"
      });
    },
    initList(w) {
      const mapList = this.imgList.map(el => {
        // 按比例换算高度
        const _w = el.width;
        const _h = el.height;
        return { ...el, width: w, height: Math.floor((w * _h) / _w) };
      });
      const group = (array, subGroupLength) => {
        let index = 0;
        let newArray = [];
        while (index < array.length) {
          newArray.push(array.slice(index, (index += subGroupLength)));
        }
        return newArray;
      };
      const tmp = group(mapList, 2);
      console.log(tmp);
      tmp.forEach((el, index, list) => {
        el.forEach((e2, i) => {
          if (index == 0) {
            e2.top = 0;
            if (i == 1) {
              e2.left = w + 5;
            } else {
              e2.left = 0;
            }
          } else {
            e2.top = list[index - 1][i].height + list[index - 1][i].top + 5;
            // 如果是最后一个，则拼接到最短的一边
            // if (index + 1 == tmp.length) {
            // }
            if (i == 1) {
              e2.left = w + 5;
            } else {
              e2.left = 0;
            }
          }
        });
      });
      tmp.forEach(el => {
        this.dataList.push(...el);
      });
    }
  }
};
</script>
<style lang="scss">
.flow-box {
  column-count: 2;
  column-gap: 5px;
  .image {
    // margin: 10px;
    // width: 30%;
    // .image {
    //   width: 100%;
    //   object-fit: contain;
    //   object-position: center;
    // }
  }
}
.img-sub-title {
  position: absolute;
  bottom: 0;
  font-size: 26px;
  height: 30px;
  padding: 10px;
  width: 100%;
  display: block;
  background: rgba(246, 246, 246, 0.583);
}
</style>
