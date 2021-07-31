<template>
  <div>
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>
          <v-row class="no-gutters">
            <v-col cols="12" md="6">
              <h2>
                <v-icon
                  class="pb-1"
                  style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 30px;"
                  >mdi-update</v-icon
                >
                อัพเดทความคืบหน้า
              </h2>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pt-0 mt-0 d-md-flex justify-md-end set-font-kanit"
            >
              <v-chip label color="error" class="rounded-lg elevation-4">{{
                current_status
              }}</v-chip>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider class="mt-0"></v-divider>
        <v-card-text>
          <label align="center">รูปภาพ</label>
          <el-upload
            align="center"
            action="#"
            list-type="picture"
            drag
            :auto-upload="false"
            :file-list="fileList"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              ลากและวางไฟล์หรือคลิก <em>เพื่ออัพโหลดรูปภาพ</em>
            </div>
          </el-upload>
          <label class="mt-5">รายละเอียด</label>
          <v-textarea solo rows="3"></v-textarea>
        </v-card-text>
        <v-divider class="mt-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            @click="confirm = true"
            class="rounded-lg elevation-4 set-font-kanit"
            x-large
          >
            <v-icon left>fa-save</v-icon>อัพเดทความคืบหน้า
          </v-btn>
          <v-btn
            color="error"
            outlined
            class="rounded-lg elevation-4 set-font-kanit"
            x-large
          >
            <v-icon left>fa-close</v-icon>ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirm" max-width="550">
      <v-card>
        <v-card-title>
          <h3>
            <v-icon left color="error"
              >mdi-checkbox-marked-circle-outline</v-icon
            >
            ยืนยันการอัพเดทความคืนหน้า
          </h3>
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <v-card-text>
          <h4>
            เมื่อกดปุ่มยืนยัน ระบบจะทำเปลี่ยนสถานะความคืบหน้าจาก
            <strong>"เตรียมข้อมูล"</strong> เป็น
            <strong>"กำลังกำเนินการ"</strong> !
          </h4>
        </v-card-text>
        <v-divider class="mt-0 pt-0 "></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            class="rounded-lg elevation-4 set-font-kanit"
            x-large
          >
            <v-icon left>mdi-check-all</v-icon>ยืนยัน
          </v-btn>
          <v-btn
            color="error"
            outlined
            class="rounded-lg elevation-4 set-font-kanit"
            x-large
            @click="confirm = false"
          >
            <v-icon left>fa-close</v-icon>ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { apiService } from "@/services/axios";
export default {
  data() {
    return {
      fileList: [],
      confirm: false,
      dialog: false,
      form_id: "",
      current_status: "",
    };
  },
  computed: {
    ...mapState("house", ["statusUpdateHouse"]),
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.udpateStatue();
      }
    },
    statusUpdateHouse(value) {
      if (value) {
        this.getHouse(value);
      }
    },
  },

  methods: {
    ...mapActions("house", ["updateStatusHouse"]),
    udpateStatue() {
      this.updateStatusHouse(null);
    },
    async getHouse(id) {
      let data = await apiService.get({
        path: "mapprojectfrom",
        param: id,
      });
      console.log("data", data);
      this.dialog = true;
    },
    updateStatus() {
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
