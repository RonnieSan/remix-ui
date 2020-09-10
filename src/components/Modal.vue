<template>
	<div :class="['modal-container', {'open' : is_open}]" @click="clickContainer">
		<div class="modal-window" :style="{maxWidth : maxWidth}">
			<div class="modal-content">
				<slot v-bind="self"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			is_open : false,
			parent  : null,
			layer   : null,
			overlay : null,
			modal   : null,
			window  : null
		};
	},
	props : {
		closeOnClick : {
			type : Boolean,
			default : true
		},
		closeOnEsc : {
			type : Boolean,
			default : true
		},
		maxWidth : {
			type : String,
			default : '1200px'
		}
	},
	computed : {
		self() {
			return this;
		}
	},
	methods : {
		open() {
			const self = this;
			return new Promise((resolve, reject) => {
				// Make this the last-child in modal-layer
				self.layer.appendChild(self.modal);

				// Trigger the beforeOpen method
				self.$emit('beforeOpen', self);

				// Remove focus
				self.last_focus = document.activeElement;
				document.activeElement.blur();

				// Get the count of open modals
				let open_modals = self.layer.querySelectorAll('.modal-container.open').length;

				// Disable scrolling on the document
				document.documentElement.classList.add('no-scroll');

				// Set the z-index of the modal
				self.modal.style.zIndex = 500 + (open_modals * 10);

				// Check if other modals are open
				if (open_modals === 0) {
					// Show the modal layer
					self.layer.style.display = 'block';

					setTimeout(() => {
						// Open the modal overlay
						self.overlay.classList.add('open');

						// Trigger the opened method
						self.$emit('open', self);

						resolve(self);
					}, 0);
				}

				else {
					// Trigger the opened method
					self.$emit('open', self);

					resolve(self);
				}

				self.is_open = true;
			});

		},
		close(value) {
			const self = this;
			return new Promise((resolve, reject) => {
				// Trigger the beforeClose method
				self.$emit('beforeClose', self);

				// Get the count of open modals
				let open_modals = self.layer.querySelectorAll('.modal-container.open').length;

				// Close the modal
				self.modal.classList.remove('open');

				if (open_modals === 1) {
					// Close the overlay
					self.overlay.classList.remove('open');

					setTimeout(() => {
						self.layer.style.display = 'none';

						// Trigger the closed method
						self.$emit('close', value);

						resolve(self);
					}, 150);
				}

				else {
					// Move the modal back to the beginning of the modal layer
					setTimeout(() => {
						self.overlay.parentNode.insertBefore(self.modal, self.overlay.nextSibling);

						// Trigger the closed method
						self.$emit('close', value);

						resolve(value);
					}, 150);
				}

				// Reset the z-index of the modal
				self.modal.style.zIndex = 500;

				// Make the document scrollable again
				document.documentElement.classList.remove('no-scroll');

				// Restore focus
				self.last_focus.focus();

				self.is_open = false;
			});
		},
		clickContainer() {
			if (this.closeOnClick !== false) {
				this.close();
			}
		},
		escPressed(event) {
			let matches = (el, selector) => {
				let p = Element.prototype;
				let f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
					return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
				};
				return f.call(el, selector);
			};

			if (this.closeOnEsc) {
				let code = event.code;
				if (code === 'Escape' && matches(this.modal, ':last-child') && this.is_open) {
					this.close();
				}
			}
		},
	},
	beforeCreate() {
		if (!document.querySelector('#modal-layer')) {
			// Append a modal layer if it doesn't exist
			let $modal_layer = document.createElement('div');
			$modal_layer.id = 'modal-layer';
			document.querySelector('body').appendChild($modal_layer);

			// Append a modal overlay if it doesn't exist
			let $modal_overlay = document.createElement('div');
			$modal_overlay.id = 'modal-overlay';
			$modal_layer.appendChild($modal_overlay);
		}
	},
	created() {
		if (this.escPressed !== false) {
			window.addEventListener('keydown', this.escPressed);
		}
	},
	mounted() {
		// Create references
		this.parent  = this.$el.parentNode;
		this.layer   = document.getElementById('modal-layer');
		this.overlay = document.getElementById('modal-overlay');
		this.modal   = this.$el;
		this.window  = this.$el.querySelector('.modal-window');

		// Add layers if they don't exist
		if (!this.layer) {
			this.layer = document.createElement('div');
			this.layer.setAttribute('id', 'modal-layer');
			document.body.append(this.layer);
		}

		if (!this.overlay) {
			this.overlay = document.createElement('div');
			this.overlay.setAttribute('id', 'modal-overlay');
			this.layer.append(this.overlay);
		}

		// Prevent clicks on the window from propagating
		this.window.addEventListener('click', (event) => {
			event.stopPropagation();
		});

		function insertAfter(el, referenceNode) {
			referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
		}

		// Append the modal to the modal layer
		insertAfter(this.$el, this.overlay);

		if (window.innerHeight < this.window.style.height) {
			// Make the container scrollable
			this.modal.style.overflowY = 'auto';
		}

		// Add the close modal event to any element with the .close-modal class
		let close_els = this.$el.querySelectorAll('.close-modal');
		for (let n = 0; n < close_els.length; n++) {
			close_els[n].addEventListener('click', this.close);
		}
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.escPressed);
		let close_els = this.$el.querySelectorAll('.close-modal');
		for (let n = 0; n < close_els.length; n++) {
			close_els[n].removeEventListener('click', this.close);
		}
		if (this.is_open) {
			this.close()
				.then(() => {
					this.layer.removeChild(this.modal);
				});
		}
		else {
			this.layer.removeChild(this.modal);
		}
	}
};
</script>