<template>
	<div class="select-wrapper">
		<select
			ref="input"
			:class="{'default' : model === ''}"
			:name="name"
			v-model.lazy="selected"
			v-on="listeners"
		>
			<option disabled :value="{value : emptyValue}">{{placeholder}}</option>
			<template v-for="option in options">
				<template v-if="isArray(option.value)">
					<optgroup :label="option.label">
					<option
						v-for="child_option in option.value"
						:value="{value : (child_option.value !== undefined) ? child_option.value : child_option}"
					>{{(child_option.label !== undefined) ? child_option.label : child_option}}</option>
					</optgroup>
				</template>
				<template v-else>
					<option :value="{value : (option.value !== undefined) ? option.value : option}">{{(option.label !== undefined) ? option.label : option}}</option>
				</template>
			</template>
		</select>
	</div>
</template>

<script>
import formField from '../mixins/formField';

export default {
	data() {
		return {
			focused : false,
			selected : {
				value : this.value
			}
		};
	},
	props : {
		model : {
			type : [String, Number, Boolean, Object, Function]
		},
		name : String,
		emptyValue : {
			default : null
		},
		options : Array,
		placeholder : {
			type : String,
			default : 'Select One'
		}
	},
	computed : {
		listeners() {
			const vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						vm.dirty = true;
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
	model : {
		prop  : 'model',
		event : 'change'
	},
	watch : {
		selected(new_value) {
			this.dirty = true;
			this.$emit('change', new_value.value);
			new_value.value = this.model;
			this.validate();
		},
		model : {
			handler(new_value) {
				if (new_value !== this.selected.value) {
					this.selected = {
						value : new_value
					};
				}
			},
			immediate : true,
			deep : true
		}
	},
	methods : {
		isArray(value) {
			return Array.isArray(value);
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Select.less';
</style>