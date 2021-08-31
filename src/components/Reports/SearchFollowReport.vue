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
          :items="restoreChanelList"
          v-model.trim="restoreChanel"
          placeholder="หมวดหมู่การพัฒนา"
          background-color="#ffffff"
          label="หมวดหมู่การพัฒนา"
          outlined
          hide-details
          dense
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6" class="py-0">
        <v-autocomplete
          hide-detail
          :items="statusDevList"
          v-model="statusDevSelect"
          placeholder="สถานะการพัฒนา"
          background-color="#ffffff"
          label="สถานะการพัฒนา"
          outlined
          hide-details
          dense
        ></v-autocomplete>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import subDistricts from "@/data/subDistricts";
import district from "@/data/districts";
import province from "@/data/provinces";
import statusHouseDev from "@/data/statusHouseDev.json";
import restore_chanel from "@/data/restore_chanel.json";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      statusDevList: statusHouseDev.data,
      subDistrictsList: subDistricts,
      districtList: district,
      provinceList: province,
      restoreChanelList: restore_chanel.data,
      subDistrictSelect: "",
      districtSelect: "",
      provinceSelect: "",
      restoreChanel: "",
      statusDevSelect: statusHouseDev.data[0],
    };
  },
  mounted() {
    console.log("serach follow report");
    this.subDistrictsList.unshift({ SUB_DISTRICT_NAME: "ทั้งหมด" });
    this.districtList.unshift({ DISTRICT_NAME: "ทั้งหมด" });
    this.provinceList.unshift({ PROVINCE_NAME: "ทั้งหมด" });
    this.restoreChanelList.unshift("ทั้งหมด");
    this.subDistrictSelect = "ทั้งหมด";
    this.districtSelect = "ทั้งหมด";
    this.provinceSelect = "ทั้งหมด";
    this.restoreChanel = "ทั้งหมด";
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
    statusDevSelect() {
      this.sendDataSearch();
    },
    restoreChanel() {
      this.sendDataSearch();
    },
  },
  methods: {
    ...mapActions("house", ["updateSearchDataReport"]),

    sendDataSearch() {
      let data = {
        sub_district: this.subDistrictSelect,
        district: this.districtSelect,
        province: this.provinceSelect,
        status_project: this.statusDevSelect,
        improvement: this.restoreChanel,
      };
      console.log("send data serach : ", data);
      this.updateSearchDataReport(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
