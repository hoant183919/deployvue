<template>
  <el-container style="height: 100vh">
    <el-header style="font-size: 12px; background: #bdd8f7 !important">
      <div class="toolbar">
        <div
          style="width: 400px"
          class="justify-content-center align-items-center"
        >
          <h3 style="color: #263544; font-size: 40px">Device Request</h3>
        </div>
      </div>
    </el-header>
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
          <el-table-column prop="id" label="ID" width="100" align="center">
          </el-table-column>
          <el-table-column prop="name" label="Name" width="auto">
          </el-table-column>
          <el-table-column prop="description" label="Description" width="auto">
          </el-table-column>
          <el-table-column
            prop="category.name"
            label="Category Name"
            width="auto"
          >
          </el-table-column>
          <el-table-column prop="owner.fullName" label="Name User" width="auto">
          </el-table-column>
          <el-table-column align="left">
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
                  style="width: 600px; padding-left: 10px"
                />
              </div>
            </template>
            <template v-slot="scope">
              <div v-if="scope.row.owner == null">
                <el-button
                  size="default"
                  type="success"
                  @click="handleRequest(scope.$index, scope.row)"
                  v-if="scope.row.request == 0"
                  >Request</el-button
                >
                <el-button
                  size="default"
                  type="danger"
                  @click="handleUnRequest(scope.$index, scope.row)"
                  v-if="scope.row.request == 1"
                  >Unrequest</el-button
                >
              </div>
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
import DeviceService from "../../services/device-service";
import DeviceRequestService from "../../services/device-request-service";
import { auth } from "../../store/auth-store";

export default {
  methods: {
    handleRequest(index, row) {
      console.log(index, row);
      this.request(row.id);
    },
    handleUnRequest(index, row) {
      console.log(index, row);
      this.$swal
        .fire({
          title: "Do you want delete this request device?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Save`,
          denyButtonText: `Don't save`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.unRequest(row.request_id);
          } else if (result.isDenied) {
            this.$swal.fire("Changes are not saved", "", "info");
          }
        });
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
    async getAllDevice(index, count) {
      let response = await DeviceService.getAllDevice(
        index,
        count,
        this.typeSearch,
        this.keySearch
      );
      console.log(response);
      if (response.status == 401) {
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
    async request(idDevice) {
      const deviceRequest = {
        idDevice: idDevice,
        idUser: JSON.parse(localStorage.getItem("authenticated")).id,
      };
      let response = await DeviceRequestService.insertDeviceRequest(
        deviceRequest
      );
      if (response.status == 401) {
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
    async unRequest(id) {
      let response = await DeviceRequestService.deleteDeviceRequest(id);
      if (response.status == 401) {
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
      choseId: null,
      maxView: 19,
      keySearch: null,
      typeSearch: "id",
      numberPage: 1,
      pageCurrent: 1,
      numberOfDevice: 0,
      tableData: [],
      listPage: [],
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
</style>
