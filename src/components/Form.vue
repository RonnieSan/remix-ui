<template>
	<form ref="form" :method="method" :action="action" @submit.prevent="submitHandler" :autocomplete="autocomplete" novalidate>
		<slot></slot>
	</form>
</template>

<script>
import Validator from '../lib/Validator';

export default {
	provide () {
		return {
			form_validator : this.validator
		};
	},
	props : {
		action : String,
		method : String,
		autocomplete : String,
		validator: {
			type: Object,
			default () {
				return new Validator();
			}
		}
	},
	methods : {
		// Submit the form
		submitHandler() {
			if (this.validator) {
				this.validator.validate()
					.then((validation) => {
						this.$emit('submit', this.$refs.form);
					})
					.catch((errors) => {
						this.$emit('error', errors);
					});
			}
			else {
				this.$emit('submit', this.$refs.form);
			}
		}
	}
};
</script>

<docs>
# Form
A component for creating a more user-friendly file select input.

## Props
* **accept** : STRING - The mime-type string for acceptable file types. Default is '*/*'.
* **name** : (REQUIRED) STRING - The input name to use in the form_data object. Default is 'files'.
* **placeholder** : STRING - The placeholder text to use in the input field.
* **value** : STING - A string of the filename that is currently selected.
* **disabled** : BOOLEAN - Set to true to disable interactions with the field.

## Events
* **select** : FUNCTION - A function that is passed an object with 2 properties--`data` is a FormData object with the selected file(s) and `name` is the filename. You can retrieve the file using `arguments[0].data.get(<name_value>)`.

## Usage
In the template...
```html
<r-file
	name="my_file"
	v-model="file_value"
	accept="image/*"
	placeholder="Select an image file..."
	@select="getFile"
/>
```

In the script...
```javascript
{
	methods : {
		getFile(params) {
			const file = params.data.get('my_file');
			const file_name = params.name;
		}
	}
}
```
</docs>
