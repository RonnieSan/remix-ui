<template>
	<label
		class="checkbox-wrapper"
	>
		<input
			type="checkbox"
			ref="input"
			:name="name"
			:checked="checked"
			:value="value"
			:true-value="trueValue"
			:false-value="falseValue"
			v-on="listeners"
		>
		<span class="checkbox-label"><slot>{{value}}</slot></span>
	</label>
</template>

<script>
import formField from '../mixins/formField';

export default {
	model : {
		prop  : 'model',
		event : 'change'
	},
	props : [
		'model',
		'name',
		'trueValue',
		'falseValue',
		'value'
	],
	computed : {
		checked() {
			if (Array.isArray(this.model)) {
				return (this.model.indexOf(this.value) >= 0);
			}
			else if (this.value || this.trueValue || this.falseValue) {
				return (this.model === (this.trueValue || this.value));
			}
			else {
				return this.model;
			}
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						vm.dirty = true;
						vm.changeHandler(event);
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
		changeHandler(event) {
			let new_value;
			if (Array.isArray(this.model)) {
				if (event.target.checked) {
					new_value = this.model.slice();
					new_value.push(this.value);
				}
				else {
					new_value = this.model.filter((value) => {
						return value !== this.value;
					});
				}
			}
			else if (this.value || this.trueValue || this.falseValue) {
				if (event.target.checked) {
					new_value = this.trueValue || this.value;
				}
				else {
					new_value = this.falseValue || null;
				}
			}
			else {
				new_value = event.target.checked;
			}
			this.$emit('change', new_value);
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