<template>
  <v-container fluid class="icons-page mt-3">
    <v-row>
      <v-col class="order-first pl-0" cols="12" md="9">
        <h2>
          <v-icon
            style="background: #686868;-webkit-background-clip: text;background-clip: text;color: transparent;text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;font-size: 30px;"
          >
            mdi-map-marker-radius-outline</v-icon
          >
          แผนที่ GIS
        </h2>
        <longdo-map
          @load="event"
          :location="locationStart"
          :lastView="false"
          :zoom="10"
          class="set-shadow"
          style="height:615px"
        >
          <longdo-map-marker
            v-for="(item, i) in markers"
            :key="i"
            :location="item.location"
            :title="item.title"
            :detail="item.detail"
            :icon="item.icon"
            :popup="item.popup"
            :draggable="true"
          />
        </longdo-map>
      </v-col>
      <v-col class="order-last" cols="12" md="3">
        <h2>
          <v-icon
            style="background: #686868;-webkit-background-clip: text;background-clip: text;color: transparent;text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;font-size: 30px;"
          >
            fa-search</v-icon
          >
          ค้นหา
        </h2>
        <v-row class="p-0 m-0">
          <v-col cols="12" class="p-0 m-0 set-shadow mt-3">
            <v-text-field
              placeholder="ชื่อ-นามสกุล"
              hide-detail
              solo
            ></v-text-field>
            <v-select hide-detail placeholder="เครือข่าย" solo></v-select>
            <v-select hide-detail placeholder="โครงการพัฒนา" solo></v-select>
            <v-select hide-detail placeholder="ภาค" solo></v-select>
            <v-select hide-detail placeholder="จังหวัด" solo></v-select>
            <v-select hide-detail placeholder="อำเภอ/เขต" solo></v-select>
            <v-select hide-detail placeholder="ตำบล/แขวง" solo></v-select>
            <v-btn
              color="primary"
              class="rounded-lg elevation-4"
              outlined
              large
              block
            >
              <v-icon left>fa-search</v-icon>ค้นหา</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Maps",
  data() {
    return {
      locationStart: { lon: 102.82363467961038, lat: 16.432227961892437 },
      markers: [
        {
          location: { lon: 100.58, lat: 13.761 },

          icon: {
            url: "https://image.flaticon.com/icons/png/512/25/25694.png",
            offset: { x: 14, y: 10 },
            size: { width: 30, height: 30 },
          },
          popup: {
            title: "Hello world",
            detail: "This is a detail",
            size: { width: 200, height: 200 },
          },
        },
        {
          location: { lon: 102.82363467961038, lat: 16.432227961892437 },

          icon: {
            url: "https://image.flaticon.com/icons/png/512/25/25694.png",
            offset: { x: 14, y: 10 },
            size: { width: 30, height: 30 },
          },
          popup: {
            title: "Hello world",
            detail: "This is a detail",
            size: { width: 200, height: 200 },
          },
        },
      ],
    };
  },
  methods: {
    event(map) {
      map.Event.bind("drag", function() {
        console.log("map.location();", map.location());
      });
    },
  },
};
</script>

<style src="./Mapgis.scss" lang="scss" />
