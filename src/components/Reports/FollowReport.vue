<template>
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
        v-if="item.rating_description == 'เตรียมข้อมูล'"
        color="error"
        >{{ item.rating_description }}
      </v-chip>
      <v-chip
        small
        label
        class="rounded-lg elevation-4"
        v-if="item.rating_description == 'กำลังดำเนินการห'"
        color="warning"
        >{{ item.rating_description }}
      </v-chip>
      <v-chip
        small
        label
        class="rounded-lg elevation-4"
        v-if="item.rating_description == 'สำเร็จ'"
        color="success"
        >{{ item.rating_description }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import followTableHeader from "./follow-table-header.json";
import { apiService } from "@/services/axios";
import address_status from "@/data/address_status.json";
import { mapActions, mapState } from "vuex";

export default {
  name: "FollowReport",
  data() {
    return {
      search: "",
      dialog: false,
      headers: followTableHeader,
      followList: [],
      address_status_list: [],
    };
  },
  watch: {
    searDataReport(value) {
      this.getFollowList(value);
    },
  },
  mounted() {
    this.getFollowList();
    this.address_status_list = address_status.data;
    this.address_status_list.unshift("ทั้งหมด");
  },
  computed: {
    ...mapState("house", ["searDataReport"]),
  },
  methods: {
    ...mapActions("house", ["updateStatusHouse"]),
    updateStatus(id) {
      this.updateStatusHouse(id);
    },

    async getFollowList(body) {
      let data = await apiService.post({
        path: "report/formproject",
        body: body,
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
