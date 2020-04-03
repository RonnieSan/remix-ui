<template>
	<label :class="['radio-wrapper', {'disabled' : disabled}]">
		<span class="radio">
			<input type="radio"
				ref="input"
				:name="name"
				:value="value"
				:checked="is_checked"
				:disabled="disabled"
				v-on="listeners"
			>
		</span>
		<slot></slot>
	</label>
</template>

<script>
import formField from '../mixins/formField';

export default {
	props : {
		model    : [String, Boolean, Number, Object],
		name     : String,
		value    : [String, Boolean, Number, Object],
		disabled : Boolean
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
@import (optional) '~remix-ui-styles/Radio.less';
</style>