<template>
  <el-container style="height: 100vh">
    <div
      v-bind:style="{ width: 100 + '%' }"
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
          mb-2
          text-white
        "
        style="overflow: none"
      >
        <div class="d-flex">
          <div style="margin-right: 20px; position: relative">
            <img
              src="../../../public/images/usersInAdminPage.jpg"
              alt=""
              width="300"
              height="300"
              style="
                border-style: solid;
                border-color: grey;
                border-radius: 50%;
              "
            />
          </div>
          <div class="user-info">
            <h3 class="font-edit">Full name: {{ fullName }}</h3>
            <h3 class="font-edit">Date of birth: {{ dob }}</h3>
            <h3 class="font-edit">Phone: {{ phone }}</h3>
            <h3 class="font-edit">City: {{ city }}</h3>
            <h3 class="font-edit">Address: {{ address }}</h3>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<style>
.el-menu-item-group__title {
  line-height: none !important;
  padding: 0 !important;
}

.el-sub-menu__title {
  height: 60px !important;
}

.font-edit {
  color: white;
}

.user-info {
  background-color: #263544;
  height: 50%;
  margin-top: 40px;
  border-style: solid;
  border-color: grey;
  padding: 4px 4px;
}
</style>

<script>
import UserService from "../../services/user-service";
import { auth } from "../../store/auth-store";

export default {
  computed: {
    status() {
      return auth.getters.user;
    },
  },
  methods: {
    async getUserById() {
      console.log(this.status);
      let response = await UserService.getUserById(auth.getters.user.id);
      console.log(response);
      if (response.status == 401) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.fullName = response.data.fullName;
        this.dob = response.data.dob;
        this.phone = response.data.userName;
        this.city = response.data.city;
        this.address = response.data.address;
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
  watch: {
    status() {
      console.log("status change");
    },
  },
  data() {
    return {
      fullName: "Ngo Trung Hoa",
      dob: "01/01/2000",
      phone: "0123456789",
      city: "Nam Dinh",
      address: "YL - YY",
    };
  },
  mounted() {
    this.getUserById();
  },
};
</script>
