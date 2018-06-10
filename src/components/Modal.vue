<template>
	<div class="modal-container" @click="clickContainer">
		<div class="modal-window" :style="{maxWidth : maxWidth}">
			<div class="modal-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			is_open : false
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

						// Open the modal
						self.modal.classList.add('open');

						// Trigger the opened method
						self.$emit('open', self);

						resolve(self);
					}, 0);
				}

				else {
					// Open the modal
					self.modal.classList.add('open');

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
			if (this.closeOnEsc) {
				let code = event.code;
				if (code === 'Escape' && this.matches(this.modal, ':last-child') && this.is_open) {
					this.close();
				}
			}
		},
		reset() {
			this.parent.appendChild(this.modal);
		},
		matches(el, selector) {
			let p = Element.prototype;
			let f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
				return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
			};
			return f.call(el, selector);
		}
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
		this.parent    = this.$el.parentNode;
		this.layer     = document.getElementById('modal-layer');
		this.overlay   = document.getElementById('modal-overlay');
		this.modal     = this.$el;
		this.window    = this.$el.querySelector('.modal-window');

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

		// Append the modal to the modal layer
		this.layer.appendChild(this.$el);

		if (window.innerHeight < this.window.style.height) {
			// Make the container scrollable
			this.modal.style.overflowY = 'auto';
		}

		// Add the close modal event to any element with the .close-modal class
		this.$el.querySelectorAll('.close-modal').forEach((el) => {
			el.addEventListener('click', this.close);
		});
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.escPressed);
		this.layer.removeChild(this.modal);
		this.$el.querySelectorAll('.close-modal').forEach((el) => {
			el.removeEventListener('click', this.close);
		});
	}
};
</script>

<style lang="less" scoped>
// Default variables
@modal-easing: ease-out;
@modal-speed: 250ms;

// Import themes
@import (optional, reference) '~theme';

@keyframes spin {

	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}

}

.modal-container {
	opacity: 0;
	transition: opacity @modal-speed @modal-easing;
	display: flex;
	height: 100%;
	height: 100vh;
	left: 0;
	overflow-y: scroll;
	padding: 20px;
	position: fixed;
	top: 0;
	width: 100%;
	width: 100vw;

	&.open {
		opacity: 0.25;
		transition: opacity @modal-speed @modal-easing;

		.modal-window {
			transform: scale(0.95,0.95);
			transition: all @modal-speed @modal-easing;
		}
	}

	&.open:last-child {
		opacity: 1;
		transition: opacity @modal-speed @modal-easing;

		.modal-window {
			transform: scale(1,1);
			transition: all @modal-speed @modal-easing;
		}
	}
}

.modal-window {
	transform: scale(1.10,1.10);
	transition: all @modal-speed @modal-easing;
	background-color: #FFF;
	box-shadow: 0 0 20px rgba(0,0,0,0.1);
	display: block;
	margin: auto;
	width: calc(100% - 40px);

	& > .modal-content {
		height: 100%;
		width: 100%;

		/deep/ iframe {
			opacity: 0;
			transition: all @modal-speed @modal-easing;
			vertical-align: baseline;

			&.loaded {
				opacity: 1;
				transition: all @modal-speed @modal-easing;
			}
		}
	}
}

.modal-content {
	transition: all @modal-speed @modal-easing;

	&.loading {
		transition: all @modal-speed @modal-easing;
		padding: 50px;

		.modal-loader {
			display: block;
		}
	}
}

.modal-loader {
	animation: spin 1s linear infinite;
	border: 3px solid fade(black, 15%);
	border-radius: 25px;
	border-top: 3px solid #000;
	display: none;
	height: 50px;
	margin: auto;
	width: 50px;
}

// Set a min width on system messages
.modal-container.msg {
	.modal-window {
		max-width: 400px;
		width: 100%;
	}

	.actions {
		padding: 0.635em 1.25em;
		text-align: right;
	}

	&.alert .actions {
		text-align: center;
	}
}
</style>

<style lang="less">
// Default variables
@modal-easing: ease-out;
@modal-layer: 600;
@modal-overlay-color: #000;
@modal-overlay-opacity: 0.65;
@modal-speed: 250ms;
@tablet-window-min: 768px;

// Import themes
@import (optional, reference) '~theme';

html.no-scroll {
	overflow: hidden;

	@media screen and (min-width: @tablet-window-min) {
		padding-right: 1em;
	}
}

#modal-layer {
	display: none;
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: @modal-layer;
}

#modal-overlay {
	opacity: 0;
	transition: opacity @modal-speed @modal-easing;
	background-color: @modal-overlay-color;
	height: 100%;
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	width: 100vw;
	z-index: 0;

	&.open {
		opacity: @modal-overlay-opacity;
		transition: opacity @modal-speed @modal-easing;
	}
}
</style>