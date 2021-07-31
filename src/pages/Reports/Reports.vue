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
          item-value="value"
          item-text="text"
          class="set-shadow"
          :items="reportsType"
        ></v-select>
      </v-col>
      <v-col cols="8" class="d-flex justify-md-end">
        <v-btn large color="primary" class="rounded-lg elevation-3" outlined>
          <v-icon left>mdi-file-excel-outline</v-icon>ออกรายงาน
        </v-btn></v-col
      >
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
      reportsType: [
        { value: 1, text: "รายงานข้อมูลครัวเรือน" },
        { value: 2, text: "รายงานข้อมูลติดตามการพัฒนา" },
        { value: 3, text: "รายงานข้อมูลการบริการโครงการ" },
      ],
    };
  },
  mounted() {
    this.getHouseList();
  },

  methods: {
    async getHouseList() {
      let data = await apiService.get({
        path: "form/list",
      });
      this.houseList = data.data;
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
