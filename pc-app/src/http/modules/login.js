import axios from "../axios";

/*
 * 系统登录模块
 */

// 登录
export const login = (data) => {
  return axios({
    url: "/admin/login",
    method: "post",
    data,
  });
};

// 登出
export const logout = () => {
  return axios({
    url: "/admin/logout",
    method: "get",
  });
};
