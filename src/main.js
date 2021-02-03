import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import back from './network'
import store from './store'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';

import baseCard from "component/card/baseCard";
import flexContainer from "component/card/flexContainer";

Vue.config.productionTip = false
Vue.prototype.back = back
Vue.prototype.src = 'http://192.168.42.5:9090/'

Vue.use(elementUi)
Vue.component("card",baseCard)
Vue.component("flexContainer",flexContainer)

Vue.use(Vant)

new Vue({
  router: Router,
  store,
  render: h => h(App)
}).$mount('#app')
