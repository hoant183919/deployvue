<template>
  <div>
    <div>
      <div v-if="this.$route.path == '/'">
        <nav class="navbar navbar-expand-lg bg-info">
          <div class="container-fluid">
            <a class="navbar-brand text-light" href="#">
              <img src="../favicon.ico" alt="" width="50" height="50"/>TOPIC 3
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse flex-row-reverse bd-highlight"
              id="navbarNavDropdown"
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a
                    class="btn-header"
                    href="/login"
                    >Login</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          class="bg-image"
          style="
            background-image: url('../../../public/images/background2.jpg');
            background-size: cover;
            height: calc(100vh - 76px);
          "
        >
          <div class="h-100 d-flex align-items-center justify-content-center">
            <div>
              <h1 class="d-flex justify-content-center text-light">
                T1 - ReportTeam
              </h1>
              <br>
              <h1 class="d-flex justify-content-center text-light">
                Ngo Trung Hoa
              </h1>
              <h1 class="d-flex justify-content-center text-light">
                Duong Duc Anh
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
// import Home from "./components/Home.vue";
// export default {
//   components: { Home },
// };
</script>
<style>
.navbar .container-fluid,
.navbar-expand-lg .navbar-collapse,
.navbar-expand-lg .navbar-nav {
  flex-direction: row;
  align-items: flex-end;
}

.btn-header {
  background-color: #008CBA;
  border: 2px solid white;
  color: white;
  padding: 6px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.btn-header:hover {
  background-color: white;
  color: black;
  border: 2px solid #008CBA;
}
</style>