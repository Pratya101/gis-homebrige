<template>
  <v-navigation-drawer
    app
    clipped
    class="elevation-5"
    v-model="DRAWER_STATE"
    :mini-variant="!DRAWER_STATE"
    :width="sidebarWidth"
    :permanent="$vuetify.breakpoint.lgAndUp"
    :temporary="$vuetify.breakpoint.mdAndDown"
    :mini-variant-width="sidebarMinWidth"
    :class="{ 'drawer-mini': !DRAWER_STATE }"
  >
    <v-list>
      <template v-for="(item, i) in items">
        <v-row v-if="item.heading" :key="item.heading" align="center"> </v-row>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-4"
        ></v-divider>
        <v-list-group
          color="primary"
          v-else-if="item.children && DRAWER_STATE"
          :key="item.title"
          v-model="item.model"
        >
          <template v-slot:prependIcon>
            <v-icon size="24" class="mr-0 ml-0" color="greyTint">
              {{ item.icon }}
            </v-icon>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-show="!item.type"
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
            link
            class="pl-12"
            @click="child.action ? child.action() : null"
          >
            <v-list-item-action class="mr-2" v-if="child.icon">
              <v-icon size="">{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-if="item.type">
            <v-list-group
              v-for="(item, i) in item.children"
              :key="i"
              :value="true"
              no-action
              sub-group
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="(child, i) in item.children" :key="i" link>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item>
            </v-list-group>
          </template>
        </v-list-group>
        <v-list-item
          color="primary"
          v-else
          :key="item.text"
          :href="item.href ? item.href : null"
          :to="item.link === '#' ? '' : item.link"
          @click="item.action ? item.action() : null"
          link
        >
          <v-list-item-action class="mr-6">
            <v-icon
              :size="item.size ? item.size : 24"
              :color="item.color ? item.color : 'greyTint'"
              >{{ item.icon }}</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title link>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      items: [
        {
          title: "แผนที่ GIS",
          icon: "mdi-map-marker-radius-outline",
          link: "/map",
        },
        {
          title: "ข้อมูลครัวเรือน",
          icon: "mdi-home-group",
          link: "/house",
        },
        {
          title: "ข้อมูลติดตามการพัฒนา ฯ",
          icon: "mdi-account-reactivate-outline",
          link: "/follow",
        },

        {
          title: "บริหารโครงการ",
          icon: "mdi-chart-areaspline",
          link: "/servicemanage",
        },
        {
          title: "รายงาน",
          icon: "mdi-file",
          link: "/reports",
        },
      ],

      sidebarWidth: 260,
      sidebarMinWidth: 96,
    };
  },
  computed: {
    ...mapState("layout", {
      drawer: (state) => state.drawer,
    }),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        if (newValue === this.drawer) return;
        this.TOGGLE_DRAWER();
      },
    },
  },
  methods: {
    ...mapActions("layout", ["TOGGLE_DRAWER"]),
    logOut: function() {
      window.localStorage.setItem("authenticated", false);
      window.localStorage.removeItem("token");
      this.$router.push("/login");
    },
    addSection: function() {
      this.dialog = true;
    },
  },
};
</script>

<style src="./Sidebar.scss" lang="scss" />
