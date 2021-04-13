<template>
	<label class="toggle-wrapper">
		<span class="toggle">
			<input type="checkbox"
				ref="input"
				:name="name"
				:checked="isChecked"
				:value="value"
				:true-value="trueValue"
				:false-value="falseValue"
				v-on="listeners"
			>
			<span class="handle"></span>
		</span>
		<span class="toggle-label"><slot><span v-if="isChecked">{{trueLabel}}</span><span v-else>{{falseLabel}}</span></slot></span>
	</label>
</template>

<script>
import { includes } from 'lodash-es';
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
		isChecked() {
			if (Array.isArray(this.model)) {
				return (includes(this.model, this.value));
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
						let use_default;
						if (vm.$listeners.change) {
							use_default = vm.$listeners.change(event);
						}
						if (use_default !== false) {
							vm.dirty = true;
							vm.changeHandler(event);
							vm.validate();
						}
					},
					keydown(event) {
						let use_default;
						if (vm.$listeners.keydown) {
							use_default = vm.$listeners.keydown(event);
						}
						if (use_default !== false) {
							vm.keydownHandler(event);
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
		event : 'update'
	},
	methods : {
		keydownHandler(event) {
			switch (event.which) {

				// LEFT ARROW
				case 37:
					if (this.isChecked) {
						this.changeHandler(false);
					}
					break;

				// RIGHT ARROW
				case 39:
					if (!this.isChecked) {
						this.changeHandler(true);
					}
					break;

			}
		},
		changeHandler(event) {
			let checked_value = event;
			if (event.target) {
				checked_value = event.target.checked
			}

			let new_value;
			if (Array.isArray(this.model)) {
				if (checked_value) {
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
				if (checked_value) {
					new_value = this.trueValue || this.value;
				}
				else {
					new_value = this.falseValue || null;
				}
			}
			else {
				new_value = checked_value;
			}
			this.$emit('update', new_value);
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