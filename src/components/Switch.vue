<template>
	<div class="switch-wrapper">
		<span v-for="option in options" :class="['option', {'selected' : local_value === getValue(option)}]">
			<input
				type="radio"
				:name="name"
				v-model="local_value"
				:value="getValue(option)"
			/>
			<span class="label">{{getLabel(option)}}</span>
		</span>
	</div>
</template>

<script>
import { includes } from 'lodash-es';
import formField from '../mixins/formField';

export default {
	props : {
		options : {
			type : Array,
			default() {
				return [
					{label : 'Yes', value : true},
					{label : 'No', value : false}
				]
			}
		},
		value : {
			type : [String, Boolean, Number, Object]
		}
	},
	data() {
		return {
			local_value : this.value
		};
	},
	watch : {
		value(new_value, old_value) {
			if (new_value !== this.local_value) {
				this.local_value = new_value;
			}
		},
		local_value(new_value, old_value) {
			if (new_value !== this.value) {
				this.$emit('input', this.local_value);
			}
		}
	},
	computed : {
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						vm.dirty = true;
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
		getLabel(option) {
			if (typeof option === 'object') {
				return option.label;
			}
			return option;
		},
		getValue(option) {
			if (typeof option === 'object') {
				return option.value;
			}
			return option;
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Switch.less';
</style>