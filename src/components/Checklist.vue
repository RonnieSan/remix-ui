<template>
	<div :class="['checklist', {'disabled' : disabled}]">
		<div class="option" v-for="(option, index) in optionList">
			<r-checkbox
				:ref="'input_' + index"
				v-model="localModel"
				:name="name"
				:value="option.value"
				:disabled="disabled"
				v-on="listeners"
			><span v-html="option.label"/></r-checkbox>
		</div>
	</div>
</template>

<script>
import { isEqual } from 'lodash';
import rCheckbox from './Checkbox';
import formField from '../mixins/formField';

export default {
	components : {
		rCheckbox
	},
	props : {
		model : {
			type : Array,
			required : true
		},
		name : String,
		options : {
			type : Array,
			default() {
				return [];
			}
		},
		disabled : Boolean,
		restrictValues : {
			type : Boolean,
			default : false
		}
	},
	model : {
		prop  : 'model',
		event : 'update'
	},
	computed : {
		localModel : {
			get() {
				let filtered_value;
				let new_value = this.model;
				if (this.restrictValues) {
					let option_values = this.optionList.map(option => option.value);
					filtered_value = new_value.filter((value) => {
						return option_values.indexOf(value) > -1;
					});
					if (!isEqual(new_value, filtered_value)) {
						this.localModel = filtered_value;
					}
					else {
						return new_value;
					}
				}
				else {
					return new_value;
				}
			},
			set(new_value) {
				if (Array.isArray(new_value)) {
					this.$emit('update', new_value);
				}
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
		},
		optionList() {
			return this.options.map((option) => {
				if (option instanceof Object) {
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
		optionList(new_value, old_value) {
			let option_values = new_value.map(option => option.value);
			if (this.restrictValues) {
				this.localModel = this.localModel.filter((value) => {
					return option_values.indexOf(value) > -1;
				});
			}
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Checklist.less';
</style>