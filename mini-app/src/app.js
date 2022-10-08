import { createApp } from "vue";
import Taro from "@tarojs/taro";
import "taro-ui-vue3/dist/style/components/button.scss";
import "taro-ui-vue3/dist/style/components/tab-bar.scss";
import "taro-ui-vue3/dist/style/components/nav-bar.scss";
import "taro-ui-vue3/dist/style/components/card.scss";
import "taro-ui-vue3/dist/style/components/list.scss";
import "taro-ui-vue3/dist/style/components/form.scss";
import "taro-ui-vue3/dist/style/components/input.scss";
import "taro-ui-vue3/dist/style/components/grid.scss";
import "taro-ui-vue3/dist/style/components/search-bar.scss";
import "taro-ui-vue3/dist/style/components/tabs.scss";
import "taro-ui-vue3/dist/style/components/virtual-scroll.scss";
const App = createApp({
  onShow(options) {
    // console.log(options);
  },
  mounted() {
    console.log("test,++++");
    Taro.checkSession({
      success() {
        return Taro.getStorage({ key: "session3rd" });
      },
      fail() {
        return Taro.login()
          .then(response => {
            return Taro.request({
              url: "后端接口",
              code: response.code
            }).then(res => {
              if (res.statusCode === 200) {
                Taro.setStorage({
                  key: "session3rd",
                  data: res.data.data.session3rd
                });
              } else if (res.status === 500) {
                Taro.showToast({
                  title: "发生错误，请重试！",
                  icon: "none"
                });
              }
            });
          })
          .catch(err => {
            console.log(err);
            Taro.showToast({
              title: "发生错误，请重试!",
              icon: "none"
            });
          });
      }
    });
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});
Taro.getSystemInfo({}).then(res => {
  Taro.$navBarMarginTop = res.statusBarHeight || 0;
});

export default App;
