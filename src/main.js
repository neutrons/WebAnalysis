// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'font-awesome/css/font-awesome.css';
import 'material-design-icons/iconfont/material-icons.css';

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueWorker from 'vue-worker';
import './stylus/main.styl';

import App from './App';
import router from './router';
import store from './store/index';

Vue.use(Vuetify);
Vue.use(VueWorker);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
