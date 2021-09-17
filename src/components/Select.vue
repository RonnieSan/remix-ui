<template>
	<div :class="['r-select', 'control-border', 'focusable', {disabled}]">
		<select
			ref="input"
			:class="{'empty' : model === emptyValue}"
			:name="name"
			v-model="selected_option"
			v-on="listeners"
			@change="changeHandler"
			:disabled="disabled"
		>
			<option :disabled="allowEmpty" :value="emptyValue">{{placeholder}}</option>
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
	props : {
		model : {
			type : [String, Number, Boolean, Object, Function]
		},
		name : String,
		emptyValue : {
			default : null
		},
		allowEmpty : {
			type : Boolean,
			default : true
		},
		options : Array,
		placeholder : {
			type : String,
			default : 'Select One'
		},
		disabled : Boolean
	},
	data() {
		return {
			focused : false,
			selected_option : this.model,
			selected : {
				value : this.value
			}
		};
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
	watch : {
		model(new_value) {
			if (new_value !== this.selected_option) {
				this.selected_option = new_value;
				this.changeHandler();
			}
		},
		optionList : {
			handler(new_value) {
				let matched_option = new_value.find((option) => {
					if (Array.isArray(option.value)) {
						let matched_sub_option = option.value.find((sub_option) => {
							return sub_option.value === this.selected_option;
						});
						if (matched_sub_option) {
							return true;
						}
					}
					else {
						return option.value === this.selected_option;
					}
				});
				if (!matched_option) {
					this.selected_option = this.emptyValue;
					this.changeHandler();
				}
			},
			deep : true
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
		changeHandler() {
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