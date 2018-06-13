// ------------------------------------------------------------
// REMIX - SYSTEM MESSAGE LIBRARY
// Pop an alert message or confirmation in a modal
// ------------------------------------------------------------

// Import dependencies
import Vue from 'vue';
import Modal from '../components/Modal';

const Msg = Vue.extend({
	data() {
		return {
			type      : '',
			title     : '',
			message   : '',
			accept    : 'OK',
			decline   : 'Cancel',
			max_width : '400px',
			promise   : null
		};
	},
	template : '<modal ref="msg" :class="[\'msg\', type]" :close-on-esc="type === \'alert\'" :close-on-click="type === \'alert\'" :max-width="max_width">' +
		'<section class="title-bar" v-if="title">{{title}}</section>' +
		'<section class="message" v-html="message"></section>' +
		'<section class="input">' +
			'<button v-if="type === \'confirm\'" type="button" class="text" @click="closeMsg(false)">' +
				'<span class="label">{{decline}}</span>' +
			'</button>' +
			'<button type="button" @click="closeMsg(true)">' +
				'<span class="label">{{accept}}</span>' +
			'</button>' +
		'</section>' +
	'</modal>',
	methods : {
		// Open an alert box with a message
		alert(options) {
			this.type = 'alert';

			if (typeof options === 'string') {
				options = {
					message : options
				};
			}

			return new Promise((resolve, reject) => {
				this.title   = options.title || false;
				this.message = options.message;
				this.accept  = options.accept || 'OK';
				this.$refs.msg.open();

				this.promise = {
					resolve,
					reject
				};
			});
		},

		// Open a confirmation modal
		confirm(options) {
			this.type = 'confirm';

			if (typeof options === 'string') {
				options = {
					message : options
				};
			}

			return new Promise((resolve, reject) => {
				this.title     = options.title || false;
				this.message   = options.message || options.prompt;
				this.accept    = options.accept || 'OK';
				this.decline   = options.decline || 'Cancel';
				this.max_width = options.width || '400px';
				this.$refs.msg.open();

				this.promise = {
					resolve,
					reject
				};
			});
		},

		// Close the notification
		closeMsg(value) {
			this.$refs.msg.close()
				.then(() => {
					// Reset the values
					this.title   = '';
					this.message = '';
					this.promise = null;
				});

			if (value === true) {
				this.promise.resolve(true);
			}
			else {
				this.promise.resolve(false);
			}
		}
	},
	components : {
		'modal' : Modal
	}
});


// Export the msg
export default {
	init : function() {
		// Create the #msg element and append to the DOM
		let el = document.querySelector('#msg');
		if (!el) {
			el = document.createElement('div');
			el.id = 'msg';
			document.querySelector('body').appendChild(el);
		}

		// Create an instance of the msg component
		const msg = new Msg();

		// Mount the msg component to the DOM
		msg.$mount('#msg');

		return msg;
	}
};