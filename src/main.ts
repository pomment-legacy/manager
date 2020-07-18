import 'normalize.css/normalize.css';
import './vendors/fluidable.scss';
import './vendors/2020-toggles.scss';

import Vue from 'vue';
import Notifications from 'vue-notification';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(Notifications);
Vue.config.productionTip = false;

Vue.directive('scroll', {
    inserted(el, binding) {
        const f = (evt: Event) => {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f);
            }
        };
        window.addEventListener('scroll', f);
    },
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
