// ----------------------------------------------------------------------
// REMIX UI - PREVIEW SCRIPT
// ----------------------------------------------------------------------

// Import dependencies
import Vue from 'vue';
import RemixUI from '@';
import Preview from './Preview.vue';
import Toast from './lib/Toast';
import Msg from './lib/Msg';

Vue.prototype.$toast = Toast.init();
Vue.prototype.$msg   = Msg.init();

Vue.use(RemixUI);

const app = new Vue({
	el : '#app',
	template : '<Preview/>',
	components : {
		Preview
	}
});