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

import { VueHammer } from 'vue2-hammer'

import baseCard from "component/card/baseCard";
import flexContainer from "component/card/flexContainer";

Vue.config.productionTip = false
Vue.prototype.back = back
Vue.prototype.src = 'http://localhost:9090/'

Vue.use(elementUi)
Vue.component("card", baseCard)
Vue.component("flexContainer", flexContainer)

Vue.use(Vant)

Vue.use(VueHammer)
VueHammer.config.swipe = {
    threshold: 200
};
new Vue({
    router: Router,
    store,
    render: h => h(App)
}).$mount('#app')
