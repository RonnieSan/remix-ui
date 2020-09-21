// ----------------------------------------------------------------------
// REMIX UI - PREVIEW SCRIPT
// ----------------------------------------------------------------------

// Import dependencies
import Vue from 'vue';
import RemixUI from '@';
import Preview from './Preview.vue';
import { Msg, Toast } from '@';

Vue.use(RemixUI);

Vue.prototype.$msg = Msg;
Vue.prototype.$toast = Toast;

const app = new Vue({
	el : '#app',
	template : '<Preview/>',
	components : {
		Preview
	}
});