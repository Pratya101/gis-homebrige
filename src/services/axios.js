import config from "../config";

const axios = require("axios");
axios.defaults.baseURL = config.baseURLApi;
const apiService = {
  getToken: function(payload) {
    try {
      let { path, param, header } = payload;
      var respone = new Promise((resolve) => {
        var url = `${path}${param || param == 0 ? "/" + param : ""}`;
        axios
          .get(url, {
            headers: {
              Authorization: !header ? "" : header,
            },
          })
          .then(async (res) => {
            resolve(res.data);
          });
      });
      return respone;
    } catch (err) {
      console.log(err);
      return "GET ERROR";
    }
  },

  post: async function(payload) {
    try {
      let { path, body, header } = payload;
      var respone = await new Promise(function(resolve) {
        axios
          .post(`${path}`, body, {
            headers: {
              Authorization: !header ? "" : header,
            },
          })
          .then(async (res) => {
            resolve(res.data);
          });
      });
      return respone;
    } catch (err) {
      console.log(err);
      return "POST ERROR";
    }
  },

  get: async function(payload) {
    try {
      let { path, param, header } = payload;
      var respone = await new Promise(function(resolve) {
        var url = `${path}${param || param == 0 ? "/" + param : ""}`;
        axios
          .get(url, {
            headers: {
              Authorization: !header ? "" : header,
            },
          })
          .then(async (res) => {
            resolve(res.data);
          });
      });
      return respone;
    } catch (err) {
      console.log(err);
      return "GET ERROR";
    }
  },
  put: async function(payload) {
    try {
      let { path, param, body, header } = payload;
      var respone = await new Promise(function(resolve) {
        var url = `${path}${param || param == 0 ? "/" + param : ""}`;
        axios
          .put(url, body, {
            headers: {
              Authorization: !header ? "" : header,
            },
          })
          .then(async (res) => {
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
      let { path, param, header } = payload;
      var respone = await new Promise(function(resolve) {
        var url = `${path}${param || param == 0 ? "/" + param : ""}`;
        axios
          .delete(url, {
            headers: {
              Authorization: !header ? "" : header,
            },
          })
          .then(async (res) => {
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
