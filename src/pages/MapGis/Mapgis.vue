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
    <div class="pieCharts-page">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-5 pb-3">
              <p>Donut Pie Chart</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-5 pt-0">
              <v-row no-gutters>
                <v-col>
                  <ApexChart
                    type="donut"
                    :height="$vuetify.breakpoint.smAndDown ? 300 : 350"
                    :options="apexPieDonut.options"
                    :series="apexPieDonut.series"
                  >
                  </ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ApexChart from "vue-apexcharts";
import config from "@/config";
export default {
  components: {
    ApexChart,
  },
  name: "Maps",
  data() {
    return {
      apexPieDonut: {
        series: [44, 55, 41, 17, 15],
        options: {
          chart: {
            type: "donut",
            labels: {
              show: true,
            },

            height: 350,
          },
          labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
          colors: [
            config.light.primary,
            config.light.success,
            config.light.warning,
            config.light.info,
            config.light.secondary,
          ],
          responsive: [
            {
              breakpoint: 321,
              options: {
                chart: {
                  height: 150,
                },
              },
            },
            {
              breakpoint: 2561,
              options: {
                chart: {
                  height: 350,
                },
              },
            },
          ],
        },
      },

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
    appendData: function() {
      var arr = this.apexDynamicChart.series.slice();
      arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);
      this.apexDynamicChart.series = arr;
    },
    removeData: function() {
      if (this.apexDynamicChart.series.length === 1) return;
      var arr = this.apexDynamicChart.series.slice();
      arr.pop();
      this.apexDynamicChart.series = arr;
    },
    randomize: function() {
      this.apexDynamicChart.series = this.apexDynamicChart.series.map(
        function() {
          return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        }
      );
    },
    reset: function() {
      this.apexDynamicChart.series = [44, 55, 13, 33];
    },
  },
};
</script>

<style src="./Mapgis.scss" lang="scss" />
