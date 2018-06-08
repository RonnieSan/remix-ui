<template>
	<label class="radio-wrapper">
		<span class="radio">
			<input type="radio"
				ref="input"
				:name="name"
				:value="value"
				:checked="is_checked"
				v-on="listeners"
			>
			<span class="radio-btn"></span>
		</span>
		<span class="radio-label"><slot></slot></span>
	</label>
</template>

<script>
import formField from '../mixins/formField';

export default {
	props : {
		model : [String, Boolean, Number],
		name  : String,
		value : [String, Boolean, Number]
	},
	computed : {
		is_checked() {
			return this.model === this.value;
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						vm.dirty = true;
						vm.$emit('change', vm.value);
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
	model : {
		prop  : 'model',
		event : 'change'
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
// Default variables
@control-bkg-color: #FFF;
@control-border-stroke: 1px;
@control-border-color: #CCC;
@control-color: #2196F3;
@control-height: 2.5em;
@font-size: 16px;

// Import custom variables
@import (optional, reference) '~theme';

// Radios and Checkboxes
.radio-wrapper {
	align-items: center;
	cursor: pointer;
	display: inline-flex;
	padding: calc(@control-height * 0.2) 0;
	position: relative;
}

input[type='radio'] {
	appearance: none;
	background-color: @control-bkg-color;
	border: @control-border-stroke solid @control-border-color;
	font-size: @font-size;
	height: calc(@control-height * 0.6);
	margin: 0 0.5em 0 0;
	padding: 0;
	transition: border 100ms ease-out;
	vertical-align: middle;
	width: calc(@control-height * 0.6);
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	-webkit-tap-highlight-color: transparent;

	&:focus {
		outline: none;
	}
}

input[type='radio'] {
	border-radius: 50%;

	&:checked {
		border: calc(@control-height * 0.2) solid @control-color;
	}
}
</style>