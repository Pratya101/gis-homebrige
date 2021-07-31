<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6" class="px-0">
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
          รายงาน
        </h2>
      </v-col>
      <v-col cols="12" md="6" class="d-md-flex justify-md-end px-0">
        <v-select
          v-model="reportTypeSelect"
          solo
          item-value="value"
          item-text="text"
          dense
          :items="reportsType"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { apiService } from "@/services/axios";
export default {
  name: "Reports",
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

<style src="./Reports.scss" lang="scss" />
