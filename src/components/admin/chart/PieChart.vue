<template>
  <Pie
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
import { Pie } from "vue-chartjs";
import CategoryService from "../../../services/category-service";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "PieChart",
  components: {
    Pie,
  },
  props: {
    chartId: {
      type: String,
      default: "pie-chart",
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
      chartData: {
        labels: new Array(),
        datasets: [
          {
            backgroundColor: ["#15607a", "#1d81a2", "#18a1cd", "#39f3bb", "#09bb9f"],
            data: new Array(),
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
      let response = await CategoryService.getAllCategory(1, 10000, "id", "");
      console.log(response);
      if (response.status == 200) {
        let k = 0;
        while (k < response.data.numberOfCategory) {
          this.chartData.labels[k] = response.data.listCategory[k].name;
          this.chartData.datasets[0].data[k] =
            response.data.listCategory[k].numberOfDevice;
          k++;
        }
      }
      console.log(this.chartData);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
