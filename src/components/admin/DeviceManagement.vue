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
          <h3 style="color: #263544; font-size: 40px">Device</h3>
        </div>
        <div
          class="d-flex justify-content-center align-items-center"
          v-bind:style="{ marginLeft: 55 + addMarginLeft + 'vw' }"
          style="
            justify-content: center;

            text-align: right;
          "
        >
          <el-dropdown>
            <el-button type="primary" icon="plus" style="font-size: 1.5rem"
              >Add</el-button
            >
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-label
                    style="font-size: 1rem"
                    role="button"
                    aria-pressed="true"
                    data-bs-toggle="modal"
                    data-bs-target="#addDevice"
                    >Add device</el-label
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <div class="modal" id="addDevice">
      <DialogAddDevice @add="addDevice" />
    </div>
    <div class="modal" id="editDevice">
      <DialogEditDevice
        :editId="editId"
        @update="updateDevice"
        @close="closeModal"
      />
    </div>
    <div class="modal" id="viewRequest">
      <DialogViewRequest
        :requestId="viewRequestId"
        @accept="acceptRequest"
        @close="closeModal"
      />
    </div>
    <el-scrollbar v-bind:style="{ width: 1603 + widthHeader + 'px' }">
      <el-main style="padding: 0px">
        <el-table
          :data="tableData"
          stripe
          :border="true"
          :cell-style="{ borderColor: 'black' }"
          :header-cell-style="{ borderColor: 'black' }"
          style="width: auto; border: 2px solid black"
        >
          <el-table-column prop="id" label="ID" width="50" :align="center">
          </el-table-column>
          <el-table-column prop="name" label="Name" width="auto">
          </el-table-column>
          <el-table-column prop="description" label="Description" width="auto">
          </el-table-column>
          <el-table-column
            prop="category.name"
            label="Category device"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="owner.fullName" label="Name user" width="auto">
          </el-table-column>
          <el-table-column align="left" width="350">
            <template #header>
              <div class="d-flex">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="typeSearch"
                >
                  <option value="id" selected>ID</option>
                  <option value="name">Name</option>
                  <option value="description">Description</option>
                  <option value="categoryName">Category name</option>
                  <option value="nameUser">Name user</option>
                </select>
                <el-input
                  v-if="typeSearch != 'id'"
                  v-model="keySearch"
                  @input="onInput"
                  size="small"
                  placeholder="Type to search"
                  style="width: 500px; padding-left: 10px"
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
                data-bs-target="#editDevice"
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
              <el-button
                v-if="scope.row.owner !== null"
                size="default"
                type="danger"
                @click="handleDeleteUser(scope.$index, scope.row)"
                role="button"
                ><el-icon :size="size" :color="color"> <Delete /> </el-icon
                >Delete User</el-button
              >
              <el-button
                v-else
                size="default"
                type="success"
                role="button"
                @click="handleViewRequest(scope.$index, scope.row)"
                aria-pressed="true"
                data-bs-toggle="modal"
                data-bs-target="#viewRequest"
                ><el-icon :size="size" :color="color"> <View /> </el-icon>View
                Request
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-scrollbar>
    <el-footer class="d-flex align-items-center justify-content-center">
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
            v-if="pageCurrent == i"
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
    </el-footer>
    <div
      class="position-absolute bottom-0 end-0 mb-3"
      style="margin-right: 30px"
      v-if="numberOfDevice > 0"
    >
      <div>
        Showing <b v-if="pageCurrent < numberPage">{{ maxView }}</b>
        <b v-else>{{ numberOfDevice % maxView }}</b> out of
        <b>{{ numberOfDevice }}</b> entries
      </div>
    </div>
  </el-container>
</template>
<script>
import DialogAddDevice from "./dialog/DialogAddDevice.vue";
import DialogEditDevice from "./dialog/DialogEditDevice.vue";
import DialogViewRequest from "./dialog/DialogViewRequest.vue";
import DeviceService from "../../services/device-service";
import DeviceRequestService from "../../services/device-request-service";
import { auth } from "../../store/auth-store";

export default {
  props: {
    addMarginLeft: Number,
    widthHeader: Number,
  },
  components: {
    DialogAddDevice,
    DialogEditDevice,
    DialogViewRequest,
  },
  methods: {
    handleClick() {
      console.log("click");
    },
    handleEdit(index, row) {
      this.editId = row.id;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$swal
        .fire({
          title: "Do you want to delete this device?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Yes`,
          denyButtonText: `No`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteDevice(row.id);
          } else if (result.isDenied) {
            this.$swal.fire("Changes are not saved", "", "info");
          }
        });
    },
    handleDeleteUser(index, row) {
      console.log(index, row);
      this.$swal
        .fire({
          title: "Do you want delete this user's device?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Yes`,
          denyButtonText: `No`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteUserDevice(
              row.id,
              row.name,
              row.description,
              row.category.id
            );
          } else if (result.isDenied) {
            this.$swal.fire("Changes are not saved", "", "info");
          }
        });
    },
    handleViewRequest(index, row) {
      this.viewRequestId = row.id;
      console.log(index, row);
    },
    onInput(e) {
      this.pageCurrent = 1;
      this.numberPage = 1;
      this.getAllDevice(
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
      this.getAllDevice(
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
      if (this.pageCurrent < this.numberPage) this.pageCurrent++;
      this.changePage(this.pageCurrent);
    },
    // showNotification(noti) {
    //   this.show = true;
    //   this.notification = noti;
    //   setTimeout(() => {
    //     this.show = false;
    //   }, 3000);
    // },
    async getAllDevice(index, count, typeSearch, keySearch) {
      let response = await DeviceService.getAllDevice(
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
        this.tableData = response.data.listDevice;
        this.numberOfDevice = response.data.numberOfDevice || 0;
        this.numberPage =
          (this.numberOfDevice - (this.numberOfDevice % this.maxView)) /
            this.maxView +
          1;
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
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async addDevice(name, description, owner_id, category_id) {
      const device = {
        name: name,
        description: description,
        owner_id: owner_id,
        category_id: category_id,
      };
      let response = await DeviceService.insertDevice(device);
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 201) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllDevice(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async updateDevice(id, name, description, owner_id, category_id) {
      const device = {
        name: name,
        description: description,
        owner_id: owner_id,
        category_id: category_id,
      };
      let response = await DeviceService.updateDevice(id, device);
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllDevice(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async deleteDevice(id) {
      this.editId = 0;
      let response = await DeviceService.deleteDevice(id);
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllDevice(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async deleteUserDevice(id, name, description, category_id) {
      this.viewRequestId = 0;
      const device = {
        name: name,
        description: description,
        owner_id: -1,
        category_id: category_id,
      };
      let response = await DeviceService.updateDevice(id, device);
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllDevice(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async acceptRequest(idDevice, idUser) {
      this.viewRequestId = 0;
      const deviceRequest = {
        idDevice: idDevice,
        idUser: idUser,
      };
      let response = await DeviceRequestService.acceptDeviceRequest(
        deviceRequest
      );
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllDevice(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    closeModal() {
      this.editId = 0;
      this.viewRequestId = 0;
      console.log(this.viewRequestId);
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
      this.getAllDevice(
        this.pageCurrent,
        this.maxView,
        this.typeSearch,
        this.keySearch
      );
    },
  },
  data() {
    return {
      listPage: [],
      editId: 0,
      viewRequestId: 0,
      maxView: 16,
      keySearch: null,
      typeSearch: "id",
      numberPage: 1,
      pageCurrent: 1,
      numberOfDevice: 0,
      tableData: [],
    };
  },
  mounted() {
    this.getAllDevice(1, this.maxView, "id", "");
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
  align-items: center;
  justify-content: center;
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
