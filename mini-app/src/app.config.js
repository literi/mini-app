export default defineAppConfig({
  lazyCodeLoading: "requiredComponents",
  pages: ["pages/index/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ff6347",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    backgroundColor: "#eeeeee",
    navigationStyle: "custom"
  },
  subPackages: [
    {
      root: "pages/playground/",
      pages: ["index"]
    },
    {
      root: "pages/topic/",
      pages: ["index"]
    },
    {
      root: "pages/msgBox/",
      pages: ["index"]
    },
    {
      root: "pages/productDetail/",
      pages: ["index"]
    },
    {
      root: "pages/searchList/",
      pages: ["index"]
    },
    {
      root: "pages/address/",
      pages: ["index", "form"]
    },
    {
      root: "pages/order/",
      pages: ["index"]
    }
  ]
});
