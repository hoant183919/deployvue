import axios from "axios";

const jwtErr = {
  status: 401,
};
class AuthService {
  login(user) {
    console.log(user);
    return axios
      .post("http://localhost:8080/auth/login", {
        userName: user.userName,
        password: user.password,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("authenticated", JSON.stringify(res.data));
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }
  logout() {
    localStorage.removeItem("authenticated");
  }
  changePassword(user) {
    return axios
      .put("http://localhost:8080/auth", {
        userName: user.userName,
        password: user.password,
        newPassword: user.newPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }
  refreshToken() {
    const user = JSON.parse(localStorage.getItem("authenticated"));
    // if (user == null || user.refreshToken == null) {
    //     return jwtErr;
    // } else {
    return axios
      .post("http://localhost:8080/auth/refresh-token", {
        refreshToken: user.refreshToken,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          res.data.id = user.id;
          res.data.roles = user.roles;
          localStorage.removeItem("authenticated");
          localStorage.setItem(
            "authenticated",
            JSON.stringify({
              id: res.data.id,
              roles: res.data.roles,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            })
          );
        }
        console.log(res);

        return res;

        // else {
        //     return jwtError;
        // }
      })
      .catch((err) => {
        return err.response;
      });
    // }
  }
}

export default new AuthService();
