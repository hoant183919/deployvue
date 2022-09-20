<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add employee</h4>
      </div>
      <div class="modal-body">
        <div class="input-group mb-3" style="max-width: 25rem">
          <div class="block">
            <el-date-picker
              v-model="addDob"
              type="date"
              placeholder="Enter date of birth"
              :default-value="new Date(2000, 1, 1)"
              aria-label="dob"
              aria-describedby="basic-addon1"
              @input="dateChange"
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
            type="text"
            class="form-control"
            placeholder="Enter name"
            aria-label="name"
            aria-describedby="basic-addon1"
            v-model="addName"
            @blur="validate()"
            v-bind:class="{ 'is-invalid': errors.name.value !== '' }"
          />
          <div class="invalid-feedback" v-if="errors.name.value != ''">
            {{ errors.name }}
          </div>
        </div>
        <div class="input-group mb-3" style="max-width: 25rem">
          <input
            type="text"
            class="form-control"
            placeholder="Enter phone"
            aria-label="phone"
            aria-describedby="basic-addon1"
            v-model="addPhone"
            @blur="validate()"
            v-bind:class="{ 'is-invalid': errors.phone.value !== '' }"
          />
          <div class="invalid-feedback" v-if="errors.phone.value != ''">
            {{ errors.phone }}
          </div>
        </div>
        <div class="input-group mb-3" style="max-width: 25rem">
          <el-autocomplete
            v-model="cityChose"
            :fetch-suggestions="querySearchCity"
            clearable
            class="inline-input w-80"
            placeholder="Choose city"
            @select="handleSelectCity"
          />
        </div>
        <div class="input-group mb-3" style="max-width: 25rem">
          <input
            type="text"
            class="form-control"
            placeholder="Enter address"
            aria-label="address"
            aria-describedby="basic-addon1"
            v-model="addAddress"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="
            addHuman(
              this.addName,
              this.addDob,
              this.addPhone,
              this.cityChose,
              this.addAddress
            )
          "
          class="btn btn-success"
          data-bs-dismiss="modal"
          v-if="
            errors.dob.value == '' &&
            errors.name.value == '' &&
            errors.phone.value == '' &&
            addDob !== null &&
            addName !== '' &&
            addPhone !== ''
          "
        >
          Add
        </button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import UserService from "../../../services/user-service";

interface City {
  value: string;
}

let addName = ref("");
const addDob = ref("");
let addPhone = ref("");
let cityChose = ref("");
let addAddress = ref("");
let errors = {
  dob: ref(""),
  name: ref(""),
  phone: ref(""),
};

let cities = ref<City[]>([]);

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

function dateChange(date) {
  console.log(date);
  this.addDob = date;
}

function validate() {
  let isValid = true;
  errors.dob.value = "";
  errors.name.value = "";
  errors.phone.value = "";
  console.log("name" + addName.value);
  if (addDob.value == null) {
    errors.dob.value = "Date of birth is required";
    isValid = false;
  }
  if (addName.value == "") {
    errors.name.value = "Name user is required";
    isValid = false;
  }
  if (addPhone.value == "") {
    errors.phone.value = "Phone number is required";
    isValid = false;
  }
  if (addPhone.value !== "") {
    const isPhoneNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (isPhoneNumber.test(addPhone.value) === false) {
      console.log("****************************" + addPhone.value);
      errors.phone.value = "Wrong phone number format";
    }
    isValid = false;
  }
  return isValid;
}
const emit = defineEmits<{
  (
    e: "add",
    value_1: String,
    value_2: String,
    value_3: String,
    value_4: String,
    value_5: String
  ): void;
}>();

function addHuman(
  name: String,
  dob: String,
  phone: String,
  city: String,
  address: String
) {
  this.addName = "";
  this.addDob = "";
  this.addPhone = "";
  this.cityChose = "";
  this.addAddress = "";
  let dobMonth = dob.getMonth() + 1;
  let dobYear = dob.getYear() + 1900;
  let dobConfig = dob.getDate() + "/" + dobMonth + "/" + dobYear;
  console.log(dobConfig);
  emit("add", name, dobConfig, phone, city, address);
}

let listCity = new Array();

const handleSelectCity = (item: City) => {
  console.log(item);
};

onMounted(() => {
  errors.dob.value = "";
  errors.name.value = "";
  errors.phone.value = "";
  getAllCity();
  console.log(listCity);
  cities.value = listCity;
});

watch(
  () => addDob.value,
  () => {
    if (addDob.value !== "") {
      errors.dob.value = "";
    }
  }
);

watch(
  () => addName.value,
  () => {
    if (addName.value !== "") {
      errors.name.value = "";
    }
  }
);

watch(
  () => addPhone.value,
  () => {
    if (addPhone.value !== "") {
      errors.phone.value = "";
    }
  }
);
</script>
