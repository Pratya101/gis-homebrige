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
          รายการข้อมูลครัวเรื่อน
        </h2>
      </v-col>
      <v-col cols="12" md="6" class="d-md-flex justify-md-end px-0">
        <v-btn
          color="success"
          @click="search"
          outlined
          large
          class="set-font-kanit rounded-lg elevation-4 me-2"
          ><v-icon left>mdi-magnify</v-icon> ค้นหาข้อมูลครัวเรือน</v-btn
        >
        <v-btn
          color="primary"
          @click="$router.push('/formcheck')"
          outlined
          large
          class="set-font-kanit rounded-lg elevation-4"
          ><v-icon left>mdi-file-document-edit-outline</v-icon>
          สํารวจข้อมูลทที่อยู่อาศัย</v-btn
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
                <th class="text-left white--text">ชื่อ-สนามสกุล</th>
                <th class="text-left white--text">สภาพที่อยู่อาศัย</th>
                <th class="text-left white--text">ภาค</th>
                <th class="text-left white--text">จังหวัด</th>
                <th class="text-left white--text">อำเภอ</th>
                <th class="text-left white--text">ตำบล</th>
                <th class="text-center white--text">ตำแหน่งที่อยู่</th>
                <th class="text-center white--text">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Pratya Phocha</td>
                <td>พอใช้</td>
                <td>ตะวันออกเฉียงเหนือ</td>
                <td>ร้อยเอ็ด</td>
                <td>จตุรพักตรพิมาน</td>
                <td>ศรีโคตร</td>
                <td class="text-center">
                  <v-btn
                    icon
                    color="primary"
                    @click="map"
                    style="cursor:pointer;"
                    ><v-icon>mdi-map-marker-radius-outline</v-icon></v-btn
                  >
                </td>
                <td class="text-center">
                  <v-btn
                    icon
                    color="primary"
                    @click="detail"
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
            ค้นหาข้อมูลครัวเรือน
          </h2>
        </v-card-title>
        <v-divider class="mt-0"></v-divider>
        <v-card-text>
          <v-row class="mt-2">
            <v-col cols="12" md="6">
              <label for="">ชื่อ-นามสกุล</label>
              <v-text-field hide-details solo></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <label for="">สภาพที่อยู่อาศัย</label
              ><v-text-field hide-details solo></v-text-field
            ></v-col>
            <v-col cols="12" md="6"
              ><label for="">ภาค</label
              ><v-select hide-details :items="[]" solo></v-select
            ></v-col>
            <v-col cols="12" md="6">
              <label for="">อำเภอ</label>
              <v-select hide-details :items="[]" solo></v-select>
            </v-col>
            <v-col cols="12" md="6"
              ><label for="">จังหวัด</label>
              <v-select
                hide-details
                :items="[]"
                label="Solo field"
                solo
              ></v-select
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
export default {
  name: "Icons",
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    map() {
      this.$router.push("/map");
    },
    detail() {
      this.$router.push("/detail");
    },
    search() {
      this.dialog = true;
    },
  },
};
</script>

<style src="./House.scss" lang="scss" />
