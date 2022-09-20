<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Edit device</h4>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div class="modal-body">
        <div class="d-flex flex-row bd-highlight">
          <div class="input-group mb-3" style="max-width: 25rem">
            <el-autocomplete
              v-model="user"
              :fetch-suggestions="querySearchUser"
              clearable
              class="inline-input w-80"
              placeholder="Choose user"
              @select="handleSelectUser"
            />
          </div>
        </div>
        <div class="d-flex flex-row bd-highlight">
          <div class="input-group mb-3" style="max-width: 25rem">
            <el-autocomplete
              v-model="category"
              :fetch-suggestions="querySearchCategory"
              clearable
              class="inline-input w-80"
              placeholder="Choose category device"
              @select="handleSelectCategory"
              @blur="validate()"
              v-bind:class="{ 'is-invalid': errors.category.value !== '' }"
            />
            <div class="invalid-feedback" v-if="errors.category.value != ''">
              {{ errors.category }}
            </div>
          </div>
        </div>
        <div class="input-group mb-3" style="max-width: 25rem">
          <input
            v-model="name"
            type="text"
            class="form-control"
            placeholder="Enter name"
            aria-label="name"
            aria-describedby="basic-addon1"
            @blur="validate()"
            v-bind:class="{ 'is-invalid': errors.name.value !== '' }"
          />
          <div class="invalid-feedback" v-if="errors.name.value != ''">
            {{ errors.name }}
          </div>
        </div>
        <div class="input-group mb-3" style="max-width: 25rem">
          <input
            v-model="description"
            type="text"
            class="form-control"
            placeholder="Enter description"
            aria-label="description"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="saveChanges()"
          class="btn btn-success"
          data-bs-dismiss="modal"
          v-if="
            errors.category.value == '' &&
            errors.name.value == '' &&
            category != '' &&
            name != ''
          "
        >
          Save
        </button>
        <button
          type="button"
          @click="close()"
          class="btn btn-danger"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import CategoryService from "../../../services/category-service";
import UserService from "../../../services/user-service";
import DeviceService from "../../../services/device-service";

const props = defineProps({
  editId: Number,
});

interface User {
  id: Number;
  value: string;
}

interface Category {
  id: Number;
  value: string;
}

let userChose = ref<User>();
let categoryChose = ref<Category>();
let user = ref("");
let category = ref("");
let name = ref("");
let description = ref("");
let errors = {
  category: ref(""),
  name: ref(""),
};

let users = ref<User[]>([]);
let categories = ref<Category[]>([]);

const querySearchUser = async (queryString: string, cb: any) => {
  await getAllUser(queryString);
  console.log(users);
  cb(users.value);
};

const querySearchCategory = async (queryString: string, cb: any) => {
  await getAllCategory(queryString);
  cb(categories.value);
};

const getAllUser = async (queryString: string) => {
  let resUsers = await UserService.getAllUser(1, 5, "fullName", queryString);
  console.log("query string" + queryString);
  console.log(resUsers);
  if (resUsers.status == 200) {
    let k = 0;
    listUser = new Array();
    while (k < resUsers.data.listUser.length) {
      listUser[k] = {
        value: resUsers.data.listUser[k].fullName,
        id: resUsers.data.listUser[k].id,
      };
      k++;
    }
    users.value = listUser;
  }
};

const getAllCategory = async (queryString: string) => {
  let resCategories = await CategoryService.getAllCategory(
    1,
    5,
    "name",
    queryString
  );

  if (resCategories.status == 200) {
    let k = 0;
    listCategory = new Array();
    while (k < resCategories.data.listCategory.length) {
      listCategory[k] = {
        value: resCategories.data.listCategory[k].name,
        id: resCategories.data.listCategory[k].id,
      };
      k++;
    }
    categories.value = listCategory;
    console.log(categories);
  }
};

const emit = defineEmits<{
  (
    e: "update",
    value_1: Number,
    value_2: String,
    value_3: String,
    value_4: Number,
    value_5: Number
  ): void;
  (e: "close");
}>();

function saveChanges() {
  let userId = -1;
  let category_id = -1;
  console.log(user);
  console.log(user.value);
  console.log(userChose);
  if (user !== null && user.value !== "" && userChose !== null) {
    userId = userChose.value?.id;
  }
  if (category !== null && category.value !== "" && categoryChose !== null) {
    category_id = categoryChose.value?.id;
  }
  emit(
    "update",
    props.editId,
    name.value,
    description.value,
    userId,
    category_id
  );
  this.userId = -1;
  this.category_id = -1;
}

let listUser = new Array();
let listCategory = new Array();

const handleSelectUser = (item: User) => {
  userChose.value = item;
  console.log(item);
};

const handleSelectCategory = (item: Category) => {
  categoryChose.value = item;
  category.value = categoryChose.value.value;
  console.log(item);
};

function close() {
  this.userId = -1;
  this.category_id = -1;
  errors.category.value = "";
  errors.name.value = "";
  emit("close");
}

function validate() {
  let isValid = true;
  errors.category.value = "";
  errors.name.value = "";
  if (category.value == "") {
    errors.category.value = "Category device is required";
    isValid = false;
  }
  if (name.value == "") {
    errors.name.value = "Name device is required";
    isValid = false;
  }
  return isValid;
}

watch(
  () => props.editId,
  async () => {
    console.log("edit id" + props.editId);
    errors.category.value = "";
    errors.name.value = "";
    if (props.editId !== 0) {
      let response = await DeviceService.getDeviceById(props.editId);
      console.log(response);
      if (response.status == 200) {
        name.value = response.data.name;
        description.value = response.data.description;
        if (response.data.owner !== null) {
          userChose.value = {
            value: response.data.owner.fullName,
            id: response.data.owner.id,
          };
          user.value = userChose.value.value;
        } else {
          userChose.value = {
            value: "",
            id: -1,
          };
          user.value = "";
        }
        if (response.data.category !== null) {
          categoryChose.value = {
            value: response.data.category.name,
            id: response.data.category.id,
          };
          category.value = categoryChose.value.value;
        } else {
          categoryChose.value = {
            value: "",
            id: -1,
          };
          category.value = "";
        }
      }
      getAllUser(user.value);
      getAllCategory(category.value);
    }
  }
);

watch(
  () => name.value,
  () => {
    if (name.value !== "") {
      errors.name.value = "";
    }
  }
);

watch(
  () => category.value,
  () => {
    if (category.value !== "") {
      errors.category.value = "";
    }
  }
);
</script>
