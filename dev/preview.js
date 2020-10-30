// ----------------------------------------------------------------------
// REMIX UI - PREVIEW SCRIPT
// ----------------------------------------------------------------------

// Import dependencies
import Vue from 'vue';
import RemixUI from '@';
import Preview from './Preview.vue';
import { Msg } from '@';

Vue.use(RemixUI);

Vue.prototype.$msg = Msg;

const app = new Vue({
	el : '#app',
	template : '<Preview/>',
	components : {
		Preview
	}
});