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
                  >mdi-file</v-icon
                >
                ข้อมูลการติดตามการพัฒนา
              </h2>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pt-0 mt-0 d-md-flex justify-md-end set-font-kanit"
            >
              <!-- <v-chip
                label
                :color="
                  followData.rating_description == 'กำลังดำเนินการ'
                    ? 'warning'
                    : 'success'
                "
                class="rounded-lg elevation-4"
              >
                {{ followData.rating_description }}
              </v-chip> -->
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider class="mt-0"></v-divider>
        <v-card-text v-if="followStatusList">
          <h3>{{ followStatusList.prepare.status_prepare }}</h3>
          <v-row>
            <v-col
              cols="6"
              md="5"
              v-for="(img, index) in followStatusList.prepare.images_prepare"
              :key="index"
            >
              {{ img }}
            </v-col>
          </v-row>
          <h3>{{ followStatusList.progress.status_progress }}</h3>
          <v-row>
            <v-col
              cols="6"
              md="5"
              v-for="(img, index) in followStatusList.progress.images_progress"
              :key="index"
            >
              {{ img }}
            </v-col>
          </v-row>
          <h3>{{ followStatusList.success.status_success }}</h3>
          <v-row>
            <v-col
              cols="6"
              md="5"
              v-for="(img, index) in followStatusList.success.images_success"
              :key="index"
            >
              {{ img }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mt-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            outlined
            @click="dialog = false"
            class="rounded-lg elevation-4 set-font-kanit"
            x-large
          >
            <v-icon left>fa-close</v-icon>ปิด
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
      dialog: false,
      data: {},
      imageList: [],
      followStatusList: null,
    };
  },
  computed: {
    ...mapState("house", ["followData"]),
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.udpateStatue();
      }
    },
    followData(id) {
      if (id) {
        this.mapData(id);
      }
    },
  },

  methods: {
    async getFollowDetail(id) {
      let data = await apiService.get({
        path: "mapprojectfrom",
        param: id,
      });
      this.data = data.data;
      this.followStatusList = data.data.data_progress;
      console.log("data", this.data);
    },
    ...mapActions("house", ["updateFollowData"]),
    udpateStatue() {
      this.updateFollowData(null);
    },
    mapData(id) {
      this.getFollowDetail(id);
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
