import { error } from "jquery";
import AuthService from "../services/auth-service";
import { createStore } from "vuex";
import router from "../router";

const user = JSON.parse(localStorage.getItem("authenticated"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = createStore({
  state: initialState,
  getters: {
    user(state) {
      return state.user;
    },
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          console.log(user);
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (err) => {
          commit("loginFailure");
          return Promise.reject(err);
        }
      );
    },
    changePassword({ commit }, user) {
      return AuthService.changePassword(user).then(
        (user) => {
          console.log(user);
          return Promise.resolve(user);
        },
        (err) => {
          return Promise.reject(err);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    refreshToken({ commit }) {
      return AuthService.refreshToken().then(
        (user) => {
          commit("refreshToken", user);
          return Promise.resolve(user);
        },
        (err) => {
          return Promise.reject(err);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user.data;
      console.log(state.user);
      // if (
      //   JSON.parse(localStorage.getItem("authenticated")).roles.includes(
      //     "ROLE_ADMIN"
      //   ) == true
      // )
      //   router.push("/admin/home");
      // else
      //   router.push(
      //     "/user/home/" + JSON.parse(localStorage.getItem("authenticated")).id
      //   );
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      router.push("/");
    },
    refreshToken(state, user) {
      state.status.loggedIn = true;
      state.user = user.data;
    },
  },
});
