<template>
  <v-app-bar
    elevation="5"
    class="main-header"
    height="64"
    fixed
    color="primary"
    dark
  >
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template v-if="DRAWER_STATE">
        <v-icon size="28" :class="$vuetify.theme.dark ? 'primary--text' : null"
          >mdi-arrow-left</v-icon
        >
      </template>
      <template v-else>
        <v-icon size="28" :class="$vuetify.theme.dark ? 'primary--text' : null"
          >mdi-menu</v-icon
        >
      </template>
    </v-btn>
    <v-toolbar-title
      class="set-font-kanit light--text set-font-shadows"
      style="font-size:2rem"
      >แบบประเมินชุมชนสลัม</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-menu min-width="180" offset-y bottom left nudge-bottom="10">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar size="40" v-bind="attrs" v-on="on" class="mr-3">
          <img src="@/assets/img/image.png" alt="ผู้ใช้งาน" />
        </v-avatar>
      </template>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in account" :key="i">
            <v-list-item-icon class="mr-4">
              <v-icon :color="item.color" v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                color="greyTint"
                v-text="item.text"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <div class="d-flex justify-center my-3">
          <v-btn
            width="80%"
            large
            outlined
            color="primary"
            class="text-capitalize"
            @click="logoutUser"
            >ออกจากระบบ</v-btn
          >
        </div>
      </v-list>
    </v-menu>
    <div class="greeting-text mr-3 d-none d-md-block">
      <span>John Smith</span>
    </div>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import config from "../../config";

export default {
  name: "Header",
  data: () => ({
    config,
    account: [{ text: "โปรไฟล์", icon: "mdi-account", color: "greyTint" }],
    notificationsBadge: true,
    messageBadge: true,
  }),
  computed: {
    ...mapState("layout", { drawer: (state) => state.drawer }),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
    },
  },
  methods: {
    ...mapActions("layout", ["TOGGLE_DRAWER"]),
    ...mapActions("auth", ["logoutUser"]),
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
