import axios from "axios";
import { auth } from "../store/auth-store";

const jwtError = {
  status: 401,
};
const jwtAccessTokenNull = {
  status: 403,
};
class DeviceService {
  async getAllDevice(index, count, typeSearch, keySearch) {
    let user = auth.getters.user;
    if (user == null) {
      console.log("user null");
      return jwtError;
    } else {
      let response = await this.allDevice(index, count, typeSearch, keySearch);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.allDevice(index, count, typeSearch, keySearch);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  allDevice(index, count, typeSearch, keySearch) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    let api_url = null;
    if (keySearch == "" || keySearch == null) {
      api_url = `http://localhost:8080/devices?index=${index}&count=${count}&typeSearch=${typeSearch}&keySearch=`;
    } else {
      api_url = `http://localhost:8080/devices?index=${index}&count=${count}&typeSearch=${typeSearch}&keySearch=${keySearch}`;
    }
    return axios
      .get(api_url, {
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
  async getDeviceById(id) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.deviceById(id);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.deviceById(id);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  deviceById(id) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .get(`http://localhost:8080/devices/${id}`, {
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
  async insertDevice(device) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.iDevice(device);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.iDevice(device);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  iDevice(device) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .post(
        `http://localhost:8080/devices`,
        {
          name: device.name || "",
          description: device.description || "",
          owner_id: device.owner_id || -1,
          category_id: device.category_id || -1,
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
  async updateDevice(id, device) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.uDevice(id, device);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.uDevice(id, device);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  uDevice(id, device) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .put(
        `http://localhost:8080/devices/${id}`,
        {
          name: device.name || "",
          description: device.description || "",
          owner_id: device.owner_id || -1,
          category_id: device.category_id || -1,
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
  async deleteDevice(id) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.dDevice(id);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.dDevice(id);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  dDevice(id) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .delete(`http://localhost:8080/devices/${id}`, {
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

export default new DeviceService();
