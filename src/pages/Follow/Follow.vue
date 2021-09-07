<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6">
        <h3>
          <v-icon>mdi-format-list-bulleted</v-icon>
          รายการติดตามการพัฒนาที่อยู่อาศัย
        </h3>
      </v-col>
    </v-row>
    <v-row class="pt-0 mt-0">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาข้อมูล"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          placeholder="เลขบัตรประชาชน, ชื่อ-นามสกุล, ตำบล, อำเภอ, จังหวัด เป็นต้น"
          outlined
          hide-details
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="search"
          hide-details
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          :items="address_status_list"
          outlined
          placeholder="เลือกสภาพที่อยู่อาศัย"
          label="เลือกสภาพที่อยู่อาศัย"
        ></v-select
      ></v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="followList"
          :search="search"
          class="material-table set-shadow"
          :mobile-breakpoint="0"
          disable-sort
        >
          <template v-slot:[`item.form_id`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.form_fname`]="{ item }">
            {{ item.form_unit }} {{ item.form_fname }} {{ item.form_lname }}
          </template>
          <template v-slot:[`item.rating_description`]="{ item }">
            <v-chip
              small
              label
              class="rounded-lg elevation-4"
              v-if="item.rating_description == 'ยังไม่ติดตาม'"
              color="greyTint"
              >{{ item.rating_description }}
            </v-chip>
            <v-chip
              small
              label
              class="rounded-lg elevation-4"
              v-else-if="item.rating_description == 'เตรียมข้อมูล'"
              color="error"
              >{{ item.rating_description }}
            </v-chip>
            <v-chip
              small
              label
              class="rounded-lg elevation-4"
              v-else-if="item.rating_description == 'กำลังดำเนินการ'"
              color="warning"
              >{{ item.rating_description }}
            </v-chip>
            <v-chip
              small
              label
              class="rounded-lg elevation-4"
              v-else
              color="success"
              >{{ item.rating_description }}
            </v-chip>
            
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  :disabled="item.rating_description == 'สำเร็จ'"
                  @click="updateStatus(item)"
                  color="primary"
                  style="cursor:pointer;"
                  ><v-icon>mdi-update</v-icon></v-btn
                >
              </template>
              <span>อัพเดทความคืบหน้า</span>
            </v-tooltip>
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="showDetail(item.map_project_form_id)"
                  color="primary"
                  style="cursor:pointer;"
                  ><v-icon>mdi-file</v-icon></v-btn
                >
              </template>
              <span>ข้อมูลการติดตาม</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <UpdateFllow v-on:update="getFollowList"></UpdateFllow>
    <DetailFollow></DetailFollow>
  </v-container>
</template>

<script>
import followTableHeader from "./follow-table-header.json";
import { apiService } from "@/services/axios";
import address_status from "@/data/address_status.json";
import UpdateFllow from "@/components/Follow/UpdateFllow";
import DetailFollow from "@/components/Follow/DetailFollow";
import { mapActions } from "vuex";
export default {
  name: "Follow",
  components: {
    UpdateFllow,
    DetailFollow,
  },
  data() {
    return {
      search: "",
      dialog: false,
      headers: followTableHeader,
      followList: [],
      address_status_list: [],
    };
  },
  mounted() {
    this.getFollowList();
    this.address_status_list = address_status.data;
    this.address_status_list.unshift("ทั้งหมด");
  },
  methods: {
    ...mapActions("house", ["updateStatusHouse", "updateFollowData"]),
    showDetail(data) {
      this.updateFollowData(data);
    },
    updateStatus(data) {
      this.updateStatusHouse(data);
    },
    async getFollowList() {
      let data = await apiService.get({
        path: "mapprojectfrom/list",
      });
      this.followList = data.data;
    },
    map() {
      this.$router.push("/map");
    },
    detail(id) {
      this.$router.push({
        name: "Detail",
        query: { id: id },
      });
    },
  },
};
</script>

<style src="./Follow.scss" lang="scss" />
