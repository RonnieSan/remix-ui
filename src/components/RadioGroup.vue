<template>
	<div :class="['r-radio-group', {disabled}]" tabindex="-1">
		<div class="option" v-for="(option, index) in optionList" :key="index">
			<r-radio
				ref="input"
				v-model="localValue"
				:name="fieldName"
				:value="option.value"
				:disabled="disabled"
			><span class="radio-label" v-html="option.label"/></r-radio>
		</div>
	</div>
</template>

<script>
import rRadio from './Radio';
import formField from '../mixins/formField';

export default {
	components : {
		rRadio
	},
	props : {
		value : {
			type : [String, Number, Boolean, Object]
		},
		name : String,
		options : {
			type : Array,
			default() {
				return [];
			}
		},
		disabled : Boolean
	},
	computed : {
		localValue : {
			get() {
				return this.value;
			},
			set(new_value) {
				this.$emit('input', new_value);
				this.validate();
			}
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
		},
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
		}
	},
	watch : {
		optionList : {
			handler(new_value) {
				let matched_option = new_value.find((option) => {
					return option.value === this.value;
				});
				if (!matched_option) {
					this.localValue = null;
				}
			},
			deep : true
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/RadioGroup.less';
</style>