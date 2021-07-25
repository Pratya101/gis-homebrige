<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6" class="px-0">
        <h2>
          <v-icon
            style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 30px;"
            >mdi-format-list-bulleted</v-icon
          >
          รายการบริหารโครงการ
        </h2>
      </v-col>
      <v-col cols="12" md="6" class="d-md-flex justify-md-end px-0">
        <v-btn
          color="success"
          @click="search"
          outlined
          large
          class="set-font-kanit rounded-lg elevation-4 me-2"
          ><v-icon left>fa-search</v-icon> ค้นหาข้อมูลโครงการ</v-btn
        >
        <v-btn
          color="primary"
          @click="$router.push('/fromservicemange')"
          outlined
          large
          class="set-font-kanit rounded-lg elevation-4"
          ><v-icon left>fa-plus</v-icon> เพิ่มโครงการ</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="pt-0 mt-0">
      <v-col cols="12 px-0">
        <v-simple-table class="material-table set-shadow">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left white--text">#</th>
                <th class="text-left white--text">ชื่อโครงการ</th>
                <th class="text-left white--text">ประเภทโครงการ</th>
                <th class="text-left white--text">เครือข่าย</th>
                <th class="text-left white--text">จังหวัด</th>
                <th class="text-left white--text">
                  ความคืบหน้า (%)
                </th>
                <th class="text-right white--text">งบประมาณที่ใช้</th>
                <th class="text-center white--text">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in projectList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.project_name }}</td>
                <td>{{ item.project_type_name }}</td>
                <td>{{ item.project_network_name }}</td>
                <td>{{ item.project_province }}</td>
                <td>
                  <v-progress-linear
                    v-model="skill"
                    class="elevation-3 rounded-lg"
                    color="warning"
                    height="25"
                  >
                    <template v-slot:default="{ value }">
                      <strong> {{ value }}% </strong>
                    </template>
                  </v-progress-linear>
                </td>
                <td class="text-right">
                  {{ item.project_budget | formatPrice }}
                </td>
                <td class="text-center">
                  <v-btn
                    icon
                    color="primary"
                    @click="detail(item.project_id)"
                    style="cursor:pointer;"
                    ><v-icon>mdi-information-outline</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="750">
      <v-card>
        <v-card-title>
          <h2>
            <v-icon
              style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 30px;"
              >fa-search</v-icon
            >
            ค้นหาข้อมูลโครงการ
          </h2>
        </v-card-title>
        <v-divider class="mt-0"></v-divider>
        <v-card-text>
          <v-row class="mt-2">
            <v-col cols="12" md="6">
              <label for="">ชื่อโครงการ</label>
              <v-text-field hide-details solo></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <label for="">เครือข่าย</label
              ><v-select hide-details :items="[]" solo></v-select
            ></v-col>
            <v-col cols="12" md="6"
              ><label for="">ภาค</label
              ><v-select hide-details :items="[]" solo></v-select
            ></v-col>
            <v-col cols="12" md="6">
              <label for="">จังหวัด</label>
              <v-select hide-details :items="[]" solo></v-select>
            </v-col>
            <v-col cols="12" md="6"
              ><label for="">อำเภอ</label>
              <v-select hide-details :items="[]" solo></v-select
            ></v-col>
            <v-col cols="12" md="6"
              ><label for="">ตำบล</label
              ><v-select hide-details :items="[]" solo></v-select
            ></v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mt-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            color="primary"
            class="set-font-kanit elevation-4 rounded-lg"
            outlined
          >
            <v-icon small left>fa-search</v-icon> ค้นหา</v-btn
          >
          <v-btn
            @click="dialog = false"
            x-large
            color="error"
            class="set-font-kanit elevation-4 rounded-lg"
            outlined
          >
            <v-icon small left>fa-close</v-icon>ปิด</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { apiService } from "@/services/axios";
export default {
  name: "Icons",
  data() {
    return {
      skill: 20,
      dialog: false,
      projectList: [],
    };
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    async getProjectList() {
      let data = await apiService.get({
        path: "project/list",
      });
      this.projectList = data.data;
    },
    map() {
      this.$router.push("/map");
    },
    detail(id) {
      this.$router.push({ path: "/detailservicemange", query: { id: id } });
    },
    search() {
      this.dialog = true;
    },
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style src="./ServiceManage.scss" lang="scss" />
