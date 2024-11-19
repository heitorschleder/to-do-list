import Vue from "vue";
import App from "./App.vue";
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

import VirtualList from "vue-virtual-scroll-list";

Vue.component("virtual-list", VirtualList);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
