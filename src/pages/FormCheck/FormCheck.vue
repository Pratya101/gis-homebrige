<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" class="px-0">
        <h3>
          <v-icon>mdi-file-document-edit-outline</v-icon>
          แบบฟอร์มสำรวจข้อมูลที่อยู่อาศัยระดับครัวเรือน
        </h3>
      </v-col>
    </v-row>
    <v-row class="set-shadow mt-0">
      <v-col cols="12 set-text-shadow">
        <v-icon
          style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 20px;"
          left
          >fa-cubes</v-icon
        >
        หมวดข้อมูลในครัวเรือน
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          outlined
          hide-details
          background-color="#ffffff"
          class="rounded-lg "
          type="number"
          v-model.trim="idCard"
        >
          <template slot="label" v-if="idCard == ''">
            <span class="error--text">ระบุเลขบัตรประชาชน 13 ตัว *</span>
          </template>
          <template slot="placeholder" v-if="idCard == ''">
            <span class="error--text">ระบุเลขบัตรประชาชน 13 ตัว *</span>
          </template>
          <template slot="label" v-if="idCard.length != 13 && idCard != ''">
            <span class="error--text">ระบุเลขบัตรประชาชน 13 ตัว *</span>
          </template>
          <template slot="label" v-if="idCard.length == 13 && idCard != ''">
            <span class="success--text">เลขบัตรประชาชนถูกต้อง *</span>
          </template>
          <template
            slot="placeholder"
            v-if="idCard.length != 13 && idCard != ''"
          >
            <span class="error--text">* ระบุเลขบัตรประชาชน 13 หลัก</span>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          outlined
          hide-details
          label="คำนำหน้า *"
          placeholder="คำนำหน้า *"
          background-color="#ffffff"
          class="rounded-lg "
          v-model.trim="perfix"
          :items="perfixList"
        >
          <template slot="label" v-if="perfix == ''">
            <span class="error--text">คำนำหน้า *</span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          hide-details
          outlined
          label="ชื่อ *"
          placeholder="ชื่อ *"
          background-color="#ffffff"
          class="rounded-lg "
          v-model.trim="fname"
        >
          <template slot="label" v-if="fname == ''">
            <span class="error--text">ชื่อ *</span>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6"
        ><v-text-field
          outlined
          label="นามสกุล *"
          placeholder="นามสกุล *"
          background-color="#ffffff"
          class="rounded-lg "
          v-model.trim="lname"
          hide-details
        >
          <template slot="label" v-if="lname == ''">
            <span class="error--text">นามสกุล *</span>
          </template>
        </v-text-field></v-col
      >
      <v-col cols="12" md="6">
        <v-select
          :items="memberStatusList"
          v-model.trim="memberStatus"
          hide-details
          outlined
          label="ตําแหน่ง/สถานะภาพ"
          placeholder="ตําแหน่ง/สถานะภาพ"
          background-color="#ffffff"
          class="rounded-lg "
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          outlined
          label="จำนวนสมาชิกในครัวเรือน"
          placeholder="จำนวนสมาชิกในครัวเรือน"
          background-color="#ffffff"
          class="rounded-lg "
          hide-details
          :items="memberCountList"
          v-model.trim="memberCount"
        ></v-select>
      </v-col>
      <v-col cols="12"> <v-divider></v-divider> </v-col>
      <v-col cols="12 set-text-shadow">
        <v-icon
          style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 20px;"
          left
          >fa-cubes</v-icon
        >
        หมวดที่ตั้งครัวเรือน
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          outlined
          label="บ้านเลขที่"
          placeholder="บ้านเลขที่"
          background-color="#ffffff"
          class="rounded-lg "
          v-model.trim="houseId"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          outlined
          label="หมู่ที่"
          placeholder="หมู่ที่"
          background-color="#ffffff"
          class="rounded-lg "
          v-model.trim="villageId"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model.trim="address2"
          :items="locationList"
          item-text="SEARCH"
          return-object
          outlined
          hide-details
          label="ตําบล/แขวง"
          placeholder="ตําบล/แขวง"
          background-color="#ffffff"
          class="rounded-lg "
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.SUB_DISTRICT_NAME }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model.trim="address2"
          :items="locationList"
          item-text="SEARCH"
          return-object
          hide-details
          outlined
          label="อำเภอ/เขต"
          placeholder="อำเภอ/เขต"
          background-color="#ffffff"
          class="rounded-lg "
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.DISTRICT_NAME }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model.trim="address2"
          :items="locationList"
          item-text="SEARCH"
          return-object
          outlined
          hide-details
          label="จังหวัด"
          placeholder="จังหวัด"
          background-color="#ffffff"
          class="rounded-lg "
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.PROVINCE_NAME }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model.trim="address2"
          :items="locationList"
          item-text="SEARCH"
          return-object
          hide-details
          outlined
          label="ภาค"
          placeholder="ภาค"
          background-color="#ffffff"
          class="rounded-lg "
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.GEO_NAME }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          outlined
          label="พิกัด GPS"
          placeholder="พิกัด GPS"
          background-color="#ffffff"
          class="rounded-lg "
          v-model.trim="gpsLocation"
          hide-details
        >
          <template v-slot:append>
            <v-icon @click="selectLocation" style="color:blue;cursor:pointer"
              >mdi-map-marker-radius-outline</v-icon
            >
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12"> <v-divider></v-divider> </v-col>
      <v-col cols="12 set-text-shadow">
        <v-icon
          style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 20px;"
          left
          >fa-cubes</v-icon
        >
        หมวดข้อมูลพัฒนาที่อยู่อาศัย
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="addressStatusList"
          v-model.trim="addressStatus"
          hide-details
          outlined
          label="สภาพที่อยู่อาศัย"
          placeholder="สภาพที่อยู่อาศัย"
          background-color="#ffffff"
          class="rounded-lg "
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="restoreChanelList"
          v-model.trim="restoreChanel"
          hide-details
          outlined
          label="แนวทางการปรับปรุง"
          placeholder="แนวทางการปรับปรุง"
          background-color="#ffffff"
          class="rounded-lg "
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="houseNeedList"
          v-model="houseNeed"
          item-value="text"
          item-text="text"
          hide-details
          outlined
          label="ความต้องการทีอยู่อาศัย"
          placeholder="ความต้องการทีอยู่อาศัย"
          background-color="#ffffff"
          class="rounded-lg "
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="houseFormatList"
          v-model="houseFormat"
          item-value="text"
          item-text="text"
          hide-details
          outlined
          label="ลักษณะบ้าน"
          placeholder="ลักษณะบ้าน"
          background-color="#ffffff"
          class="rounded-lg "
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="solidsList"
          v-model="solids"
          item-value="text"
          item-text="text"
          hide-details
          outlined
          label="กรรมสิทธิทีดินของบ้านปจจุบัน"
          placeholder="กรรมสิทธิทีดินของบ้านปจจุบัน"
          background-color="#ffffff"
          class="rounded-lg "
        ></v-select>
      </v-col>

      <v-col cols="12">
        <label>ลักษณะที่ดิน</label>
        <v-radio-group v-model="soilsSelection" row>
          <v-col
            v-for="(item, index) in soils"
            :key="index"
            cols="12"
            md="4"
            class="py-1"
          >
            <v-radio :label="item" :value="item"> </v-radio>
          </v-col>
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <label>อัพโหลดรูปภาพครัวเรือน</label>
        <el-upload
          :on-change="saveFile"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </v-col>
      <v-col cols="12" class="pt-0 text-right">
        <v-btn
          color="primary"
          x-large
          :disabled="
            idCard == '' ||
              idCard.length != 13 ||
              prefix == '' ||
              fname == '' ||
              lname == ''
          "
          @click="sendForm"
          class="set-font-kanit rounded-lg elevation-4 me-2"
          outlined
        >
          <v-icon left>fa-save</v-icon>
          บันทึกข้อมูล</v-btn
        >
        <v-btn
          color="error"
          x-large
          class="set-font-kanit rounded-lg elevation-4"
          outlined
        >
          <v-icon left>fa-close</v-icon>
          ล้างข้อมูล</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog v-model="dialogSelectLocation" max-width="1200">
      <v-card>
        <v-card-title>
          ตำแหน่ง :
          {{
            gpsLocation ? gpsLocation : "เลื่อนแผนที่เพื่อระบุพิกัดครัวเรือน"
          }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <longdo-map
            @load="event"
            :location="locationStart"
            :lastView="false"
            :zoom="10"
            class="set-shadow"
            style="height:615px"
          >
          </longdo-map>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            x-large
            class="rounded-lg elevation-4 set-font-kanit"
            @click="dialogSelectLocation = false"
          >
            <v-icon left>mdi-check-circle-outline</v-icon> ยืนยัน</v-btn
          ><v-btn
            color="error"
            outlined
            @click="dialogSelectLocation = false"
            x-large
            class="rounded-lg elevation-4 set-font-kanit"
          >
            <v-icon left>mdi-close</v-icon> ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogther" max-width="500">
      <v-card>
        <v-card-title class="set-font-kanit">
          อื่นๆ (โปรดระบุ)
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <v-card-text>
          <v-text-field
            outlined
            label="อื่นๆ"
            placeholder="อื่นๆ"
            background-color="#ffffff"
            class="rounded-lg"
            autofocus
            v-model.trim="other"
            hide-details
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="saveOther"
            class="rounded-lg button-shadow set-font-kanit"
            outlined
            large
          >
            บันทึก
          </v-btn>
          <v-btn
            color="error"
            @click="dialogther = false"
            class="rounded-lg button-shadow set-font-kanit"
            outlined
            large
          >
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script
  type="text/javascript"
  src="https://api.longdo.com/map/?key=4950658d2b8d1babc2e9f4b2515bd9d3"
></script>
<script>
import location_new from "@/data/locations.json";
import perfix_data from "@/data/perfix_data.json";
import member_status from "@/data/member_status.json";
import member_count from "@/data/member_count.json";
import soilsType from "@/data/soilsType.json";
import address_status from "@/data/address_status.json";
import restore_chanel from "@/data/restore_chanel.json";
import house_need from "@/data/house_need.json";
import house_format from "@/data/house_format.json";
import solids from "@/data/solids.json";
import { apiService } from "@/services/axios";
import { LongdoMap } from "longdo-map-vue";
LongdoMap.init({ apiKey: "4950658d2b8d1babc2e9f4b2515bd9d3" });
export default {
  components: {
    LongdoMap,
  },
  name: "Icons",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      //data for select
      dialogther: false,
      locationList: location_new,
      perfixList: perfix_data.data,
      memberStatusList: member_status.data,
      memberCountList: member_count.data,
      addressStatusList: [],
      restoreChanelList: restore_chanel.data,
      houseNeedList: house_need.data,
      houseFormatList: house_format.data,
      solidsList: solids.data,
      // field data
      idCard: "",
      perfix: "",
      fname: "",
      lname: "",
      memberStatus: "",
      memberCount: "",
      houseId: "",
      villageId: "",
      address2: {
        SUB_DISTRICT_NAME: "",
        DISTRICT_NAME: "",
        PROVINCE_NAME: "",
        ZIPCODE: "",
        GEO_NAME: "",
      },
      lat: "",
      lon: "",
      gpsLocation: "",
      addressStatus: "",
      restoreChanel: "",
      houseNeed: "",
      houseFormat: "",
      solids: "",
      soilsSelection: "",
      //data
      soils: soilsType.data,
      locationStart: { lon: 102.82363467961038, lat: 16.432227961892437 },
      row: "",
      dialogSelectLocation: false,
      fileImageUpload: [],
      other: "",
      statysCheckSelect: 1,
    };
  },
  watch: {
    houseNeed(value) {
      if (value == "อื่นๆ (โปรดระบุ)") {
        this.other = "";
        this.statysCheckSelect = 1;
        this.dialogther = true;
      }
    },
    houseFormat(value) {
      if (value == "อื่นๆ (โปรดระบุ)") {
        this.other = "";
        this.statysCheckSelect = 2;
        this.dialogther = true;
      }
    },
    solids(value) {
      if (value == "อื่นๆ (โปรดระบุ)") {
        this.other = "";
        this.statysCheckSelect = 3;
        this.dialogther = true;
      }
    },
    soilsSelection(value) {
      if (value == "อื่นๆ") {
        this.other = "";
        this.statysCheckSelect = 4;
        this.dialogther = true;
      }
    },
  },
  mounted() {
    this.addressStatusList = address_status.data;
    let tempStatus = address_status.data.filter((item) => {
      return item == "ทั้งหมด";
    });
    for (const item of tempStatus) {
      let checkStatus = address_status.data.findIndex((item1) => {
        return item1 == item;
      });
      if (checkStatus > -1) {
        this.addressStatusList.splice(checkStatus, 1);
      }
    }
  },
  methods: {
    saveOther() {
      if (this.statysCheckSelect == 1) {
        this.houseNeedList.unshift({
          value: this.houseNeedList.length + 1,
          text: this.other,
        });
        this.houseNeed = this.other;
      } else if (this.statysCheckSelect == 2) {
        this.houseFormatList.unshift({
          value: this.houseFormatList.length + 1,
          text: this.other,
        });
        this.houseFormat = this.other;
      } else if (this.statysCheckSelect == 3) {
        this.solidsList.unshift({
          value: this.solidsList.length + 1,
          text: this.other,
        });
        this.solids = this.other;
      } else if (this.statysCheckSelect == 4) {
        this.soils.unshift(this.other);
        this.soilsSelection = this.other;
      }
      this.dialogther = false;
    },

    saveFile(file, fileList) {
      this.fileImageUpload = fileList;
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    async sendForm() {
      let body = {
        form_id_card: this.idCard,
        form_unit: this.perfix,
        form_fname: this.fname,
        form_lname: this.lname,
        form_position: this.memberStatus,
        form_members: this.memberCount,
        form_home_id: this.houseId,
        form_village: this.villageId,
        form_sub_district: this.address2.SUB_DISTRICT_NAME,
        form_province: this.address2.PROVINCE_NAME,
        form_district: this.address2.DISTRICT_NAME,
        form_zipcode: this.address2.ZIPCODE,
        form_geo: this.address2.GEO_NAME,
        form_living: this.addressStatus,
        form_improvement: this.restoreChanel,
        form_housing_needs: this.houseNeed,
        form_house_style: this.houseFormat,
        form_house_ownership: this.solids,
        form_land: this.soilsSelection,
        form_lat: this.lat,
        form_long: this.lon,
      };
      let data = await apiService.post({
        path: "form",
        body: body,
      });
      if (data.response) {
        this.uploadImage(data.data.form_id);
        this.saveHouseSuccess();
      } else {
        this.saveHouseFailed(data.message);
      }
    },
    async uploadImage(id) {
      let formData = new FormData();
      this.fileImageUpload.forEach((element) => {
        formData.append(`images`, element.raw);
      });
      let data = await apiService.put({
        path: "form/images",
        param: id,
        body: formData,
      });
      console.log("data :", data);
    },
    saveHouseSuccess() {
      this.$notify.success({
        title: "บักทึกข้อมูลสำเร็จ",
        message: "ทำการบันทึกข้อมูลครัวเรือนเรียบร้อย",
      });
      this.$router.push("/house");
    },
    saveHouseFailed(message) {
      this.$notify.error({
        title: "ผิดพลาด",
        message: message,
      });
    },
    selectLocation() {
      this.dialogSelectLocation = true;
    },
    event(map) {
      map.Layers.externalOptions({
        googleQuery: "key=AIzaSyA4-7a_yvgBodGTHptiCGW_TZMs7VWP6gM",
      });
      map.Layers.setBase(longdo.Layers.GOOGLE_SATELLITE);
      map.Event.bind("drag", () => {
        this.lat = map.location().lat;
        this.lon = map.location().lon;
        this.gpsLocation = `${map.location().lat},${map.location().lon}`;
      });
    },
  },
};
</script>

<style src="./FormCheck.scss" lang="scss" />
