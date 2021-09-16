<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="8">
        <h3>
          <v-icon>mdi-card-account-details-outline</v-icon>
          รายละเอียดข้อมูลของ {{ perfix }} {{ fname }} {{ lname }}
        </h3>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="d-md-flex justify-md-end set-font-kanit pr-0"
      >
        <v-btn
          @click="statusEdit = !statusEdit"
          color="warning"
          class="rounded-lg elevation-3 mb-2 me-2"
          large
          v-if="!statusEdit"
          outlined
        >
          <v-icon left>mdi-pencil-outline</v-icon>แก้ไขข้อมูล
        </v-btn>
        <v-btn
          v-if="statusEdit"
          @click="statusEdit = !statusEdit"
          color="error"
          class="rounded-lg elevation-3 mb-2 me-2"
          large
          outlined
        >
          <v-icon left>mdi-close</v-icon>ยกเลิก
        </v-btn>
        <v-btn
          @click="undo()"
          color="info"
          class="rounded-lg elevation-3 mb-2"
          large
          outlined
        >
          <v-icon left>mdi-undo</v-icon>ย้อนกลับ
        </v-btn>
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
          :disabled="!statusEdit"
          outlined
          label="เลขบัตรประชาชน"
          placeholder="เลขบัตรประชาชน"
          class="rounded-lg"
          background-color="#ffffff"
          type="number"
          hide-details
          v-model.trim="idCard"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          outlined
          label="คำนำหน้า"
          placeholder="คำนำหน้า"
          class="rounded-lg"
          background-color="#ffffff"
          v-model.trim="perfix"
          :items="perfixList"
          :disabled="!statusEdit"
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          outlined
          label="ชื่อ"
          placeholder="ชื่อ"
          class="rounded-lg"
          background-color="#ffffff"
          :disabled="!statusEdit"
          v-model.trim="fname"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          outlined
          label="นามสกุล"
          placeholder="นามสกุล"
          class="rounded-lg"
          background-color="#ffffff"
          :disabled="!statusEdit"
          v-model.trim="lname"
          hide-details
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <v-select
          outlined
          label="ตําแหน่ง/สถานะภาพ"
          placeholder="ตําแหน่ง/สถานะภาพ"
          class="rounded-lg"
          background-color="#ffffff"
          :items="memberStatusList"
          v-model.trim="memberStatus"
          :disabled="!statusEdit"
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          outlined
          label="จำนวนสมาชิกในครัวเรือน"
          placeholder="จำนวนสมาชิกในครัวเรือน"
          class="rounded-lg"
          background-color="#ffffff"
          :disabled="!statusEdit"
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
          class="rounded-lg"
          background-color="#ffffff"
          :disabled="!statusEdit"
          v-model.trim="houseId"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="villageId"
          hide-details
          outlined
          label="หมู่ที่"
          placeholder="หมู่ที่"
          class="rounded-lg"
          background-color="#ffffff"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="address2"
          :items="locationList"
          :disabled="!statusEdit"
          item-text="SEARCH"
          return-object
          outlined
          label="ตําบล/แขวง"
          hide-details
          placeholder="ตําบล/แขวง"
          class="rounded-lg"
          background-color="#ffffff"
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
          v-model="address2"
          :disabled="!statusEdit"
          :items="locationList"
          item-text="SEARCH"
          return-object
          hide-details
          outlined
          label="อำเภอ/เขต"
          placeholder="อำเภอ/เขต"
          class="rounded-lg"
          background-color="#ffffff"
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
          v-model="address2"
          :items="locationList"
          :disabled="!statusEdit"
          item-text="SEARCH"
          return-object
          hide-details
          outlined
          label="จังหวัด"
          placeholder="จังหวัด"
          class="rounded-lg"
          background-color="#ffffff"
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
          v-model="address2"
          hide-details
          :items="locationList"
          item-text="SEARCH"
          :disabled="!statusEdit"
          return-object
          outlined
          label="ภาค"
          placeholder="ภาค"
          class="rounded-lg"
          background-color="#ffffff"
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
          :disabled="!statusEdit"
          v-model.trim="gpsLocation"
          hide-details
          outlined
          label="พิกัด GPS"
          placeholder="พิกัด GPS"
          class="rounded-lg"
          background-color="#ffffff"
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
          :disabled="!statusEdit"
          :items="addressStatusList"
          v-model.trim="addressStatus"
          hide-details
          outlined
          label="สภาพที่อยู่อาศัย"
          placeholder="สภาพที่อยู่อาศัย"
          class="rounded-lg"
          background-color="#ffffff"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :disabled="!statusEdit"
          :items="restoreChanelList"
          v-model.trim="restoreChanel"
          hide-details
          outlined
          label="แนวทางการปรับปรุง"
          placeholder="แนวทางการปรับปรุง"
          class="rounded-lg"
          background-color="#ffffff"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :disabled="!statusEdit"
          :items="houseNeedList"
          v-model="houseNeed"
          item-value="text"
          item-text="text"
          hide-details
          outlined
          label="ความต้องการทีอยู่อาศัย"
          placeholder="ความต้องการทีอยู่อาศัย"
          class="rounded-lg"
          background-color="#ffffff"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="houseFormatList"
          v-model="houseFormat"
          :disabled="!statusEdit"
          item-value="text"
          item-text="text"
          hide-details
          outlined
          label="ลักษณะบ้าน"
          placeholder="ลักษณะบ้าน"
          class="rounded-lg"
          background-color="#ffffff"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="solidsList"
          v-model="solids"
          item-value="text"
          :disabled="!statusEdit"
          item-text="text"
          hide-details
          outlined
          label="กรรมสิทธิทีดินของบ้านปจจุบัน"
          placeholder="กรรมสิทธิทีดินของบ้านปจจุบัน"
          class="rounded-lg"
          background-color="#ffffff"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="beneficiaryList"
          v-model="beneficiarySelect"
          item-value="text"
          item-text="text"
          :disabled="!statusEdit"
          hide-details
          outlined
          label="กลุ่มผู้รับผลประโยชน์"
          placeholder="กลุ่มผู้รับผลประโยชน์"
          background-color="#ffffff"
          class="rounded-lg "
        ></v-select>
      </v-col>
      <v-col cols="12">
        <label>ลักษณะที่ดิน</label>
        <v-radio-group :disabled="!statusEdit" v-model="soilsSelection" row>
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
        <label>รูปภาพ</label>

        <v-row>
          <v-col cols="12" v-if="imageList.length == 0">
            <strong class="error--text">ไม่มีรูปภาพ !</strong>
          </v-col>
          <v-col
            v-else
            cols="6"
            md="4"
            lg="3"
            v-for="(item, index) in imageList"
            :key="index"
          >
            <v-card>
              <v-img height="150" :src="item"></v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-tooltip color="#212121" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :disabled="!statusEdit"
                      v-bind="attrs"
                      v-on="on"
                      small
                      class="me-2"
                      @click="showSelectEditImage(item)"
                      color="primary"
                      ><v-icon>mdi-pencil-outline</v-icon></v-btn
                    >
                  </template>
                  <span>แก้ไขรูปภาพ</span>
                </v-tooltip>
                <v-tooltip color="#212121" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :disabled="!statusEdit"
                      v-bind="attrs"
                      v-on="on"
                      @click="handleRemoveImage(item)"
                      small
                      class="px-1"
                      color="error"
                      ><v-icon>mdi-delete-outline</v-icon></v-btn
                    >
                  </template>
                  <span>ลบไขรูปภาพ</span>
                </v-tooltip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" class="pt-0">
        <input
          type="file"
          style="display:none;"
          @change="previewFiles"
          ref="selectImage"
        />
        <v-btn
          color="primary"
          x-large
          :disabled="!statusEdit"
          class="set-font-kanit rounded-lg elevation-4 me-2"
          @click="showSelectImage"
          outlined
        >
          <v-icon left>fa-plus</v-icon>
          เพิ่มรูปภาพ</v-btn
        >
      </v-col>
      <v-col cols="12" md="6" class="pt-0 text-right">
        <v-btn
          color="primary"
          x-large
          :disabled="!statusEdit"
          @click="updateFormData"
          class="set-font-kanit rounded-lg elevation-4 me-2"
          outlined
        >
          <v-icon left>fa-save</v-icon>
          บันทึกข้อมูล</v-btn
        >
        <v-btn
          color="error"
          x-large
          :disabled="!statusEdit"
          class="set-font-kanit rounded-lg elevation-4"
          outlined
        >
          <v-icon left>fa-close</v-icon>
          ล้างข้อมูล</v-btn
        >
      </v-col>
    </v-row>

    <v-dialog v-model="dialogSelectLocation" max-width="600">
      <v-card>
        <v-card-title>
          ตำแหน่ง :
          {{
            gpsLocation ? gpsLocation : "เลื่อนแผนที่เพื่อระบุพิกัดครัวsเรือน"
          }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <longdo-map
            @load="event"
            :location="locationStart"
            :lastView="false"
            :zoom="16"
            class="set-shadow"
            style="height:400px"
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
import { apiService } from "@/services/axios";
import perfix_data from "@/data/perfix_data.json";
import member_status from "@/data/member_status.json";
import member_count from "@/data/member_count.json";
import soilsType from "@/data/soilsType.json";
import address_status from "@/data/address_status.json";
import restore_chanel from "@/data/restore_chanel.json";
import house_need from "@/data/house_need.json";
import house_format from "@/data/house_format.json";
import beneficiary from "@/data/beneficiary.json";
import solids from "@/data/solids.json";
import { LongdoMap } from "longdo-map-vue";

LongdoMap.init({ apiKey: "4950658d2b8d1babc2e9f4b2515bd9d3" });
export default {
  components: {
    LongdoMap,
  },
  name: "Detail",
  data() {
    return {
      locationStart: { lon: 102.82363467961038, lat: 16.432227961892437 },
      dialogSelectLocation: false,

      //data for select
      beneficiaryList: beneficiary.data,
      beneficiarySelect: "",
      locationList: location_new,
      perfixList: perfix_data.data,
      memberStatusList: member_status.data,
      memberCountList: member_count.data,
      addressStatusList: address_status.data,
      restoreChanelList: restore_chanel.data,
      houseNeedList: house_need.data,
      houseFormatList: house_format.data,
      solidsList: solids.data,
      soils: soilsType.data,
      confirm: false,
      row: "ที่ดินส่วนตัว",
      idCard: "",
      perfix: "",
      fname: "",
      lname: "",
      memberStatus: "",
      memberCount: "",
      houseId: "",
      villageId: "",
      address2: {},
      lat: "",
      lon: "",
      gpsLocation: "",
      addressStatus: "",
      restoreChanel: "",
      houseNeed: "",
      houseFormat: "",
      solids: "",
      soilsSelection: "",
      statusEdit: false,
      dialog: false,
      subDistrictName: "",
      districtName: "",
      provinceName: "",
      geoName: "",
      imageList: [],
      file: null,
      statusEditImage: false,
      oldFileEdit: "",
      other: "",
      statysCheckSelect: 1,
      dialogther: false,
    };
  },
  mounted() {
    this.form_id = this.$route.query.id;
    this.getFormData();
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
      if (value == "อื่นๆ (โปรดระบุ)") {
        this.other = "";
        this.statysCheckSelect = 4;
        this.dialogther = true;
      }
    },
    beneficiarySelect(value) {
      if (value == "อื่นๆ (โปรดระบุ)") {
        this.other = "";
        this.statysCheckSelect = 5;
        this.dialogther = true;
      }
    },
  },
  methods: {
    showSelectEditImage(file) {
      this.oldFileEdit = file;
      this.statusEditImage = true;
      this.$refs.selectImage.click();
    },
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
      } else if (this.statysCheckSelect == 5) {
        this.beneficiaryList.unshift({
          value: this.beneficiaryList.length + 1,
          text: this.other,
        });
        this.beneficiarySelect = this.other;
      }
      this.dialogther = false;
    },
    showSelectImage() {
      this.$refs.selectImage.click();
    },
    previewFiles(event) {
      this.file = event.target.files[event.target.files.length - 1];
      if (this.statusEditImage) {
        this.updateImage();
      } else {
        this.addImage();
      }
    },
    async updateImage() {
      let formData = new FormData();
      formData.append("images", this.file);
      formData.append("old_images", this.oldFileEdit);
      let data = await apiService.put({
        path: "form/images/edit",
        param: this.form_id,
        body: formData,
      });
      data.response
        ? this.$notify.success({
            title: "สำเร็จ",
            message: "แก้ไขรูปภาพเรียบร้อยแล้ว",
          })
        : this.$notify.error({
            title: "ผิดพลาด",
            message: data.message,
          });
      this.getFormData();
      this.statusEditImage = false;
    },
    async addImage() {
      let formData = new FormData();
      formData.append(`images`, this.file);
      let data = await apiService.put({
        path: "form/images",
        param: this.form_id,
        body: formData,
      });
      data.response
        ? this.$notify.success({
            title: "สำเร็จ",
            message: "เพิ่มรูปภาพเรียบร้อยแล้ว",
          })
        : this.$notify.error({
            title: "ผิดพลาด",
            message: data.message,
          });
      this.getFormData();
    },
    async deleteAll() {
      let data = await apiService.delete({
        path: "form/images",
        param: this.form_id,
      });
      data.response
        ? this.$notify.success({
            title: "สำเร็จ",
            message: "ลบรูปภาพเรียบร้อยแล้ว",
          })
        : this.$notify.error({
            title: "ผิดพลาด",
            message: data.message,
          });
      this.getFormData();
    },
    async updateFormData() {
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
        form_beneficiary: this.beneficiarySelect,
        form_house_style: this.houseFormat,
        form_house_ownership: this.solids,
        form_land: this.soilsSelection,
        form_lat: this.lat,
        form_long: this.lon,
      };
      let data = await apiService.put({
        path: "form",
        param: this.form_id,
        body: body,
      });
      data.response
        ? this.$notify.success({
            title: "แก้ไขข้อมูลสำเร็จ",
            message: "ทำการแก้ไขข้อมูลครัวเรือนเรียบร้อย",
          })
        : this.$notify.success({
            title: "แก้ไขข้อมูลสำเร็จ",
            message: data.message,
          });
      this.getFormData();
      this.statusEdit = false;
    },
    async getFormData() {
      let response = await apiService.get({
        path: "form",
        param: this.form_id,
      });
      this.mapData(response.data);
    },
    undo() {
      this.$router.push("/house");
    },
    mapData(data) {
      this.idCard = data.form_id_card;
      this.perfix = data.form_unit;
      this.fname = data.form_fname;
      this.lname = data.form_lname;
      this.memberStatus = data.form_position;
      this.memberCount = data.form_members;
      this.houseId = data.form_home_id;
      this.villageId = data.form_village;
      this.addressStatus = data.form_living;
      this.restoreChanel = data.form_improvement;
      this.houseNeed = data.form_housing_needs;
      this.houseFormat = data.form_house_style;
      this.solids = data.form_house_ownership;
      this.soilsSelection = data.form_land;
      this.beneficiarySelect = data.form_beneficiary;
      this.lat = data.form_lat;
      this.lon = data.form_long;
      this.locationStart = { lon: data.form_long, lat: data.form_lat };
      this.gpsLocation = `${data.form_lat},${data.form_long}`;
      this.address2 = {
        DISTRICT_NAME: data.form_district,
        GEO_NAME: data.form_geo,
        PROVINCE_NAME: data.form_province,
        SEARCH: `${data.form_sub_district} > ${data.form_district} > ${data.form_province} > ${data.form_zipcode} > ${data.form_geo}`,
        SUB_DISTRICT_NAME: data.form_sub_district,
        ZIPCODE: data.form_zipcode,
      };
      this.imageList = data.images ? data.images : [];
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
    async handleRemoveImage(file) {
      let images = file.replace(
        `https://gis-homebrige.org/api/assets/images/form/`,
        ""
      );

      let data = await apiService.delete({
        path: "form/images",
        param: `${this.form_id}/${images}`,
      });
      data.response
        ? this.$notify.success({
            title: "สำเร็จ",
            message: "ลบรูปภาพ เรียบร้อยแล้ว",
          })
        : this.$notify.error({
            title: "ผิดพลาด",
            message: data.message,
          });
      this.getFormData();
    },
  },
};
</script>

<style src="./Detail.scss" lang="scss" />
