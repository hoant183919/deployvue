<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">View request</h4>
      </div>
      <div class="modal-body">
        <el-table :data="tableData" stripe border>
          <el-table-column prop="requester.id" label="ID" width="50">
          </el-table-column>
          <el-table-column
            prop="requester.fullName"
            label="Name User"
            width="auto"
          >
          </el-table-column>
          <el-table-column align="left" width="200">
            <template v-slot="scope">
              <el-button
                v-model="acceptId"
                v-if="acceptId == -1"
                size="default"
                type="success"
                role="button"
                @click="accept(scope.row)"
                >Accept
              </el-button>
              <el-button
                v-model="acceptId"
                v-if="acceptId == scope.row.requester.id"
                size="default"
                type="danger"
                role="button"
                @click="cancelAccept()"
                >Cancel accept
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="saveChanges()"
          class="btn btn-success"
          data-bs-dismiss="modal"
        >
          Save changes
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
import { watch, ref } from "vue";
import DeviceRequestService from "../../../services/device-request-service";

const props = defineProps({
  requestId: Number,
});

let acceptId = ref();

let tableData = ref([]);

const getDeviceRequestById = async () => {
  let response = await DeviceRequestService.getDeviceRequest(props.requestId);
  if (response.status == 200) {
    tableData.value = response.data;
  }
  console.log(acceptId);
  acceptId.value = -1;
};

const emit = defineEmits<{
  (e: "accept", value_1: Number, value_2: Number): void;
  (e: "close");
}>();

function saveChanges() {
  let id = props.requestId;
  this.props.requestId = 0;
  emit("accept", id, acceptId.value);
  tableData.value = [];
  this.tableData = [];
  acceptId.value = -1;
}

function close() {
  tableData.value = [];
  acceptId.value = -1;
  emit("close");
}

function accept(row) {
  acceptId.value = row.requester.id;
  console.log(acceptId.value);
}

function cancelAccept() {
  acceptId.value = -1;
  console.log(acceptId.value);
}

watch(
  () => props.requestId,
  () => {
    if (props.requestId !== 0) {
      getDeviceRequestById();
    }
  }
);
</script>
