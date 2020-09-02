<template>
	<div :class="['r-switch', 'control-border', 'focusable', {disabled}]">
		<span v-for="option in options" :class="['option', {'selected' : local_value === getValue(option)}]">
			<input
				type="radio"
				:name="fieldName"
				v-model="local_value"
				:value="getValue(option)"
				:disabled="disabled"
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
		name : String,
		disabled : Boolean,
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
		fieldName() {
			if (this.name) {
				return this.name;
			}
			else {
				let name       = '';
				let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				for (let n = 0; n < 8; n++) {
				  name += characters.charAt(Math.floor(Math.random() * characters.length));
				}
				return name;
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