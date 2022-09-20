<template>
  <el-container class="layout-container" style="height: 100vh">
    <el-aside width="auto" class="text-light" style="background-color: #263544">
      <el-menu
        :collapse="isCollapse"
        class="text-light"
        style="background-color: #263544; height: 60px !important"
        @open="handleOpen"
        @close="handleClose"
        default-active="2"
      >
        <el-menu-item index="1" @click="changeCollapse" class="menu-item">
          <template #title>
            <el-icon style="font-size: 2.5rem"><Menu /></el-icon>
          </template>
        </el-menu-item>
        <el-menu-item
          index="2"
          style="padding-left: 15px"
          class="menu-item"
          @click="routerHome()"
          :class="{ 'click-menu': clickMenuItem === 1 }"
        >
          <a style="text-decoration: none"
            ><el-icon style="font-size: 2rem; color: #f1f7ff"
              ><HomeFilled
            /></el-icon>
          </a>
          <template #title
            ><a
              style="
                text-decoration: none;
                width: 250px;
                font-size: 20px;
                margin-top: 4px;
                color: #f1f7ff;
              "
              >Home</a
            >
          </template></el-menu-item
        >
        <el-menu-item
          index="3"
          style="padding-left: 15px"
          class="menu-item"
          @click="routerHuman()"
          :class="{ 'click-menu': clickMenuItem === 2 }"
        >
          <a style="text-decoration: none"
            ><el-icon style="font-size: 2rem; color: #f1f7ff"
              ><UserFilled /></el-icon
          ></a>
          <template #title
            ><a
              style="
                text-decoration: none;
                width: 250px;
                font-size: 20px;
                margin-top: 4px;
                color: #f1f7ff;
              "
              >Employee</a
            ></template
          ></el-menu-item
        >
        <el-menu-item
          index="4"
          style="padding-left: 15px"
          class="menu-item"
          @click="routerDevice()"
          :class="{ 'click-menu': clickMenuItem === 3 }"
        >
          <a style="text-decoration: none"
            ><el-icon style="font-size: 2rem; color: #f1f7ff"
              ><Monitor /></el-icon
          ></a>
          <template #title
            ><a
              style="
                text-decoration: none;
                width: 250px;
                font-size: 20px;
                margin-top: 4px;
                color: #f1f7ff;
              "
              >Device</a
            ></template
          ></el-menu-item
        >
        <el-menu-item
          index="5"
          style="padding-left: 15px"
          class="menu-item"
          @click="routerCategory()"
          :class="{ 'click-menu': clickMenuItem === 4 }"
        >
          <a style="text-decoration: none"
            ><el-icon style="font-size: 2rem; color: #f1f7ff"
              ><Monitor /></el-icon
          ></a>
          <template #title
            ><a
              style="
                text-decoration: none;
                width: 250px;
                font-size: 20px;
                margin-top: 4px;
                color: #f1f7ff;
              "
              >Device Category</a
            ></template
          ></el-menu-item
        >
        <el-menu-item
          index="6"
          style="padding-left: 15px"
          class="menu-item"
          @click="routerReport()"
          :class="{ 'click-menu': clickMenuItem === 5 }"
          ><a style="text-decoration: none"
            ><el-icon style="font-size: 2rem; color: #f1f7ff"
              ><Notebook /></el-icon
          ></a>
          <template #title
            ><a
              style="
                text-decoration: none;
                width: 250px;
                font-size: 20px;
                margin-top: 2px;
                color: #f1f7ff;
              "
              >Report</a
            ></template
          ></el-menu-item
        >
        <el-menu-item
          index="7"
          style="padding-left: 15px"
          class="menu-item"
          @click="logout()"
          ><a style="text-decoration: none"
            ><el-icon style="color: #f1f7ff"><Back /></el-icon
          ></a>
          <template #title
            ><a
              style="
                text-decoration: none;
                width: 250px;
                font-size: 20px;
                margin-top: 4px;
                color: #f1f7ff;
              "
              >Logout</a
            ></template
          ></el-menu-item
        >
      </el-menu>
    </el-aside>

    <el-container>
      <div v-if="this.$route.path == '/admin/home'">
        <Home style="width: 100%" :widthHeader="widthHeader" />
      </div>
      <div v-if="this.$route.path == '/admin/human-management'">
        <HumanManagement
          style="width: 100%"
          :addMarginLeft="addMarginLeft"
          :widthHeader="widthHeader"
        />
      </div>
      <div v-if="this.$route.path == '/admin/device-management'">
        <DeviceManagement
          style="width: 100%"
          :addMarginLeft="addMarginLeft"
          :widthHeader="widthHeader"
        />
      </div>
      <div v-if="this.$route.path == '/admin/category-device-management'">
        <CategoryManagemant
          style="width: 100%"
          :addMarginLeft="addMarginLeft"
          :widthHeader="widthHeader"
        />
      </div>
      <div v-if="this.$route.path == '/admin/report'">
        <Report style="width: 100%" :widthHeader="widthHeader" />
      </div>
    </el-container>
  </el-container>
</template>

<script>
import Home from "./Home.vue";
import DeviceManagement from "./DeviceManagement.vue";
import HumanManagement from "./HumanManagement.vue";
import CategoryManagemant from "./CategoryManagemant.vue";
import Report from "./Report.vue";
import { auth } from "../../store/auth-store";
import router from "../../router";

export default {
  data() {
    return {
      isCollapse: false,
      addMarginLeft: 0,
      widthHeader: 0,
      clickMenuItem: 1,
    };
  },
  components: {
    Home,
    DeviceManagement,
    HumanManagement,
    CategoryManagemant,
    Report,
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      this.addMarginLeft = this.isCollapse ? 13 : 0;
      this.widthHeader = this.isCollapse ? 240 : 0;
      console.log(this.addMarginLeft);
    },
    logout() {
      auth.dispatch("logout");
    },
    routerHome() {
      router.push("/admin/home");
      this.clickMenuItem = 1;
    },
    routerHuman() {
      router.push("/admin/human-management");
      this.clickMenuItem = 2;
    },
    routerDevice() {
      router.push("/admin/device-management");
      this.clickMenuItem = 3;
    },
    routerCategory() {
      router.push("/admin/category-device-management");
      this.clickMenuItem = 4;
    },
    routerReport() {
      router.push("/admin/report");
      this.clickMenuItem = 5;
    },
  },
};
</script>

<style scoped>
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container .el-menu {
  border-right: none;
}
.layout-container .el-main {
  padding: 0;
}
.el-menu-item {
  color: aliceblue !important;
  height: 59px;
}

.el-menu-item .is-active {
  background-color: aliceblue;
}

.menu-item:hover {
  background-color: #4099ff;
}
.click-menu {
  /* border-right: 5px solid #b1154a; */
}
</style>
