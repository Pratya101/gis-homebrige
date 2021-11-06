<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6">
        <h3>
          <v-icon>mdi-format-list-bulleted</v-icon>
          รายการติดตามการพัฒนาที่อยู่อาศัย
        </h3>
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
          placeholder="เลขบัตรประชาชน, ชื่อ-นามสกุล เป็นต้น"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="search"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          :items="address_status_list"
          outlined
          hide-details
          placeholder="เลือกสภาพที่อยู่อาศัย"
          label="เลือกสภาพที่อยู่อาศัย"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4" class="py-0">
        <v-autocomplete
          hide-details
          class="rounded-lg elevation-3"
          :items="subDistrictsList"
          v-model="subDistrictSelect"
          item-value="SUB_DISTRICT_NAME"
          item-text="SUB_DISTRICT_NAME"
          placeholder="ตำบล/แขวง"
          label="ตำบล/แขวง"
          background-color="#ffffff"
          outlined
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" class="py-0">
        <v-autocomplete
          hide-details
          :items="districtList"
          v-model="districtSelect"
          placeholder="อำเภอ/เขต"
          class="rounded-lg elevation-3"
          item-value="DISTRICT_NAME"
          background-color="#ffffff"
          item-text="DISTRICT_NAME"
          label="อำเภอ/เขต"
          outlined
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" class="py-0">
        <v-autocomplete
          hide-details
          :items="provinceList"
          v-model="provinceSelect"
          class="rounded-lg elevation-3"
          placeholder="จังหวัด"
          background-color="#ffffff"
          item-value="PROVINCE_NAME"
          item-text="PROVINCE_NAME"
          label="จังหวัด"
          outlined
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="followList"
          :search="search"
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
          <template v-slot:[`item.rating_description`]="{ item }">
            <v-chip
              small
              label
              class="rounded-lg elevation-4"
              v-if="item.rating_description == 'เริ่มเข้าโครงการ'"
              color="primary"
              >{{ item.rating_description }}
            </v-chip>
            <v-chip
              small
              label
              class="rounded-lg elevation-4"
              v-else-if="item.rating_description == 'เตรียมข้อมูล'"
              color="error"
              >{{ item.rating_description }}
            </v-chip>
            <v-chip
              small
              label
              class="rounded-lg elevation-4"
              v-else-if="item.rating_description == 'กำลังดำเนินการ'"
              color="warning"
              >{{ item.rating_description }}
            </v-chip>
            <v-chip
              small
              label
              class="rounded-lg elevation-4"
              v-else
              color="success"
              >{{ item.rating_description }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  :disabled="item.rating_description == 'สำเร็จ'"
                  @click="updateStatus(item)"
                  color="primary"
                  style="cursor: pointer"
                >
                  <v-icon>mdi-update</v-icon>
                </v-btn>
              </template>
              <span>อัพเดทความคืบหน้า</span>
            </v-tooltip>
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="showDetail(item.map_project_form_id)"
                  color="primary"
                  style="cursor: pointer"
                >
                  <v-icon>mdi-file</v-icon>
                </v-btn>
              </template>
              <span>ข้อมูลการติดตาม</span>
            </v-tooltip>
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="confirmDelete(item.map_project_form_id)"
                  color="primary"
                  style="cursor: pointer"
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
    <UpdateFllow v-on:update="getFollowList"></UpdateFllow>
    <DetailFollow></DetailFollow>
    <v-dialog v-model="dialogConfirmDelete" max-width="600">
      <v-card>
        <v-card-title class="set-font-kanit">
          <v-icon left>mdi-delete-outline</v-icon>
          ยืนยันการลบครัวเรือนออกจากการพัฒนาที่อยู่อาศัย !
        </v-card-title>
        <v-divider class="mb-2"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            large
            @click="deleteFollow"
            color="primary"
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
import followTableHeader from "./follow-table-header.json";
import { apiService } from "@/services/axios";
import address_status from "@/data/address_status.json";
import UpdateFllow from "@/components/Follow/UpdateFllow";
import DetailFollow from "@/components/Follow/DetailFollow";
import subDistricts from "@/data/subDistricts";
import district from "@/data/districts";
import province from "@/data/provinces";
import { mapActions } from "vuex";
export default {
  name: "Follow",
  components: {
    UpdateFllow,
    DetailFollow,
  },
  data() {
    return {
      subDistrictsList: subDistricts,
      districtList: district,
      provinceList: province,
      subDistrictSelect: "",
      districtSelect: "",
      provinceSelect: "",
      search: "",
      dialog: false,
      headers: followTableHeader,
      followList: [],
      address_status_list: [],
      dialogConfirmDelete: false,
      map_project_form_id: "",
    };
  },
  mounted() {
    this.getFollowList();
    this.address_status_list = address_status.data;
    this.address_status_list.unshift("ทั้งหมด");
    this.subDistrictsList.unshift({ SUB_DISTRICT_NAME: "ทั้งหมด" });
    this.districtList.unshift({ DISTRICT_NAME: "ทั้งหมด" });
    this.provinceList.unshift({ PROVINCE_NAME: "ทั้งหมด" });
    this.subDistrictSelect = "ทั้งหมด";
    this.districtSelect = "ทั้งหมด";
    this.provinceSelect = "ทั้งหมด";
  },
  watch: {
    subDistrictSelect() {
      this.getFollowList();
    },
    districtSelect() {
      this.getFollowList();
    },
    provinceSelect() {
      this.getFollowList();
    },
  },
  methods: {
    async deleteFollow() {
      let data = await apiService.delete({
        path: "mapprojectfrom",
        param: this.map_project_form_id,
      });
      if (data.response) {
        this.$notify.success({
          title: "ลบข้อมูลการพัฒนา",
          message: "ทำการข้อมูลการพัฒนาเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.dialogConfirmDelete = false;
      this.getFollowList();
    },
    confirmDelete(id) {
      this.map_project_form_id = id;
      this.dialogConfirmDelete = true;
    },
    ...mapActions("house", ["updateStatusHouse", "updateFollowData"]),
    showDetail(data) {
      this.updateFollowData(data);
    },
    updateStatus(data) {
      this.updateStatusHouse(data);
    },
    async getFollowList() {
      let body = {
        district: this.districtSelect,
        sub_district: this.subDistrictSelect,
        province: this.provinceSelect,
      };
      let data = await apiService.post({
        path: "mapprojectfrom/list",
        body: body,
      });
      this.followList = data.data;
    },
    map() {
      this.$router.push("/map");
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

<style src="./Follow.scss" lang="scss" />
