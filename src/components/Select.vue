<template>
	<div class="select-wrapper">
		<select
			ref="input"
			:class="{'default' : model === ''}"
			:name="name"
			v-model.lazy="selected"
			v-on="listeners"
		>
			<option disabled :value="{value : null}">{{placeholder}}</option>
			<option
				v-for="option in options"
				:value="{value : option.value || option}"
			>{{option.label || option}}</option>
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
			type : [String, Number, Boolean, Object]
		},
		name : String,
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
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Select.less';
</style>