<template>
  <el-container style="height: 100vh">
    <div
      v-bind:style="{ width: 1603 + widthHeader + 'px' }"
      style="
        background-image: url('../../../public/images/adminBackground.jpg');
        background-size: cover;
      "
    >
      <div
        class="d-flex justify-content-center align-items-center"
        style="margin-top: 30px"
      >
        <div>
          <BarChart styles="margin-right: 140px" />
          <h3
            class="d-flex justify-content-center"
            style="width: 400px; color: white"
          >
            Employee Quantity
          </h3>
        </div>
        <div>
          <PieChart styles="margin-left: 140px" />
          <h3
            class="d-flex justify-content-center"
            style="width: 400px; margin-left: 140px; color: white"
          >
            Device Category
          </h3>
        </div>
      </div>
      <div
        class="
          container
          vh-50
          d-flex
          justify-content-center
          align-items-center
          p-3
          text-white
        "
        style="margin-top: 100px"
      >
        <div class="d-flex">
          <div style="margin-right: 100px">
            <img
              src="../../../public/images/report-human.png"
              alt=""
              width="300"
              height="200"
            />
            <div class="download-btn btn-2" @click="downloadUserReport()">
              <div class="top">
                <i class="fa fa-cloud-download"></i> Download
              </div>
              <div class="bottom">users.xlsx</div>
            </div>
          </div>
          <div style="margin-left: 100px">
            <img
              src="../../../public/images/report-device.png"
              alt=""
              width="300"
              height="200"
            />
            <div class="download-btn btn-2" @click="downloadDeviceReport()">
              <div class="top">
                <i class="fa fa-cloud-download"></i> Download
              </div>
              <div class="bottom">devices.xlsx</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>
<script>
import ReportService from "../../services/report-service";
import PieChart from "../admin/chart/PieChart.vue";
import BarChart from "./chart/BarChart.vue";
import { auth } from "../../store/auth-store";

export default {
  props: {
    widthHeader: Number,
  },
  components: {
    PieChart,
    BarChart,
  },
  methods: {
    async downloadUserReport() {
      let response = await ReportService.reportUser();
      console.log(response);
      if (response.status == 401) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        let fileName = "users_" + Date.now().toString() + ".xlsx";
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      } else {
        this.$swal.fire("OPP! " + response.data, "", "error");
      }
    },
    async downloadDeviceReport() {
      let response = await ReportService.reportDevice();
      console.log(response);

      if (response.status == 401) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        let fileName = "devices_" + Date.now().toString() + ".xlsx";
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      } else {
        this.$swal.fire("OPP! " + response.data, "", "error");
      }
    },

    backToLoginPage() {
      this.$swal
        .fire({
          title: "Your login session has expired. Do you want to login again?",
          showCancelButton: true,
          confirmButtonText: `Back to login page`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            auth.dispatch("logout");
            this.$router.push(`/login`);
          }
        });
    },
  },
};
</script>

<style>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.download-btn {
  width: 300px;
  height: 60px;
  text-align: center;
  cursor: pointer;
  margin: 20px 0px;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.download-btn.btn-2 {
  border: 5px solid #02723b;
}
.download-btn div {
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 50px;
}
.download-btn.btn-2 .top {
  background: #02723b;
}

.download-btn .bottom {
  background: #eee;
  color: #222;
}
.download-btn .top {
  transition: all 300ms ease-in-out;
}
.download-btn:hover .top {
  margin-top: -50px;
}
</style>
