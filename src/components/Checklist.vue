<template>
	<div class="checklist">
		<div class="option" v-for="(option, index) in options">
			<r-checkbox
				:ref="'input_' + index"
				:name="name"
				:model="local_value"
				:value="(option.value !== undefined) ? option.value : option"
				v-on="listeners"
			><span v-html="(option.label !== undefined) ? option.label : option"/></r-checkbox>
		</div>
	</div>
</template>

<script>
import rCheckbox from './Checkbox';
import formField from '../mixins/formField';

export default {
	data() {
		return {
			local_value : this.model
		};
	},
	model : {
		prop  : 'model',
		event : 'change'
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
		}
	},
	computed : {
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
						if (vm.$listeners.change && typeof vm.$listeners.change === 'function') {
							vm.$listeners.change(event);
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
	watch : {
		model : {
			handler(new_value) {
				if (new_value !== this.local_value) {
					this.local_value = new_value;
				}
			},
			deep : true
		}
	},
	methods : {
		changeHandler(value) {
			this.local_value = value;
			this.$emit('change', this.local_value);
		}
	},
	components : {
		rCheckbox
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