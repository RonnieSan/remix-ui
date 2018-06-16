<template>
	<label class="toggle-wrapper">
		<span class="toggle">
			<input type="checkbox"
				ref="input"
				:name="name"
				:checked="is_checked"
				:value="value"
				:true-value="trueValue"
				:false-value="falseValue"
				v-on="listeners"
			>
			<span class="handle"></span>
		</span>
		<span class="toggle-label"><slot><span v-if="model">{{trueLabel}}</span><span v-else>{{falseLabel}}</span></slot></span>
	</label>
</template>

<script>
import _ from 'lodash';
import formField from '../mixins/formField';

export default {
	props : {
		falseLabel : String,
		falseValue : {},
		label : String,
		model : {},
		name : String,
		trueLabel : String,
		trueValue : {},
		value : {}
	},
	computed : {
		is_checked() {
			if (Array.isArray(this.model)) {
				return (_.includes(this.model, this.value));
			}
			else {
				if ((typeof this.falseValue !== 'undefined') && this.model === this.falseValue) {
					return false;
				}

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
						vm.changeHandler(event.target.checked);
					},
					keydown(event) {
						vm.keydownHandler(event);
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
	methods : {
		keydownHandler(event) {
			switch (event.which) {

				// LEFT ARROW
				case 37:
					if (this.is_checked) {
						this.changeHandler(false);
					}
					break;

				// RIGHT ARROW
				case 39:
					if (!this.is_checked) {
						this.changeHandler(true);
					}
					break;

			}
		},
		changeHandler(checked) {
			let new_value;
			if (Array.isArray(this.model)) {
				if (checked) {
					new_value = this.model.slice();
					new_value.push(this.value);
				}
				else {
					new_value = this.model.filter((value) => {
						return value !== this.value;
					});
				}
			}
			else {
				let trueValue  = this.trueValue || true;
				let falseValue = this.falseValue || false;

				new_value = (checked ? trueValue : falseValue);
			}

			this.$emit('change', new_value);
			this.validate();
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Toggle.less';
</style>