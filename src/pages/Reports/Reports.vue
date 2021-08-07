<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6" class="mb-0">
        <h2>
          <v-icon
            style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 30px;"
            >mdi-file-excel-outline</v-icon
          >
          รายงาน
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="my-0">
        <v-select
          v-model="reportTypeSelect"
          outlined
          label="เลือกประเภทรายงาน"
          hide-details
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          item-value="value"
          item-text="text"
          :items="reportsType"
        ></v-select>
      </v-col>
      <v-col cols="8" class="d-flex justify-md-end">
        <download-excel
          :name="reportName"
          :data="reportList"
          :fields="title"
          class="pt-4"
        >
          <v-btn large color="primary" class=" rounded-lg elevation-3" outlined>
            <v-icon left>mdi-file-excel-outline</v-icon>ออกรายงาน
          </v-btn>
        </download-excel>
      </v-col>
      <v-col cols="12" class="my-0">
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
export default {
  name: "Reports",
  components: { HouseReport, FollowReport, ProjectReport },
  data() {
    return {
      dialog: false,
      reportTypeSelect: 1,
      title: {},
      reportsType: [
        { value: 1, text: "รายงานข้อมูลครัวเรือน" },
        { value: 2, text: "รายงานข้อมูลติดตามการพัฒนา" },
        { value: 3, text: "รายงานข้อมูลการบริการโครงการ" },
      ],
      reportList: [],
      reportName: "",
    };
  },
  mounted() {
    this.getHouseList();
  },
  watch: {
    reportTypeSelect(value) {
      console.log("report type select : ", value);
      if (value == 1) {
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
        this.reportName = "รายงานข้อมูลครัวเรือน";
        this.getHouseList();
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
          หมวดการพัฒนา: "form_improvement",
          สถานะการพัฒนา: "status_project",
          รูปภาพขั้นเตรียมข้อมูล: "",
          รูปภาพขั้นตอนกำลังดำเนินงาน: "",
          รูปภาพขั้นตอนดำเนินเสร็จสิ้น: "",
        };
        this.getFollowList();
      } else {
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
        this.getProjectList();
      }
    },
  },
  methods: {
    async getProjectList() {
      let data = await apiService.get({
        path: "report/project",
      });
      this.reportList = data.data;
    },
    async getFollowList() {
      let data = await apiService.get({
        path: "report/formproject",
      });
      this.reportList = data.data;
    },
    async getHouseList() {
      let data = await apiService.get({
        path: "report/form",
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
