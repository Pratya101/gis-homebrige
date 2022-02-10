<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6">
        <h3>
          <v-icon>mdi-format-list-bulleted</v-icon>
          รายการข้อมูลครัวเรือน
        </h3>
      </v-col>
      <v-col cols="12" md="6" class="d-md-flex justify-md-end">
        <v-btn
          color="primary"
          @click="$router.push('/formcheck')"
          outlined
          large
          class="set-font-kanit rounded-lg elevation-4"
        >
          <v-icon left>mdi-file-document-edit-outline</v-icon>
          สํารวจข้อมูลที่อยู่อาศัย
        </v-btn>
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
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="search"
          hide-details
          class="elevation-3 rounded-lg"
          :items="address_status_list"
          outlined
          background-color="#ffffff"
          placeholder="เลือกสภาพที่อยู่อาศัย"
          label="เลือกสภาพที่อยู่อาศัย"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :disable-sort="true"
          :headers="headers"
          :items="houseList"
          :search="search"
          :loading="loading"
          no-data-text="ไม่พบข้อมูล !"
          no-results-text="ไม่พบข้อมูล !"
          loading-text="กำลังโหลดข้อมูล...."
          class="material-table set-shadow"
          :mobile-breakpoint="0"
        >
          <template v-slot:[`item.form_id`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.form_fname`]="{ item }">
            {{ item.form_unit }} {{ item.form_fname }} {{ item.form_lname }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="primary"
                  @click="map(item.form_id)"
                  style="cursor:pointer;"
                >
                  <v-icon>mdi-map-marker-radius-outline</v-icon>
                </v-btn>
              </template>
              <span>ตำแหน่งที่อยู่</span>
            </v-tooltip>

            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="primary"
                  @click="detail(item.form_id)"
                  style="cursor:pointer;"
                >
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span>รายละเอียด</span>
            </v-tooltip>
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="primary"
                  @click="confirmDelete(item.form_id)"
                  style="cursor:pointer;"
                >
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </template>
              <span>ลบ</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogConfirmDelete" max-width="600">
      <v-card>
        <v-card-title class="set-font-kanit">
          <v-icon left>mdi-delete-outline</v-icon>
          ยืนยันการลบครัวเรือน !
        </v-card-title>
        <v-divider class="mb-2"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            large
            color="primary"
            @click="deleteForm"
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
          >
            <v-icon left>fa-times</v-icon>
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { apiService } from "@/services/axios";
import houseTableHeader from "./house-table-header";
import address_status from "@/data/address_status.json";
export default {
  name: "Icons",
  data() {
    return {
      dialogConfirmDelete: false,
      search: null,
      headers: houseTableHeader,
      address_status_list: [],
      loading: false,
      dialog: false,
      houseList: [],
      form_id: "",
      addressStatusSelect: "",
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
    async deleteForm() {
      let data = await apiService.delete({
        path: "form",
        param: this.form_id,
      });
      if (data.response) {
        this.$notify.success({
          title: "ลบครัวเรือนสำเร็จ",
          message: "ทำการครัวเรือนเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.dialogConfirmDelete = false;
      this.getHouseList();
    },
    confirmDelete(id) {
      this.form_id = id;
      this.dialogConfirmDelete = true;
    },
    async getHouseList() {
      this.loading = true;
      let data = await apiService.get({
        path: "form/list",
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
  },
};
</script>

<style src="./House.scss" lang="scss" />
