import http from "../utils/interceptor.js";
const baseUrl = "http://127.0.0.1:8010";

export default {
  getContact(url, type, params) {
    if ((type = "get")) {
      return http.get(baseUrl + url, { params });
    } else if ((type = "post")) {
      return http.post(baseUrl + url, { params });
    }
  },
  getLogin(params) {
    return http.get(baseUrl + "/api/account/login-from-mini-programe", params);
  }
};
