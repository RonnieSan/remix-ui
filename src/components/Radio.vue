<template>
	<label :class="['r-radio', {disabled}]">
		<input
			class="control-border focusable"
			type="radio"
			ref="input"
			v-model="localModel"
			:name="name"
			:value="value"
			:disabled="disabled"
			v-on="listeners"
		>
		<slot></slot>
	</label>
</template>

<script>
import formField from '../mixins/formField';

export default {
	props : {
		model    : [String, Boolean, Number, Object],
		value    : [String, Boolean, Number, Object],
		name     : String,
		disabled : Boolean
	},
	model : {
		prop  : 'model',
		event : 'change'
	},
	computed : {
		localModel : {
			get() {
				return this.model;
			},
			set(new_value) {
				this.$emit('change', new_value);
			}
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						let use_default;
						if (vm.$listeners.change) {
							use_default = vm.$listeners.change(event);
						}
						if (use_default !== false) {
							vm.dirty = true;
							vm.$emit('change', vm.value);
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

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Radio.less';
</style>