import axios from "axios";
import { auth } from "../store/auth-store";

const jwtError = {
  status: 401,
};
const jwtAccessTokenNull = {
  status: 403,
};
class UserService {
  async getAllUser(index, count, typeSearch, keySearch) {
    let user = auth.getters.user;
    console.log(user);
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.allUser(index, count, typeSearch, keySearch);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.allUser(index, count, typeSearch, keySearch);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  allUser(index, count, typeSearch, keySearch) {
    let user = auth.getters.user;
    console.log(user);
    if (user.accessToken == null) return jwtAccessTokenNull;
    console.log(user.accessToken);
    let api_url = null;
    if (keySearch == "" || keySearch == null) {
      api_url = `http://localhost:8080/users?index=${index}&count=${count}&typeSearch=${typeSearch}&keySearch=`;
    } else {
      api_url = `http://localhost:8080/users?index=${index}&count=${count}&typeSearch=${typeSearch}&keySearch=${keySearch}`;
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
  async getUserById(id) {
    let user = auth.getters.user;
    if (user == null) {
      console.log("user null");
      return jwtError;
    } else {
      let response = await this.userById(id);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.userById(id);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  userById(id) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .get(`http://localhost:8080/users/${id}`, {
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
  async insertUser(IUser) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.iUser(IUser);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.iUser(IUser);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  iUser(IUser) {
    let user = auth.getters.user;
    console.log(user.accessToken);
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .post(
        `http://localhost:8080/users`,
        {
          fullName: IUser.fullName || "",
          dob: IUser.dob || "",
          phone: IUser.phone || "",
          city: IUser.city || "",
          address: IUser.address || "",
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
  async updateUser(id, UUser) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.uUser(id, UUser);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.uUser(id, UUser);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  uUser(id, UUser) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .put(
        `http://localhost:8080/users/${id}`,
        {
          fullName: UUser.fullName || "",
          dob: UUser.dob || "",
          phone: UUser.phone || "",
          city: UUser.city || "",
          address: UUser.address || "",
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
  async deleteUser(id) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.dUser(id);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.dUser(id);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  dUser(id) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .delete(`http://localhost:8080/users/${id}`, {
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
  getCity() {
    return axios
      .get(`https://provinces.open-api.vn/api/?depth=1`)
      .then((response) => {
        return response;
      });
  }
}

export default new UserService();
