<template>
  <div
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
    >
      <div class="card-body" style="max-width: 30rem">
        <h1 style="color: #008cba">Login</h1>
        <div class="p-3 mb-2 bg-info-2 text-white">
          <div>
            <div class="d-flex justify-content-end">
              <div class="mt-3">
                <div class="me-3">
                  <router-link
                    class="link"
                    style="color: white"
                    to="/change-password"
                    ><p>Change password?</p></router-link
                  >
                </div>
              </div>
            </div>
            <router-view />
            <div>
              <!-- <b v-if="errorUserName" style="margin-left: 20px; color: red">{{
                errorUserName
              }}</b> -->
              <div class="d-flex justify-content-center">
                <div class="input-group mb-3" style="max-width: 25rem">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    v-model="userName"
                    @blur="validate()"
                    v-bind:class="{ 'is-invalid': errors.userName }"
                  />
                  <div class="invalid-feedback" v-if="errors.userName">
                    {{ errors.userName }}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div>
              <!-- <b v-if="errorPassword" style="margin-left: 20px; color: red">{{
                errorPassword
              }}</b> -->
              <div class="d-flex justify-content-center">
                <div class="input-group mb-3" style="max-width: 25rem">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    v-model="password"
                    @blur="validate()"
                    v-bind:class="{ 'is-invalid': errors.password }"
                  />
                  <div class="invalid-feedback" v-if="errors.password">
                    {{ errors.password }}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div
              @click="login"
              class="d-flex justify-content-center"
              style="margin-bottom: 20px"
            >
              <input type="button" class="btn-header" value="Login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { auth } from "../store/auth-store";
import router from "../router";

export default {
  data() {
    return {
      userName: "",
      password: "",
      errorUserName: "",
      errorPassword: "",
      errors: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      let user = {
        userName: this.userName,
        password: this.password,
      };
      if (this.errors.password == "" && this.errors.userName == "") {
        console.log(user);
        let response = await auth.dispatch("login", user);
        console.log(response);
        if (response.status == 200) {
          this.$swal({
            title: "Login Success",
            text: "Redirecting...",
            icon: "success",
            timer: 2000,
            buttons: false,
          }).then(() => {
            if (auth.getters.user.roles.includes("ROLE_ADMIN") == true)
              router.push("/admin/home");
            else router.push("/user/home/" + auth.getters.user.id);
          });
        } else {
          this.$swal.fire("OOPS! " + response.data, "", "error");
        }
      }
    },
    validate() {
      let isValid = true;
      this.errors = {
        userName: "",
        password: "",
      };
      if (!this.userName) {
        this.errors.userName = "Username is required";
        const isPhoneNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (
          isPhoneNumber.test(this.userName) == false &&
          this.userName != "" &&
          this.userName != null
        ) {
          this.errors.userName = "Username must be a phone number";
        }
        isValid = false;
      }
      if (!this.password) {
        this.errors.password = "Password is required";
        // const isPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        // if (isPassword.test(this.password) == false) {
        //   this.errors.password =
        //     "Password have at least 8 characters, 1 letter and 1 number";
        // }
        isValid = false;
      }
      return isValid;
    },
  },
  watch: {
    userName() {
      this.errors.userName = "";
    },
    password() {
      this.errors.password = "";
    },
  },
};
</script>
<style>
.center-card {
  margin-left: 18%;
  margin-right: 18%;
  width: auto;
}

.bg-info-2 {
  border: 4px solid white;
  background-color: #0dcaf0;
  opacity: 0.9;
}
</style>
