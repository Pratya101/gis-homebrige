<template>
  <v-container class="icons-page mt-3">
    <v-row>
      <v-col class="order-first" cols="12" md="9">
        <h5>
          <v-icon>mdi-map-marker-radius-outline</v-icon>
          แผนที่ GIS
        </h5>
        <longdo-map
          v-if="statusLoadMap"
          :location="locationStart"
          :lastView="false"
          @load="event"
          :zoom="zoom"
          :zoomRange="rangs"
          class="rounded-lg elevation-3"
          stringlanguage="en"
          style="height:640px"
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
        <h5>
          <v-icon>mdi-magnify</v-icon>
          ค้นหา
        </h5>

        <v-text-field
          placeholder="ชื่อ-นามสกุล"
          label="ชื่อ-นามสกุล"
          background-color="#ffffff"
          dense
          outlined
          v-model.trim="search_name"
        ></v-text-field>
        <v-autocomplete
          :items="addressStatusList"
          v-model.trim="addressStatus"
          item-value="project_network_name"
          item-text="project_network_name"
          outlined
          label="สภาพที่อยู่อาศัย"
          dense
          placeholder="สภาพที่อยู่อาศัย"
          background-color="#ffffff"
        ></v-autocomplete>
        <v-autocomplete
          :items="projectList"
          v-model="projectSelect"
          item-text="project_name"
          item-value="project_id"
          outlined
          label="โครงการ"
          dense
          placeholder="โครงการ"
          background-color="#ffffff"
        ></v-autocomplete>
        <v-autocomplete
          hide-detail
          :items="projectNetworkList"
          v-model.trim="network_id"
          placeholder="เครือข่าย"
          label="เครือข่าย"
          dense
          item-value="project_network_id"
          background-color="#ffffff"
          item-text="project_network_name"
          outlined
        ></v-autocomplete>
        <v-autocomplete
          hide-detail
          :items="projectTypeList"
          v-model="type_id"
          dense
          placeholder="โครงการพัฒนา"
          item-value="project_type_id"
          item-text="project_type_name"
          background-color="#ffffff"
          label="โครงการพัฒนา"
          outlined
        ></v-autocomplete>
        <v-autocomplete
          hide-detail
          :items="geographyList"
          v-model="geoSelect"
          placeholder="ภาค"
          background-color="#ffffff"
          item-value="GEO_ID"
          @change="onGeoSelect"
          return-object
          item-text="GEO_NAME"
          label="ภาค"
          outlined
          dense
        ></v-autocomplete>
        <v-autocomplete
          hide-detail
          :items="provinceList"
          v-model="provinceSelect"
          return-object
          placeholder="จังหวัด"
          @change="onProvinceSelect"
          background-color="#ffffff"
          item-value="PROVINCE_ID"
          item-text="PROVINCE_NAME"
          label="จังหวัด"
          dense
          outlined
        ></v-autocomplete>

        <v-autocomplete
          hide-detail
          :items="districtList"
          v-model="districtSelect"
          dense
          placeholder="อำเภอ/เขต"
          item-value="DISTRICT_ID"
          return-object
          @change="onDistrictSelect"
          background-color="#ffffff"
          item-text="DISTRICT_NAME"
          label="อำเภอ/เขต"
          outlined
        ></v-autocomplete>

        <v-autocomplete
          hide-detail
          :items="subDistrictsList"
          v-model="subDistrictSelect"
          item-value="SUB_DISTRICT_ID"
          item-text="SUB_DISTRICT_NAME"
          placeholder="ตำบล/แขวง"
          label="ตำบล/แขวง"
          return-object
          @change="onSubDistricSelect"
          dense
          background-color="#ffffff"
          outlined
        ></v-autocomplete>

        <v-btn
          color="primary"
          class="rounded-lg elevation-4"
          outlined
          large
          block
          @click="serachHosue(1)"
        >
          <v-icon left>fa-search</v-icon>ค้นหา</v-btn
        >
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
        <div class="rounded-lg elevation-3" v-if="statusLoadData">
          <h5 class="pt-3 pl-3">ครัวเรือนทั้งหมด {{ houseTotal }} ครัวเรือน</h5>
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
        <div class="rounded-lg elevation-3" v-if="statusLoadData">
          <h5 class="pt-3 pl-3">
            การพัฒนาที่อยู่อาศัยระดับครัวเรือน {{ total }} ครัวเรือน
          </h5>
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
        <div class="rounded-lg elevation-3" v-if="statusLoadData">
          <h5 class="pt-3 pl-3">ติดตามการก่อสร้าง</h5>
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
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          hello world
        </v-card-title>
      </v-card></v-dialog
    >
  </v-container>
</template>
<script
  type="text/javascript"
  src="https://api.longdo.com/map/?key=4950658d2b8d1babc2e9f4b2515bd9d3"
></script>
<script>
import ApexChart from "vue-apexcharts";
import config from "@/config";
import { apiService } from "@/services/axios";
import subDistricts from "@/data/subDistricts";
import district from "@/data/districts";
import province from "@/data/provinces";
import geography from "@/data/geography";
import address_status from "@/data/address_status.json";
import { LongdoMap, LongdoMapMarker } from "longdo-map-vue";
LongdoMap.init({ apiKey: "4950658d2b8d1babc2e9f4b2515bd9d3" });
export default {
  components: {
    ApexChart,
    LongdoMap,
    LongdoMapMarker,
  },
  name: "Maps",
  data() {
    return {
      projectList: [],
      projectSelect: "",
      dialog: false,
      statusLoadMap: true,
      addressStatusList: [],
      addressStatus: "",
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
          },
          labels: ["เตรียมข้อมูล", "กำลังดำเนินการ", "เสร็จสิ้น"],
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
          colors: ["#ff0000", "#f0ff00", "#00d40f"],
        },
      },
      locationStart: null,
      rangs: { min: 3, max: 19 },
      markers: [],
      projectTypeList: [],
      projectNetworkList: [],
      houseList: [],
      house_id: null,
      zoom: 6,
      statusLoadData: false,
      graphData: {},
      form_id: "",
      houseTotal: 0,
      total: 0,
    };
  },

  watch: {},
  mounted() {
    this.addressStatusList = address_status.data;
    this.addressStatusList.unshift("ทั้งหมด");
    this.addressStatus = "ทั้งหมด";
    this.getProjectNetWorkList();
    this.getProjectList();
    this.getProjectTypeList();
    this.subDistrictsList.unshift({
      SUB_DISTRICT_ID: "0",
      SUB_DISTRICT_NAME: "ทั้งหมด",
    });
    this.districtList.unshift({ DISTRICT_ID: "0", DISTRICT_NAME: "ทั้งหมด" });
    this.provinceList.unshift({ PROVINCE_ID: "0", PROVINCE_NAME: "ทั้งหมด" });
    this.geographyList.unshift({ GEO_ID: "0", GEO_NAME: "ทั้งหมด" });
    this.subDistrictSelect = this.subDistrictsList[0];
    this.districtSelect = this.districtList[0];
    this.provinceSelect = this.provinceList[0];
    this.geoSelect = this.geographyList[0];
    // this.event()
    if (this.$route.query.id) {
      this.locationStart = null;
      this.getHouse(this.$route.query.id);
    } else {
      this.locationStart = { lon: 100.4996453, lat: 13.7597661 };
      this.serachHosue();
    }
  },

  methods: {
    async getProjectList() {
      let data = await apiService.get({
        path: "project/list/mini",
      });
      this.projectList = data.data;
      this.projectList.unshift({ project_id: "", project_name: "ทั้งหมด" });
    },
    onSubDistricSelect() {
      let SUB_DISTRICT_ID = this.subDistrictSelect.SUB_DISTRICT_ID;
      if (this.subDistrictSelect.SUB_DISTRICT_ID == "0") {
        this.locationSerach({ DISTRICT_ID: this.districtSelect.DISTRICT_ID });
      } else {
        this.locationSerach({ SUB_DISTRICT_ID });
      }
    },
    onDistrictSelect() {
      let DISTRICT_ID = this.districtSelect.DISTRICT_ID;
      if (this.districtSelect.DISTRICT_ID == "0") {
        this.locationSerach({ PROVINCE_ID: this.provinceSelect.PROVINCE_ID });
      } else {
        this.locationSerach({ DISTRICT_ID });
      }
    },
    onProvinceSelect() {
      let PROVINCE_ID = this.provinceSelect.PROVINCE_ID;
      if (this.provinceSelect.PROVINCE_ID == "0") {
        this.locationSerach({ GEO_ID: this.geoSelect.GEO_ID });
        this.districtSelect = this.districtList[0];
        this.subDistrictSelect = this.subDistrictsList[0];
      } else {
        this.locationSerach({ PROVINCE_ID });
      }
    },
    onGeoSelect() {
      let GEO_ID = this.geoSelect.GEO_ID;
      this.districtSelect = this.districtList[0];
      this.subDistrictSelect = this.subDistrictsList[0];
      this.provinceSelect = this.provinceList[0];
      this.locationSerach({ GEO_ID });
    },
    async locationSerach(body) {
      let { GEO_ID, PROVINCE_ID, DISTRICT_ID, SUB_DISTRICT_ID } = body;

      let data = await apiService.post({
        path: "location/search",
        body: body,
      });
      if (GEO_ID) {
        this.provinceList = data.data.provinces;
        this.districtList = data.data.districts;
        this.subDistrictsList = data.data.subDistricts;
        this.provinceList.unshift({
          PROVINCE_ID: "0",
          PROVINCE_NAME: "ทั้งหมด",
        });
        this.districtList.unshift({
          DISTRICT_ID: "0",
          DISTRICT_NAME: "ทั้งหมด",
        });
        this.subDistrictsList.unshift({
          SUB_DISTRICT_ID: "0",
          SUB_DISTRICT_NAME: "ทั้งหมด",
        });
        //this.provinceSelect = data.data.provinces[0];
        // this.districtSelect = data.data.districts[0];
        // this.subDistrictSelect = data.data.subDistricts[0];
      } else if (PROVINCE_ID) {
        this.districtList = data.data.districts;
        this.subDistrictsList = data.data.subDistricts;
        this.districtList.unshift({
          DISTRICT_ID: "0",
          DISTRICT_NAME: "ทั้งหมด",
        });
        this.subDistrictsList.unshift({
          SUB_DISTRICT_ID: "0",
          SUB_DISTRICT_NAME: "ทั้งหมด",
        });
        this.geoSelect = data.data.geo[0];
        // this.districtSelect = data.data.districts[0];
        // this.subDistrictSelect = data.data.subDistricts[0];
      } else if (DISTRICT_ID) {
        this.subDistrictsList = data.data.subDistricts;
        this.subDistrictsList.unshift({
          SUB_DISTRICT_ID: "0",
          SUB_DISTRICT_NAME: "ทั้งหมด",
        });
        this.geoSelect = data.data.geo[0];
        this.provinceSelect = data.data.provinces[0];
      } else if (SUB_DISTRICT_ID) {
        this.geoSelect = data.data.geo[0];
        this.provinceSelect = data.data.provinces[0];
        this.districtSelect = data.data.districts[0];
      }
    },
    async event(map) {
      await map.Layers.externalOptions({
        googleQuery: "key=AIzaSyDArsAx-DI67-hzOfDfA4FbPYKLfa7yg-E",
      });
      map.Layers.setBase(longdo.Layers.GOOGLE_SATELLITE);
      this.statusLoadMap = true;
    },
    async getGraph() {
      let data = {};
      data.data = this.graphData;
      this.liveingeHouse.series.push(
        data.data.formLiving[0]
          ? data.data.formLiving[0].json_build_object.form_living_total
          : ""
      );
      this.liveingeHouse.series.push(
        data.data.formLiving[1]
          ? data.data.formLiving[1].json_build_object.form_living_total
          : ""
      );
      this.liveingeHouse.series.push(
        data.data.formLiving[2]
          ? data.data.formLiving[2].json_build_object.form_living_total
          : ""
      );
      this.houseDev.series.push(data.data.progress.prepare);
      this.houseDev.series.push(data.data.progress.progress);
      this.houseDev.series.push(data.data.progress.success);
      data.data.projectType.forEach((element) => {
        this.apexBarGroup.options.xaxis.categories.push(
          element.json_build_object.project_form_type
        );
      });

      this.apexBarGroup.series = [
        {
          name: "เตรียมข้อมูล",
          data: [
            data.data.projectType[0]
              ? data.data.projectType[0].json_build_object.project_type_data
                  .prepare
              : "",
            data.data.projectType[1]
              ? data.data.projectType[1].json_build_object.project_type_data
                  .prepare
              : "",
          ],
        },
        {
          name: "กำลังดำเนินการ",
          data: [
            data.data.projectType[0]
              ? data.data.projectType[0].json_build_object.project_type_data
                  .progress
              : "",
            data.data.projectType[1]
              ? data.data.projectType[1].json_build_object.project_type_data
                  .progress
              : "",
          ],
        },
        {
          name: "เสร็จสื้น",
          data: [
            data.data.projectType[0]
              ? data.data.projectType[0].json_build_object.project_type_data
                  .success
              : "",
            data.data.projectType[1]
              ? data.data.projectType[1].json_build_object.project_type_data
                  .success
              : "",
          ],
        },
      ];
      this.statusLoadData = true;
    },
    async getHouse(id) {
      this.statusLoadMap = false;
      let data = await apiService.get({
        path: "form",
        param: id,
      });
      this.locationStart = {
        lon: data.data.form_long,
        lat: data.data.form_lat,
      };
      this.search_name = `${data.data.form_fname}`;
      this.subDistrictSelect = data.data.form_sub_district;
      this.districtSelect = data.data.form_district;
      this.provinceSelect = data.data.form_province;
      this.geoSelect = data.data.form_geo;
      this.form_id = data.data.form_id;

      this.serachHosue();
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
    clearData() {
      this.apexBarGroup = {
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
      };
      this.houseDev = {
        series: [],
        options: {
          chart: {
            type: "donut",

            labels: {
              show: true,
            },
          },
          labels: ["เตรียมข้อมูล", "กำลังดำเนินการ", "เสร็จสิ้น"],
          colors: [
            config.light.error,
            config.light.warning,
            config.light.success,
          ],
        },
      };
      this.liveingeHouse = {
        series: [],
        options: {
          chart: {
            type: "donut",
            labels: {
              show: true,
            },
          },
          labels: ["ทรุดโทรมทั้งหลัง", "ทรุดโทรมบางส่วน", "มีสภาพดี"],
          colors: ["#ff0000", "#f0ff00", "#00d40f"],
        },
      };
    },
    async serachHosue(status) {
      this.houseTotal = 0;
      this.total = 0;
      this.statusLoadMap = false;
      this.clearData();
      this.markers = [];
      let body = {
        form_id: status == 1 ? "" : this.form_id,
        search_name: this.search_name,
        network_id: this.network_id,
        type_id: this.type_id,
        project_id: this.projectSelect,
        sub_district: this.subDistrictSelect.SUB_DISTRICT_NAME
          ? this.subDistrictSelect.SUB_DISTRICT_NAME
          : "ทั้งหมด",
        form_living: this.addressStatus,
        district: this.districtSelect.DISTRICT_NAME
          ? this.districtSelect.DISTRICT_NAME
          : "ทั้งหมด",
        province: this.provinceSelect.PROVINCE_NAME
          ? this.provinceSelect.PROVINCE_NAME
          : "ทั้งหมด",
        geo: this.geoSelect.GEO_NAME ? this.geoSelect.GEO_NAME : "ทั้งหมด",
      };

      let data = await apiService.post({
        path: "project/search",
        body: body,
      });

      data.graph.formLiving.forEach((item) => {
        this.houseTotal =
          this.houseTotal + item.json_build_object.form_living_total;
      });
      this.total =
        data.graph.progress.prepare +
        data.graph.progress.progress +
        data.graph.progress.success;
      this.houseList = data.data;
      this.graphData = data.graph;
      if (data.data.length > 0) {
        this.addMarker(data.data);
      } else {
        this.statusLoadMap = true;
      }
      this.getGraph();
    },

    async addMarker(data) {
      this.markers = [];
      data.forEach(async (element) => {
        let image1 = [];
        let image2 = [];
        let image3 = [];
        let image4 = [];
        element.data_progress.ready.images_ready.forEach(async (item) => {
          await image1.push(
            `<a href="${item}" target="_blank"> <img width="130px" class="rounded-lg elevation-2 m-2"  src='${item}' ></a>`
          );
        });
        element.data_progress.prepare.images_prepare.forEach(async (item) => {
          await image2.push(
            `<a href="${item}" target="_blank"> <img width="130px" class="rounded-lg elevation-2 m-2"  src='${item}' ></a>`
          );
        });
        element.data_progress.progress.images_progress.forEach(async (item) => {
          await image3.push(
            `<a href="${item}" target="_blank"> <img width="130px" class="rounded-lg elevation-2 m-2"  src='${item}' ></a>`
          );
        });
        element.data_progress.success.images_success.forEach(async (item) => {
          await image4.push(
            `<a href="${item}" target="_blank"> <img width="130px" class="rounded-lg elevation-2 m-2"  src='${item}' ></a>`
          );
        });
        let image = await `
      <hr>
      <strong>${element.data_progress.ready.status_ready}</strong>
      <div align="">
      ${
        image1.length != 0
          ? image1.toString().replace(",", " ")
          : "ไม่มีข้อมูลรูปภาพ !"
      }
      </div>
      <strong>${element.data_progress.prepare.status_prepare}</strong>
      <div align="">
      ${
        image2.length != 0
          ? image2.toString().replace(",", " ")
          : "ไม่มีข้อมูลรูปภาพ !"
      }
      </div>
      <strong>${element.data_progress.progress.status_progress}</strong>
      <div align="">
      ${
        image3.length != 0
          ? image3.toString().replace(",", " ")
          : "ไม่มีข้อมูลรูปภาพ !"
      }
      </div>
      <strong>${element.data_progress.success.status_success}</strong>
      <div align="">
      ${
        image4.length != 0
          ? image4.toString().replace(",", " ")
          : "ไม่มีข้อมูลรูปภาพ !"
      }
      </div>`;

        this.markers.push({
          location: { lon: element.form_long, lat: element.form_lat },
          icon: {
            url: element.color,
            offset: { x: 9, y: 9 },
            size: { width: 20, height: 20 },
          },
          popup: {
            title: `<div  class="set-font-kanit">${element.form_unit} ${element.form_fname} ${element.form_lname}</div>`,
            detail: `<div  class="set-font-kanit"><strong>ที่อยู่ : </strong>${
              element.form_home_id
            } ${element.form_sub_district} ${element.form_district} ${
              element.form_province
            }
            <br> <strong>สภาพที่อยู่ : </strong> ${
              element.form_living
            } <br> <strong>ชื่อโครงการ : </strong> ${
              element.project_name
                ? element.project_name
                : "ยังไม่เข้าร่วมโครงการ"
            } <br> ${image}</div>
            `,
            size: { width: 300, height: 300 },
          },
        });
      });
      if (this.markers.length == 1) {
        this.zoom = await 18;
        this.locationStart = this.markers[0].location;
      } else {
        this.zoom = await 6;
      }
      this.statusLoadMap = true;
      // this.markers.length == 1 ? (this.zoom = 18) : (this.zoom = 6);
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
