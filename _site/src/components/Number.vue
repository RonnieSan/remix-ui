<template>
	<div class="input-wrapper">
		<slot name="left"></slot>
		<input
			ref="input"
			:name="name"
			type="number"
			v-model.number="localValue"
			v-on="listeners"
		>
		<slot name="right"></slot>
	</div>
</template>

<script>
import formField from '../mixins/formField';

export default {
	data() {
		return {
			focused : false
		};
	},
	computed : {
		localValue : {
			get() {
				return this.value;
			},
			set(value) {
				this.dirty = true;
				this.$emit('input', value);
			}
		},
		listeners() {
			const vm = this;
			// `Object.assign` merges objects together to form a new object
			return Object.assign(
				{},
				this.$listeners,
				{
					input: function(event) {
						vm.dirty = true;
						vm.$emit('input', event.target.value);
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
	props : {
		value : {
			type : Number,
			required : true
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
@control-color: #1F73D6;
@control-height: 2.5em;
@control-helper-bkg-color: #E5E5E5;
@control-helper-color: #000;
@control-padding: 0.625em;
@control-radius: 3px;
@font-size: 16px;
@mono-font: 'Droid Mono Sans', Consolas, 'Courier New', System;

// Import custom variables
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

input[type='number'] {
	appearance: none;
	background-color: @control-bkg-color;
	border: 0;
	flex: 1 0 0;
	font-family: @mono-font;
	font-size: @font-size;
	height: calc(@control-height - (@control-border-stroke * 2));
	padding: 0 @control-padding;
	text-align: right;
	width: 100%;

	&::-webkit-inner-spin-button, 
	&::-webkit-outer-spin-button { 
		appearance: none;
		margin: 0;
	}
}

input:focus {
	box-shadow: 0;
	outline: 0;
}
</style>