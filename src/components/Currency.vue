<template>
	<div
		class="input-wrapper currency"
	>
		<slot name="left">
			<div class="helper">$</div>
		</slot>
		<input
			type="text"
			ref="input"
			:name="name"
			:disabled="disabled"
			v-model="string_value"
			v-money="settings"
			v-on="listeners"
			@blur=""
		>
		<slot name="right"></slot>
	</div>
</template>

<script>
import { VMoney } from 'v-money';
import formField from '../mixins/formField';

export default {
	data() {
		return {
			string_value : parseFloat(this.value).toFixed(2)
		};
	},
	props : {
		value : Number,
		disabled : {
			type : Boolean,
			default : false
		},
		settings : {
			type : Object,
			default() {
				return {
					decimal : '.',
					thousands : ',',
					prefix : '',
					suffix : '',
					precision : 2,
					masked : false
				};
			}
		},
		symbol : {
			type : String,
			default : '$'
		}
	},
	computed : {
		listeners() {
			let vm = this;
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
		inputHandler(event) {
			let value = parseFloat(this.string_value.replace(/[^0-9\\.-]/g, ''));
			this.$emit('input', value);
			this.validate();
		}
	},
	directives : {
		'money' : VMoney
	},
	mixins : [
		formField
	]
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

.input-wrapper.currency {
	border: @control-border-stroke solid @control-border-color;
	border-radius: @control-radius;
	display: inline-flex;
	overflow: hidden;
	vertical-align: middle;
	width: 100%;

	.helper {
		background-color: @control-helper-bkg-color;
		color: @control-helper-color;
		flex: 0 0 auto;
		font-size: @font-size;
		height: calc(@control-height - (@control-border-stroke * 2));
		line-height: calc(@control-height - (@control-border-stroke * 2));
		min-width: calc(@control-height - (@control-border-stroke * 2));
		text-align: center;
	}
}

.currency input[type='text'] {
	background-color: @control-bkg-color;
	border: 0;
	flex: 1 0 0;
	font-family: @mono-font;
	font-size: @font-size;
	height: calc(@control-height - (@control-border-stroke * 2));
	padding: 0 @control-padding;
	text-align: right;
	width: 100%;
}

input:focus {
	box-shadow: 0;
	outline: 0;
}
</style>