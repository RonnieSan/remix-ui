<template>
	<label
		:class="['checkbox-wrapper', {'disabled' : disabled}]"
	>
		<input
			type="checkbox"
			ref="input"
			:name="name"
			v-model="localValue"
			:disabled="disabled"
			v-on="listeners"
		>
		<span class="checkbox-label"><slot>{{value}}</slot></span>
	</label>
</template>

<script>
import { isEqual, isNil, isUndefined } from 'lodash';
import formField from '../mixins/formField';

export default {
	props : {
		model : {
			required : true
		},
		name : String,
		value : {
			required : false
		},
		trueValue : {
			required : false
		},
		falseValue : {
			required : false
		},
		disabled : {
			type : Boolean,
			default : false
		}
	},
	model : {
		prop  : 'model',
		event : 'update'
	},
	computed : {
		localValue : {
			get() {
				if (Array.isArray(this.model)) {
					let matched = this.model.find((item) => {
						return isEqual(item, this.value);
					});
					return !isNil(matched);
				}
				else if (this.value || this.trueValue || this.falseValue) {
					return ((!isUndefined(this.trueValue) && isEqual(this.model, this.trueValue)) || (!isUndefined(this.value) && isEqual(this.model, this.value)));
				}
				else {
					return this.model;
				}
			},
			set(new_value) {
				this.changeHandler(new_value);
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
		}
	},
	methods : {
		changeHandler(checked) {
			let new_value;
			if (Array.isArray(this.model)) {
				if (checked) {
					new_value = this.model.slice();
					new_value.push(this.value);
				}
				else {
					new_value = this.model.filter((value) => {
						return !isEqual(value, this.value);
					});
				}
			}
			else if (this.value || this.trueValue || this.falseValue) {
				if (checked) {
					new_value = this.trueValue || this.value;
				}
				else {
					new_value = this.falseValue || null;
				}
			}
			else {
				new_value = checked;
			}
			this.$emit('update', new_value);
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Checkbox.less';
</style>

<docs>
# Checkbox
A custom checkbox component with added convenience options and functionality.

## Slots
* **default** : The label to display next to the checkbox

## Props
* **name** : STRING - The name of the field that will be placed on the input
* **true-value** : [STRING, NUMBER, OBJECT] - If the v-model is not an array, the value the model will be set to when the box is checked
* **false-value** : [STRING, NUMBER, OBJECT] - If the v-model is not an array, the value the model will be set to when the box is NOT checked
* **value** : [STRING, NUMBER, OBJECT] - If the v-model is an array, the value that will be added to the array when the box is checked

## Usage
In the template...
```html
<!-- As a boolean value -->
<r-checkbox name="terms" v-model="boolean_value">I agree to the terms and conditions</r-checkbox>

<!-- As a string value -->
<r-checkbox name="terms" v-model="string_value" true-value="Yes" false-value="No">I agree to the terms and conditions</r-checkbox>

<!-- As an array value -->
<r-checkbox name="terms" v-model="array_value" value="Agreed to terms">I agree to the terms and conditions</r-checkbox>
<r-checkbox name="terms" v-model="array_value" value="Did not agree to terms">I DO NOT agree to the terms and conditions</r-checkbox>
```

In the script...
```js
{
	data() {
		return {
			boolean_value : false,
			string_value : 'No',
			array_value : []
		};
	}
}
```
</docs>