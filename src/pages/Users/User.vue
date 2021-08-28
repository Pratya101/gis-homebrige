<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col cols="12" md="6">
        <h3>
          <v-icon>mdi-account-multiple-outline</v-icon>
          ผู้ใช้งาน
        </h3>
      </v-col>
      <v-col cols="12" md="6" class="d-md-flex justify-md-end">
        <v-btn
          color="primary"
          @click="addUser"
          outlined
          large
          class="set-font-kanit rounded-lg elevation-4"
          ><v-icon left>mdi-account-plus</v-icon> เพิ่มผู้ใช้งาน</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="pt-0 mt-0">
      <v-col cols="12">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาข้อมูล"
          background-color="#ffffff"
          class="elevation-3 rounded-lg"
          placeholder="Username, ชื่อ-นามสกุล เป็นต้น"
          outlined
          hide-details
        ></v-text-field
      ></v-col>

      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="userList"
          :search="search"
          class="material-table set-shadow"
          :mobile-breakpoint="0"
        >
        </v-data-table
      ></v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="set-font-kanit">
          <v-icon left>mdi-account-plus</v-icon> เพิ่มผู้ใช้งาน
        </v-card-title>
        <v-divider class="mb-2"></v-divider>
        <v-card-text>
          <v-text-field
            outlined
            class="rounded-lg rounded-lg"
            label="เลขบัตรประชาชน"
            placeholder="เลขบัตรประชาชน"
            v-model="idCard"
          >
          </v-text-field>
          <v-text-field
            outlined
            class="rounded-lg rounded-lg"
            label="ชื่อ-นามสกุล"
            placeholder="ชื่อ-นามสกุล"
            v-model="fullName"
          >
          </v-text-field>
          <v-text-field
            outlined
            class="rounded-lg rounded-lg"
            label="Username"
            placeholder="Username"
            v-model="username"
          >
          </v-text-field>
          <v-text-field
            outlined
            class="rounded-lg rounded-lg"
            label="Password"
            type="password"
            placeholder="Password"
            v-model="password"
          >
          </v-text-field>
          <v-text-field
            outlined
            class="rounded-lg rounded-lg"
            label="ยืนยัน Password"
            hide-details
            type="password"
            placeholder="ยืนยัน Password"
            v-model="confirmPassword"
          >
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            large
            color="primary"
            class="rounded-lg button-shadow elevation-3 set-font-kanit"
          >
            <v-icon left>fa-save</v-icon>
            บันทึก
          </v-btn>
          <v-btn
            large
            @click="cancel"
            color="error"
            outlined
            class="rounded-lg button-shadow elevation-3 set-font-kanit"
            ><v-icon left>fa-times</v-icon>
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import usersHeader from "./user-table-header";

export default {
  name: "Icons",
  data() {
    return {
      idCard: "",
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      headers: usersHeader,
      search: null,
      userList: [],
      dialog: false,
    };
  },

  methods: {
    cancel() {
      this.clearData();
      this.dialog = false;
    },
    clearData() {
      this.username = "";
      this.fullName = "";
      this.password = "";
      this.confirmPassword = "";
      this.idCard = "";
    },
    getUsers() {},
    addUser() {
      this.dialog = true;
      this.clearData();
    },
  },
};
</script>

<style src="./User.scss" lang="scss" />
