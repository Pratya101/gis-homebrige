<template>
  <v-data-table
    :headers="headers"
    :items="projectList"
    no-data-text="ไม่พบข้อมูล !"
    no-results-text="ไม่พบข้อมูล !"
    :loading="loading"
    loading-text="กำลังโหลดข้อมูล...."
    :search="search"
    class="material-table set-shadow"
    :mobile-breakpoint="0"
    disable-sort
  >
    <template v-slot:[`item.project_id`]="{ index }">
      {{ index + 1 }}
    </template>
    <template v-slot:[`item.project_budget`]="{ item }">
      {{ item.project_budget | formatPrice }}
    </template>
    <template v-slot:[`item.percent`]="{ item }">
      <v-progress-linear
        v-model="item.project_profress"
        class="elevation-3 rounded-lg"
        color="warning"
        height="25"
      >
      </v-progress-linear>
    </template>
  </v-data-table>
</template>

<script>
import { apiService } from "@/services/axios";
import serviceManagerTableHeader from "./service-manager-table-header";
import address_status from "@/data/address_status.json";
import { mapState } from "vuex";
export default {
  name: "Icons",
  data() {
    return {
      search: "",
      headers: serviceManagerTableHeader,
      skill: 20,
      dialog: false,
      loading: false,
      projectList: [],
      address_status_list: [],
    };
  },
  computed: {
    ...mapState("house", ["searDataReport"]),
  },
  watch: {
    searDataReport(value) {
      this.getProjectList(value);
    },
  },
  mounted() {
    this.getProjectList();
    this.address_status_list = address_status.data;
    this.address_status_list.unshift("ทั้งหมด");
  },
  methods: {
    async getProjectList(body) {
      this.loading = true;
      let data = await apiService.post({
        path: "report/project",
        body: body,
      });
      this.projectList = data.data;
      this.loading = false;
    },
    map() {
      this.$router.push("/map");
    },
    detail(id) {
      this.$router.push({ path: "/detailservicemange", query: { id: id } });
    },
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style src="./ServiceManage.scss" lang="scss" />
