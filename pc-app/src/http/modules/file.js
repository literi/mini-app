import axios from "../axios";

/*
 * 产品操作模块
 */

export const save = (data) => {
  return axios({
    url: "/file/save",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const update = (data) => {
  return axios({
    url: "/file/update",
    method: "post",
    data,
  });
};

export const deleteById = (data) => {
  return axios({
    url: "/file/delete",
    method: "GET",
    data,
  });
};

export const findPage = (data) => {
  return axios({
    url: "/file/findPage",
    method: "post",
    data,
  });
};
