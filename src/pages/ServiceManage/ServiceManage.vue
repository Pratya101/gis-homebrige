<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6">
        <h2>
          <v-icon
            style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 30px;"
            >mdi-format-list-bulleted</v-icon
          >
          รายการบริหารโครงการ
        </h2>
      </v-col>
      <v-col cols="12" md="6" class="d-md-flex justify-md-end px-0">
        <v-btn
          color="primary"
          @click="$router.push('/fromservicemange')"
          outlined
          large
          class="set-font-kanit rounded-lg elevation-4"
          ><v-icon left>fa-plus</v-icon> เพิ่มโครงการ</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="pt-0 mt-0">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาข้อมูล"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          placeholder="เลขบัตรประชาชน, ชื่อ-นามสกุล, ตำบล, อำเภอ, จังหวัด เป็นต้น"
          outlined
          hide-details
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="search"
          hide-details
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          :items="address_status_list"
          outlined
          placeholder="เลือกสภาพที่อยู่อาศัย"
          label="เลือกสภาพที่อยู่อาศัย"
        ></v-select
      ></v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="projectList"
          :search="search"
          class="material-table set-shadow"
          :mobile-breakpoint="0"
        >
          <template v-slot:[`item.project_id`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.project_profress`]="{ item }">
            <v-progress-linear
              v-model="item.project_profress"
              class="elevation-3 rounded-lg"
              color="warning"
              height="25"
            >
              {{ item.project_profress }} %
            </v-progress-linear>
          </template>
          <template v-slot:[`item.project_budget`]="{ item }">
            {{ item.project_budget | formatPrice }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              icon
              color="primary"
              @click="detail(item.project_id)"
              style="cursor:pointer;"
              ><v-icon>mdi-information-outline</v-icon></v-btn
            >
          </template>
        </v-data-table></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import { apiService } from "@/services/axios";
import serviceManagerTableHeader from "./service-manager-table-header";
import address_status from "@/data/address_status.json";
export default {
  name: "Icons",
  data() {
    return {
      search: "",
      headers: serviceManagerTableHeader,
      skill: 20,
      dialog: false,
      projectList: [],
      address_status_list: [],
    };
  },
  mounted() {
    this.getProjectList();
    this.address_status_list = address_status.data;
    this.address_status_list.unshift("ทั้งหมด");
  },
  methods: {
    async getProjectList() {
      let data = await apiService.get({
        path: "project/list",
      });
      this.projectList = data.data;
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
