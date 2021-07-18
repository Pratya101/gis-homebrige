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
      <v-col cols="12" md="3">
        <label>เลขบัตรประชาชน</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="1">
        <label>คำนำหน้า</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>ชื่อ</label>
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="4"
        ><label>นามสกุล</label><v-text-field hide-details solo></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <label>ตําแหน่ง/สถานะภาพ</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="6"
        ><label>จำนวนสมาชิกในครัวเรือน</label>
        <v-text-field type="number" hide-details solo></v-text-field
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
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <label>หมู่ที่</label>
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <label>ภาค</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>จังหวัด</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>อำเภอ/เขต</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>ตําบล/แขวง</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>พิกัด GPS</label>
        <v-text-field v-model.trim="locationGPS" hide-details solo>
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
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>แนวทางการปรับปรุง</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <label>ความต้องการทีอยู่อาศัย</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <label>ลักษณะบ้าน</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <label>กรรมสิทธิทีดินของบ้านปจจุบัน</label>
        <v-select hide-details solo></v-select>
      </v-col>

      <v-col cols="12">
        <label>ลักษณะที่ดิน</label>
        <v-radio-group v-model="row" row>
          <v-col
            v-for="(item, index) in soils"
            :key="index"
            cols="12"
            md="4"
            class="py-1"
          >
            <v-radio :label="item" :value="[]"></v-radio>
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
    <v-dialog v-model="dialogSelectLocation" max-width="600">
      <v-card>
        <v-card-title> ตำแหน่ง : {{ locationGPS }} </v-card-title>
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
export default {
  name: "Icons",
  data() {
    return {
      locationStart: { lon: 102.82363467961038, lat: 16.432227961892437 },

      row: "",
      soils: [
        "ทีดินส่วนตัว",
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
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      dialogSelectLocation: false,
      locationGPS: " 102.82363467961038,16.432227961892437",
    };
  },
  methods: {
    selectLocation() {
      this.dialogSelectLocation = true;
    },
    toFontAwesomeText(name) {
      return "fa-" + name.toLowerCase();
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    event(map) {
      map.Event.bind("drag", () => {
        this.locationGPS = `${map.location().lat},${map.location().lon}`;
        console.log("map.location();", this.locationGPS);
      });
    },
  },
};
</script>

<style src="./FormCheck.scss" lang="scss" />
