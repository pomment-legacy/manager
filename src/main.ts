import 'normalize.css/normalize.css';
import './vendors/fluidable.scss';

import Vue from 'vue';
import Notifications from 'vue-notification';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(Notifications);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
