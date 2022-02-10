<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6">
        <h5>
          <v-icon>mdi-file-document-edit-outline</v-icon>
          แบบฟอร์มเพิ่มโครงการ
        </h5> </v-col
      ><v-col cols="12" md="6" class="d-md-flex justify-md-end rounded-lg">
        <v-btn
          @click="$router.push('/servicemanage')"
          outlined
          color="secondary"
        >
          <v-icon left small>mdi-undo</v-icon> ย้อนกลับ</v-btn
        >
      </v-col>
    </v-row>

    <v-row class="set-shadow mt-0">
      <v-col cols="12" md="6">
        <v-text-field
          label="ชื่อโครงการ"
          placeholder="ชื่อโครงการ"
          v-model.trim="projectName"
          hide-details
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          label="ประเภทโครงการ"
          placeholder="ประเภทโครงการ"
          :items="projectTypeList"
          v-model.trim="projectType"
          hide-details
          item-text="project_type_name"
          item-value="project_type_id"
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
        >
          <template v-slot:append>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  @click="(typeName = ''), (dialogAddType = true)"
                  style="color:blue;cursor:pointer"
                  >mdi-plus-circle-outline</v-icon
                >
              </template>
              <span class="set-font-kanit">เพิ่มประเภทโครงการ</span>
            </v-tooltip>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          label="เครือข่าย"
          placeholder="เครือข่าย"
          item-text="project_network_name"
          item-value="project_network_id"
          v-model.trim="projectNetwork"
          :items="projectNetworkList"
          hide-details
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
        >
          <template v-slot:append>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  @click="(networkName = ''), (dialogAddNetwork = true)"
                  style="color:blue;cursor:pointer"
                  >mdi-plus-circle-outline</v-icon
                >
              </template>
              <span class="set-font-kanit">เพิ่มเครือข่าย</span>
            </v-tooltip>
          </template>
        </v-select>
      </v-col>
      <!-- <v-col cols="12" md="6">
        <v-text-field
          label="จำนวนงบประมาณ (100%)"
          placeholder="จำนวนงบประมาณ (100%)"
          v-model.trim="budget"
          type="number"
          hide-details
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
        ></v-text-field> </v-col
      > -->
      <v-col cols="12" md="6">
        <v-autocomplete
          label="ตําบล/แขวง"
          placeholder="ตําบล/แขวง"
          v-model.trim="address"
          :items="locationList"
          hide-details
          item-text="SEARCH"
          return-object
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.SUB_DISTRICT_NAME }}
          </template>
        </v-autocomplete></v-col
      ><v-col cols="12" md="6">
        <v-autocomplete
          label="อำเภอ/เขต"
          placeholder="อำเภอ/เขต"
          v-model.trim="address"
          :items="locationList"
          hide-details
          item-text="SEARCH"
          return-object
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
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
          label="จังหวัด"
          placeholder="จังหวัด"
          v-model.trim="address"
          hide-details
          :items="locationList"
          item-text="SEARCH"
          return-object
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
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
          label="รหัสไปรษณีย์"
          placeholder="รหัสไปรษณีย์"
          hide-details
          v-model.trim="address"
          :items="locationList"
          item-text="SEARCH"
          return-object
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.ZIPCODE }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          label="ภาค"
          placeholder="ภาค"
          v-model.trim="address"
          hide-details
          :items="locationList"
          item-text="SEARCH"
          return-object
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
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
          label="ผู้ประสานงาน"
          placeholder="ผู้ประสานงาน"
          v-model.trim="coordinate"
          hide-details
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="เบอร์โทร"
          placeholder="เบอร์โทร"
          v-model.trim="tel"
          hide-details
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="ข้อมูลจำนวนเป้าหมาย"
          placeholder="ข้อมูลจำนวนเป้าหมาย"
          type="number"
          v-model.trim="dataAmountDistination"
          hide-details
          outlined
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="pt-0 text-right">
        <v-btn
          color="primary"
          x-large
          @click="addProject"
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
          @click="clearData"
        >
          <v-icon left>fa-close</v-icon>
          ล้างข้อมูล</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog v-model="dialogAddNetwork" max-width="550">
      <v-card>
        <v-card-title>
          <h3><v-icon left>mdi-plus-circle-outline</v-icon>เพิ่มเครือข่าย</h3>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <label>ชื่อเครือข่าย</label>
          <v-text-field
            hide-details
            outlined
            background-color="#ffffff"
            class="elevation-3 rounded-lg"
            v-model.trim="networkName"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            large
            @click="addNetwork"
            class="rounded-lg elevation-4 set-font-kanit"
          >
            บันทึก
          </v-btn>
          <v-btn
            large
            color="error"
            outlined
            @click="dialogAddNetwork = false"
            class="rounded-lg elevation-4 set-font-kanit"
          >
            ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAddType" max-width="550">
      <v-card>
        <v-card-title>
          <h5>
            <v-icon left>mdi-plus-circle-outline</v-icon>เพิ่มประเภทโครงการ
          </h5>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <label>ชื่อประเภทโครงการ</label>
          <v-text-field
            hide-details
            outlined
            background-color="#ffffff"
            class="elevation-3 rounded-lg"
            v-model.trim="typeName"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            large
            @click="addType"
            class="rounded-lg elevation-4 set-font-kanit"
          >
            บันทึก
          </v-btn>
          <v-btn
            large
            color="error"
            outlined
            @click="dialogAddType = false"
            class="rounded-lg elevation-4 set-font-kanit"
          >
            ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import location_new from "@/data/locations.json";
import { apiService } from "@/services/axios";
export default {
  name: "Icons",
  data() {
    return {
      typeName: "",
      dialogAddType: false,
      networkName: "",
      dialogAddNetwork: false,
      projectNetworkList: [],
      projectTypeList: [],
      locationList: location_new,
      projectName: "",
      projectType: "",
      projectNetwork: "",
      coordinate: "",
      tel: "",
      dataAmountDistination: "",
      address: {
        SUB_DISTRICT_NAME: "",
        DISTRICT_NAME: "",
        PROVINCE_NAME: "",
        ZIPCODE: "",
        GEO_NAME: "",
      },
      budget: "",
    };
  },
  mounted() {
    this.getProjectNetWorkList();
    this.getProjectTypeList();
  },

  methods: {
    clearData() {
      this.projectName = "";
      this.projectNetwork = "";
      this.projectType = "";
      this.coordinate = "";
      this.tel = "";
      this.dataAmountDistination = "";
      this.budget = "";
      this.address = {
        SUB_DISTRICT_NAME: "",
        DISTRICT_NAME: "",
        PROVINCE_NAME: "",
        ZIPCODE: "",
        GEO_NAME: "",
      };
    },
    async addNetwork() {
      let body = {
        project_network_name: this.networkName,
      };
      let data = await apiService.post({
        path: "projectnetwork",
        body: body,
      });
      if (data.response) {
        this.$notify.success({
          title: "เพิ่มข้อมูลสำเร็จ",
          message: "ทำการเพิ่มข้อมูลเครือข่ายเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.dialogAddNetwork = false;
      this.getProjectNetWorkList();
    },
    async addType() {
      let body = {
        project_type_name: this.typeName,
      };
      let data = await apiService.post({
        path: "projecttype",
        body: body,
      });
      if (data.response) {
        this.$notify.success({
          title: "เพิ่มข้อมูลสำเร็จ",
          message: "ทำการเพิ่มข้อมูลประเภทโครงการเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }

      this.dialogAddType = false;
      this.getProjectTypeList();
    },
    async getProjectTypeList() {
      let data = await apiService.get({
        path: "projecttype/list",
      });
      this.projectTypeList = data.data;
    },
    async getProjectNetWorkList() {
      let data = await apiService.get({
        path: "projectnetwork/list",
      });
      this.projectNetworkList = data.data;
    },
    async addProject() {
      let body = {
        project_name: this.projectName,
        project_network_id: this.projectNetwork,
        project_type_id: this.projectType,
        project_sub_district: this.address.SUB_DISTRICT_NAME,
        project_district: this.address.DISTRICT_NAME,
        project_province: this.address.PROVINCE_NAME,
        project_zipcode: this.address.ZIPCODE,
        project_geo: this.address.GEO_NAME,
        project_coordinator: this.coordinate,
        project_tel: this.tel,
        project_target: this.dataAmountDistination,
        project_budget: this.budget,
      };
      let data = await apiService.post({
        path: "project",
        body: body,
      });

      data.response
        ? this.addProjectSuccess()
        : this.addProjectFailed(data.message);
    },
    addProjectSuccess() {
      this.$notify.success({
        title: "เพิ่มข้อมูลสำเร็จ",
        message: "เพิ่มข้อมูลโครงการเรียบร้อย",
      });
      this.$router.push("/servicemanage");
    },
    addProjectFailed(message) {
      this.$notify.error({
        title: "ผิดพลาก",
        message: message,
      });
    },
  },
};
</script>

<style src="./FormServiceManage.scss" lang="scss" />
