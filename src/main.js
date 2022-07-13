import Vue from "vue";
import VeeValidate from "vee-validate";
import Vuex from "vuex";
import { store } from "./Stores";
import { router } from "./Routes";
import App from "./App.vue";

import vuetify from "./Plugins/vuetify";

Vue.use(VeeValidate);
Vue.use(Vuex);
Vue.config.productionTip = false;

import { configureFakeBackend } from "./Middlewares";
configureFakeBackend();

new Vue({
	el: "#app",
	vuetify,
	router,
	store,
	render: (h) => h(App),
});
