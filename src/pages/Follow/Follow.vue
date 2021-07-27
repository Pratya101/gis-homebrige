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
          รายการติดตามการพัฒนาที่อยู่อาศัย
        </h2>
      </v-col>
    </v-row>
    <v-row class="pt-0 mt-0">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาข้อมูล"
          class="set-shadow"
          placeholder="เลขบัตรประชาชน, ชื่อ-นามสกุล, ตำบล, อำเภอ, จังหวัด เป็นต้น"
          outlined
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
        >
          <template v-slot:[`item.form_id`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.form_fname`]="{ item }">
            {{ item.form_unit }} {{ item.form_fname }} {{ item.form_lname }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="primary" @click="map" style="cursor:pointer;"
              ><v-icon>mdi-map-marker-radius-outline</v-icon></v-btn
            >
            <v-btn
              icon
              color="primary"
              @click="detail(item.form_id)"
              style="cursor:pointer;"
              ><v-icon>mdi-information-outline</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import followTableHeader from "./follow-table-header.json";
import { apiService } from "@/services/axios";
import address_status from "@/data/address_status.json";
export default {
  name: "Icons",
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
