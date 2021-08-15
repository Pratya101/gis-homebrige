import Vue from "vue";
import Router from "vue-router";

import Layout from "@/components/Layout/Layout";

import MapGis from "@/pages/MapGis/Mapgis";
import House from "@/pages/House/House";
import Follow from "@/pages/Follow/Follow";
import FormCheck from "@/pages/FormCheck/FormCheck";
import FormFollow from "@/pages/FormFollow/FormFollow";
import ServiceManage from "@/pages/ServiceManage/ServiceManage";
import FormServiceManage from "@/pages/FormServiceManage/FormServiceManage";
import DetailServiceManage from "@/pages/DetailServiceManage/DetailServiceManage";
import User from "@/pages/Users/User";
import Detail from "@/pages/Detail/Detail";
// import test from "@/pages/test";
import Reports from "@/pages/Reports/Reports";
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";

// import { isAuthenticated } from "./mixins/auth";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "Map",
      name: "Layout",
      component: Layout,

      children: [
        {
          path: "/login",
          name: "Login",
          component: Login,
        },

        {
          path: "/map",
          name: "Map",
          component: MapGis,
        },
        {
          path: "/house",
          name: "House",
          component: House,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
        {
          path: "/detail",
          name: "Detail",
          component: Detail,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
        {
          path: "/formcheck",
          name: "FormCheck",
          component: FormCheck,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
        {
          path: "/formfollow",
          name: "FormFollow",
          component: FormFollow,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
        {
          path: "/follow",
          name: "Follow",
          component: Follow,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
        {
          path: "/servicemanage",
          name: "ServiceMange",
          component: ServiceManage,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
        {
          path: "/fromservicemange",
          name: "FormServiceMange",
          component: FormServiceManage,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
        {
          path: "/detailservicemange",
          name: "DetailServiceMange",
          component: DetailServiceManage,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
        {
          path: "/reports",
          name: "Reports",
          component: Reports,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
        {
          path: "/users",
          name: "Users",
          component: User,
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (token) {
              next();
            } else {
              next({ path: "/login" });
            }
            // isAuthenticated(token) ? next() : next({ path: "/login" });
          },
        },
      ],
    },
    {
      path: "*",
      name: "Error",
      component: Error,
    },
  ],
});
