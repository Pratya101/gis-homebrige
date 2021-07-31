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
      <v-col cols="12" md="3">
        <label>ชื่อโครงการ</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="name"
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>ประเภทโครงการ</label>
        <v-select
          :items="projectTypeList"
          v-model.trim="projectType"
          hide-details
          item-text="project_type_name"
          item-value="project_type_id"
          :disabled="!statusEdit"
          solo
        >
          <template v-slot:append-outer>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  @click="(typeName = ''), (dialogAddType = true)"
                  style="color:blue;cursor:pointer"
                  >mdi-plus-box-multiple</v-icon
                >
              </template>
              <span class="set-font-kanit">เพิ่มประเภทโครงการ</span>
            </v-tooltip>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <label>เครือข่าย</label>
        <v-select
          item-text="project_network_name"
          item-value="project_network_id"
          v-model.trim="projectNetwork"
          :items="projectNetworkList"
          :disabled="!statusEdit"
          hide-details
          solo
        >
          <template v-slot:append-outer>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  @click="(networkName = ''), (dialogAddNetwork = true)"
                  style="color:blue;cursor:pointer"
                  >mdi-plus-box-multiple</v-icon
                >
              </template>
              <span class="set-font-kanit">เพิ่มเครือข่าย</span>
            </v-tooltip>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <label>จำนวนงบประมาณ (100%)</label>
        <v-text-field
          v-model.trim="budget"
          type="number"
          hide-details
          :disabled="!statusEdit"
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label>ตําบล/แขวง</label>
        <v-autocomplete
          v-model.trim="address"
          :items="locationList"
          hide-details
          item-text="SEARCH"
          :disabled="!statusEdit"
          return-object
          solo
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.SUB_DISTRICT_NAME }}
          </template>
        </v-autocomplete></v-col
      >
      <v-col cols="12" md="3">
        <label>อำเภอ/เขต</label>
        <v-autocomplete
          v-model.trim="address"
          :items="locationList"
          :disabled="!statusEdit"
          item-text="SEARCH"
          return-object
          hide-details
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
      <v-col cols="12" md="3">
        <label>จังหวัด</label>
        <v-autocomplete
          v-model.trim="address"
          :disabled="!statusEdit"
          hide-details
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
      <v-col cols="12" md="3">
        <label>รหัสไปรษณีย์</label>
        <v-autocomplete
          v-model.trim="address"
          :items="locationList"
          hide-details
          item-text="SEARCH"
          :disabled="!statusEdit"
          return-object
          solo
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.ZIPCODE }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="3">
        <label>ภาค</label>
        <v-autocomplete
          v-model.trim="address"
          :items="locationList"
          hide-details
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
      <v-col cols="12" md="3">
        <label>ผู้ประสานงาน</label>
        <v-text-field
          :disabled="!statusEdit"
          v-model.trim="coordinate"
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
          v-model.trim="dataAmountDistination"
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
            @click="updateProject"
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
          v-model="tab"
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
                    <th class="text-left white--text">จังหวัด</th>
                    <th class="text-left white--text">หมวดการพัฒนา</th>
                    <th class="text-left white--text">สถานะการพัฒนา</th>
                    <th class="text-center white--text">ระดับการสนับสนุน</th>
                    <th class="text-right white--text">งบประมาณสนับสนุน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in houseTypeNewCreate" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ item.form_unit }} {{ item.form_fname }}
                      {{ item.form_lname }}
                    </td>
                    <td>{{ item.form_province }}</td>
                    <td>{{ item.form_improvement }}</td>
                    <td>{{ item.rating_description }}</td>
                    <td class="text-center">
                      เฟส 1
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" icon color="primary">
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>แก้ไขระดับการสนับสนุน</span>
                      </v-tooltip>
                    </td>
                    <td class="text-right">
                      20,000
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" icon color="primary">
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>แก้ไขงบประมาณ</span>
                      </v-tooltip>
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
                    <th class="text-left white--text">จังหวัด</th>
                    <th class="text-left white--text">หมวดการพัฒนา</th>
                    <th class="text-left white--text">สถานะการพัฒนา</th>
                    <th class="text-center white--text">ระดับการสนับสนุน</th>
                    <th class="text-right white--text">งบประมาณสนับสนุน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in houseTypeUpdate" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ item.form_unit }} {{ item.form_fname }}
                      {{ item.form_lname }}
                    </td>

                    <td>{{ item.form_province }}</td>
                    <td>{{ item.form_improvement }}</td>
                    <td>{{ item.rating_description }}</td>
                    <td class="text-center">
                      เฟส 1
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" icon color="primary">
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>แก้ไขระดับการสนับสนุน</span>
                      </v-tooltip>
                    </td>
                    <td class="text-right">
                      20,000
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }"> 
                          <v-btn v-bind="attrs" v-on="on" icon color="primary">
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>แก้ไขงบประมาณ</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <v-dialog max-width="1000" v-model="dialog">
      <v-card>
        <v-card-title class="set-font-kanit mb-0 pb-0">
          <v-row clamp>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหาข้อมูล"
                class="set-shadow"
                placeholder="เลขบัตรประชาชน, ชื่อ-นามสกุล, ตำบล, อำเภอ, จังหวัด เป็นต้น"
                outlined
                dense
                hide-details
              ></v-text-field
            ></v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="search"
                hide-details
                class="set-shadow"
                :items="address_status_list"
                outlined
                dense
                placeholder="เลือกสภาพที่อยู่อาศัย"
                label="เลือกสภาพที่อยู่อาศัย"
              ></v-select
            ></v-col>
          </v-row>
        </v-card-title>
        <v-divider class="my-3"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <h5><v-icon>fa-list</v-icon> ข้อมูลครัวเรือน</h5>
              <v-data-table
                v-model="selected"
                show-select
                :search="search"
                item-key="form_id"
                item-value="form_id"
                :headers="[
                  {
                    text: 'ชื่อ-นามสกุล',
                    value: 'form_fname',
                  },
                  {
                    text: 'สภาพที่อยู่อาศัย',
                    value: 'form_living',
                  },
                ]"
                :items="houseList"
                :items-per-page="10"
                class="elevation-3"
              >
                <template v-slot:[`item.form_fname`]="{ item }">
                  {{ item.form_unit }} {{ item.form_fname }}
                  {{ item.form_lname }}
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="set-font-kanit rounded-lg elevation-4"
            x-large
            outlined
            @click="mapHouseProject"
            ><v-icon left>fa-save</v-icon>บันทึก</v-btn
          >
          <v-btn
            color="error"
            class="set-font-kanit rounded-lg elevation-4"
            x-large
            outlined
            @click="dialog = false"
            ><v-icon left>fa-times</v-icon>ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
            solo
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
          <h3>
            <v-icon left>mdi-plus-circle-outline</v-icon>เพิ่มประเภทโครงการ
          </h3>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <label>ชื่อประเภทโครงการ</label>
          <v-text-field
            hide-details
            solo
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
import address_status from "@/data/address_status.json";
export default {
  name: "Icons",
  data() {
    return {
      tab: "",
      search: "",
      address_status_list: [],
      locationList: location_new,
      typeName: "",
      dialogAddType: false,
      networkName: "",
      dialogAddNetwork: false,
      dialog: false,
      statusEdit: false,
      name: "",
      projectType: "",
      projectNetwork: "",
      coordinate: "",
      budget: "",
      tel: "",
      address: {},
      dataAmountDistination: "",
      project_id: "",
      projectTypeList: [],
      projectNetworkList: [],
      houseList: [],
      selected: [],
      houseTypeNewCreate: [],
      houseTypeUpdate: [],
    };
  },
  watch: {
    search(value) {
      value == "ทั้งหมด" ? (this.search = "") : value;
    },
    selected(value) {
      console.log("select : ", value);
    },
    tab(value) {
      this.getHosueInProject(value + 1);
    },
  },
  mounted() {
    this.project_id = this.$route.query.id;
    this.getProject();
    this.getProjectNetWorkList();
    this.getProjectTypeList();
    this.address_status_list = address_status.data;
    this.address_status_list.unshift("ทั้งหมด");
  },
  methods: {
    async mapHouseProject() {
      let house_list_id = [];
      this.selected.forEach((element) => {
        house_list_id.push(element.form_id);
      });
      let body = {
        map_project_form_type: this.tab + 1,
        project_id: this.project_id,
        form_id: house_list_id,
      };
      let data = await apiService.post({
        path: "mapprojectfrom",
        body: body,
      });
      if (data.response) {
        this.$notify.success({
          title: "เพิ่มข้อมูลสำเร็จ",
          message: "ทำการเพิ่มครัวเรือนลงในโครงการเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.selected = [];
      this.getHosueInProject();
      this.dialog = false;
    },
    async getHosueInProject(status) {
      this.houseTypeNewCreate = [];
      this.houseTypeUpdate = [];
      let data = await apiService.get({
        path: `mapprojectfrom/type/${status}`,
        param: this.project_id,
      });
      status == 1
        ? (this.houseTypeNewCreate = data.data)
        : (this.houseTypeUpdate = data.data);
    },
    async updateProject() {
      let body = {
        project_name: this.name,
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
      let data = await apiService.put({
        path: "project",
        param: this.project_id,
        body: body,
      });
      if (data.response) {
        this.$notify.success({
          title: "แก้ไขข้อมูลสำเร็จ",
          message: "ทำการแก้ไขข้อมูลโครงการเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.getProject();
      this.statusEdit = false;
    },
    async getProject() {
      let data = await apiService.get({
        path: "project",
        param: this.project_id,
      });
      this.mapData(data.data);
    },
    mapData(data) {
      this.name = data.project_name;
      this.projectType = data.project_type_id;
      this.projectNetwork = data.project_network_id;
      this.budget = data.project_budget;
      this.address = {
        DISTRICT_NAME: data.project_district,
        GEO_NAME: data.project_geo,
        PROVINCE_NAME: data.project_province,
        SEARCH: `${data.project_sub_district} > ${data.project_district} > ${data.project_province} > ${data.project_zipcode} > ${data.project_geo}`,
        SUB_DISTRICT_NAME: data.project_sub_district,
        ZIPCODE: data.project_zipcode,
      };
      this.coordinate = data.project_coordinator;
      this.tel = data.project_tel;
      this.dataAmountDistination = data.project_target;
    },
    addHouse() {
      this.getHouseList();
      this.dialog = true;
    },
    async getHouseList() {
      let data = await apiService.get({
        path: "form/notinproject ",
      });
      this.houseList = data.data;
    },
    detail() {},
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
  },
};
</script>

<style src="./DetailServiceManage.scss" lang="scss" />
