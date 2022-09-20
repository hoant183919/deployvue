<template>
  <el-container style="height: 100vh">
    <el-header
      v-bind:style="{ width: 1603 + widthHeader + 'px' }"
      style="font-size: 12px; background: #bdd8f7 !important"
    >
      <div class="toolbar">
        <div
          style="width: 400px"
          class="justify-content-center align-items-center"
        >
          <h3 style="color: #263544; font-size: 36px; padding-top: 4px">
            Employee
          </h3>
        </div>
        <div
          class="d-flex justify-content-center align-items-center"
          v-bind:style="{ marginLeft: 55 + addMarginLeft + 'vw' }"
          style="justify-content: center; text-align: right"
        >
          <el-button
            type="primary"
            icon="plus"
            style="font-size: 1.5rem"
            role="button"
            aria-pressed="true"
            data-bs-toggle="modal"
            data-bs-target="#addHuman"
            >Add</el-button
          >
        </div>
      </div>
    </el-header>
    <div class="modal" id="addHuman">
      <DialogAddHuman @add="addHuman" />
    </div>
    <div class="modal" id="editHuman">
      <DialogEditHuman :editId="choseId" @update="updateHuman" />
    </div>
    <el-scrollbar v-bind:style="{ width: 1603 + widthHeader + 'px' }">
      <el-main style="padding: 0px">
        <el-table
          :data="tableData"
          stripe
          border
          :cell-style="{ borderColor: 'black' }"
          :header-cell-style="{ borderColor: 'black' }"
          style="width: 100%; border: 2px solid black"
        >
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="50"
            align-item="center"
          >
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="fullName"
            label="Full name"
            width="auto"
          >
          </el-table-column>
          <el-table-column prop="dob" label="Date of birth" width="auto">
          </el-table-column>
          <el-table-column prop="phone" label="Phone" width="auto">
          </el-table-column>
          <el-table-column prop="city" label="City" width="auto">
          </el-table-column>
          <el-table-column prop="address" label="Address" width="auto">
          </el-table-column>
          <el-table-column
            prop="numberOfDevice"
            label="Number of device"
            width="150"
            align-item="center"
          >
          </el-table-column>
          <el-table-column align-item="left">
            <template #header>
              <div class="d-flex">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="typeSearch"
                >
                  <option value="id" selected>ID</option>
                  <option value="fullName">Name</option>
                  <option value="dob">Birth</option>
                  <option value="userName">Phone</option>
                  <option value="city">City</option>
                  <option value="address">Address</option>
                </select>
                <el-input
                  v-if="typeSearch != 'id'"
                  v-model="keySearch"
                  @input="onInput"
                  size="small"
                  placeholder="Type to search"
                  style="width: 400px; padding-left: 10px"
                />
              </div>
            </template>
            <template v-slot="scope">
              <el-button
                size="default"
                @click="handleEdit(scope.$index, scope.row)"
                role="button"
                style="background-color: #409eff; color: white"
                aria-pressed="true"
                data-bs-toggle="modal"
                data-bs-target="#editHuman"
                ><el-icon :size="size" :color="color"> <Edit /> </el-icon
                >Edit</el-button
              >
              <el-button
                size="default"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                role="button"
                ><el-icon :size="size" :color="color"> <Delete /> </el-icon
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-scrollbar>
    <el-footer class="d-flex justify-content-center">
      <div class="d-flex align-items-center justify-content-center">
        <el-icon @click="pageLeft" v-if="pageCurrent !== 1"
          ><CaretLeft
        /></el-icon>
        <td v-for="i in listPage" style="margin: 4px">
          <div class="d-flex">
            <b
              v-if="
                ((i == pageCurrent - 1 &&
                  pageCurrent >= 5 &&
                  pageCurrent <= numberPage - 3) ||
                  ((pageCurrent == numberPage ||
                    pageCurrent == numberPage - 1 ||
                    pageCurrent == numberPage - 2) &&
                    i == pageCurrent - 1)) &&
                numberPage > 7
              "
              style="margin-right: 8px"
            >
              . . .
            </b>
            <a
              v-if="this.pageCurrent == i"
              href="#"
              style="text-decoration: none; color: red"
              @click="changePage(i)"
              >{{ i }}</a
            >
            <a
              v-else
              href="#"
              style="text-decoration: none"
              @click="changePage(i)"
              >{{ i }}</a
            >
            <b
              v-if="
                ((i == pageCurrent + 1 &&
                  pageCurrent >= 4 &&
                  pageCurrent <= numberPage - 4) ||
                  ((pageCurrent == 1 || pageCurrent == 2 || pageCurrent == 3) &&
                    i == pageCurrent + 1)) &&
                numberPage > 7
              "
              style="margin-left: 8px"
            >
              . . .
            </b>
          </div>
        </td>
        <el-icon @click="pageRight" v-if="pageCurrent !== numberPage"
          ><CaretRight
        /></el-icon>
      </div>
    </el-footer>
    <div
      class="position-absolute bottom-0 end-0 mb-3"
      style="margin-right: 30px"
      v-if="numberOfUser > 0"
    >
      <div>
        Showing <b v-if="pageCurrent < numberPage">{{ maxView }}</b>
        <b v-else>{{ numberOfUser % maxView }}</b> out of
        <b>{{ numberOfUser }}</b> entries
      </div>
    </div>
  </el-container>
</template>
<script>
import DialogAddHuman from "./dialog/DialogAddHuman.vue";
import DialogEditHuman from "./dialog/DialogEditHuman.vue";
import UserService from "../../services/user-service";
import { auth } from "../../store/auth-store";

export default {
  props: {
    addMarginLeft: Number,
    widthHeader: Number,
  },
  components: {
    DialogAddHuman,
    DialogEditHuman,
  },
  methods: {
    handleClick() {
      console.log("click");
    },
    handleEdit(index, row) {
      this.choseId = row.id;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$swal
        .fire({
          title: "Do you want to delete this employee?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Yes`,
          denyButtonText: `No`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteHuman(row.id);
          } else if (result.isDenied) {
            this.$swal.fire("Changes are not saved", "", "info");
          }
        });
    },
    onInput(e) {
      this.pageCurrent = 1;
      this.numberPage = 1;
      this.getAllUser(
        this.pageCurrent,
        this.maxView,
        this.typeSearch,
        this.keySearch
      );
    },
    changePage(i) {
      this.pageCurrent = i;
      if (this.numberPage > 7) {
        if (this.pageCurrent == 1 || this.pageCurrent == this.numberPage) {
          this.listPage = [];
          this.listPage[0] = 1;
          this.listPage[1] = 2;
          this.listPage[2] = this.numberPage - 1;
          this.listPage[3] = this.numberPage;
        } else if (this.pageCurrent == 2) {
          this.listPage = [];
          this.listPage[0] = 1;
          this.listPage[1] = 2;
          this.listPage[2] = 3;
          this.listPage[3] = this.numberPage - 1;
          this.listPage[4] = this.numberPage;
        } else if (this.pageCurrent == this.numberPage - 1) {
          this.listPage = [];
          this.listPage[0] = 1;
          this.listPage[1] = 2;
          this.listPage[2] = this.numberPage - 2;
          this.listPage[3] = this.numberPage - 1;
          this.listPage[4] = this.numberPage;
        } else if (this.pageCurrent == 3) {
          this.listPage = [];
          this.listPage[0] = 1;
          this.listPage[1] = 2;
          this.listPage[2] = 3;
          this.listPage[3] = 4;
          this.listPage[4] = this.numberPage - 1;
          this.listPage[5] = this.numberPage;
        } else if (
          this.pageCurrent >= 4 &&
          this.pageCurrent <= this.numberPage - 3
        ) {
          this.listPage = [];
          this.listPage[0] = 1;
          this.listPage[1] = 2;
          this.listPage[2] = this.pageCurrent - 1;
          this.listPage[3] = this.pageCurrent;
          this.listPage[4] = this.pageCurrent + 1;
          this.listPage[5] = this.numberPage - 1;
          this.listPage[6] = this.numberPage;
        } else if (this.pageCurrent == this.numberPage - 2) {
          this.listPage = [];
          this.listPage[0] = 1;
          this.listPage[1] = 2;
          this.listPage[2] = this.numberPage - 3;
          this.listPage[3] = this.numberPage - 2;
          this.listPage[4] = this.numberPage - 1;
          this.listPage[5] = this.numberPage;
        }
      }
      this.getAllUser(
        this.pageCurrent,
        this.maxView,
        this.typeSearch,
        this.keySearch
      );
    },
    pageLeft() {
      if (this.pageCurrent > 1) this.pageCurrent--;
      this.changePage(this.pageCurrent);
    },
    pageRight() {
      if (this.pageCurrent < this.numberPage) {
        this.pageCurrent = this.pageCurrent + 1;
      }
      this.changePage(this.pageCurrent);
    },
    async getAllUser(index, count, typeSearch, keySearch) {
      console.log(index + " " + count + " " + typeSearch + " " + keySearch);
      let response = await UserService.getAllUser(
        index,
        count,
        typeSearch,
        keySearch
      );
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.tableData = [];
        this.tableData = response.data.listUser;
        this.numberOfUser = response.data.numberOfUser || 0;
        console.log("number page" + this.numberPage + " " + this.numberOfUser);
        this.numberPage =
          (this.numberOfUser - (this.numberOfUser % this.maxView)) /
            this.maxView +
          1;
        console.log("number page" + this.numberPage);

        if (this.numberPage <= 7) {
          this.listPage = [];
          for (let i = 1; i <= this.numberPage; i++) {
            this.listPage[i - 1] = i;
          }
        } else {
          this.listPage = [];
          this.listPage[0] = 1;
          this.listPage[1] = 2;
          this.listPage[2] = this.numberPage - 1;
          this.listPage[3] = this.numberPage;
        }
        console.log(this.listPage);
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async addHuman(fullName, dob, phone, city, address) {
      const user = {
        fullName: fullName,
        dob: dob,
        phone: phone,
        city: city,
        address: address,
      };
      console.log(user);
      let response = await UserService.insertUser(user);
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 201) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllUser(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async updateHuman(id, fullName, dob, phone, city, address) {
      this.choseId = 0;
      console.log(id + fullName + dob + phone + city + address);
      const user = {
        fullName: fullName,
        dob: dob,
        phone: phone,
        city: city,
        address: address,
      };
      let response = await UserService.updateUser(id, user);
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllUser(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async deleteHuman(id) {
      let response = await UserService.deleteUser(id);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllUser(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    backToLoginPage() {
      this.$swal
        .fire({
          title: "Your login session has expired. Do you want to login again?",
          showCancelButton: true,
          confirmButtonText: `Back to login page`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            auth.dispatch("logout");
            this.$router.push(`/login`);
          }
        });
    },
  },
  watch: {
    typeSearch() {
      this.getAllUser(
        this.pageCurrent,
        this.maxView,
        this.typeSearch,
        this.keySearch
      );
    },
  },
  data() {
    return {
      choseId: 0,
      maxView: 16,
      keySearch: null,
      typeSearch: "id",
      numberPage: 1,
      pageCurrent: 1,
      numberOfUser: 0,
      tableData: [],
      listPage: [],
    };
  },
  mounted() {
    this.getAllUser(1, this.maxView, "id", "");
  },
};
</script>

<style scoped>
.el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.toolbar {
  display: inline-flex;
  height: 100%;
  right: 20px;
}
.el-button--primary {
  background-color: #263544;
}

.el-button--primary:hover {
  background-color: #4099ff;
}
</style>
