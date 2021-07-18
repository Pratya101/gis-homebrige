import Vue from "vue";
import App from "./App.vue";
import router from "./Routes";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import config from "./config";
import * as VueGoogleMaps from "vue2-google-maps";
import { AuthMixin } from "./mixins/auth";
// import { apiService } from "./services/axios.js";
import LongdoMap from "longdo-map-vue";
Vue.use(LongdoMap, {
  load: {
    apiKey: "4950658d2b8d1babc2e9f4b2515bd9d3",
  },
});
axios.defaults.baseURL = config.baseURLApi;
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg",
  },
});
Vue.mixin(AuthMixin);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
