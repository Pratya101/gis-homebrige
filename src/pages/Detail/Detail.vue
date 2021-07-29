<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="8">
        <h2>
          <v-icon
            style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 30px;"
            >mdi-card-account-details-outline</v-icon
          >
          รายละเอียดข้อมูลของ {{ perfix }} {{ fname }} {{ lname }}
        </h2>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="d-md-flex justify-md-end set-font-kanit pr-0"
      >
        <v-btn
          color="primary"
          class="rounded-lg elevation-3 me-2"
          large
          outlined
          @click="updateStatus()"
        >
          <v-icon left>mdi-update</v-icon>
          อัพเดทความคืบหน้า
        </v-btn>
        <v-btn
          @click="statusEdit = !statusEdit"
          color="warning"
          class="rounded-lg elevation-3"
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
          class="rounded-lg elevation-3"
          large
          outlined
        >
          <v-icon left>mdi-close</v-icon>ยกเลิก
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
      <v-col cols="12" md="2">
        <label>เลขบัตรประชาชน</label>
        <v-text-field
          :disabled="!statusEdit"
          solo
          type="number"
          v-model.trim="idCard"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <label>คำนำหน้า</label>
        <v-select
          v-model.trim="perfix"
          :items="perfixList"
          :disabled="!statusEdit"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>ชื่อ</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="fname"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4"
        ><label>นามสกุล</label
        ><v-text-field
          :disabled="!statusEdit"
          v-model.trim="lname"
          hide-details
          solo
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <label>ตําแหน่ง/สถานะภาพ</label>
        <v-select
          :items="memberStatusList"
          v-model.trim="memberStatus"
          :disabled="!statusEdit"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="6"
        ><label>จำนวนสมาชิกในครัวเรือน</label>
        <v-select
          solo
          :disabled="!statusEdit"
          :items="memberCountList"
          v-model.trim="memberCount"
          form
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
      <v-col cols="12" md="2">
        <label>บ้านเลขที่</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="houseId"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <label>หมู่ที่</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="villageId"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <label>ตําบล/แขวง</label>
        <v-autocomplete
          v-model="address2"
          :items="locationList"
          :disabled="!statusEdit"
          item-text="SEARCH"
          return-object
          solo
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.SUB_DISTRICT_NAME }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4">
        <label>อำเภอ/เขต</label>
        <v-autocomplete
          v-model="address2"
          :disabled="!statusEdit"
          :items="locationList"
          item-text="SEARCH"
          return-object
          solo
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.DISTRICT_NAME }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4">
        <label>จังหวัด</label>
        <v-autocomplete
          v-model="address2"
          :items="locationList"
          :disabled="!statusEdit"
          item-text="SEARCH"
          return-object
          solo
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.PROVINCE_NAME }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4">
        <label>ภาค</label>
        <v-autocomplete
          v-model="address2"
          :items="locationList"
          item-text="SEARCH"
          :disabled="!statusEdit"
          return-object
          solo
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.GEO_NAME }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4">
        <label>พิกัด GPS</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="gpsLocation"
          hide-details
          solo
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
      <v-col cols="12" md="4">
        <label>สภาพที่อยู่อาศัย</label>
        <v-select
          :disabled="!statusEdit"
          :items="addressStatusList"
          v-model.trim="addressStatus"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>แนวทางการปรับปรุง</label>
        <v-select
          :disabled="!statusEdit"
          :items="restoreChanelList"
          v-model.trim="restoreChanel"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>ความต้องการทีอยู่อาศัย</label>
        <v-select
          :disabled="!statusEdit"
          :items="houseNeedList"
          v-model="houseNeed"
          item-value="text"
          item-text="text"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <label>ลักษณะบ้าน</label>
        <v-select
          :items="houseFormatList"
          v-model="houseFormat"
          :disabled="!statusEdit"
          item-value="text"
          item-text="text"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <label>กรรมสิทธิทีดินของบ้านปจจุบัน</label>
        <v-select
          :items="solidsList"
          v-model="solids"
          item-value="text"
          :disabled="!statusEdit"
          item-text="text"
          hide-details
          solo
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
      <v-col cols="12" class="pt-0 text-right">
        <v-btn
          color="primary"
          x-large
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
          class="set-font-kanit rounded-lg elevation-4"
          outlined
        >
          <v-icon left>fa-close</v-icon>
          ล้างข้อมูล</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>
          <v-row class="no-gutters">
            <v-col cols="12" md="6">
              <h2>
                <v-icon
                  class="pb-1"
                  style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 30px;"
                  >mdi-update</v-icon
                >
                อัพเดทความคืบหน้า
              </h2>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pt-0 mt-0 d-md-flex justify-md-end set-font-kanit"
            >
              <v-chip label color="warning">เตรียมข้อมูล</v-chip>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider class="mt-0"></v-divider>
        <v-card-text>
          <label align="center">รูปภาพ</label>
          <el-upload
            align="center"
            actions="#"
            list-type="picture"
            drag
            :auto-upload="false"
            :file-list="fileList"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              ลากและวางไฟล์หรือคลิก <em>เพื่ออัพโหลดรูปภาพ</em>
            </div>
          </el-upload>
          <label class="mt-5">รายละเอียด</label>
          <v-textarea solo rows="3"></v-textarea>
        </v-card-text>
        <v-divider class="mt-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            @click="confirm = true"
            class="rounded-lg elevation-4 set-font-kanit"
            x-large
          >
            <v-icon left>fa-save</v-icon>อัพเดทความคืบหน้า
          </v-btn>
          <v-btn
            color="error"
            outlined
            class="rounded-lg elevation-4 set-font-kanit"
            x-large
          >
            <v-icon left>fa-close</v-icon>ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirm" max-width="550">
      <v-card>
        <v-card-title>
          <h3>
            <v-icon left color="error"
              >mdi-checkbox-marked-circle-outline</v-icon
            >
            ยืนยันการอัพเดทความคืนหน้า
          </h3>
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <v-card-text>
          <h4>
            เมื่อกดปุ่มยืนยัน ระบบจะทำเปลี่ยนสถานะความคืบหน้าจาก
            <strong>"เตรียมข้อมูล"</strong> เป็น
            <strong>"กำลังกำเนินการ"</strong> !
          </h4>
        </v-card-text>
        <v-divider class="mt-0 pt-0 "></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            class="rounded-lg elevation-4 set-font-kanit"
            x-large
          >
            <v-icon left>mdi-check-all</v-icon>ยืนยัน
          </v-btn>
          <v-btn
            color="error"
            outlined
            class="rounded-lg elevation-4 set-font-kanit"
            x-large
            @click="confirm = false"
          >
            <v-icon left>fa-close</v-icon>ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSelectLocation" max-width="600">
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
            :zoom="16"
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
  </v-container>
</template>

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
import solids from "@/data/solids.json";
export default {
  name: "Detail",
  data() {
    return {
      locationStart: { lon: 102.82363467961038, lat: 16.432227961892437 },
      dialogSelectLocation: false,

      //data for select
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
    };
  },
  mounted() {
    this.form_id = this.$route.query.id;
    this.getFormData();
  },

  methods: {
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
    },
    updateStatus() {
      this.dialog = true;
    },
    selectLocation() {
      this.dialogSelectLocation = true;
    },
    event(map) {
      map.Event.bind("drag", () => {
        this.lat = map.location().lat;
        this.lon = map.location().lon;

        this.gpsLocation = `${map.location().lat},${map.location().lon}`;
      });
    },
  },
};
</script>

<style src="./Detail.scss" lang="scss" />
