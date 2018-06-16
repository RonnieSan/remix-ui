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
@import (optional) '~remix-ui-styles/Number.less';
</style>