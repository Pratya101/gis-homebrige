<template>
  <div>
    <v-row>
      <v-col cols="12" md="3" class="py-0">
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
      <v-col cols="12" md="3" class="py-0">
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
      <v-col cols="12" md="3" class="py-0">
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
      <v-col cols="12" md="3" class="py-0">
        <v-autocomplete
          hide-detail
          :items="addressStatusList"
          v-model="addressStatus"
          placeholder="สภาพที่อยู่อาศัย"
          background-color="#ffffff"
          label="สภาพที่อยู่อาศัย"
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
import address_status from "@/data/address_status.json";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      subDistrictsList: subDistricts,
      districtList: district,
      provinceList: province,
      addressStatusList: address_status.data,
      subDistrictSelect: "",
      districtSelect: "",
      provinceSelect: "",
      addressStatus: "",
    };
  },
  mounted() {
    this.subDistrictsList.unshift({ SUB_DISTRICT_NAME: "ทั้งหมด" });
    this.districtList.unshift({ DISTRICT_NAME: "ทั้งหมด" });
    this.provinceList.unshift({ PROVINCE_NAME: "ทั้งหมด" });
    this.addressStatusList.unshift("ทั้งหมด");
    this.subDistrictSelect = "ทั้งหมด";
    this.districtSelect = "ทั้งหมด";
    this.provinceSelect = "ทั้งหมด";
    this.addressStatus = "ทั้งหมด";
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
    addressStatus() {
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
        form_living: this.addressStatus,
      };
      this.updateSearchDataReport(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
