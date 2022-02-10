<template>
  <div>
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>
          <v-row class="no-gutters">
            <v-col cols="12" md="6">
              <h5>
                <v-icon class="pb-1">mdi-update</v-icon>
                อัพเดทความคืบหน้า
              </h5>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pt-0 mt-0 d-md-flex justify-md-end set-font-kanit"
            >
              <v-chip
                label
                :color="
                  houseData.rating_description == 'เตรียมข้อมูล'
                    ? 'error'
                    : houseData.rating_description == 'กำลังดำเนินการ'
                    ? 'warning'
                    : houseData.rating_description == 'สำเร็จ'
                    ? 'success'
                    : 'primary'
                "
                class="rounded-lg elevation-4"
              >
                {{ houseData.rating_description }}
              </v-chip>
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
            ref="upload"
            :auto-upload="false"
            :file-list="fileList"
            multiple
            :on-change="getImage"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              ลากและวางไฟล์หรือคลิก <em>เพื่ออัพโหลดรูปภาพ</em>
            </div>
          </el-upload>
          <label class="mt-5">รายละเอียด</label>
          <v-textarea v-model="details" solo rows="3"></v-textarea>
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
            @click="close()"
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
          <h5>
            <v-icon left color="error"
              >mdi-checkbox-marked-circle-outline</v-icon
            >
            ยืนยันการอัพเดทความคืนหน้า
          </h5>
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <v-card-text>
          <h4>
            เมื่อกดปุ่มยืนยัน ระบบจะทำเปลี่ยนสถานะความคืบหน้าจาก
            <strong>"{{ houseData.rating_description }}"</strong> เป็น
            <strong
              >"
              {{ houseData.progress_update }}
              "</strong
            >
            !
          </h4>
        </v-card-text>
        <v-divider class="mt-0 pt-0 "></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            @click="updateStatus"
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
      houseData: {},
      details: "",
      imageList: [],
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
        this.mapData(value);
      }
    },
  },

  methods: {
    close() {
      this.dialog = false;
      this.imageList = [];
    },
    updateStatusSuccess() {
      this.$notify.success({
        title: "อัพเดทสถานะสำเร็จ",
        message: "ทำการอัพเดทสถานะการคติตตามครัวเรือนเรียบร้อย",
      });
    },
    updateStatusFailed(message) {
      this.$notify.error({
        title: "ผิดพลาด",
        message: message,
      });
    },
    ...mapActions("house", ["updateStatusHouse"]),
    udpateStatue() {
      this.$refs.upload.clearFiles();
      this.updateStatusHouse(null);
    },
    mapData(data) {
      this.houseData = data;
      this.dialog = true;
    },
    getImage(file, filelist) {
      this.imageList = filelist;
    },
    async updateStatus() {
      let formdata = new FormData();
      this.imageList.forEach((element) => {
        formdata.append(`form_progress_image`, element.raw);
      });
      formdata.append("form_id", this.houseData.form_id);
      formdata.append("form_progress_detail", this.details);
      let data = await apiService.post({
        path: "formprogress",
        body: formdata,
      });
      data.code == 10000
        ? this.updateStatusSuccess()
        : this.updateStatusFailed(data.message);
      this.$emit("update", data);
      this.dialog = false;
      this.confirm = false;
      this.$refs.upload.clearFiles();
      this.details = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
