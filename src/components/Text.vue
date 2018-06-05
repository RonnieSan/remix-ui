<template>
	<div
		tabindex="-1"
		class="input-wrapper"
	>
		<slot name="left"/>
		<text-input
			ref="input"
			:allowed="allowed"
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
		<slot name="right"/>
	</div>
</template>

<script>
import TextInput from './TextInput';
import formField from '../mixins/formField';

export default {
	data() {
		return {
			focused : false
		};
	},
	props : {
		allowed : String,
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
// Default variables
@control-bkg-color: #FFF;
@control-border-color: #CCC;
@control-border-stroke: 1px;
@control-height: 2.5em;
@control-helper-bkg-color: #E5E5E5;
@control-helper-color: #000;
@control-padding: 0.625em;
@control-radius: 3px;
@font-size: 16px;
@mono-font: 'Droid Mono Sans', Consolas, 'Courier New', System;

// Import themes
@import (optional, reference) '~theme';

.input-wrapper {
	border-radius: @control-radius;
	border: @control-border-stroke solid @control-border-color;
	display: inline-flex;
	overflow: hidden;
	vertical-align: middle;
	width: 100%;

	.helper {
		background-color: @control-helper-bkg-color;
		flex: 0 0 auto;
		height: calc(@control-height - (@control-border-stroke * 2));
		line-height: calc(@control-height - (@control-border-stroke * 2));
		min-width: calc(@control-height - (@control-border-stroke * 2));
		text-align: center;
	}
}
</style>