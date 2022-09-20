<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from "vue-chartjs";
import UserService from "../../../services/user-service";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { forEach } from "lodash";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      maxSlot: 5,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Employee",
            backgroundColor: "#09bb9f",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    async getData() {
      let response = await UserService.getAllUser(1, 10000, "id", "");
      console.log(response);
      if (response.status == 200) {
        let map = new Map();
        let k = response.data.numberOfUser - 1;
        while (k >= 0) {
          let list = response.data.listUser[k].createAt.split("/");
          let month = list[1];
          let year = list[0];
          let time = month + "/" + year;
          console.log(time);
          if (!map.has(time)) {
            map.set(time, 1);
          } else {
            let index = map.get(time);
            map.delete(time);
            map.set(time, index + 1);
          }
          k--;
          if (map.size >= this.maxSlot) {
            k = -1;
          }
        }
        k = 0;
        const reversedMap = new Map(Array.from(map).reverse());
        reversedMap.forEach((value, key) => {
          this.chartData.labels[k] = key;
          this.chartData.datasets[0].data[k] = value;
          k++;
        });
        console.log(map[0]);
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
