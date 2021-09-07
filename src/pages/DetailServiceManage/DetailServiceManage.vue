<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="4" class="px-0  pb-0">
        <h3 class="pt-1">
          <v-icon>mdi-file-document-edit-outline</v-icon>
          แบบฟอร์มเพิ่มโครงการ
        </h3>
      </v-col>
      <v-col cols="12" md="8" class="d-md-flex justify-md-end px-0 mt-0 pt-0">
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
          @click="(statusEdit = !statusEdit), getProject()"
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
        <v-text-field
          placeholder="ชื่อโครงการ"
          label="ชื่อโครงการ"
          :disabled="!statusEdit"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          v-model.trim="name"
          hide-details
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          placeholder="ประเภทโครงการ"
          label="ประเภทโครงการ"
          :items="projectTypeList"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          v-model.trim="projectType"
          hide-details
          item-text="project_type_name"
          item-value="project_type_id"
          :disabled="!statusEdit"
          outlined
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
      <v-col cols="12" md="4">
        <v-select
          label="เครือข่าย"
          placeholder="เครือข่าย"
          item-text="project_network_name"
          item-value="project_network_id"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          v-model.trim="projectNetwork"
          :items="projectNetworkList"
          :disabled="!statusEdit"
          hide-details
          outlined
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

      <v-col cols="12" md="4">
        <v-autocomplete
          placeholder="ตําบล/แขวง"
          label="ตําบล/แขวง"
          v-model.trim="address"
          :items="locationList"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          hide-details
          item-text="SEARCH"
          :disabled="!statusEdit"
          return-object
          outlined
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.SUB_DISTRICT_NAME }}
          </template>
        </v-autocomplete></v-col
      >
      <v-col cols="12" md="4">
        <v-autocomplete
          label="อำเภอ/เขต"
          placeholder="อำเภอ/เขต"
          v-model.trim="address"
          :items="locationList"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          :disabled="!statusEdit"
          item-text="SEARCH"
          return-object
          hide-details
          outlined
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
        <v-autocomplete
          placeholder="จังหวัด"
          label="จังหวัด"
          v-model.trim="address"
          :disabled="!statusEdit"
          hide-details
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          :items="locationList"
          item-text="SEARCH"
          return-object
          outlined
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
        <v-autocomplete
          placeholder="รหัสไปรษณีย์"
          label="รหัสไปรษณีย์"
          v-model.trim="address"
          :items="locationList"
          hide-details
          item-text="SEARCH"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          :disabled="!statusEdit"
          return-object
          outlined
        >
          <template v-slot:item="{ item }">
            {{ item.SEARCH }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.ZIPCODE }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4">
        <v-autocomplete
          placeholder="ภาค"
          label="ภาค"
          v-model.trim="address"
          :items="locationList"
          hide-details
          item-text="SEARCH"
          :disabled="!statusEdit"
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
      <v-col cols="12" md="4">
        <v-text-field
          placeholder="ผู้ประสานงาน"
          label="ผู้ประสานงาน"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          :disabled="!statusEdit"
          v-model.trim="coordinate"
          hide-details
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          placeholder="เบอร์โทร"
          label="เบอร์โทร"
          :disabled="!statusEdit"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          v-model.trim="tel"
          hide-details
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4"></v-col>
      <v-col cols="12" md="4" class="text-right ">
        <v-fade-transition>
          <v-btn
            color="primary"
            x-large
            v-show="statusEdit"
            background-color="#ffffff"
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
      <v-col cols="12" md="7" class="d-md-flex">
        <h3 class="pt-1 me-2">
          <v-icon>mdi-view-list-outline</v-icon>
          ข้อมูลการพัฒนาที่อยู่อาศัย
        </h3>
        <span>
          <v-text-field
            v-model.trim="dataAmountDistination"
            hide-details
            dense
            class="rounded-lg"
            background-color="#ffffff"
            style="width:300px"
            type="number"
            outlined
            label="ข้อมูลจำนวนเป้าหมาย"
            placeholder="ข้อมูลจำนวนเป้าหมาย"
          >
            <template v-slot:append-outer>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    @click="updateProject"
                    v-bind="attrs"
                    v-on="on"
                    :disabled="oldHouseAmount == dataAmountDistination"
                    style="color:blue;cursor:pointer"
                    >fa-save</v-icon
                  >
                </template>
                <span class="set-font-kanit">บันทึก</span>
              </v-tooltip>
            </template>
          </v-text-field></span
        >
      </v-col>
      <v-col cols="12" md="5" class="d-md-flex justify-md-end px-0">
        <v-btn
          @click="dialogOtherValue = true"
          color="success"
          class="rounded-lg elevation-3 me-2"
          large
          outlined
        >
          <v-icon left>fa-plus</v-icon>ค่าสาธารณูปโภค
        </v-btn>
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
                    <th class="text-center white--text">
                      ระดับการสนับสนุน
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="updatePhaseList"
                            v-bind="attrs"
                            v-on="on"
                            icon
                            color="primary"
                          >
                            <v-icon class="white--text"
                              >mdi-order-bool-ascending-variant</v-icon
                            >
                          </v-btn>
                        </template>
                        <span>เลือกหลายครัวเรือน</span>
                      </v-tooltip>
                    </th>
                    <th class="text-right white--text">
                      งบประมาณสนับสนุน
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="editCost"
                            v-bind="attrs"
                            v-on="on"
                            icon
                            color="primary"
                          >
                            <v-icon class="white--text"
                              >mdi-order-bool-ascending-variant</v-icon
                            >
                          </v-btn>
                        </template>
                        <span>เลือกหลายครัวเรือน</span>
                      </v-tooltip>
                    </th>
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
                    <td class="text-center" style="width:200px">
                      {{ item.phase_name }}
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="
                              editSinglePhase(
                                item.phase_id,
                                item.map_project_form_id
                              )
                            "
                            v-bind="attrs"
                            v-on="on"
                            icon
                            color="primary"
                          >
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>แก้ไขระดับการสนับสนุน</span>
                      </v-tooltip>
                    </td>
                    <td class="text-right">
                      {{ item.map_project_form_budget_support }}
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="
                              editUpdateSignleCost(
                                item.map_project_form_id,
                                item.map_project_form_budget_support
                              )
                            "
                            v-bind="attrs"
                            v-on="on"
                            icon
                            color="primary"
                          >
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
                    <th class="text-center white--text">
                      ระดับการสนับสนุน
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="updatePhaseList"
                            v-bind="attrs"
                            v-on="on"
                            icon
                            color="primary"
                          >
                            <v-icon class="white--text"
                              >mdi-order-bool-ascending-variant</v-icon
                            >
                          </v-btn>
                        </template>
                        <span>เลือกหลายครัวเรือน</span>
                      </v-tooltip>
                    </th>
                    <th class="text-right white--text">
                      งบประมาณสนับสนุน
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="editCost"
                            v-bind="attrs"
                            v-on="on"
                            icon
                            color="primary"
                          >
                            <v-icon class="white--text"
                              >mdi-order-bool-ascending-variant</v-icon
                            >
                          </v-btn>
                        </template>
                        <span>เลือกหลายครัวเรือน</span>
                      </v-tooltip>
                    </th>
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
                    <td class="text-center" style="width:200px">
                      {{ item.phase_name }}
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="
                              editSinglePhase(
                                item.phase_id,
                                item.map_project_form_id
                              )
                            "
                            v-bind="attrs"
                            v-on="on"
                            icon
                            color="primary"
                          >
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>แก้ไขระดับการสนับสนุน</span>
                      </v-tooltip>
                    </td>
                    <td class="text-right">
                      {{ item.map_project_form_budget_support }}
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="
                              editUpdateSignleCost(
                                item.map_project_form_id,
                                item.map_project_form_budget_support
                              )
                            "
                            v-bind="attrs"
                            v-on="on"
                            icon
                            color="primary"
                          >
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
    <v-dialog max-width="1000" v-model="dialogOtherValue">
      <v-card>
        <v-card-title class="set-font-kanit mb-0 pb-0">
          ค่าสาธารณูปโภค
        </v-card-title>
        <v-divider class="my-3"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="จำนวนงบประมาณ (100%)"
                placeholder="จำนวนงบประมาณ (100%)"
                v-model.trim="budget"
                type="number"
                class="rounded-lg elevation-3"
                hide-details
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="rounded-lg elevation-3"
                label="ไฟฟ้า"
                placeholder="ไฟฟ้า"
                v-model.trim="electricity"
                type="number"
                hide-details
                outlined
              ></v-text-field> </v-col
            ><v-col cols="12" md="6">
              <v-text-field
                label="ประปา"
                placeholder="ประปา"
                v-model.trim="water"
                class="rounded-lg elevation-3"
                type="number"
                hide-details
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="สาธารณูปโภค"
                placeholder="สาธารณูปโภค"
                v-model.trim="utility"
                type="number"
                hide-details
                class="rounded-lg elevation-3"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="อื่นๆ"
                class="rounded-lg elevation-3"
                placeholder="อื่นๆ"
                v-model.trim="other"
                type="number"
                hide-details
                outlined
              ></v-text-field>
            </v-col> </v-row
        ></v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="set-font-kanit rounded-lg elevation-4"
            x-large
            @click="updateProject"
            outlined
            ><v-icon left>fa-save</v-icon>บันทึก</v-btn
          >
          <v-btn
            color="error"
            @click="dialogOtherValue = false"
            class="set-font-kanit rounded-lg elevation-4"
            x-large
            outlined
            ><v-icon left>fa-times</v-icon>ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="1000" v-model="dialog">
      <v-card>
        <v-card-title class="set-font-kanit mb-0 pb-0">
          <v-row clamp>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="ค้นหาข้อมูล"
                class="rounded-lg elevation-3"
                background-color="#ffffff"
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
                class="rounded-lg elevation-3"
                background-color="#ffffff"
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
                  {
                    text: 'ที่อยู่',
                    value: 'form_home_id',
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
                <template v-slot:[`item.form_home_id`]="{ item }">
                  {{ item.form_home_id }} {{ item.form_sub_district }}
                  {{ item.form_district }} {{ item.form_province }}
                  {{ item.form_zipcode }}
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
    <v-dialog max-width="1000" v-model="dialogEditPhase">
      <v-card>
        <v-card-title class="set-font-kanit mb-0 pb-0">
          <v-row clamp>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="ค้นหาข้อมูล"
                class="rounded-lg elevation-1"
                background-color="#ffffff"
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
                class="rounded-lg elevation-1"
                background-color="#ffffff"
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
            <v-col cols="12" class="">
              <v-row>
                <v-col cols="12" lg="6">
                  <h5 class="pt-2"><v-icon>fa-list</v-icon> ข้อมูลครัวเรือน</h5>
                </v-col>
                <v-col
                  cols="12"
                  lg="6"
                  class="d-md-flex justify-content-between"
                  ><v-select
                    outlined
                    dense
                    :items="phaseList"
                    label="เลือกเฟส"
                    class="set-font-kanit"
                    placeholder="เลือกเฟส"
                    hide-details
                    style="width:100px"
                    v-model="phaseSelect"
                    item-value="phase_id"
                    item-text="phase_name"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="pt-0 mt-0">
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
                  {
                    text: 'ที่อยู่',
                    value: 'form_home_id',
                  },
                  {
                    text: 'ระดับการสบันสนุน',
                    value: 'phase_name',
                    align: 'center',
                  },
                  {
                    text: 'งบประมาณสนับสนุน',
                    value: 'map_project_form_budget_support',
                    align: 'end',
                  },
                ]"
                :items="statusHouse == 1 ? houseTypeNewCreate : houseTypeUpdate"
                :items-per-page="10"
                class="elevation-3"
              >
                <template v-slot:[`item.form_fname`]="{ item }">
                  {{ item.form_unit }} {{ item.form_fname }}
                  {{ item.form_lname }}
                </template>
                <template v-slot:[`item.form_home_id`]="{ item }">
                  {{ item.form_home_id }} {{ item.form_sub_district }}
                  {{ item.form_district }} {{ item.form_province }}
                  {{ item.form_zipcode }}
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
            :disabled="selected.length == 0"
            @click="updatePhase"
            ><v-icon left>fa-save</v-icon>บันทึก</v-btn
          >
          <v-btn
            color="error"
            class="set-font-kanit rounded-lg elevation-4"
            x-large
            outlined
            @click="dialogEditPhase = false"
            ><v-icon left>fa-times</v-icon>ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="1000" v-model="dialogEditCost">
      <v-card>
        <v-card-title class="set-font-kanit mb-0 pb-0">
          <v-row clamp>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="ค้นหาข้อมูล"
                class="rounded-lg elevation-1"
                background-color="#ffffff"
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
                class="rounded-lg elevation-1"
                background-color="#ffffff"
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
            <v-col cols="12" class="">
              <v-row>
                <v-col cols="12" lg="6">
                  <h5 class="pt-2"><v-icon>fa-list</v-icon> ข้อมูลครัวเรือน</h5>
                </v-col>
                <v-col
                  cols="12"
                  lg="6"
                  class="d-md-flex justify-content-between"
                >
                  <v-text-field
                    outlined
                    class="rounded-lg"
                    label="งบประมาณสนับสนุน"
                    dense
                    type="number"
                    hide-details
                    placeholder="งบประมาณสนับสนุน"
                    v-model="costAmount"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="pt-0 mt-0">
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
                  {
                    text: 'ที่อยู่',
                    value: 'form_home_id',
                  },
                  {
                    text: 'ระดับการสบันสนุน',
                    value: 'phase_name',
                    align: 'center',
                  },
                  {
                    text: 'งบประมาณสนับสนุน',
                    value: 'map_project_form_budget_support',
                    align: 'end',
                  },
                ]"
                :items="statusHouse == 1 ? houseTypeNewCreate : houseTypeUpdate"
                :items-per-page="10"
                class="elevation-3"
              >
                <template v-slot:[`item.form_fname`]="{ item }">
                  {{ item.form_unit }} {{ item.form_fname }}
                  {{ item.form_lname }}
                </template>
                <template v-slot:[`item.form_home_id`]="{ item }">
                  {{ item.form_home_id }} {{ item.form_sub_district }}
                  {{ item.form_district }} {{ item.form_province }}
                  {{ item.form_zipcode }}
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
            :disabled="selected.length == 0"
            @click="updateCost"
            ><v-icon left>fa-save</v-icon>บันทึก</v-btn
          >
          <v-btn
            color="error"
            class="set-font-kanit rounded-lg elevation-4"
            x-large
            outlined
            @click="dialogEditCost = false"
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
            outlined
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
            outlined
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
    <v-dialog v-model="dialogUpdateSignlePhase" max-width="500">
      <v-card>
        <v-card-title class="set-font-kanit">
          <v-icon left>mdi-pencil-outline</v-icon> แก้ไขเฟส</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text>
          <v-select
            outlined
            label="เลือกเฟส"
            placeholder="เลือกเฟส"
            :items="phaseList"
            class="mt-2 rounded-lg set-font-kanit"
            dense
            hide-details
            v-model="phaseSelect"
            item-value="phase_id"
            item-text="phase_name"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="rounded-lg elevation-3 set-font-kanit"
            color="primary"
            @click="updateSignlePhase"
            outlined
            >บักทึก</v-btn
          >
          <v-btn
            class="rounded-lg elevation-3 set-font-kanit"
            color="error"
            outlined
            @click="dialogUpdateSignlePhase = false"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogUpdateSignleCost" max-width="500">
      <v-card>
        <v-card-title class="set-font-kanit">
          <v-icon left>mdi-pencil-outline</v-icon>แก้ไขงบประมาณ</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            outlined
            class="mt-5 rounded-lg elevation-3"
            label="งบประมาณสนับสนุน"
            dense
            type="number"
            hide-details
            placeholder="งบประมาณสนับสนุน"
            v-model="costAmount"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="rounded-lg elevation-3 set-font-kanit"
            color="primary"
            @click="updateSingleCost"
            outlined
            >บักทึก</v-btn
          >
          <v-btn
            class="rounded-lg elevation-3 set-font-kanit"
            color="error"
            outlined
            @click="dialogUpdateSignleCost = false"
            >ยกเลิก</v-btn
          >
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
  name: "DetailServiceManager",
  data() {
    return {
      statusEditPhase: false,
      dialogEditPhase: false,
      dialogOtherValue: false,
      editAmount: false,
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
      water: 0,
      electricity: 0,
      utility: 0,
      other: 0,
      oldHouseAmount: "",
      phaseList: [],
      phaseSelect: 1,
      statusHouse: 1,
      dataPhaseUpdate: [],
      dialogUpdateSignlePhase: false,
      dialogUpdateSignleCost: false,
      dialogEditCost: false,
      costAmount: "",
      statusGetHouse: 1,
    };
  },
  watch: {
    search(value) {
      value == "ทั้งหมด" ? (this.search = "") : value;
    },
    tab(value) {
      this.getHosueInProject(value + 1);
      this.statusGetHouse = value + 1;
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
    async updateCost() {
      let house_list_id = [];
      this.selected.forEach((element) => {
        house_list_id.push(element.map_project_form_id);
      });
      let body = {
        map_project_form_arr_id: house_list_id,
        map_project_form_budget_support: this.costAmount,
      };
      let data = await apiService.put({
        path: "mapprojectfrom/budgetsuppor",
        body: body,
      });
      if (data.response) {
        this.$notify.success({
          title: "แก้ไขข้อมูลสำเร็จ",
          message: "ทำการแก้ไขข้อมูลงบประมาณเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.dialogEditCost = false;
      this.getHosueInProject(this.statusGetHouse);
    },
    editCost() {
      this.dialogEditCost = true;
      this.costAmount = 0;
      this.selected = [];
    },
    async updateSingleCost() {
      let body = {
        map_project_form_arr_id: this.dataPhaseUpdate,
        map_project_form_budget_support: +this.costAmount,
      };
      let data = await apiService.put({
        path: "mapprojectfrom/budgetsuppor",
        body: body,
      });
      if (data.response) {
        this.$notify.success({
          title: "แก้ไขข้อมูลสำเร็จ",
          message: "ทำการแก้ไขข้อมูลงบประมาณเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.dialogUpdateSignleCost = false;
      this.getHosueInProject(this.statusGetHouse);
    },
    editUpdateSignleCost(id, cost) {
      this.dataPhaseUpdate.push(id);
      this.costAmount = cost;
      this.dialogUpdateSignleCost = true;
    },
    async updateSignlePhase() {
      let body = {
        map_project_form_arr_id: this.dataPhaseUpdate,
        phase_id: this.phaseSelect,
      };
      let data = await apiService.put({
        path: "phase/update",
        body: body,
      });
      if (data.response) {
        this.$notify.success({
          title: "แก้ไขข้อมูลสำเร็จ",
          message: "ทำการแก้ไขข้อมูลเฟสเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.dialogUpdateSignlePhase = false;
      this.getHosueInProject(this.statusGetHouse);
    },
    async editSinglePhase(phase, id) {
      this.dataPhaseUpdate = [];
      this.dataPhaseUpdate.push(id);
      this.getPhase();
      this.phaseSelect = phase;
      this.dialogUpdateSignlePhase = true;
    },
    async getPhase() {
      let data = await apiService.get({
        path: "phase/list",
      });
      this.phaseList = data.data;
    },
    async updatePhase() {
      let house_list_id = [];
      this.selected.forEach((element) => {
        house_list_id.push(element.map_project_form_id);
      });
      let body = {
        map_project_form_arr_id: house_list_id,
        phase_id: this.phaseSelect,
      };
      let data = await apiService.put({
        path: "phase/update",
        body: body,
      });
      if (data.response) {
        this.$notify.success({
          title: "แก้ไขข้อมูลสำเร็จ",
          message: "ทำการแก้ไขข้อมูลเฟสเรียบร้อย",
        });
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: data.message,
        });
      }
      this.dialogEditPhase = false;
      this.getHosueInProject(this.statusGetHouse);
    },
    async mapHouseProject() {
      let house_list_id = [];
      if (+this.dataAmountDistination > +this.oldHouseAmount) {
        this.$notify.warning({
          title: "ผิดพลาด",
          message: "จำนวนบ้านมากกว่าจำนวนกลุ่มเป้าหมาย",
        });
      } else {
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
        this.getHosueInProject(this.tab + 1);
        this.dialog = false;
      }
    },
    async getHosueInProject(status) {
      this.statusHouse = status;
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
        project_electricity: this.electricity,
        project_water: this.water,
        project_other: this.other,
        project_utility: this.utility,
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
      this.dialogOtherValue = false;
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
      this.oldHouseAmount = data.project_target;
      this.water = data.project_water;
      this.other = data.project_other;
      this.electricity = data.project_electricity;
      this.utility = data.project_utility;
    },
    addHouse() {
      this.getHouseList();
      this.selected = [];
      this.dialog = true;
    },
    updatePhaseList() {
      this.getHouses();
      this.getPhase();
      this.dialogEditPhase = true;
      this.phaseSelect = 1;
      this.selected = [];
    },
    async getHouses() {
      let data = await apiService.get({
        path: "form/list",
      });
      this.houseList = data.data;
    },
    async getHouseList() {
      let data = await apiService.get({
        path: "form/notinproject ",
      });
      this.houseList = data.data;
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
  },
};
</script>

<style src="./DetailServiceManage.scss" lang="scss" />
