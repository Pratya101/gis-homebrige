const axios = require("axios");
const www = "http://13.250.39.5:5000/";
let token = localStorage.getItem("token");

const apiService = {
  post: async function(payload) {
    try {
      let { path, body } = payload;
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
      var respone = await new Promise(function(resolve) {
        axios.post(`${www}${path}`, body).then(async (res) => {
          if (path == "login") {
            axios.defaults.headers.common["Authorization"] = res.data.token;
            localStorage.setItem("token", res.data.token);
          }
          resolve(res.data.data == null ? { ...res.data, data: [] } : res.data);
        });
      });
      return respone;
    } catch (err) {
      return "POST ERROR";
    }
  },
  get: async function(payload) {
    try {
      let { path, param } = payload;

      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
      var respone = await new Promise(function(resolve) {
        var url = `${www}${path}${param || param == 0 ? "/" + param : ""}`;
        axios.get(url).then(async (res) => {
          resolve(res.data);
        });
      });
      return respone;
    } catch (err) {
      return "GET ERROR";
    }
  },
  put: async function(payload) {
    try {
      let { path, param, body } = payload;
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
      var respone = await new Promise(function(resolve) {
        var url = `${www}${path}${param || param == 0 ? "/" + param : ""}`;
        axios.put(url, body).then(async (res) => {
          resolve(res.data);
        });
      });
      return respone;
    } catch (err) {
      console.log(err);
      return "UPDATE ERROR";
    }
  },
  delete: async function(payload) {
    try {
      let { path, param } = payload;
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
      var respone = await new Promise(function(resolve) {
        var url = `${www}${path}${param || param == 0 ? "/" + param : ""}`;
        axios.delete(url).then(async (res) => {
          resolve(res.data);
        });
      });
      return respone;
    } catch (err) {
      console.log(err);
      return "DELETE ERROR";
    }
  },
};

export { apiService };
