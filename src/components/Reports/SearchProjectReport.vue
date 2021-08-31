<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" class="py-0">
        <v-autocomplete
          hide-detail
          :items="subDistrictsList"
          v-model="subDistrictSelect"
          item-value="SUB_DISTRICT_NAME"
          item-text="SUB_DISTRICT_NAME"
          placeholder="ตำบล/แขวง"
          label="ตำบล/แขวง"
          dense
          background-color="#ffffff"
          outlined
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" class="py-0">
        <v-autocomplete
          hide-detail
          :items="districtList"
          v-model="districtSelect"
          dense
          placeholder="อำเภอ/เขต"
          item-value="DISTRICT_NAME"
          background-color="#ffffff"
          item-text="DISTRICT_NAME"
          label="อำเภอ/เขต"
          outlined
        ></v-autocomplete
      ></v-col>
      <v-col cols="12" md="4" class="py-0">
        <v-autocomplete
          hide-detail
          :items="provinceList"
          v-model="provinceSelect"
          placeholder="จังหวัด"
          background-color="#ffffff"
          item-value="PROVINCE_NAME"
          item-text="PROVINCE_NAME"
          label="จังหวัด"
          dense
          outlined
        ></v-autocomplete
      ></v-col>
      <v-col cols="12" md="6" class="py-0">
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
      </v-col>
      <v-col cols="12" md="6" class="py-0">
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import subDistricts from "@/data/subDistricts";
import district from "@/data/districts";
import province from "@/data/provinces";
import { mapActions } from "vuex";
import { apiService } from "@/services/axios";
export default {
  data() {
    return {
      subDistrictsList: subDistricts,
      districtList: district,
      provinceList: province,
      subDistrictSelect: "",
      districtSelect: "",
      provinceSelect: "",
      projectNetworkList: [],
      projectTypeList: [],
      network_id: "",
      type_id: "",
    };
  },
  mounted() {
    this.getProjectNetWorkList();
    this.getProjectTypeList();
    this.subDistrictsList.unshift({ SUB_DISTRICT_NAME: "ทั้งหมด" });
    this.districtList.unshift({ DISTRICT_NAME: "ทั้งหมด" });
    this.provinceList.unshift({ PROVINCE_NAME: "ทั้งหมด" });
    this.subDistrictSelect = "ทั้งหมด";
    this.districtSelect = "ทั้งหมด";
    this.provinceSelect = "ทั้งหมด";
    this.sendDataSearch();
  },
  watch: {
    subDistrictSelect() {
      this.sendDataSearch();
    },
    districtSelect() {
      this.sendDataSearch();
    },
    provinceSelect() {
      this.sendDataSearch();
    },
    network_id() {
      this.sendDataSearch();
    },
    type_id() {
      this.sendDataSearch();
    },
  },
  methods: {
    ...mapActions("house", ["updateSearchDataReport"]),
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
    sendDataSearch() {
      let data = {
        sub_district: this.subDistrictSelect,
        district: this.districtSelect,
        province: this.provinceSelect,
        network_id: this.network_id,
        type_id: this.type_id,
      };
      this.updateSearchDataReport(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
