<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="4" class="px-0">
        <h2 class="pt-1">
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
      <v-col cols="12" md="8" class="d-md-flex justify-md-end px-0">
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
    <v-row class="set-shadow-form">
      <v-col cols="12" md="4">
        <label>ชื่อโครงการ</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="name"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <label>ประเภทโครงการ</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="type"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <label>เครือข่าย</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="network"
          hide-details
          solo
        ></v-text-field></v-col
      ><v-col cols="12" md="3">
        <label>ตําบล/แขวง</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="subDistrict"
          hide-details
          solo
        ></v-text-field></v-col
      ><v-col cols="12" md="3">
        <label>อำเภอ/เขต</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="district"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>จังหวัด</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="province"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>รหัสไปรษณีย์</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="zipcode"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>ภาค</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="geo"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>ผู้ประสานงาน</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="contact"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>เบอร์โทร</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="tel"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>ข้อมูลจำนวเป้าหมาย</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="goal"
          hide-details
          solo
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="pt-0 text-right ">
        <v-fade-transition>
          <v-btn
            color="primary"
            x-large
            v-show="statusEdit"
            class="set-font-kanit rounded-lg elevation-4 me-2"
            outlined
          >
            <v-icon left>fa-save</v-icon>
            บันทึกข้อมูล</v-btn
          >
        </v-fade-transition>
        <v-fade-transition>
          <v-btn
            color="error"
            x-large
            v-show="statusEdit"
            class="set-font-kanit rounded-lg elevation-4"
            outlined
          >
            <v-icon left>fa-close</v-icon>
            ล้างข้อมูล</v-btn
          >
        </v-fade-transition>
      </v-col>
    </v-row>
    <v-divider class="mt-10"></v-divider>
    <v-row class="mt-1">
      <v-col cols="12" md="4" class="px-0">
        <h2 class="pt-1">
          <v-icon
            style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 30px;"
            >mdi-view-list-outline</v-icon
          >
          ข้อมูลการพัฒนาที่อยู่อาศัย
        </h2>
      </v-col>
      <v-col cols="12" md="8" class="d-md-flex justify-md-end px-0">
        <v-btn
          @click="addHouse()"
          color="primary"
          class="rounded-lg elevation-3"
          large
          outlined
        >
          <v-icon left>fa-plus</v-icon>เพิ่มครัวเรือน
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12" class="px-0">
        <v-tabs
          slider-size="0"
          height="65"
          fixed-tabs
          active-class="error white--text set-shadow"
          style="border-radius: 10px; background: #f6f7ff;box-shadow: 2px 2px 10px #76777a, -2px -2px 10px #ffffff"
        >
          <v-tab class="my-1">
            <v-icon left>mdi-office-building</v-icon>
            สร้างใหม่
          </v-tab>
          <v-tab class="my-1">
            <v-icon left>mdi-hammer-wrench</v-icon>ปรับปรุงแก้ไข
          </v-tab>
          <v-tab-item>
            <v-simple-table class="material-table-tab set-shadow mt-3">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left white--text">#</th>
                    <th class="text-left white--text">ชื่อ-สนามสกุล</th>
                    <th class="text-left white--text">เครือข่าย</th>
                    <th class="text-left white--text">ภาค</th>
                    <th class="text-left white--text">จังหวัด</th>
                    <th class="text-left white--text">หมวดการพัฒนา</th>
                    <th class="text-left white--text">สถานะการพัฒนา</th>
                    <th class="text-center white--text">รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Pratya Phocha</td>
                    <td>เครือข่ายชุมชนเพื่อการพัฒนา</td>
                    <td>ตะวันออกเฉียงเหนือ</td>
                    <td>ร้อยเอ็ด</td>
                    <td>สร้างใหม่ทั้งหลัง</td>
                    <td>เตรียมข้อมูล</td>
                    <td class="text-center">
                      <v-btn
                        icon
                        color="primary"
                        @click="detail"
                        style="cursor:pointer;"
                        ><v-icon>mdi-information-outline</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
          <v-tab-item>
            <v-simple-table class="material-table-tab set-shadow mt-3">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left white--text">#</th>
                    <th class="text-left white--text">ชื่อ-สนามสกุล</th>
                    <th class="text-left white--text">เครือข่าย</th>
                    <th class="text-left white--text">ภาค</th>
                    <th class="text-left white--text">จังหวัด</th>
                    <th class="text-left white--text">หมวดการพัฒนา</th>
                    <th class="text-left white--text">สถานะการพัฒนา</th>
                    <th class="text-center white--text">รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Pratya Phocha</td>
                    <td>เครือข่ายชุมชนเพื่อการพัฒนา</td>
                    <td>ตะวันออกเฉียงเหนือ</td>
                    <td>ร้อยเอ็ด</td>
                    <td>สร้างใหม่ทั้งหลัง</td>
                    <td>เตรียมข้อมูล</td>
                    <td class="text-center">
                      <v-btn
                        icon
                        color="primary"
                        @click="detail"
                        style="cursor:pointer;"
                        ><v-icon>mdi-information-outline</v-icon></v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Pratya Phocha</td>
                    <td>เครือข่ายชุมชนเพื่อการพัฒนา</td>
                    <td>ตะวันออกเฉียงเหนือ</td>
                    <td>ร้อยเอ็ด</td>
                    <td>สร้างใหม่ทั้งหลัง</td>
                    <td>เตรียมข้อมูล</td>
                    <td class="text-center">
                      <v-btn
                        icon
                        color="primary"
                        @click="detail"
                        style="cursor:pointer;"
                        ><v-icon>mdi-information-outline</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <v-dialog max-width="900" v-model="dialog">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
ƒ
<script>
export default {
  name: "Icons",
  data() {
    return {
      dialog: false,
      statusEdit: false,
      name: "บ้านพอเพียง ขอนแก่น",
      type: "บ้านมันคงชนบท",
      network: "ศูนย์รวมพัฒนาชุมชน",
      subDistrict: "บ้านเป็ด",
      district: "เมืองขอนแก่น",
      province: "ขอนแก่น",
      zipcode: "40000",
      geo: "ตะวันออกเฉียงเหนือ",
      contact: "Pratya Phocha",
      tel: "099-098-0000",
      goal: "10",
    };
  },
  methods: {
    addHouse() {
      console.log("add house");
      this.dialog = true;
    },
    detail() {},
  },
};
</script>

<style src="./DetailServiceManage.scss" lang="scss" />
