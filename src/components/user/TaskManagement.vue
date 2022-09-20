<template>
  <el-container class="layout-container" style="height: 100vh">
    <el-aside width="auto" class="text-light" style="background-color: #263544">
      <el-menu
        :collapse="isCollapse"
        class="text-light"
        style="background-color: #263544; height: 60px"
        @open="handleOpen"
        @close="handleClose"
        default-active="2"
      >
        <el-menu-item index="1" @click="changeCollapse" class="menu-item">
          <template #title>
            <el-icon style="font-size: 2.5rem"><Menu /></el-icon>
          </template>
        </el-menu-item>
        <el-menu-item index="2" style="padding-left: 15px" class="menu-item">
          <a @click="routerHome" style="text-decoration: none"
            ><el-icon style="font-size: 2rem; color: #f1f7ff"><HomeFilled /></el-icon>
          </a>
          <template #title
            ><a
              @click="routerHome"
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
        <el-menu-item index="4" style="padding-left: 15px" class="menu-item">
          <a @click="routerDevice" style="text-decoration: none"
            ><el-icon style="font-size: 2rem; color: #f1f7ff"><Monitor /></el-icon
          ></a>
          <template #title
            ><a
              @click="routerDevice"
              style="
                text-decoration: none;
                width: 250px;
                font-size: 20px;
                margin-top: 4px;
                color: #f1f7ff;
              "
              >Device Request</a
            ></template
          ></el-menu-item
        >
        <el-menu-item
          index="6"
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
      <el-main>
        <div v-if="this.$route.path == `/user/home/${this.$route.params.id}`">
          <Home />
        </div>
        <div>
          <el-scrollbar
            v-if="this.$route.path == `/user/device/${this.$route.params.id}`"
          >
            <Device />
          </el-scrollbar>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Home from "./Home.vue";
import Device from "./Device.vue";
import router from "../../router";
import { auth } from "../../store/auth-store";

export default {
  components: {
    Home,
    Device,
  },
  data() {
    return {
      isCollapse: false,
      addMarginLeft: 0,
      widthHeader: 0,
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      this.addMarginLeft = this.isCollapse ? 13 : 0;
      this.widthHeader = this.isCollapse ? 250 : 0;
      console.log(this.addMarginLeft);
    },
    routerHome() {
      router.push(`/user/home/${this.$route.params.id}`);
    },
    routerDevice() {
      router.push(`/user/device/${this.$route.params.id}`);
    },
    logout() {
      auth.dispatch("logout");
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
</style>
