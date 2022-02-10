<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="houseList"
      no-data-text="ไม่พบข้อมูล !"
      no-results-text="ไม่พบข้อมูล !"
      :loading="loading"
      loading-text="กำลังโหลดข้อมูล...."
      class="material-table set-shadow"
      :mobile-breakpoint="0"
      disable-sort
    >
      <template v-slot:[`item.form_id`]="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:[`item.form_fname`]="{ item }">
        {{ item.form_unit }} {{ item.form_fname }} {{ item.form_lname }}
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { apiService } from "@/services/axios";
import houseTableHeader from "./house-table-header";
import address_status from "@/data/address_status.json";
import { mapState } from "vuex";
export default {
  name: "Icons",

  data() {
    return {
      loading: false,
      headers: houseTableHeader,
      address_status_list: [],
      dialog: false,
      houseList: [],
    };
  },
  mounted() {
    this.address_status_list = address_status.data;
    this.address_status_list.unshift("ทั้งหมด");
  },
  computed: {
    ...mapState("house", ["searDataReport"]),
  },

  watch: {
    searDataReport(value) {
      this.getHouseList(value);
    },
    search(value) {
      value == "ทั้งหมด" ? (this.search = "") : value;
    },
  },
  methods: {
    async getHouseList(body) {
      this.loading = true;
      let data = await apiService.post({
        path: "report/form",
        body: body,
      });
      this.houseList = data.data;
      this.loading = false;
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
