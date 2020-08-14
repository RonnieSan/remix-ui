<template>
	<div :class="['checklist', {'disabled' : disabled}]">
		<div class="option" v-for="(option, index) in optionList">
			<r-checkbox
				:ref="'input_' + index"
				v-model="localModel"
				:name="name"
				:value="option.value"
				:disabled="disabled"
				v-on="listeners"
			><span v-html="option.label"/></r-checkbox>
		</div>
	</div>
</template>

<script>
import rCheckbox from './Checkbox';
import formField from '../mixins/formField';

export default {
	components : {
		rCheckbox
	},
	props : {
		model : {
			type : Array,
			required : true
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
	model : {
		prop  : 'model',
		event : 'change'
	},
	computed : {
		localModel : {
			get() {
				return this.model;
			},
			set(new_value) {
				this.$emit('change', new_value);
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
							vm.$emit('change', event);
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
		}
	},
	watch : {
		optionList(new_value, old_value) {
			let option_values = new_value.map(option => option.value);
			this.localModel = this.localModel.filter((value) => {
				return option_values.indexOf(value) > -1;
			});
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Checklist.less';
</style>

<docs>
# Checklist
A list of checkbox values that modify an array passed into the v-model attribute.

## Props
* **name** : STRING - The name of the form input
* **options** : ARRAY - An array of objects with a `label` and `value` property that will act as the label and value of each item in the list

## Usage
In the template...
```html
<r-checklist name="my_checklist" v-model="checklist_value" :options="checklist_options"/>
```

In the script...
```js
{
	data() {
		return {
			checklist_value : [],
			checklist_options : [
				{label : 'Red', value : '#FF0000'},
				{label : 'Green', value : '#00FF00'},
				{label : 'Blue', value : '#0000FF'}
			]
		};
	}
}
```
</docs>