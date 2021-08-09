<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col class="order-first" cols="12" md="9">
        <h2>
          <v-icon
            style="background: #686868;-webkit-background-clip: text;background-clip: text;color: transparent;text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;font-size: 30px;"
          >
            mdi-map-marker-radius-outline</v-icon
          >
          แผนที่ GIS
        </h2>

        <longdo-map
          :location="locationStart"
          :lastView="false"
          :zoom="zoom"
          class="set-shadow"
          style="height:670px"
        >
          <longdo-map-marker
            v-for="(item, i) in markers"
            :key="i"
            :location="item.location"
            :title="item.title"
            :detail="item.detail"
            :icon="item.icon"
            :popup="item.popup"
            :draggable="false"
          />
        </longdo-map>
      </v-col>
      <v-col class="order-last" cols="12" md="3">
        <h2>
          <v-icon
            style="background: #686868;-webkit-background-clip: text;background-clip: text;color: transparent;text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;font-size: 30px;"
          >
            fa-search</v-icon
          >
          ค้นหา
        </h2>
        <v-row class="p-0 m-0">
          <v-col cols="12" class="p-0 m-0 set-shadow mt-3">
            <v-text-field
              placeholder="ชื่อ-นามสกุล"
              label="ชื่อ-นามสกุล"
              background-color="#ffffff"
              outlined
              hide-detail
              v-model.trim="search_name"
            ></v-text-field>
            <v-autocomplete
              hide-detail
              :items="projectNetworkList"
              v-model.trim="network_id"
              placeholder="เครือข่าย"
              label="เครือข่าย"
              item-value="project_network_id"
              background-color="#ffffff"
              item-text="project_network_name"
              outlined
            ></v-autocomplete>
            <v-autocomplete
              hide-detail
              :items="projectTypeList"
              v-model="type_id"
              placeholder="โครงการพัฒนา"
              item-value="project_type_id"
              item-text="project_type_name"
              background-color="#ffffff"
              label="โครงการพัฒนา"
              outlined
            ></v-autocomplete>
            <v-autocomplete
              hide-detail
              :items="subDistrictsList"
              v-model="subDistrictSelect"
              item-value="SUB_DISTRICT_NAME"
              item-text="SUB_DISTRICT_NAME"
              placeholder="ตำบล/แขวง"
              label="ตำบล/แขวง"
              background-color="#ffffff"
              outlined
            ></v-autocomplete>
            <v-autocomplete
              hide-detail
              :items="districtList"
              v-model="districtSelect"
              placeholder="อำเภอ/เขต"
              item-value="DISTRICT_NAME"
              background-color="#ffffff"
              item-text="DISTRICT_NAME"
              label="อำเภอ/เขต"
              outlined
            ></v-autocomplete>
            <v-autocomplete
              hide-detail
              :items="provinceList"
              v-model="provinceSelect"
              placeholder="จังหวัด"
              background-color="#ffffff"
              item-value="PROVINCE_NAME"
              item-text="PROVINCE_NAME"
              label="จังหวัด"
              outlined
            ></v-autocomplete>
            <v-autocomplete
              hide-detail
              :items="geographyList"
              v-model="geoSelect"
              placeholder="ภาค"
              background-color="#ffffff"
              item-value="GEO_NAME"
              item-text="GEO_NAME"
              label="ภาค"
              outlined
            ></v-autocomplete>

            <v-btn
              color="primary"
              class="rounded-lg elevation-4"
              outlined
              large
              block
              @click="serachHosue"
            >
              <v-icon left>fa-search</v-icon>ค้นหา</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <v-skeleton-loader
          class="mx-auto"
          max-width="100%"
          max-height="615"
          height="615"
          type="image"
          v-if="!statusLoadData"
        ></v-skeleton-loader>
        <div class="set-shadow">
          <h3 class="pt-3 pl-3">ครัวเรือนทั้งหมด</h3>
          <ApexChart
            type="donut"
            :height="$vuetify.breakpoint.smAndDown ? 300 : 350"
            :options="liveingeHouse.options"
            :series="liveingeHouse.series"
          >
          </ApexChart>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-skeleton-loader
          class="mx-auto"
          max-width="100%"
          max-height="615"
          height="615"
          type="image"
          v-if="!statusLoadData"
        ></v-skeleton-loader>
        <div class="set-shadow" v-if="statusLoadData">
          <h3 class="pt-3 pl-3">การพัฒนาที่อยู่อาศัยระดับครัวเรือน</h3>
          <ApexChart
            type="donut"
            :height="$vuetify.breakpoint.smAndDown ? 300 : 350"
            :options="houseDev.options"
            :series="houseDev.series"
          >
          </ApexChart>
        </div>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader
          class="mx-auto"
          max-width="100%"
          max-height="615"
          height="615"
          type="image"
          v-if="!statusLoadData"
        ></v-skeleton-loader>
        <div class="set-shadow" v-if="statusLoadData">
          <h3 class="pt-3 pl-3">ติดตามการก่อสร้าง</h3>
          <ApexChart
            type="bar"
            height="350"
            :options="apexBarGroup.options"
            :series="apexBarGroup.series"
          >
          </ApexChart>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ApexChart from "vue-apexcharts";
import config from "@/config";
import { apiService } from "@/services/axios";
import subDistricts from "@/data/subDistricts";
import district from "@/data/districts";
import province from "@/data/provinces";
import geography from "@/data/geography";
export default {
  components: {
    ApexChart,
  },
  name: "Maps",
  data() {
    return {
      subDistrictsList: subDistricts,
      districtList: district,
      provinceList: province,
      geographyList: geography,
      subDistrictSelect: "",
      districtSelect: "",
      provinceSelect: "",
      geoSelect: "",
      search_name: "",
      network_id: "",
      type_id: "",
      apexBarGroup: {
        series: [],
        options: {
          chart: {
            type: "bar",
            height: 430,
            toolbar: {
              show: true,
            },
          },
          colors: [
            config.light.error,
            config.light.warning,
            config.light.success,
          ],
          legend: {
            show: true,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
              fontSize: "12px",
              colors: ["#fff"],
            },
          },
          xaxis: {
            categories: [],
          },
        },
      },
      houseDev: {
        series: [],
        options: {
          chart: {
            type: "donut",

            labels: {
              show: true,
            },
          },
          labels: [],
          colors: [
            config.light.error,
            config.light.warning,
            config.light.success,
          ],
        },
      },
      liveingeHouse: {
        series: [],
        options: {
          chart: {
            type: "donut",
            labels: {
              show: true,
            },
          },
          labels: ["ทรุดโทรมทั้งหลัง", "ทรุดโทรมบางส่วน", "มีสภาพดี"],
          colors: [
            config.light.primary,
            config.light.success,
            config.light.warning,
            config.light.info,
            config.light.secondary,
          ],
        },
      },
      locationStart: null,
      markers: [],
      projectTypeList: [],
      projectNetworkList: [],
      houseList: [],
      house_id: null,
      zoom: 6,
      statusLoadData: false,
      statusLoadMap: false,
    };
  },
  mounted() {
    this.getProjectNetWorkList();
    this.getProjectTypeList();
    this.subDistrictsList.unshift({ SUB_DISTRICT_NAME: "ทั้งหมด" });
    this.districtList.unshift({ DISTRICT_NAME: "ทั้งหมด" });
    this.provinceList.unshift({ PROVINCE_NAME: "ทั้งหมด" });
    this.geographyList.unshift({ GEO_NAME: "ทั้งหมด" });
    this.subDistrictSelect = "ทั้งหมด";
    this.districtSelect = "ทั้งหมด";
    this.provinceSelect = "ทั้งหมด";
    this.geoSelect = "ทั้งหมด";
    if (this.$route.query.id) {
      this.locationStart = null;
      this.getHouse(this.$route.query.id);
    } else {
      this.locationStart = { lon: 100.4996453, lat: 13.7597661 };
      this.serachHosue();
    }
    this.getGraph();
  },
  methods: {
    async getGraph() {
      let data = await apiService.get({
        path: "report/graph",
      });
      this.liveingeHouse.series.push(
        data.data.formLiving[0].json_build_object.form_living_total
      );
      this.liveingeHouse.series.push(
        data.data.formLiving[1].json_build_object.form_living_total
      );
      this.liveingeHouse.series.push(
        data.data.formLiving[2].json_build_object.form_living_total
      );
      this.houseDev.series.push(data.data.progress.reporn_progress.prepare);
      this.houseDev.series.push(data.data.progress.reporn_progress.progress);
      this.houseDev.series.push(data.data.progress.reporn_progress.success);
      this.houseDev.options.labels = await this.getDataLabels(
        data.data.progress.reporn_progress
      );
      data.data.projectType.forEach((element) => {
        this.apexBarGroup.options.xaxis.categories.push(
          element.json_build_object.project_form_type
        );
      });

      this.apexBarGroup.series = [
        {
          name: "เตรียมข้อมูล",
          data: [
            data.data.projectType[0].json_build_object.project_type_data
              .prepare,
            data.data.projectType[1].json_build_object.project_type_data
              .prepare,
          ],
        },
        {
          name: "กำลังดำเนินการ",
          data: [
            data.data.projectType[0].json_build_object.project_type_data
              .progress,
            data.data.projectType[1].json_build_object.project_type_data
              .progress,
          ],
        },
        {
          name: "เสร็จสื้น",
          data: [
            data.data.projectType[0].json_build_object.project_type_data
              .success,
            data.data.projectType[1].json_build_object.project_type_data
              .success,
          ],
        },
      ];
      this.statusLoadData = true;
    },
    getDataLabels(labels) {
      var label = [
        `เตรียมข้อมูล ${labels.prepare}`,
        `กำลังดำเนินการ ${labels.progress}`,
        `เสร็จสิ้น ${labels.success}`,
      ];
      // var label = [`เตรียมข้อมูล`, `กำลังดำเนินการ`, `เสร็จสิ้น`];
      return label;
    },
    async getHouse(id) {
      let data = await apiService.get({
        path: "form",
        param: id,
      });
      this.locationStart = {
        lon: data.data.form_long,
        lat: data.data.form_lat,
      };
      this.search_name = `${data.data.form_unit} ${data.data.form_fname} ${data.data.form_lname}`;
      this.subDistrictSelect = data.data.form_sub_district;
      this.districtSelect = data.data.form_district;
      this.provinceSelect = data.data.form_province;
      this.geoSelect = data.data.form_geo;

      this.zoom = 6;
      this.addMarker([data.data]);
    },
    async getProjectTypeList() {
      let data = await apiService.get({
        path: "projecttype/list",
      });
      this.projectTypeList = data.data;
      this.projectTypeList.unshift({
        project_type_id: "",
        project_type_name: "ทั้งหมด",
      });
    },
    async getProjectNetWorkList() {
      let data = await apiService.get({
        path: "projectnetwork/list",
      });
      this.projectNetworkList = data.data;
      this.projectNetworkList.unshift({
        project_network_id: "",
        project_network_name: "ทั้งหมด",
      });
    },
    async serachHosue() {
      this.markers = [];
      let body = {
        search_name: this.search_name,
        network_id: this.network_id,
        type_id: this.type_id,
        sub_district: this.subDistrictSelect,
        district: this.districtSelect,
        province: this.provinceSelect,
        geo: this.geoSelect,
      };
      let data = await apiService.post({
        path: "project/search",
        body: body,
      });
      console.log("data.data ", data.data.length);
      this.houseList = data.data;
      this.zoom = 6;

      if (data.data.length > 0) {
        this.addMarker(data.data);
      }
    },
    addMarker(data) {
      this.markers = [];
      data.forEach((element) => {
        this.markers.push({
          location: { lon: element.form_long, lat: element.form_lat },
          icon: {
            url: element.color,
            offset: { x: 14, y: 10 },
            size: { width: 30, height: 30 },
          },
          popup: {
            title: `${element.form_unit} ${element.form_fname} ${element.form_lname}`,
            detail: `${element.form_home_id} ${element.form_sub_district} ${element.form_district} ${element.form_province}
            <br> <strong>สภาพที่อยู่ : </strong> ${element.form_living}`,
            size: { width: 200, height: 100 },
          },
        });
      });
      this.statusLoadMap = true;
    },
    appendData: function() {
      var arr = this.apexDynamicChart.series.slice();
      arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);
      this.apexDynamicChart.series = arr;
    },
    removeData: function() {
      if (this.apexDynamicChart.series.length === 1) return;
      var arr = this.apexDynamicChart.series.slice();
      arr.pop();
      this.apexDynamicChart.series = arr;
    },
    randomize: function() {
      this.apexDynamicChart.series = this.apexDynamicChart.series.map(
        function() {
          return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        }
      );
    },
    reset: function() {
      this.apexDynamicChart.series = [44, 55, 13, 33];
    },
  },
};
</script>

<style src="./Mapgis.scss" lang="scss" />
