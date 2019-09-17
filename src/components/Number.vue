<template>
	<div :class="['input-wrapper', {'disabled' : disabled}]">
		<slot name="left"></slot>
		<input
			ref="input"
			:name="name"
			type="number"
			v-model.number="localValue"
			v-on="listeners"
			:disabled="disabled"
		>
		<slot name="right"></slot>
	</div>
</template>

<script>
import formField from '../mixins/formField';

export default {
	props : {
		value : {
			type : Number,
			required : true
		},
		disabled : Boolean
	},
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
				if (value === '') {
					value = 0;
				}
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
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Number.less';
</style>