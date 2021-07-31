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
        <v-select solo :items="reportsType"></v-select>
      </v-col>
    </v-row>

    <v-row class="pt-0 mt-0">
      <v-col cols="12 px-0">
        <download-excel
          class="btn btn-default"
          :data="json_data"
          :fields="json_fields"
          worksheet="My Worksheet"
          name="filename.xls"
        >
          Download Excel (you can customize this with html code!)
        </download-excel>
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
      reportType:[
        ""
      ],
      json_fields: {
        "Complete name": "name",
        City: "city",
        Telephone: "phone.mobile",
        "Telephone 2": {
          field: "phone.landline",
          callback: (value) => {
            return `Landline Phone - ${value}`;
          },
        },
      },
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010",
          },
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244",
          },
        },
      ],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
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
      console.log("data form :", data);
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
