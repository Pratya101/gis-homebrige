import Vue from "vue";
import App from "./App.vue";
import router from "./Routes";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";
import { AuthMixin } from "./mixins/auth";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/th";
import JsonExcel from "vue-json-excel";
// import LongdoMap from "longdo-map-vue";

Vue.component( "downloadExcel", JsonExcel );
Vue.use( ElementUI, { locale } );
// Vue.use(LongdoMap, {
//   load: {
//     apiKey: "4950658d2b8d1babc2e9f4b2515bd9d3",
//     // googleQuery: "key=AIzaSyAzEyvuAAHkVAZWF3VKDf3fKWwtqnjNVQo",
//   },
// });
Vue.use( VueGoogleMaps, {
    load : {
        key : "AIzaSyDArsAx-DI67-hzOfDfA4FbPYKLfa7yg-E",
    },
} );
Vue.mixin( AuthMixin );
Vue.config.productionTip = false;
new Vue( {
    vuetify,
    router,
    render : ( h ) => h( App ),
    store,
} ).$mount( "#app" );
