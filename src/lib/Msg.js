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
	template : `<modal ref="msg" :class="['msg', type]" :close-on-esc="type === 'alert'" :close-on-click="type === 'alert'" :max-width="max_width">
		<template v-slot="modal">
			<section class="title-bar" v-if="title">{{title}}</section>
			<section class="message" v-html="message"></section>
			<section class="input">
				<button ref="cancel_btn" v-if="type === 'confirm'" type="button" class="text" @click="closeMsg(false)">
					<span class="label">{{decline}}</span>
				</button>
				<button ref="accept_btn" type="button" @click="closeMsg(true)">
					<span class="label">{{accept}}</span>
				</button>
			</section>
		</template>
	</modal>`,
	methods : {
		// Open an alert box with a message
		alert(settings) {
			if (typeof settings === 'string') {
				settings = {
					message : settings
				};
			}

			this.type      = 'alert';
			this.title     = settings.title || false;
			this.message   = settings.message;
			this.accept    = settings.confirm || settings.accept || 'OK';
			this.max_width = settings.width || '400px';

			this.$refs.msg.open()
				.then(() => {
					this.$refs.accept_btn.focus();
				});

			return new Promise((resolve, reject) => {
				this.promise = { resolve, reject };
			});
		},

		// Open a confirmation modal
		confirm(settings) {
			if (typeof settings === 'string') {
				settings = {
					message : settings
				};
			}
			
			this.type      = 'confirm';
			this.title     = settings.title || false;
			this.message   = settings.message || settings.prompt;
			this.accept    = settings.confirm || settings.accept || 'OK';
			this.decline   = settings.decline || 'Cancel';
			this.max_width = settings.width || '400px';

			this.$refs.msg.open()
				.then(() => {
					this.$refs.cancel_btn.focus();
				});

			return new Promise((resolve, reject) => {
				this.promise = { resolve, reject };
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
		Modal
	}
});

export default function() {
	// Create the #msg element and append to the DOM
	let el = document.getElementById('msg');
	if (!el) {
		el = document.createElement('div');
		el.id = 'msg';
		document.body.appendChild(el);
	}

	// Create an instance of the msg component
	const msg = new Msg();

	// Mount the msg component to the DOM
	msg.$mount(el);

	return msg;
};