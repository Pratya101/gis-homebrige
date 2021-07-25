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
import Detail from "@/pages/Detail/Detail";
import test from "@/pages/test";

import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";

// import { isAuthenticated } from "./mixins/auth";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },

    {
      path: "/test",
      name: "test",
      component: test,
    },

    {
      path: "/",
      redirect: "login",
      name: "Layout",
      component: Layout,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("token");
        if (token) {
          next();
        } else {
          next({ path: "/login" });
        }
        // isAuthenticated(token) ? next() : next({ path: "/login" });
      },
      children: [
        {
          path: "/map",
          name: "Map",
          component: MapGis,
        },
        {
          path: "/house",
          name: "House",
          component: House,
        },
        {
          path: "/detail",
          name: "Detail",
          component: Detail,
        },
        {
          path: "/formcheck",
          name: "FormCheck",
          component: FormCheck,
        },
        {
          path: "/formfollow",
          name: "FormFollow",
          component: FormFollow,
        },
        {
          path: "/follow",
          name: "Follow",
          component: Follow,
        },
        {
          path: "/servicemanage",
          name: "ServiceMange",
          component: ServiceManage,
        },
        {
          path: "/fromservicemange",
          name: "FormServiceMange",
          component: FormServiceManage,
        },
        {
          path: "/detailservicemange",
          name: "DetailServiceMange",
          component: DetailServiceManage,
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
