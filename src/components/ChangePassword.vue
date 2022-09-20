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
        <h1 style="color: #008cba">Change password</h1>
        <div class="p-3 mb-2 bg-info-2 text-white">
          <div>
            <div class="d-flex justify-content-end">
              <div class="mt-3">
                <div class="me-3">
                  <router-link class="link" style="color: white" to="/login"
                    ><p>Login?</p></router-link
                  >
                </div>
              </div>
            </div>
            <router-view />
            <div>
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
              <b v-if="errorPassword" style="margin-left: 20px; color: red">{{
                errorPassword
              }}</b>
              <div class="d-flex justify-content-center">
                <div class="input-group mb-3" style="max-width: 25rem">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter new password"
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
            <div>
              <b
                v-if="errorNewPassword"
                style="margin-left: 20px; color: red"
                >{{ errorNewPassword }}</b
              >
              <div class="d-flex justify-content-center">
                <div class="input-group mb-3" style="max-width: 25rem">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter new password again"
                    aria-label="PasswordAgain"
                    aria-describedby="basic-addon1"
                    v-model="_password"
                    @blur="validate()"
                    v-bind:class="{ 'is-invalid': errors._password }"
                  />
                  <div class="invalid-feedback" v-if="errors._password">
                    {{ errors._password }}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div
              @click="accept"
              class="d-flex justify-content-center"
              style="margin-bottom: 20px"
            >
              <input type="button" class="btn-header" value="Accept" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../router";
import axios from "axios";
import authService from "../services/auth-service";
import { auth } from "../store/auth-store";

export default {
  data() {
    return {
      userName: "",
      password: "",
      _password: "",
      errorUserName: null,
      errorPassword: null,
      errorNewPassword: null,
      errors: {
        userName: "",
        password: "",
        _password: "",
      },
    };
  },
  methods: {
    async accept() {
      if (
        this.errors.userName == "" &&
        this.errors.password == "" &&
        this.errors._password == ""
      ) {
        let user = {
          userName: this.userName,
          password: this.password,
          newPassword: this._password,
        };
        let response = await auth.dispatch("changePassword", user);
        console.log(response);
        if (response.status == 200) {
          this.$swal({
            title: "Change password success",
            text: "Redirecting...",
            icon: "success",
            timer: 2000,
            buttons: false,
          }).then(() => {
            router.push("/login");
          });
          router.push("/login");
        } else {
          this.$swal.fire("OOPS! " + "Change password failure", "", "error");
        }
      }
    },
    validate() {
      let isValid = true;
      this.errors = {
        userName: "",
        password: "",
        _password: "",
      };
      if (!this.userName) {
        this.errors.userName = "Username is required";
        isValid = false;
      }
      if (!this.password) {
        this.errors.password = "Password is required";
        isValid = false;
      }
      if (!this._password) {
        this.errors._password = "New password is required";
        isValid = false;
      }
      if (this._password != "") {
        const isPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (isPassword.test(this._password) == false && this._password != "") {
          this.errors._password =
            "New password have 8 characters 1 letter 1 number";
        }
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
    _password() {
      this.errors._password = "";
    },
  },
};
</script>
