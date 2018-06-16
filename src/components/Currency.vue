<template>
	<div
		class="input-wrapper currency"
	>
		<slot name="left">
			<div class="helper">$</div>
		</slot>
		<input
			type="text"
			ref="input"
			:name="name"
			:disabled="disabled"
			v-model="string_value"
			v-money="settings"
			v-on="listeners"
			@blur=""
		>
		<slot name="right"></slot>
	</div>
</template>

<script>
import { VMoney } from 'v-money';
import formField from '../mixins/formField';

export default {
	data() {
		return {
			string_value : parseFloat(this.value).toFixed(2)
		};
	},
	props : {
		value : Number,
		disabled : {
			type : Boolean,
			default : false
		},
		settings : {
			type : Object,
			default() {
				return {
					decimal : '.',
					thousands : ',',
					prefix : '',
					suffix : '',
					precision : 2,
					masked : false
				};
			}
		},
		symbol : {
			type : String,
			default : '$'
		}
	},
	computed : {
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					input(event) {
						vm.dirty = true;
						vm.inputHandler(event);
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
	methods : {
		inputHandler(event) {
			let value = parseFloat(this.string_value.replace(/[^0-9\\.-]/g, ''));
			this.$emit('input', value);
			this.validate();
		}
	},
	directives : {
		'money' : VMoney
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Currency.less';
</style>