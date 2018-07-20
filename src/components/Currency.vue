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
			v-model="stringValue"
			v-money="local_settings"
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
	data() {
		return {
			string_value : parseFloat(this.value).toFixed(this.settings.precision),
			local_settings : {}
		};
	},
	computed : {
		stringValue : {
			get() {
				return parseFloat(this.value).toFixed(this.settings.precision);
			},
			set(new_value) {
				let value = (parseFloat(new_value.replace(/\D/g, '')) * 0.01).toFixed(2);
				this.$emit('input', parseFloat(value));
				this.validate();
			}
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				vm.$listeners,
				{
					input(event) {
						vm.dirty = true;
						// vm.inputHandler(event);
						// vm.validate();
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
	directives : {
		'money' : VMoney
	},
	mixins : [
		formField
	],
	created() {
		this.local_settings = defaultsDeep({}, this.settings, {
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