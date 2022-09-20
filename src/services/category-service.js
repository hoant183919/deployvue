import axios from "axios";
import { auth } from "../store/auth-store";

const user = auth.getters.user;
const jwtAccessTokenNull = {
  status: 403,
};
const jwtError = {
  status: 401,
};
class CategoryService {
  async getAllCategory(index, count, typeSearch, keySearch) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.allCategory(
        index,
        count,
        typeSearch,
        keySearch
      );
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.allCategory(index, count, typeSearch, keySearch);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  allCategory(index, count, typeSearch, keySearch) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    let api_url = null;
    if (keySearch == "" || keySearch == null) {
      api_url = `http://localhost:8080/categories?index=${index}&count=${count}&typeSearch=${typeSearch}&keySearch=`;
    } else {
      api_url = `http://localhost:8080/categories?index=${index}&count=${count}&typeSearch=${typeSearch}&keySearch=${keySearch}`;
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
  async getCategoryById(id) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.categoryById(id);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.categoryById(id);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  categoryById(id) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .get(`http://localhost:8080/categories/${id}`, {
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
  async insertCategory(category) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.iCategory(category);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.insertCategory(category);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  iCategory(category) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .post(
        `http://localhost:8080/categories`,
        {
          name: category.name || "",
          description: category.description || "",
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
  async updateCategory(id, category) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.uCategory(id, category);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.uCategory(id, category);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  uCategory(id, category) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .put(
        `http://localhost:8080/categories/${id}`,
        {
          name: category.name || "",
          description: category.description || "",
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
  async deleteCategory(id) {
    let user = auth.getters.user;
    if (user == null) {
      return jwtError;
    } else {
      let response = await this.dCategory(id);
      console.log(response);
      if (response.status == 403 || response.status == 401) {
        let jwt = await auth.dispatch("refreshToken");
        console.log(jwt);
        if (jwt.status == 200) {
          return await this.dCategory(id);
        } else {
          return jwtError;
        }
      } else {
        return response;
      }
    }
  }
  dCategory(id) {
    let user = auth.getters.user;
    if (user.accessToken == null) return jwtAccessTokenNull;
    return axios
      .delete(`http://localhost:8080/categories/${id}`, {
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

export default new CategoryService();
