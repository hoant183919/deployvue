import axios from "axios";
import { auth } from "../store/auth-store";

const jwtError = {
  status: 401,
};
const jwtAccessTokenNull = {
  status: 403,
};
class ReportService {
  async reportUser() {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.rUser();
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.rUser();
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  rUser() {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .get("http://localhost:8080/reports/users", {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
        responseType: "blob",
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
  async reportDevice() {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.rDevice();
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.rDevice();
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  rDevice() {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .get("http://localhost:8080/reports/devices", {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
        responseType: "blob",
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
}

export default new ReportService();
