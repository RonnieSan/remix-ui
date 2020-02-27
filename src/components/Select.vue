<template>
	<div :class="['select-wrapper', {'disabled' : disabled}]">
		<select
			ref="input"
			:class="{'default' : model === ''}"
			:name="name"
			v-model="selected_option"
			v-on="listeners"
			@change="changeHandler"
			:disabled="disabled"
		>
			<option disabled :value="{value : emptyValue}">{{placeholder}}</option>
			<template v-for="option in optionList">
				<template v-if="isArray(option.value)">
					<optgroup :label="option.label">
					<option
						v-for="child_option in option.value"
						:value="child_option.value"
					>{{child_option.label}}</option>
					</optgroup>
				</template>
				<template v-else>
					<option :value="option.value">{{option.label}}</option>
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
			selected_option : null,
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
		},
		disabled : Boolean
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
		},
		optionList() {
			return this.options.map((option) => {
				if (option instanceof Object) {
					if (this.isArray(option.value)) {
						option.value = option.value.map((child_option) => {
							if (child_option instanceof Object) {
								return child_option;
							}
							else {
								return {
									label : child_option,
									value : child_option
								};
							}
						});
					}
					return option;
				}
				else {
					return {
						label : option,
						value : option
					};
				}
			});
		}
	},
	model : {
		prop  : 'model',
		event : 'change'
	},
	methods : {
		isArray(value) {
			return Array.isArray(value);
		},
		changeHandler(data) {
			this.dirty = true;
			this.$emit('change', this.selected_option);
			this.$emit('input', this.selected_option);
			this.validate();
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