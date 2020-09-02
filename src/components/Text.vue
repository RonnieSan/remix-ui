<template>
	<div
		:class="['r-text', 'control-border', 'focusable', {disabled}]"
	>
		<slot name="left"></slot>
		<text-input
			ref="input"
			v-bind="$props"
			v-on="listeners"
		/>
		<slot name="right"></slot>
	</div>
</template>

<script>
import TextInput from './TextInput';
import formField from '../mixins/formField';

export default {
	components : {
		TextInput
	},
	props : {
		allowed : String,
		autocomplete : String,
		disabled : Boolean,
		filter : Function,
		mask : String,
		outputMask : Boolean,
		placeholder : String,
		type : String,
		value : [String, Number]
	},
	computed : {
		listeners() {
			const vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					input(event) {
						vm.dirty = true;
						vm.inputHandler(event);
						vm.validate();
					},
					blur(event) {
						let use_default;
						if (vm.$listeners.blur) {
							use_default = vm.$listeners.blur(event);
						}
						if (use_default !== false) {
							vm.touched = true;
							vm.validate();
						}
					}
				}
			);
		}
	},
	methods : {
		inputHandler(value) {
			this.$emit('input', value);
		}
	},
	mixins : [
		formField
	]
};
</script>