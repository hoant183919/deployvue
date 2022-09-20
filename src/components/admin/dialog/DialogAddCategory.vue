<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add category device</h4>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
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
          @click="addCategory(this.name, this.description)"
          class="btn btn-success"
          data-bs-dismiss="modal"
          v-if="errors.name.value == '' && name != ''"
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

let name = ref("");
let description = ref("");
let errors = {
  name: ref(""),
};

const emit = defineEmits<{
  (e: "add", value_1: string, value_2: string): void;
}>();

function addCategory(name: string, description: string) {
  emit("add", name, description);
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
</script>
