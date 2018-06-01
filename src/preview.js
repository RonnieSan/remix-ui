// ----------------------------------------------------------------------
// REMIX UI - PREVIEW SCRIPT
// ----------------------------------------------------------------------

// Import dependencies
import Vue from 'vue';
import RemixUI from '@';
import Preview from './Preview.vue';

Vue.use(RemixUI);

const app = new Vue({
	el : '#app',
	template : '<preview/>',
	components : {
		Preview
	}
});