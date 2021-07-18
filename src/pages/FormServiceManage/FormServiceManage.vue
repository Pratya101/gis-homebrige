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
          แบบฟอร์มเพิ่มโครงการ
        </h2>
      </v-col>
    </v-row>

    <v-row class="set-shadow mt-0">
      <v-col cols="12" md="4">
        <label>ชื่อโครงการ</label>
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <label>ประเภทโครงการ</label>
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <label>เครือข่าย</label>
        <v-select hide-details solo></v-select> </v-col
      ><v-col cols="12" md="3">
        <label>ตําบล/แขวง</label>
        <v-select hide-details solo></v-select> </v-col
      ><v-col cols="12" md="3">
        <label>อำเภอ/เขต</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <label>จังหวัด</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <label>รหัสไปรษณีย์</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <label>ภาค</label>
        <v-select hide-details solo></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <label>ผู้ประสานงาน</label>
        <v-text-field hide-details solo> </v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>เบอร์โทร</label>
        <v-text-field hide-details solo></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>ข้อมูลจำนวเป้าหมาย</label>
        <v-text-field hide-details solo></v-text-field>
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
    return {};
  },
  methods: {},
};
</script>

<style src="./FormServiceManage.scss" lang="scss" />
