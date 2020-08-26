<template>
	<div :class="['r-number', 'control-border', 'focusable', {disabled}]">
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
	computed : {
		localValue : {
			get() {
				return this.value;
			},
			set(new_value) {
				this.dirty = true;
			}
		},
		listeners() {
			const vm = this;
			// `Object.assign` merges objects together to form a new object
			return Object.assign(
				{},
				this.$listeners,
				{
					input(event) {
						vm.dirty = true;
						if (event.target.value !== '') {
							vm.$emit('input', event.target.value);
							vm.validate();
						}
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
	mixins : [
		formField
	]
};
</script>