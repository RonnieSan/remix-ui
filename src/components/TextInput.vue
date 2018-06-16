<template>
	<div class="input-box">
		<input
			v-if="!mask"
			ref="input"
			:name="name"
			:type="inputType"
			:value="localValue"
			:placeholder="placeholder"
			:disabled="disabled"
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
			v-on="listeners"
			v-mask="maskConfig"
		/>
	</div>
</template>

<script>
import { isNull, isUndefined } from 'lodash';
import { mask as vueMask, tokens } from 'vue-the-mask';
import masker from 'vue-the-mask/src/masker';

export default {
	data() {
		return {
			display_value : this.value,
			last_value    : null
		};
	},
	props : {
		allowed : {
			type : [String, Boolean],
			default : false
		},
		disabled : {
			type : Boolean,
			default : false
		},
		filter : Function,
		mask : {
			type : [String, Boolean],
			default : false
		},
		name : String,
		number : Boolean,
		outputMask : {
			type : Boolean,
			default : false
		},
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
						vm.inputHandler(event);
					},
					keypress(event) {
						vm.keypressHandler(event);
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
		}
	},
	directives : {
		'mask' : vueMask
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/TextInput.less';
</style>