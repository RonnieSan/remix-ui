<template>
	<div :class="['radio-group', {'disabled' : disabled}]" tabindex="-1">
		<div class="option" v-for="(option, index) in options">
			<r-radio
				ref="input"
				:name="name"
				:value="(option.value !== undefined) ? option.value : option"
				:model="value"
				:disabled="disabled"
				@change="changeHandler"
			><span v-html="(option.label !== undefined) ? option.label : option"/></r-radio>
		</div>
	</div>
</template>

<script>
import rRadio from './Radio';
import formField from '../mixins/formField';

export default {
	data() {
		return {
			local_value : this.value
		};
	},
	props : {
		name : String,
		value : {
			type : [String, Number, Boolean, Object]
		},
		options : {
			type : Array,
			default() {
				return [];
			}
		},
		disabled : Boolean
	},
	watch : {
		'value' : {
			handler(new_value, old_value) {
				if (new_value !== old_value) {
					this.local_value = this.value;
				}
			}
		}
	},
	methods : {
		changeHandler(value) {
			this.$emit('input', value);
			this.validate();
		}
	},
	components : {
		rRadio
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/RadioGroup.less';
</style>