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
          รายละเอียดข้อมูลของ นายปรัชญา โพธิ์ชา
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
        <label>คำนำหน้า</label>
        <v-select
          v-model.trim="perfix"
          :disabled="!statusEdit"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="5">
        <label>ชื่อ</label>
        <v-text-field
          v-model.trim="fname"
          :disabled="!statusEdit"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="5"
        ><label>นามสกุล</label
        ><v-text-field
          v-model.trim="lname"
          :disabled="!statusEdit"
          hide-details
          solo
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <label>ตําแหน่ง/สถานะภาพ</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="6"
        ><label>จำนวนสมาชิกในครัวเรือน</label>
        <v-text-field
          v-model.trim="famaryCount"
          :disabled="!statusEdit"
          type="number"
          hide-details
          solo
        ></v-text-field
      ></v-col>
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
          v-model.trim="hourseNumber"
          :disabled="!statusEdit"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <label>หมู่ที่</label>
        <v-text-field
          v-model.trim="villageId"
          :disabled="!statusEdit"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <label>ตําบล/แขวง</label>
        <v-autocomplete
          v-model.trim="address2"
          :items="locationList"
          item-text="SEARCH"
          return-object
          :disabled="!statusEdit"
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
          :disabled="!statusEdit"
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
          v-model.trim="address2"
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
            {{ item.GEO_NAME }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4">
        <label>พิกัด GPS</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="gps"
          hide-details
          solo
        >
          <template v-slot:append>
            <v-icon style="color:blue;cursor:pointer"
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
          v-model.trim="tumy"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>แนวทางการปรับปรุง</label>
        <v-select
          :disabled="!statusEdit"
          v-model.trim="tumy"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>ความต้องการทีอยู่อาศัย</label>
        <v-select
          :disabled="!statusEdit"
          v-model.trim="tumy"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <label>ลักษณะบ้าน</label>
        <v-select
          :disabled="!statusEdit"
          v-model.trim="tumy"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <label>กรรมสิทธิทีดินของบ้านปจจุบัน</label>
        <v-select
          :disabled="!statusEdit"
          v-model.trim="tumy"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" v-if="!statusEdit">
        <label>ลักษณะที่ดิน : ที่ดินส่วนตัว</label>
      </v-col>
      <v-col cols="12" v-if="statusEdit">
        <label>ลักษณะที่ดิน</label>
        <v-radio-group v-model="row" row>
          <v-col
            v-for="(item, index) in soils"
            :key="index"
            cols="12"
            md="4"
            class="py-1"
          >
            <v-radio :label="item" :value="item"></v-radio>
          </v-col>
        </v-radio-group>
      </v-col>
      <v-col cols="12" class="pt-0 text-right">
        <v-btn
          color="primary"
          x-large
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
          <label>รูปภาพ</label>
          <v-file-input
            label="File input"
            filled
            prepend-icon="mdi-camera"
          ></v-file-input>
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
  </v-container>
</template>

<script>
import location_new from "@/data/locations.json";
export default {
  name: "Icons",
  data() {
    return {
      confirm: false,
      row: "ที่ดินส่วนตัว",
      locationList: location_new,
      address2: {
        SUB_DISTRICT_NAME: "ศรีโคตร",
        DISTRICT_NAME: "จตุรพักตรพิมาน",
        PROVINCE_NAME: "ร้อยเอ็ด",
        ZIPCODE: "45180",
        GEO_NAME: "ภาคตะวันออกเฉียงเหนือ",
      },
      perfix: "นาย",
      fname: "ปรัชญา",
      lname: "โพธิ์ชา",
      userStatus: "โสด",
      famaryCount: "5",
      hourseNumber: "17",
      villageId: "5",
      tumbon: "ศรีโคตร",
      ampure: "จตุรพักตรพิมาน",
      province: "ร้อยเอ็ด",
      zipcode: "45180",
      gps: "16.413294, 102.852986",
      tumx: "X",
      tumy: "Y",
      addressState: "บ้านทรุดโทรมทั้งหลัง",
      howToMa: "สร้างใหม่ทั้งหลัง",
      howtowant: "ต้องการสร้างใหม่ทั้งหลัง",
      homeType: "บ้านชันเดียวติดพื้นดิน",
      roldeSolid: "ที่ดินส่วนตัว",
      statusSolid: "ที่ดินส่วนตัว",
      statusEdit: 0,

      soils: [
        "ที่ดินส่วนตัว",
        "กรมศาสนา",
        "เขตรักษาพันธุ์สัตว์ป่า",
        "นิคมอุตสาหกรรม",
        "ส.ป.ก.",
        "กรมชลประทาน",
        "กรมศิลปากร",
        "ทหารเรือ",
        "ป่าชายเลน",
        "สำนักงานทรัพย์สินพระมหากษัตริย์",
        "กรมทางหลวง",
        "การเคหะแห่งชาติ",
        "ที่ดินถือครองคู่กัน(องค์กรชุมชน,สหกรณ์)",
        "ป่าสงวนแห่งชาติ",
        "องค์การอุตสาหกรรมป่าไม้",
        "กรมธนารักษ์",
        "กรมท่าเรือแห่งประเทศไทย",
        "นิคมการเกษตร",
        "วัด",
        "อุทยานแห่งชาติ",
        "กรมประมง",
        "การไฟฟ้าแห่งประเทศไทย",
        "นิคมสร้างตนเอง",
        "สาธารณะประโยชน์",
        "เอกชน",
        "อื่นๆ",
      ],
      dialog: false,
    };
  },
  watch: {
    address2(value) {
      console.log("value", value);
    },
  },
  methods: {
    updateStatus() {
      this.dialog = true;
    },
  },
};
</script>

<style src="./Detail.scss" lang="scss" />
