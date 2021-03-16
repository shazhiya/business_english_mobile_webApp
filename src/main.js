import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import back from './network'
import store from './store'

// element ui
import {Button,Upload,Input,Row,Col,Image, Link,Checkbox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

[Button,Upload,Input,Row,Col,Image, Link,Checkbox].forEach(component=>Vue.use(component))



import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import 'video.js/dist/video-js.css'

import baseCard from "component/card/baseCard";
import commonCard from "component/card/commonCard";
import flexContainer from "component/card/flexContainer";
import navbar from "component/card/navbar";

Vue.config.productionTip = false
Vue.prototype.back = back
Vue.prototype.src = 'http://localhost:9090/'

Vue.component("card", baseCard)
Vue.component("cc", commonCard)
Vue.component("navbar", navbar)
Vue.component("flexContainer", flexContainer)
Vue.use(Vant)

new Vue({
    router: Router,
    store,
    render: h => h(App)
}).$mount('#app')
