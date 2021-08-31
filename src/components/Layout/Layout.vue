<template>
  <v-app>
    <Header />
    <Sidebar />

    <v-main>
      <router-view />
      <!-- <Footer /> -->
      <!-- <Helper /> -->
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
// import Footer from "@/components/Footer/Footer";
// import Helper from "@/components/Helper/Helper";

export default {
  name: "Layout",
  components: { Header, Sidebar },
};
</script>

<style src="./Layout.scss" lang="scss" />
