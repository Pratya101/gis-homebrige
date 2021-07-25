<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" class="px-0">
        <h2>
          <v-icon
            style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 30px;"
            >mdi-file-document-edit-outline</v-icon
          >
          แบบฟอร์มสำรวจข้อมูลที่อยู่อาศัยระดับครัวเรือน
        </h2>
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
        <v-text-field solo type="number" v-model.trim="idCard"></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <label>คำนำหน้า</label>
        <v-select
          v-model.trim="perfix"
          :items="perfixList"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>ชื่อ</label>
        <v-text-field v-model.trim="fname" hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="4"
        ><label>นามสกุล</label
        ><v-text-field v-model.trim="lname" hide-details solo></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <label>ตําแหน่ง/สถานะภาพ</label>
        <v-select
          :items="memberStatusList"
          v-model.trim="memberStatus"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="6"
        ><label>จำนวนสมาชิกในครัวเรือน</label>
        <v-select
          solo
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
        <v-text-field v-model.trim="houseId" hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <label>หมู่ที่</label>
        <v-text-field v-model.trim="villageId" hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <label>ตําบล/แขวง</label>
        <v-autocomplete
          v-model.trim="address2"
          :items="locationList"
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
          v-model.trim="address2"
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
          v-model.trim="address2"
          :items="locationList"
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
          v-model.trim="address2"
          :items="locationList"
          item-text="SEARCH"
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
        <v-text-field v-model.trim="gpsLocation" hide-details solo>
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
          :items="addressStatusList"
          v-model.trim="addressStatus"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>แนวทางการปรับปรุง</label>
        <v-select
          :items="restoreChanelList"
          v-model.trim="restoreChanel"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>ความต้องการทีอยู่อาศัย</label>
        <v-select
          :items="houseNeedList"
          v-model="houseNeed"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <label>ลักษณะบ้าน</label>
        <v-select
          :items="houseFormatList"
          v-model="houseFormat"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <label>กรรมสิทธิทีดินของบ้านปจจุบัน</label>
        <v-select
          :items="solidsList"
          v-model="solids"
          item-value="value"
          item-text="text"
          hide-details
          solo
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
      <v-col cols="12" class="pt-0 text-right">
        <v-btn
          color="primary"
          x-large
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
    <v-dialog v-model="dialogSelectLocation" max-width="600">
      <v-card>
        <v-card-title>
          ตำแหน่ง :
          {{
            gpsLocation ? gpsLocation : "เลื่อนแผนที่เพื่อระบุพิกัดครัวงเรือน"
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
  </v-container>
</template>

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
export default {
  name: "Icons",
  data() {
    return {
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
    };
  },
  watch: {
    soilsSelection(value) {
      console.log("value seletion : ", value);
    },
  },
  methods: {
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
      console.log("daya : ", body);
      let data = await apiService.post({
        path: "form",
        body: body,
      });
      console.log(data);
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

<style src="./FormCheck.scss" lang="scss" />
