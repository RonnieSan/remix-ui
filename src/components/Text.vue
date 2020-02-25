<template>
	<div
		tabindex="-1"
		class="input-wrapper"
	>
		<slot name="left"></slot>
		<text-input
			ref="input"
			:allowed="allowed"
			:autocomplete="autocomplete"
			:disabled="disabled"
			:filter="filter"
			:mask="mask"
			:name="name"
			:number="number"
			:output-mask="outputMask"
			:placeholder="placeholder"
			:type="type"
			:value="value"
			v-on="listeners"
		/>
		<slot name="right"></slot>
	</div>
</template>

<script>
import TextInput from './TextInput';
import formField from '../mixins/formField';

export default {
	props : {
		allowed : String,
		autocomplete : String,
		disabled : {
			type : Boolean,
			default : false
		},
		filter : Function,
		mask : String,
		number : Boolean,
		outputMask : {
			type : Boolean,
			default : false
		},
		placeholder : String,
		type : String,
		value : [String, Number]
	},
	data() {
		return {
			focused : false
		};
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
						vm.touched = true;
						vm.validate();
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
	],
	components : {
		TextInput
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Text.less';
</style>