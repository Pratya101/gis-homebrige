<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6">
        <h5>
          <v-icon>mdi-format-list-bulleted</v-icon>
          รายการบริหารโครงการ
        </h5>
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
          placeholder="ชื่อโครงการ, ตำบล, อำเภอ, จังหวัด เป็นต้น"
          outlined
          hide-details
        ></v-text-field
      ></v-col>
      <!-- <v-col cols="12" md="6">
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
      ></v-col> -->
      <v-col cols="12">
        <v-data-table
          :disable-sort="true"
          :headers="headers"
          :items="projectList"
          :search="search"
          :loading="loading"
          loading-text="กำลังโหลดข้อมูล..."
          no-data-text="ไม่พบข้อมูล !"
          no-results-text="ไม่พบข้อมูล !"
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
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="primary"
                  @click="detail(item.project_id)"
                  style="cursor:pointer;"
                  ><v-icon>mdi-information-outline</v-icon></v-btn
                >
              </template>
              <span class="set-font-kanit">รายละเอียด</span>
            </v-tooltip>
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="confirmDelete(item.project_id)"
                  color="primary"
                  style="cursor:pointer;"
                  ><v-icon>mdi-delete-outline</v-icon></v-btn
                >
              </template>
              <span>ลบ</span>
            </v-tooltip>
          </template>
        </v-data-table></v-col
      >
    </v-row>
    <v-dialog v-model="dialogConfirmDelete" max-width="600">
      <v-card>
        <v-card-title class="set-font-kanit">
          <v-icon left>mdi-delete-outline</v-icon>
          ยืนยันการลบโครงการ !
        </v-card-title>
        <v-divider class="mb-2"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            large
            color="primary"
            @click="deleteProject"
            class="rounded-lg button-shadow elevation-3 set-font-kanit"
          >
            <v-icon left>fa-save</v-icon>
            ยืนยัน
          </v-btn>
          <v-btn
            large
            @click="dialogConfirmDelete = false"
            color="error"
            outlined
            class="rounded-lg button-shadow elevation-3 set-font-kanit"
            ><v-icon left>fa-times</v-icon>
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialogConfirmDelete: false,
      headers: serviceManagerTableHeader,
      skill: 20,
      dialog: false,
      projectList: [],
      address_status_list: [],
      projectId: "",
      loading: false,
    };
  },
  mounted() {
    this.getProjectList();
    this.address_status_list = address_status.data;
    this.address_status_list.unshift("ทั้งหมด");
  },
  watch: {
    search(value) {
      value == "ทั้งหมด" ? (this.search = "") : value;
    },
  },
  methods: {
    async deleteProject() {
      let data = await apiService.delete({
        path: "project",
        param: this.projectId,
      });
      if (data.response) {
        this.$notify.success({
          title: "ลบโครงการสำเร็จ",
          message: "ทำการโครงการเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.dialogConfirmDelete = false;
      this.getProjectList();
    },
    confirmDelete(id) {
      this.projectId = id;
      this.dialogConfirmDelete = true;
    },
    async getProjectList() {
      this.loading = true;
      let data = await apiService.get({
        path: "project/list",
      });
      this.projectList = data.data;
      this.loading = false
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
