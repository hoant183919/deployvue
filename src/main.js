import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {auth} from './store/auth-store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const optionsVueSweetalert2 = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

app.use(router)
app.use(ElementPlus)
app.use(VueSweetalert2, optionsVueSweetalert2)
app.use(auth)
app.mount('#app')
