<template>
  <el-footer class="d-flex align-items-center justify-content-center">
    <el-icon @click="pageLeft" v-if="pageCurrent !== 1"><CaretLeft /></el-icon>
    <td v-for="i in listPage" style="margin: 4px">
      <div class="d-flex">
        <b
          v-if="
            (i == pageCurrent - 1 && pageCurrent >= 5 && pageCurrent <= numberPage - 3) ||
            ((pageCurrent == this.numberPage ||
              pageCurrent == this.numberPage - 1 ||
              pageCurrent == this.numberPage - 2) &&
              i == pageCurrent - 1)
          "
          style="margin-right: 8px"
        >
          . . .
        </b>
        <a
          v-if="this.pageCurrent == i"
          href="#"
          style="text-decoration: none; color: red"
          @click="changePage(i)"
          >{{ i }}</a
        >
        <a v-else href="#" style="text-decoration: none" @click="changePage(i)">{{
          i
        }}</a>
        <b
          v-if="
            (i == pageCurrent + 1 && pageCurrent >= 4 && pageCurrent <= numberPage - 4) ||
            ((pageCurrent == 1 || pageCurrent == 2 || pageCurrent == 3) &&
              i == pageCurrent + 1)
          "
          style="margin-left: 8px"
        >
          . . .
        </b>
      </div>
    </td>
    <el-icon @click="pageRight" v-if="pageCurrent !== numberPage"><CaretRight /></el-icon>
  </el-footer>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    handleClick() {
      console.log("click");
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
        } else if (this.pageCurrent >= 4 && this.pageCurrent <= this.numberPage - 3) {
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
    },
    pageLeft() {
      if (this.pageCurrent > 1) this.pageCurrent--;
      this.changePage(this.pageCurrent);
    },
    pageRight() {
      if (this.pageCurrent < this.numberPage) this.pageCurrent++;
      this.changePage(this.pageCurrent);
    },
    async allUser() {
      let api_url = null;
      api_url = `http://localhost:8080/users`;
      await axios
        .get(api_url)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      numberPage: 1,
      pageCurrent: 1,
      listPage: [],
    };
  },
  created() {
    this.allUser();
    this.numberPage = 20;
    if (this.numberPage <= 7) {
      for (let i = 1; i <= this.numberPage; i++) {
        this.listPage[i - 1] = i;
      }
    } else {
      this.listPage[0] = 1;
      this.listPage[1] = 2;
      this.listPage[2] = this.numberPage - 1;
      this.listPage[3] = this.numberPage;
    }
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
