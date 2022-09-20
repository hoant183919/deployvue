<template>
  <el-container style="height: 100vh">
    <el-header
      v-bind:style="{ width: 1603 + widthHeader + 'px' }"
      style="font-size: 12px; background: #bdd8f7 !important"
    >
      <div class="toolbar">
        <div
          style="width: 600px"
          class="justify-content-center align-items-center"
        >
          <h3 style="color: #263544; font-size: 40px">Device Category</h3>
        </div>
        <div
          class="d-flex justify-content-center align-items-center"
          v-bind:style="{ marginLeft: 45 + addMarginLeft + 'vw' }"
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
                    data-bs-target="#addCategory"
                    >Add category device</el-label
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <div class="modal" id="addCategory">
      <DialogAddCategoryVue @add="addCategory" />
    </div>
    <div class="modal" id="editCategory">
      <DialogEditCategoryVue :editId="choseId" @update="updateCategory" />
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
            prop="numberOfDevice"
            label="Number of device"
            width="auto"
          >
          </el-table-column>
          <el-table-column align="left" width="300">
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
                data-bs-target="#editCategory"
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
      v-if="numberOfCategory > 0"
    >
      <div>
        Showing <b v-if="pageCurrent < numberPage">{{ maxView }}</b>
        <b v-else>{{ numberOfCategory % maxView }}</b> out of
        <b>{{ numberOfCategory }}</b> entries
      </div>
    </div>
  </el-container>
</template>
<script>
import router from "../../router";
import CategoryService from "../../services/category-service";
import DialogEditCategoryVue from "./dialog/DialogEditCategory.vue";
import DialogAddCategoryVue from "./dialog/DialogAddCategory.vue";
import { auth } from "../../store/auth-store";

export default {
  props: {
    addMarginLeft: Number,
    widthHeader: Number,
  },
  components: {
    DialogAddCategoryVue,
    DialogEditCategoryVue,
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
          title:
            "Do you want to delete this category and devices of this category?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Yes`,
          denyButtonText: `No`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteCategory(row.id);
          } else if (result.isDenied) {
            this.$swal.fire("Changes are not saved", "", "info");
          }
        });
    },
    onInput(e) {
      this.pageCurrent = 1;
      this.numberPage = 1;
      this.getAllCategory(
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
      this.getAllCategory(
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
    async getAllCategory(index, count, typeSearch, keySearch) {
      let response = await CategoryService.getAllCategory(
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
        this.tableData = response.data.listCategory;
        this.numberOfCategory = response.data.numberOfCategory || 0;
        this.numberPage =
          (this.numberOfCategory - (this.numberOfCategory % this.maxView)) /
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
    async addCategory(name, description) {
      const category = {
        name: name,
        description: description,
      };
      let response = await CategoryService.insertCategory(category);
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 201) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllCategory(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async updateCategory(id, name, description) {
      this.choseId = 0;
      const category = {
        name: name,
        description: description,
      };
      let response = await CategoryService.updateCategory(id, category);
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllCategory(
          this.pageCurrent,
          this.maxView,
          this.typeSearch,
          this.keySearch
        );
      } else {
        this.$swal.fire("OOPS! " + response.data, "", "error");
      }
    },
    async deleteCategory(id) {
      let response = await CategoryService.deleteCategory(id);
      console.log(response);
      if (response.status == 401 || response.status == 403) {
        this.backToLoginPage();
        return;
      }
      if (response.status == 200) {
        this.$swal.fire("Saved!", "", "success");
        this.getAllCategory(
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
      this.getAllCategory(
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
      numberOfCategory: 0,
      tableData: [],
      listPage: [],
    };
  },
  mounted() {
    this.getAllCategory(1, this.maxView, "id", "");
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
