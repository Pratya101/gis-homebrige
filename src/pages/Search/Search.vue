<template>
  <v-container fluid class="icons-page mt-3">
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
      รายการข้อมูลครัวเรือน
    </h2>
    <v-row>
      <v-col cols="12 px-0">
        <v-simple-table class="material-table set-shadow">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left white--text">ชื่อ-สนามสกุล</th>
                <th class="text-left white--text">สภาพที่อยู่อาศัย</th>
                <th class="text-left white--text">ภาค</th>
                <th class="text-left white--text">จังหวัด</th>
                <th class="text-left white--text">อำเภอ</th>
                <th class="text-left white--text">ตำบล</th>
                <th class="text-center white--text">ตำแหน่งที่อยู่</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pratya Phocha</td>
                <td>พอใช้</td>
                <td>ตะวันออกเฉียงเหนือ</td>
                <td>ร้อยเอ็ด</td>
                <td>จตุรพักตรพิมาน</td>
                <td>ศรีโคตร</td>
                <td class="text-center">
                  <v-icon>mdi-map-marker-radius-outline</v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Icons",
  data() {
    return {};
  },
  methods: {
    toFontAwesomeText(name) {
      return "fa-" + name.toLowerCase();
    },
  },
};
</script>

<style src="./Search.scss" lang="scss" />
