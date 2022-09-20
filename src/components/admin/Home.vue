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
        class="
          container
          vh-100
          d-flex
          justify-content-center
          align-items-center
          p-3
          text-white
        "
        style="background-size: cover"
      >
        <div class="d-flex">
          <div style="margin-right: 100px">
            <a href="/admin/human-management" style="text-decoration: none">
              <img
                src="../../../public/images/usersInAdminPage.jpg"
                alt=""
                width="300"
                height="300"
                class="icon-admin"
              />
            </a>
            <h3 class="d-flex justify-content-center">
              USERS: {{ nou }}
            </h3>
          </div>
          <div style="margin-left: 100px">
            <a href="/admin/device-management" style="text-decoration: none">
              <img
                src="../../../public/images/deviceAdminPage.PNG"
                alt=""
                width="300"
                height="300"
                class="icon-admin"
              />
            </a>
            <h3 class="d-flex justify-content-center">
              DEVICES: {{ nod }}
            </h3>
            <h3 class="d-flex justify-content-center">
              DEVICE CATRGORIES: {{ noc }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<style>
.icon-admin {
  border-radius: 50%;
  border-style: solid;
  border-color: grey;
}

.icon-admin:hover {
  opacity: 0.9;
}
</style>

<script>
import HomeService from "../../services/home-service";
import { auth } from "../../store/auth-store";

export default {
  props: {
    widthHeader: Number,
  },
  methods: {
    async getAll() {
      let response = await HomeService.home();
      if (response.status == 401) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.nou = response.data.numberOfUser;
        this.nod = response.data.numberOfDevice;
        this.noc = response.data.numberOfCategory;
      } else {
        this.$swal.fire("OOPS!" + response.data, "", "error");
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
  data() {
    return {
      nou: 100,
      nod: 100,
      noc: 100,
    };
  },
  mounted() {
    this.getAll();
  },
};
</script>
