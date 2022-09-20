<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Edit employee</h4>
      </div>
      <div class="modal-body">
        <div class="input-group mb-3" style="max-width: 25rem">
          <div class="block">
            <el-date-picker
              v-model="editDob"
              type="date"
              placeholder="Enter date of birth"
              :default-value="new Date(2000, 1, 1)"
              aria-label="dob"
              aria-describedby="basic-addon1"
              @blur="validate()"
              v-bind:class="{ 'is-invalid': errors.dob }"
            />
            <div class="invalid-feedback" v-if="errors.dob.value != ''">
              {{ errors.dob }}
            </div>
          </div>
        </div>
        <div class="input-group mb-3" style="max-width: 25rem">
          <input
            v-model="editName"
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
            v-model="editPhone"
            type="text"
            class="form-control"
            placeholder="Enter phone"
            aria-label="phone"
            aria-describedby="basic-addon1"
            @blur="validate()"
            v-bind:class="{ 'is-invalid': errors.phone.value !== '' }"
          />
          <div class="invalid-feedback" v-if="errors.phone.value != ''">
            {{ errors.phone }}
          </div>
        </div>
        <div class="input-group mb-3" style="max-width: 25rem">
          <el-autocomplete
            v-model="editCity"
            :fetch-suggestions="querySearchCity"
            clearable
            class="inline-input w-80"
            placeholder="Choose city"
            @select="handleSelectCity"
          />
        </div>
        <div class="input-group mb-3" style="max-width: 25rem">
          <input
            v-model="editAddress"
            type="text"
            class="form-control"
            placeholder="Enter address"
            aria-label="address"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-success"
          @click="saveChanges(props.editId)"
          data-bs-dismiss="modal"
          v-if="
            errors.dob.value == '' &&
            errors.name.value == '' &&
            errors.phone.value == ''
          "
        >
          Save changes
        </button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserService from "../../../services/user-service";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  editId: Number,
});

interface City {
  value: string;
}

let editName = ref("");
let editDob = ref("");
let editPhone = ref("");
let editCity = ref("");
let editAddress = ref("");
let errors = {
  dob: ref(""),
  name: ref(""),
  phone: ref(""),
};

const cities = ref<City[]>([]);

const querySearchCity = (queryString: string, cb: any) => {
  const results = queryString
    ? cities.value.filter(createFilterCity(queryString))
    : cities.value;
  cb(results);
};

const createFilterCity = (queryString: string) => {
  return (city: City) => {
    return city.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
  };
};

const emit = defineEmits<{
  (
    e: "update",
    value_1: Number,
    value_2: String,
    value_3: String,
    value_4: String,
    value_5: String,
    value_6: String
  ): void;
}>();

function saveChanges(id: Number) {
  let dobMonth = editDob.value.getMonth() + 1;
  let dobYear = editDob.value.getYear() + 1900;
  let dobConfig = editDob.value.getDate() + "/" + dobMonth + "/" + dobYear;
  emit(
    "update",
    id,
    editName.value,
    dobConfig,
    editPhone.value,
    editCity.value,
    editAddress.value
  );
  this.editName = "";
  this.editDob = "";
  this.editPhone = "";
  this.editCity = "";
  this.editAddress = "";
}

function validate() {
  let isValid = true;
  errors.dob.value = "";
  errors.name.value = "";
  errors.phone.value = "";
  console.log("name" + editName.value);
  if (editDob.value == null) {
    errors.dob.value = "Date of birth is required";
    isValid = false;
  }
  if (editName.value == "") {
    errors.name.value = "Name user is required";
    isValid = false;
  }
  if (editPhone.value == "") {
    errors.phone.value = "Phone number is required";
    isValid = false;
  }
  if (editPhone.value !== "") {
    const isPhoneNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (isPhoneNumber.test(editPhone.value) === false) {
      console.log("****************************" + editPhone.value);
      errors.phone.value = "Wrong phone number format";
    }
    isValid = false;
  }
  return isValid;
}

const getAllCity = async () => {
  let response = await UserService.getCity();
  let k = 0;
  while (k < response.data.length) {
    listCity[k] = {
      value: response.data[k].name,
    };
    k++;
  }
};

const getUserById = async () => {
  console.log(props.editId);
  let response = await UserService.getUserById(props.editId);
  console.log(response);
  if (response.status == 200) {
    editName.value = response.data.fullName;
    let dobConfig = response.data.dob;
    let list = dobConfig.split("/");
    editDob.value = new Date(list[2], list[1] - 1, list[0]);
    editCity.value = response.data.city;
    editPhone.value = response.data.userName;
    editAddress.value = response.data.address;
  }
  console.log(editDob);
};

let listCity = new Array();

const handleSelectCity = (item: City) => {
  console.log(item);
};

watch(
  () => props.editId,
  () => {
    errors.dob.value = "";
    errors.name.value = "";
    errors.phone.value = "";
    if (props.editId !== 0) {
      getUserById();
      getAllCity();
      cities.value = listCity;
    }
  }
);

watch(
  () => editDob,
  () => {
    if (editDob !== null) {
      errors.dob.value = "";
    }
  }
);

watch(
  () => editName.value,
  () => {
    if (editName.value !== "") {
      errors.name.value = "";
    }
  }
);

watch(
  () => editPhone.value,
  () => {
    if (editPhone.value !== "") {
      errors.phone.value = "";
    }
  }
);
</script>
