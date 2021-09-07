<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="7" class="mb-0 py-0">
        <h3 class="mt-5"><v-icon>mdi-file-excel-outline</v-icon> รายงาน</h3>
      </v-col>
      <v-col cols="12" md="5" class="mb-0 py-0 d-flex justify-content-end">
        <v-select
          v-model="reportTypeSelect"
          outlined
          label="เลือกประเภทรายงาน"
          hide-details
          background-color="#ffffff"
          class="rounded-lg pt-4 me-2"
          item-value="value"
          item-text="text"
          :items="reportsType"
        ></v-select>
        <download-excel
          :name="reportName"
          :data="reportList"
          :fields="title"
          v-if="reportTypeSelect != 0"
          class="pt-4"
        >
          <v-btn
            x-large
            color="primary"
            class=" rounded-lg elevation-3"
            outlined
          >
            <v-icon left>mdi-file-excel-outline</v-icon>ออกรายงาน
          </v-btn>
        </download-excel>
      </v-col>
      <v-col cols="12" v-if="reportTypeSelect == 0">
        <div class="text-center mt-10">
          <v-icon
            style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 120px;"
            >mdi-file-document-outline</v-icon
          >
          <div
            style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 80px;"
          >
            รายงาน
          </div>
        </div>
      </v-col>
    </v-row>
    <SearchHouseReport
      v-on:onSearch="getHouseList"
      class="mt-6"
      v-if="reportTypeSelect == 1"
    ></SearchHouseReport>
    <SearchFollowReport
      v-on:onSearch="getFollowList"
      class="my-6"
      v-if="reportTypeSelect == 2"
    ></SearchFollowReport>
    <SearchProjectReport
      v-on:onSearch="getProjectList"
      class="my-6"
      v-if="reportTypeSelect == 3"
    ></SearchProjectReport>
    <v-row>
      <v-col cols="12 mt-0 pt-0">
        <HouseReport v-if="reportTypeSelect == 1"></HouseReport>
        <FollowReport v-if="reportTypeSelect == 2"></FollowReport>
        <ProjectReport v-if="reportTypeSelect == 3"></ProjectReport>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { apiService } from "@/services/axios";
import HouseReport from "@/components/Reports/HouseReport";
import FollowReport from "@/components/Reports/FollowReport";
import ProjectReport from "@/components/Reports/ProjectReport";
import SearchHouseReport from "@/components/Reports/SearchHouseReport";
import SearchFollowReport from "@/components/Reports/SearchFollowReport";
import SearchProjectReport from "@/components/Reports/SearchProjectReport";
import { mapState } from "vuex";
export default {
  name: "Reports",
  components: {
    HouseReport,
    FollowReport,
    ProjectReport,
    SearchHouseReport,
    SearchFollowReport,
    SearchProjectReport,
  },
  data() {
    return {
      dialog: false,
      reportTypeSelect: 0,
      title: {},
      reportsType: [
        { value: 0, text: "เลือกรายงาน" },
        { value: 1, text: "รายงานข้อมูลครัวเรือน" },
        { value: 2, text: "รายงานข้อมูลติดตามการพัฒนา" },
        { value: 3, text: "รายงานข้อมูลการบริการโครงการ" },
      ],
      reportList: [],
      reportName: "รายงานข้อมูลครัวเรือน",
    };
  },
  computed: {
    ...mapState("house", ["searDataReport"]),
  },
  mounted() {
    this.getHouseList();
  },
  watch: {
    searDataReport(value) {
      if (this.reportTypeSelect == 1) {
        this.getHouseList(value);
      } else if (this.reportTypeSelect == 2) {
        this.getFollowList(value);
      } else if (this.reportTypeSelect == 3) {
        this.getProjectList(value);
      }
    },
    reportTypeSelect(value) {
      if (value == 1) {
        this.reportName = "รายงานข้อมูลครัวเรือน";
        this.title = {
          เลขประจำตัวประชาชน: "form_id_card",
          คำนำหน้า: "form_unit",
          ชื่อ: "form_fname",
          นามสกุล: "form_lname",
          "ตำแหน่ง/สถานะภาพ": "form_position",
          จำนวนสมาชิกในครัวเรือน: "form_members",
          บ้านเลขที่: "form_home_id",
          หมู่ที่: "form_village",
          ตำบล: "form_sub_district",
          อำเภอ: "form_district",
          จังหวัด: "form_province",
          ภาค: "form_geo",
          พิกัดLat: "form_lat",
          พิกัดLon: "form_long",
          สภาพที่อยู่อาศัย: "form_living",
          แนวทางการปรับปรุง: "form_improvement",
          ความต้องการที่อยู่อาศัย: "form_housing_needs",
          ลักษณะบ้าน: "form_house_style",
          กรรมสิทธิ์ที่ดินของบ้านปัจจุบัน: "form_house_ownership",
          สถานะที่ดิน: "form_land",
          รูปภาพที่อยู่อาศัย: "home_img",
        };
      } else if (value == 2) {
        this.reportName = "รายงานข้อมูลติดตามการพัฒนา";
        this.title = {
          คำนำหน้า: "form_unit",
          ชื่อ: "form_fname",
          นามสกุล: "form_lname",
          บ้านเลขที่: "form_home_id",
          หมู่ที่: "form_village",
          ตำบล: "form_sub_district",
          อำเภอ: "form_district",
          จังหวัด: "form_province",
          ภาค: "form_geo",
          พิกัดLat: "form_lat",
          พิกัดLon: "form_long",
          ชื่อโครงการ: "project_name",
          หมวดการพัฒนา: "form_improvement",
          สถานะการพัฒนา: "status_project",
          รูปภาพขั้นเตรียมข้อมูล: "images_prepare",
          รูปภาพขั้นตอนกำลังดำเนินงาน: "images_progress",
          รูปภาพขั้นตอนดำเนินเสร็จสิ้น: "images_success",
        };
      } else if (value == 3) {
        this.title = {
          ชื่อโครงการ: "project_name",
          ประเภทโครงการ: "project_type_name",
          เครือข่าย: "project_network_name",
          ตำบล: "project_sub_district",
          อำเภอ: "project_district",
          จังหวัด: "project_province",
          ภาค: "project_geo",
          ไปรษณีย์: "project_zipcode",
          ผู้ประสานงาน: "project_coordinator",
          เบอร์โทร: "project_tel",
          "ความคืบหน้าการพัฒนา (%) ": "project_profress",
          เป้าหมาย: "project_target",
          สร้างใหม่: "home_create",
          ปรับปรุงแก้ไข: "home_repair",
          งบประมาณ: "project_budget",
          ไฟฟ้า: "project_electricity",
          ประปา: "project_water",
          สาธารณูปโภคฯ: "project_utility",
          อื่นๆ: "project_budget",
        };
        this.reportName = "รายงานข้อมูลการบริการโครงการ";
      }
    },
  },
  methods: {
    async getProjectList(body) {
      let data = await apiService.post({
        path: "report/project",
        body: body,
      });
      this.reportList = data.data;
    },
    async getFollowList(body) {
      let data = await apiService.post({
        path: "report/formproject",
        body: body,
      });
      this.reportList = data.data;
    },
    async getHouseList(body) {
      let data = await apiService.post({
        path: "report/form",
        body: body,
      });
      this.reportList = data.data;
    },

    map() {
      this.$router.push("/map");
    },
    detail() {
      this.$router.push("/detail");
    },
    search() {
      this.dialog = true;
    },
  },
};
</script>
