import axios from "../axios";

/*
 * 产品操作模块
 */

export const save = (data) => {
  return axios({
    url: "/product/save",
    method: "post",
    data,
  });
};

export const update = (data) => {
  return axios({
    url: "/product/update",
    method: "post",
    data,
  });
};

export const deleteById = (data) => {
  return axios({
    url: "/product/delete",
    method: "GET",
    params: data,
  });
};

export const findPage = (data) => {
  return axios({
    url: "/product/findPage",
    method: "post",
    data,
  });
};
