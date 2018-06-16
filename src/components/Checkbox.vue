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
@import (optional) '~remix-ui-styles/Checkbox.less';
</style>