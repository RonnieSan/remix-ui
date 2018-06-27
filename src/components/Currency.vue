<template>
	<div
		class="input-wrapper currency"
	>
		<slot name="left">
			<div v-if="symbol" class="helper">{{symbol}}</div>
		</slot>
		<input
			type="tel"
			ref="input"
			:name="name"
			:disabled="disabled"
			v-model="string_value"
			v-money="settings"
			v-on="listeners"
		>
		<slot name="right"></slot>
	</div>
</template>

<script>
import { defaultsDeep } from 'lodash';
import { VMoney } from 'v-money';
import formField from '../mixins/formField';

export default {
	data() {
		return {
			string_value : parseFloat(this.value).toFixed(this.settings.precision)
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
				vm.$listeners,
				{
					input(event) {
						vm.dirty = true;
						vm.inputHandler(event);
						vm.validate();
					},
					keyup(event) {
						if (event.key === 'Tab') {
							setTimeout(() => {
								vm.$refs.input.select();
							});
						}
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
	],
	created() {
		this.settings = defaultsDeep({}, this.settings, {
			decimal : '.',
			thousands : ',',
			prefix : '',
			suffix : '',
			precision : 2,
			masked : false
		});
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Currency.less';
</style>