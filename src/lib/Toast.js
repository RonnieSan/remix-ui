// ------------------------------------------------------------
// REBOOT - TOAST LIBRARY
// Popup messages like from a toaster
// ------------------------------------------------------------

// Import dependencies
import Vue from 'vue';
import { uniqueId } from 'lodash-es';
import Icon	from '../components/Icon';

const Toast = Vue.extend({
	template : `<div id="toast">
		<transition-group name="toast" tag="div">
			<div v-for="message in queue" :class="['message', message.type]" :key="message.id">
				<div v-if="message.icon" class="type-icon"><icon :type="icon(message)" size="24"/></div>
				<div class="content">
					<div v-if="message.title" class="title">{{message.title}}</div>
					<div v-html="message.content"></div>
				</div>
				<div class="close" @click="remove(message.id)"><icon type="close" size="24"/></div>
			</div>
		</transition-group>
	</div>`,
	data() {
		return {
			queue : [],
			timeout : 3000
		};
	},
	methods : {
		setDefaultTimeout(timeout) {
			this.timeout = timeout;
		},

		setParent(parent_selector) {
			document.querySelector(parent_selector).append(this.$el);
		},

		// Return the correct icon
		icon(message) {
			if (message.icon !== false) {
				if (typeof message.icon === 'string') {
					return message.icon;
				}
				else {
					switch(message.type) {
						case 'info':
							return 'information';
							break;
						case 'success':
							return 'check';
							break;
						case 'warning':
							return 'alert';
							break;
						case 'error':
							return 'alert-octagon';
							break;
					}
				}
			}
			return null;
		},

		// Push a toast message onto the queue
		add(params) {
			let id = uniqueId('toast-');
			this.queue.unshift({
				id      : id,
				icon    : params.icon || false,
				title   : params.title || null,
				content : params.message,
				type    : params.type || 'info'
			});
			setTimeout(() => {
				this.remove(id);
			}, params.timeout || this.timeout);
		},

		// Remove a toast message from the queue
		remove(id) {
			this.queue.forEach((item, index) => {
				if (item.id === id) {
					this.queue.splice(index, 1);
				}
			});
		},

		// Add a success message to the queue
		success(message, timeout) {
			this.add({
				icon    : true,
				title   : 'Success',
				message : message,
				type    : 'success',
				timeout : timeout
			});
		},

		// Add an error message to the queue
		error(message, timeout) {
			this.add({
				icon    : true,
				title   : 'Error',
				message : message,
				type    : 'error',
				timeout : timeout
			});
		},

		// Add an info message to the queue
		info(message, timeout) {
			this.add({
				icon    : true,
				title   : 'Information',
				message : message,
				type    : 'info',
				timeout : timeout
			});
		},

		// Add a warning message to the queue
		warning(message, timeout) {
			this.add({
				icon    : true,
				title   : 'Warning',
				message : message,
				type    : 'warning',
				timeout : timeout
			});
		}
	},
	components : {
		Icon
	}
});

// Create the #toast element and append to the DOM
let toast = document.getElementById('toast');
if (!toast) {
	toast = document.createElement('div');
	toast.id = 'toast';
	document.body.appendChild(toast);
}

// Create an instance of the toast component
const toaster = new Toast();

// Mount the toast component to the DOM
toaster.$mount('#toast');

// Export the toaster
export default toaster;