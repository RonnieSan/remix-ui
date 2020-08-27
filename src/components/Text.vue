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

<docs>
# Text Input
A basic form text input with optional parameters to give it extra functionality.

## Props
**allowed** String - Characters that are allowed in the value
**autocomplete** String - A boolean string that is passed to the input that will allow browser autocomplete
**disabled** Boolean - If `true`, the field will be disabled
**filter** Function - A function that is passed a single value argument that transforms the value of the field
**mask** String - A masking string (ala vue-the-mask) that transforms the value of the field
**outputMask** Boolean - Set to true if you want additional characters in the mask to be added to the value
**placeholder** String - The placeholder text for the field
**type** String - The type of inpuit field to use

## Usage

Basic Usage
```html
<r-text
	v-model="text_value"
>
```

Masked Input (Phone Number)
```html
<r-text
	v-model="text_value"
	mask="(###) ###-####"
>
// Output Value: ##########
```
</docs>