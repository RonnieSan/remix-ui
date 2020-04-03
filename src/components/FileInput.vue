<template>
	<div :class="['file-wrapper', {'disabled' : disabled}]">
		<div class="inner">
			<slot>
				<input type="text"
					class="label"
					ref="input"
					v-model="value"
					:name="name"
					:disabled="disabled"
					:placeholder="placeholder"
				/>
				<div class="button">
					<icon :class="{'spin' : status === 'uploading'}" :type="icon" size="24"/>
				</div>
			</slot>
		</div>
		<form ref="form" enctype="multipart/form-data" novalidate>
			<input
				ref="uploader"
				type="file"
				name="files"
				:disabled="disabled"
				:accept="accept"
				v-on="listeners"
			/>
		</form>
	</div>
</template>

<script>
import formField from '../mixins/formField';

export default {
	props : {
		accept : {
			type : String,
			default : '*/*'
		},
		name : {
			type : String,
			default : 'files'
		},
		placeholder : {
			type : String,
			default : 'Select a file'
		},
		value : {
			type : String,
			default : ''
		},
		disabled : Boolean
	},
	data() {
		return {
			focused   : false,
			form_data : new FormData(this.$refs.form),
			status    : 'inactive'
		};
	},
	computed : {
		icon() {
			if (this.status === 'uploading') {
				return 'loading';
			}
			return 'dots-horizontal';
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
							vm.select(event);
						}
					},
					input(event) {
						vm.dirty = true;
						vm.validate();
					}
				}
			);
		}
	},
	methods : {

		// Select a file to upload
		select(event) {
			// Add files to form_data
			Array
				.from(Array(event.target.files.length).keys())
				.forEach((index) => {
					this.form_data.delete(this.name);
					this.appendData(this.name, event.target.files[index], event.target.files[index].name);
					this.filename = event.target.files[index].name;
				});

			// Emit an input event
			this.$emit('input', this.filename);

			// Emit the form data
			this.$emit('select', {
				data : this.form_data,
				name : this.filename
			});
		},

		// Append data to the form data
		appendData(name, data, file) {
			this.form_data.append(name, data, file);
		}

	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/FileInput.less';
</style>

<docs>
# File Input
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