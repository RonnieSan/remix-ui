<template>
	<div
		:class="['r-currency', 'control-border', 'focusable', {disabled}]"
	>
		<slot name="left">
			<div v-if="mergedSettings.symbol && mergedSettings.symbol_position === 'left'" class="control-helper">{{mergedSettings.symbol}}</div>
		</slot>
		<input
			type="tel"
			ref="input"
			:name="name"
			:disabled="disabled"
			v-model="stringValue"
			v-money="mergedSettings"
			v-on="listeners"
		>
		<slot name="right">
			<div v-if="mergedSettings.symbol && mergedSettings.symbol_position === 'right'" class="control-helper">{{mergedSettings.symbol}}</div>
		</slot>
	</div>
</template>

<script>
import { defaultsDeep } from 'lodash';
import { VMoney } from 'v-money';
import formField from '../mixins/formField';

export default {
	props : {
		value : [String, Number],
		settings : {
			type : Object
		},
		disabled : Boolean
	},
	computed : {
		mergedSettings() {
			return defaultsDeep({}, this.settings, {
				decimal : '.',
				thousands : ',',
				prefix : '',
				suffix : '',
				precision : 2,
				masked : false,
				symbol : '$',
				symbol_position : 'left'
			})
		},
		stringValue : {
			get() {
				return parseFloat(this.value).toFixed(this.mergedSettings.precision);
			},
			set(new_value) {
				if (new_value) {

				}
				let value = parseFloat(new_value.replace(/[^-0-9]/g, '')) * (1 / Math.pow(10, this.mergedSettings.precision));
				this.$emit('input', parseFloat(value.toFixed(this.mergedSettings.precision)));
				this.validate();
			}
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					input(event) {
						vm.dirty = true;
						vm.validate();
					},
					focus(event) {
						let use_default;
						if (vm.$listeners.focus) {
							use_default = vm.$listeners.focus(event);
						}
						if (use_default !== false) {
							setTimeout(() => {
								vm.$refs.input.select();
							}, 10);
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