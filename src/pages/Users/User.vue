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
          <template v-slot:[`item.id`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.option`]="{ item }">
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  :disabled="item.role_id == 1"
                  color="error"
                  @click="resetPassword(item)"
                  style="cursor:pointer;"
                >
                  <v-icon>mdi-lock-reset</v-icon>
                </v-btn>
              </template>
              <span>แก้ไขรหัสผ่าน</span>
            </v-tooltip>

            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  :disabled="item.role_id == 1"
                  color="error"
                  @click="editUser(item)"
                  style="cursor:pointer;"
                >
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </template>
              <span>แก้ไข</span>
            </v-tooltip>
            <v-tooltip color="#212121" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  :disabled="item.role_id == 1"
                  color="error"
                  @click="confirmDeleteUser(item)"
                >
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </template>
              <span>ลบ</span>
            </v-tooltip>
          </template>
        </v-data-table></v-col
      >
    </v-row>
    <v-dialog v-model="dialogConfirmDelete" max-width="600">
      <v-card>
        <v-card-title class="set-font-kanit">
          <v-icon left>mdi-delete-outline</v-icon> ยืนยันการลบผู้ใช้งาน
        </v-card-title>
        <v-divider class="mb-2"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            large
            color="primary"
            class="rounded-lg button-shadow elevation-3 set-font-kanit"
            @click="deleteUser"
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
    <v-dialog v-model="dialogReset" max-width="600">
      <v-card>
        <v-card-title class="set-font-kanit">
          <v-icon left>mdi-lock-reset</v-icon> แก้ไขรหัสผ่าน
        </v-card-title>
        <v-divider class="mb-2"></v-divider>
        <v-card-text>
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
            type="password"
            hide-details
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
            @click="updatePassword"
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
    <v-dialog v-model="dialogEdit" max-width="600">
      <v-card>
        <v-card-title class="set-font-kanit">
          <v-icon left>mdi-account-plus</v-icon> แก้ไขผู้ใช้งาน
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
            label="ชื่อ"
            placeholder="ชื่อ"
            v-model="fName"
          >
          </v-text-field>
          <v-text-field
            outlined
            class="rounded-lg rounded-lg"
            label="นามสกุล"
            placeholder="นามสกุล"
            v-model="lName"
          >
          </v-text-field>
          <v-text-field
            outlined
            disabled
            class="rounded-lg rounded-lg"
            label="Username"
            placeholder="Username"
            v-model="username"
          >
          </v-text-field>
          <v-text-field
            outlined
            class="rounded-lg rounded-lg"
            label="เบอร์โทร"
            placeholder="เบอร์โทร"
            hide-details
            v-model="tel"
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
            @click="updateUser"
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
            label="ชื่อ"
            placeholder="ชื่อ"
            v-model="fName"
          >
          </v-text-field>
          <v-text-field
            outlined
            class="rounded-lg rounded-lg"
            label="นามสกุล"
            placeholder="นามสกุล"
            v-model="lName"
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
            type="password"
            placeholder="ยืนยัน Password"
            v-model="confirmPassword"
          >
          </v-text-field>
          <v-text-field
            outlined
            class="rounded-lg rounded-lg"
            label="เบอร์โทร"
            placeholder="เบอร์โทร"
            hide-details
            v-model="tel"
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
            @click="insertUser"
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
import { apiService } from "@/services/axios";
export default {
  name: "Icons",
  data() {
    return {
      idCard: "",
      fName: "",
      lName: "",
      username: "",
      password: "",
      tel: "",
      confirmPassword: "",
      headers: usersHeader,
      search: null,
      userList: [],
      dialog: false,
      dialogEdit: false,
      dialogReset: false,
      dialogConfirmDelete: false,
      userId: "",
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    resetPassword(item) {
      this.userId = item.user_id;
      this.dialogReset = true;
    },
    editUser(item) {
      this.userId = item.user_id;
      this.fName = item.user_fname;
      this.lName = item.user_lname;
      this.username = item.username;
      this.tel = item.user_tel;
      this.idCard = item.user_id_card;
      this.dialogEdit = true;
    },
    async updatePassword() {
      if (this.password !== this.confirmPassword) {
        this.$notify.error({
          title: "ผิดพลาด",
          message: "Password ไม่ตรงกัน",
        });
      } else {
        let body = {
          new_password: this.password,
        };
        let data = await apiService.put({
          path: "user/resetpassword",
          param: this.userId,
          body: body,
        });
        data.response
          ? this.$notify.success({
              title: "สำเร็จ",
              message: "แก้ไขรหัสผ่านเรียบร้อยแล้ว",
            })
          : this.$notify.error({
              title: "ผิดพลาด",
              message: data.message,
            });
        this.cancel();
        this.getUsers();
      }
    },
    async updateUser() {
      let body = {
        user_fname: this.fName,
        user_lname: this.lName,
        user_tel: this.tel,
        user_id_card: this.idCard,
      };
      let data = await apiService.put({
        path: "user",
        param: this.userId,
        body: body,
      });
      data.response
        ? this.$notify.success({
            title: "สำเร็จ",
            message: "เพิ่มผู้ใช้งานเรียบร้อยแล้ว",
          })
        : this.$notify.error({
            title: "ผิดพลาด",
            message: data.message,
          });
      this.cancel();
      this.getUsers();
    },
    cancel() {
      this.clearData();
      this.dialog = false;
      this.dialogEdit = false;
      this.dialogReset = false;
      this.dialogConfirmDelete = false;
    },
    clearData() {
      this.username = "";
      this.fullName = "";
      this.password = "";
      this.confirmPassword = "";
      this.idCard = "";
    },
    confirmDeleteUser(item) {
      this.userId = item.user_id;
      this.dialogConfirmDelete = true;
    },
    async deleteUser() {
      let data = await apiService.delete({
        path: "user",
        param: this.userId,
      });
      data.response
        ? this.$notify.success({
            title: "สำเร็จ",
            message: "ลบผู้ใช้งานเรียบร้อยแล้ว",
          })
        : this.$notify.error({
            title: "ผิดพลาด",
            message: data.message,
          });
      this.cancel();
      this.getUsers();
    },
    async insertUser() {
      if (this.password !== this.confirmPassword) {
        this.$notify.error({
          title: "ผิดพลาด",
          message: "Password ไม่ตรงกัน",
        });
      } else {
        let body = {
          user_fname: this.fName,
          user_lname: this.lName,
          user_tel: this.tel,
          username: this.username,
          password: this.password,
          user_id_card: this.idCard,
        };
        let data = await apiService.post({
          path: "user",
          body: body,
        });
        data.response
          ? this.$notify.success({
              title: "สำเร็จ",
              message: "เพิ่มผู้ใช้งานเรียบร้อยแล้ว",
            })
          : this.$notify.error({
              title: "ผิดพลาด",
              message: data.message,
            });
        this.cancel();
        this.getUsers();
      }
    },
    async getUsers() {
      let data = await apiService.get({
        path: "user/list",
      });
      this.userList = data.data;
    },
    addUser() {
      this.dialog = true;
      this.clearData();
    },
  },
};
</script>

<style src="./User.scss" lang="scss" />
