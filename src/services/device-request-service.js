import axios from "axios";
import { auth } from "../store/auth-store";

const jwtError = {
  status: 401,
};
const jwtAccessTokenNull = {
  status: 403,
};
class DeviceRequestService {
  async getDeviceRequest(id) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.deviceRequest(id);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.deviceRequest(id);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  deviceRequest(id) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .get(`http://localhost:8080/requests/${id}`, {
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
  async insertDeviceRequest(deviceRequest) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.iDeviceRequest(deviceRequest);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.iDeviceRequest(deviceRequest);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  iDeviceRequest(deviceRequest) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    console.log(deviceRequest);
    return axios
      .post(
        "http://localhost:8080/requests",
        {
          idDevice: deviceRequest.idDevice || "",
          idUser: deviceRequest.idUser || "",
        },
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
  async deleteDeviceRequest(id) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.dDeviceRequest(id);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.dDeviceRequest(id);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  dDeviceRequest(id) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .delete(`http://localhost:8080/requests/${id}`, {
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
  async acceptDeviceRequest(deviceRequest) {
    let user = auth.getters.user;
    console.log(deviceRequest);
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.aDeviceRequest(deviceRequest);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.aDeviceRequest(deviceRequest);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  aDeviceRequest(deviceRequest) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .post(
        "http://localhost:8080/requests/accept",
        {
          idDevice: deviceRequest.idDevice || "",
          idUser: deviceRequest.idUser || "",
        },
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
}

export default new DeviceRequestService();
