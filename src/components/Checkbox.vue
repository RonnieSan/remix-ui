<template>
	<label
		class="checkbox-wrapper"
	>
		<span class="checkbox">
			<input
				type="checkbox"
				ref="input"
				:name="name"
				:checked="checked"
				:value="value"
				:true-value="trueValue"
				:false-value="falseValue"
				v-on="listeners"
			>
			<span class="check"></span>
		</span>
		<span class="checkbox-label"><slot>{{value}}</slot></span>
	</label>
</template>

<script>
import formField from '../mixins/formField';

export default {
	model : {
		prop  : 'model',
		event : 'change'
	},
	props : [
		'model',
		'name',
		'trueValue',
		'falseValue',
		'value'
	],
	computed : {
		checked() {
			if (Array.isArray(this.model)) {
				return (this.model.indexOf(this.value) >= 0);
			}
			else if (this.value || this.trueValue || this.falseValue) {
				return (this.model === (this.trueValue || this.value));
			}
			else {
				return this.model;
			}
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						vm.dirty = true;
						vm.changeHandler(event);
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
		changeHandler(event) {
			let new_value;
			if (Array.isArray(this.model)) {
				if (event.target.checked) {
					new_value = this.model.slice();
					new_value.push(this.value);
				}
				else {
					new_value = this.model.filter((value) => {
						return value !== this.value;
					});
				}
			}
			else if (this.value || this.trueValue || this.falseValue) {
				if (event.target.checked) {
					new_value = this.trueValue || this.value;
				}
				else {
					new_value = this.falseValue || null;
				}
			}
			else {
				new_value = event.target.checked;
			}
			this.$emit('change', new_value);
		}
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
@control-radius: 3px;
@font-size: 16px;

// Import custom variables
@import (optional, reference) '~theme';

.checkbox-wrapper {
	align-items: center;
	cursor: pointer;
	display: inline-flex;
	padding: calc(@control-height * 0.2) 0;
	position: relative;
}

input[type='checkbox'] {
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
}

input:focus {
	box-shadow: 0;
	outline: 0;
};

.checkbox-wrapper::before {
	color: @control-bkg-color;
	content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 12 10 16 18 8" /></svg>');
	font-size: @font-size;
	height: calc(@control-height * 0.6);
	left: 0;
	position: absolute;
	top: calc(@control-height * 0.2);
	width: calc(@control-height * 0.6);
	z-index: 10;
}

input[type='checkbox'] {
	border-radius: @control-radius;
	position: relative;

	&:checked {
		border: calc(@control-height * 0.3) solid @control-color;
	}
}
</style>