<template>
	<div
		:class="['input-wrapper', 'currency', {'disabled' : disabled}]"
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
		value : [String, Number],
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
		},
		disabled : Boolean
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
				if (new_value) {

				}
				let value = parseFloat(new_value.replace(/[^-0-9]/g, '')) * (1 / Math.pow(10, this.settings.precision));
				this.$emit('input', parseFloat(value.toFixed(this.settings.precision)));
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

<docs>
# Currency
An input field for currency-type values.

## Value
A number or string value.

## Slots
* **left** - Content to display in the left-hand helper of the field. If no left slot content is specified, but a `symbol` prop is provided, the left slot will contain the `symbol`.
* **right** - Content to display in the right-hand helper of the field.

## Props
* **disabled** : BOOLEAN - Set to `true` to disable the field.
* **settings** : OBJECT - An object containing setting properties to apply to the field.
* **settings.decimal** : STRING - The string to display as the decimal character in the number (default: `.`).
* **settings.thousands** : STRING - The string to display as the thousands character in the number (default: `,`).
* **settings.precision** : NUMBER - The decimal place precision to keep the number on output.
* **settings.masked** : BOOLEAN - Set to `true` to keep the masked value in the output.
* **symbol** : STRING - A symbol or value to place inside left-hand helper (default: `$`).

## Usage
In the template...
```html
template
<r-currency v-model="currency_value" :settings="currency_settings"/>
```

In the script...
```js
{
	data() {
		return {
			currency_value : 35.50,
			currency_settings : {
				masked : true
			}
		};
	}
}
```
</docs>