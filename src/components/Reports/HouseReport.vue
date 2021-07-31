<template>
  <v-data-table
    :headers="headers"
    :items="houseList"
    :search="search"
    class="material-table set-shadow"
    :mobile-breakpoint="0"
  >
    <template v-slot:[`item.form_id`]="{ index }">
      {{ index + 1 }}
    </template>
    <template v-slot:[`item.form_fname`]="{ item }">
      {{ item.form_unit }} {{ item.form_fname }} {{ item.form_lname }}
    </template>
  </v-data-table>
</template>
<script>
import { apiService } from "@/services/axios";
import houseTableHeader from "./house-table-header";
import address_status from "@/data/address_status.json";
export default {
  name: "Icons",
  data() {
    return {
      search: null,
      headers: houseTableHeader,
      address_status_list: [],
      dialog: false,
      houseList: [],
    };
  },
  mounted() {
    this.getHouseList();
    this.address_status_list = address_status.data;
    this.address_status_list.unshift("ทั้งหมด");
  },
  watch: {
    search(value) {
      value == "ทั้งหมด" ? (this.search = "") : value;
    },
  },
  methods: {
    async getHouseList() {
      let data = await apiService.get({
        path: "form/list",
      });
      this.houseList = data.data;
    },
    map(id) {
      this.$router.push({
        name: "Map",
        query: { id: id },
      });
    },
    detail(id) {
      this.$router.push({
        name: "Detail",
        query: { id: id },
      });
    },
    onSearch() {
      this.dialog = true;
    },
  },
};
</script>

<style src="./House.scss" lang="scss" />
