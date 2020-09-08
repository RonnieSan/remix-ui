<template>
	<div class="text-input">
		<input
			v-if="!mask"
			ref="input"
			:name="name"
			:type="inputType"
			:value="localValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:autocomplete="autocomplete"
			v-on="listeners"
		/>
		<input
			v-if="mask"
			ref="input"
			:name="name"
			:value="display_value"
			:type="inputType"
			:placeholder="placeholder"
			:disabled="disabled"
			:autocomplete="autocomplete"
			v-on="listeners"
			v-mask="maskConfig"
		/>
	</div>
</template>

<script>
import { isNull, isUndefined } from 'lodash-es';
import { mask as vueMask, tokens } from 'vue-the-mask';
import masker from '../lib/Masker';

export default {
	data() {
		return {
			display_value : this.value,
			last_value    : null,
			is_android    : /(android)/i.test(window.navigator.userAgent)
		};
	},
	props : {
		allowed : String,
		autocomplete : String,
		disabled : Boolean,
		filter : Function,
		mask : {
			type : [String, Boolean],
			default : false
		},
		name : String,
		outputMask : Boolean,
		placeholder : String,
		type : String,
		value : [String, Number]
	},
	computed : {
		localValue : {
			get() {
				return this.value;
			},
			set(value) {
				this.inputHandler(null, value);
			}
		},
		inputType() {
			if (isUndefined(this.type) || isNull(this.type) || this.type === '') {
				return 'text';
			}
			return this.type;
		},
		maskConfig() {
			return {
				mask   : this.mask,
				masked : this.masked,
				tokens : tokens
			};
		},
		masked() {
			return this.outputMask;
		},
		allowedCharacters() {
			if (this.allowed) {
				return new RegExp(this.allowed);
			}
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					input(event) {
						if (vm.is_android) {
							vm.$emit('android-input', event.data);
						}
						vm.inputHandler(event);
					},
					keypress(event) {
						let use_default;
						if (vm.$listeners.keypress) {
							use_default = vm.$listeners.keypress(event);
						}
						if (use_default !== false) {
							vm.keypressHandler(event);
						}
					}
				}
			);
		}
	},
	watch : {
		value(new_value) {
			if (new_value !== this.last_value) {
				this.display_value = new_value;
			}
		}
	},
	methods : {
		focus() {
			this.$refs.input.focus();
		},
		select() {
			this.$refs.input.select();
		},
		inputHandler(event, value) {
			if (event) {
				value = event.target.value;
			}

			if (this.mask) {
				if (event.isTrusted) {
					return;
				}
				this.display_value = value;
				value = masker(value, this.mask, this.masked, tokens);
				if (value !== this.last_value) {
					this.last_value = value;
				}
			}

			else {
				if (this.filter) {
					value = this.filter(value);
				}
			}
			this.$emit('input', value);
		},
		keypressHandler(event) {
			if (this.allowed) {
				let character = String.fromCharCode(event.which);
				if (!this.allowedCharacters.test(character)) {
					event.preventDefault();
				}
			}
			this.$emit('keypress', event);
		}
	},
	directives : {
		'mask' : vueMask
	}
};
</script>