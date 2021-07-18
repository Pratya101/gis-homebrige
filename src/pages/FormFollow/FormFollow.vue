<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12">
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
          แบบฟอร์มติดตามการพัฒนาที่อยู่อาศัย
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
        หมวดข้อมูลการติดตามการพัฒนา
      </v-col>
      <v-col cols="12" md="6">
        <label>ชื่อโครงการ</label>
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <label>เครือข่าย</label>
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="6"
        ><label>งบประมาณ</label><v-text-field hide-details solo></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <label>ติดตามความคืบหน้า</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12"
        ><label>รายละเอียด</label>
        <v-textarea rows="3" hide-details solo></v-textarea
      ></v-col>
      <v-col cols="12" md="6"
        ><label>รูปภาพ</label><v-file-input truncate-length="15"></v-file-input>
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
        หมวดข้อมูลในครัวเรือน
      </v-col>
      <v-col cols="12" md="2">
        <label>คำนำหน้า</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="5">
        <label>ชื่อ</label>
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="5"
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
        หมวดที่ตั้งครัวเรือนครัวเรือน
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
        <v-text-field hide-details solo>
          <template v-slot:append>
            <v-icon style="color:blue;cursor:pointer"
              >mdi-map-marker-radius-outline</v-icon
            >
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <label>พิกัด TUM (X)</label>
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <label>พิกัด TUM (Y)</label>
        <v-text-field hide-details solo></v-text-field>
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
            <v-radio :label="item" :value="items"></v-radio>
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
  </v-container>
</template>
ƒ
<script>
export default {
  name: "Icons",
  data() {
    return {
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
    };
  },
  methods: {
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
  },
};
</script>

<style src="./FormFollow.scss" lang="scss" />
