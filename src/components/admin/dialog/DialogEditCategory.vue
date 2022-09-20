<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Edit category device</h4>
      </div>
      <div class="modal-body">
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
          @click="updateCategory()"
          class="btn btn-success"
          data-bs-dismiss="modal"
          v-if="errors.name.value == '' && name != ''"
        >
          Save
        </button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";
import CategoryService from "../../../services/category-service";

const props = defineProps({
  editId: Number,
});

let name = ref("");
let description = ref("");
let errors = {
  name: ref(""),
};

const getCategoryById = async () => {
  let response = await CategoryService.getCategoryById(props.editId);
  console.log(response);
  if (response.status == 200) {
    name.value = response.data.name;
    description.value = response.data.description;
  }
};

const emit = defineEmits<{
  (e: "update", value_1: Number, value_2: string, value_3: string): void;
}>();

function updateCategory() {
  emit("update", props.editId, name.value, description.value);
  name.value = "";
  description.value = "";
}

function validate() {
  let isValid = true;
  errors.name.value = "";
  if (name.value == "") {
    errors.name.value = "Name category device is required";
    isValid = false;
  }
  return isValid;
}

watch(
  () => name.value,
  () => {
    if (name.value !== "") {
      errors.name.value = "";
    }
  }
);

watch(
  () => props.editId,
  () => {
    errors.name.value = "";
    if (props.editId !== 0) {
      getCategoryById();
    }
  }
);
</script>
