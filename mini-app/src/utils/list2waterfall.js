/**
 * 普通的list 对象 转 瀑布流对象
 */
// 按比例获取高度
// x = (w1 * h)/w
const getRateHeight = (w, h, w1) => {
  const tmp = (w1 * h) / h;
  return Math.floor(tmp);
};
export const list2waterfall = (list, widthR, column) => {
  const imgList = list.map(el => {
    const img = new Image();
    img.src = el;
    const { width, height } = img;
    const _h = getRateHeight(width, height, widthR);
    const obj = {
      url: el,
      width: widthR,
      height: _h
    };
    return obj;
  });

  return imgList;
};
