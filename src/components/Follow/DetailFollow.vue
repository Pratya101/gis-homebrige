<template>
  <div>
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>
          <v-row class="no-gutters">
            <v-col cols="12" md="6">
              <h3>
                <v-icon class="pb-1">mdi-file</v-icon>
                ข้อมูลการติดตามการพัฒนา
              </h3>
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
          <v-list subheader three-line>
            <v-subheader>{{
              followStatusList.prepare.status_prepare
            }}</v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col
                    cols="6"
                    md="4"
                    v-for="(img, index) in followStatusList.prepare
                      .images_prepare"
                    :key="index"
                  >
                    <v-img
                      @click="previewImage(img)"
                      style="cursor:pointer"
                      class="rounded-lg elevation-4"
                      max-height="150"
                      max-width="250"
                      :src="img"
                    ></v-img>
                  </v-col>
                </v-row>
                <p class="mt-3 ml-2">
                  <strong>รายละเอียด : </strong>
                  {{ followStatusList.prepare.detail_prepare }}
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-divider> </v-divider>
            <v-subheader>{{
              followStatusList.progress.status_progress
            }}</v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col
                    cols="6"
                    md="4"
                    v-for="(img, index) in followStatusList.progress
                      .images_progress"
                    :key="index"
                  >
                    <v-img
                      @click="previewImage(img)"
                      style="cursor:pointer"
                      class="rounded-lg elevation-4"
                      max-height="150"
                      max-width="250"
                      :src="img"
                    ></v-img>
                  </v-col>
                </v-row>
                <p class="mt-3 ml-2">
                  <strong>รายละเอียด : </strong>
                  {{ followStatusList.progress.detail_progress }}
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-divider> </v-divider>
            <v-subheader>{{
              followStatusList.success.status_success
            }}</v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col
                    cols="6"
                    md="4"
                    v-for="(img, index) in followStatusList.success
                      .images_success"
                    :key="index"
                  >
                    <v-img
                      @click="previewImage(img)"
                      style="cursor:pointer"
                      class="rounded-lg elevation-4"
                      max-height="150"
                      max-width="250"
                      :src="img"
                    ></v-img>
                  </v-col>
                </v-row>
                <p class="mt-3 ml-2">
                  <strong>รายละเอียด : </strong>
                  {{ followStatusList.success.detail_success }}
                </p>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
    <v-dialog v-model="showImage" max-width="750">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-img :src="imageUrl" max-height="550" max-width="720"> </v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            class="rouded-lg elevation-3"
            outlined
            @click="showImage = false"
            >ปิด</v-btn
          >
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
      showImage: false,
      fileList: [],
      dialog: false,
      data: {},
      imageList: [],
      followStatusList: null,
      imageUrl: "",
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
    previewImage(url) {
      this.imageUrl = url;
      this.showImage = true;
    },
    async getFollowDetail(id) {
      let data = await apiService.get({
        path: "mapprojectfrom",
        param: id,
      });
      this.data = data.data;
      this.followStatusList = data.data.data_progress;
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
