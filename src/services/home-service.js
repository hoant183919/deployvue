import axios from "axios";
import { auth } from "../store/auth-store";

const jwtError = {
  status: 401,
};
const jwtAccessTokenNull = {
  status: 403,
};
class HomeService {
  async home() {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.h();
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.h();
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  h() {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .get(`http://localhost:8080/home`, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
}

export default new HomeService();
