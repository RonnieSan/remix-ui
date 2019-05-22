<template>
	<div
		:style="{maxHeight}"
		class="code-wrapper"
		@focusout.native="touched = true; $emit('validate')"
	>
		<slot name="panel"></slot>
		<div ref="editor" :id="id">
			<slot>{{local_value}}</slot>
		</div>
	</div>
</template>

<script>
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/sqlserver';
import formField from '../mixins/formField';

export default {
	data() {
		return {
			dirty       : false,
			touched     : false,
			editor      : null,
			local_value : null,
			settings    : {}
		};
	},
	props : {
		id : {
			type : String,
			required : true
		},
		options : {
			type : Object,
			default() {
				return {
					mode : 'json',
					theme : 'sqlserver'
				};
			}
		},
		maxHeight : String,
		value : String
	},
	watch : {
		value(new_value) {
			this.dirty = true;
			this.$emit('input', this.value);

			if (this.touched) {
				this.$emit('validate');
			}

			if (this.local_value !== this.value) {
				this.editor.setValue(this.value, 1);
			}
		},
		options() {
			// Add mode and theme paths
			if (this.options.mode !== this.settings.mode) {
				this.editor.getSession().setMode(`ace/mode/${this.options.mode}`);
			}
			if (this.options.theme !== this.settings.theme) {
				this.editor.setTheme(`ace/theme/${this.options.theme}`);
			}
		}
	},
	mixins : [
		formField
	],
	mounted() {
		// Initialize the editor
		this.editor = ace.edit(this.id);

		// Deprecation fix
		this.editor.$blockScrolling = Infinity;

		// Ignore doctype warnings
		const session = this.editor.getSession();
		session.on('changeAnnotation', () => {
			const a = session.getAnnotations();
			const b = a.slice(0).filter((item) => item.text.indexOf('DOC') === -1);
			if (a.length > b.length) {
				session.setAnnotations(b);
			}
		});

		// Option defaults
		this.settings.fontFamily          = this.options.fontFamily || 'Consolas';
		this.settings.fontSize            = this.options.fontSize || 14;
		this.settings.highlightActiveLine = this.options.highlightActiveLine || false;
		this.settings.highlightGutterLine = this.options.highlightGutterLine || false;
		this.settings.minLines            = this.options.minLines || 8;
		this.settings.maxLines            = this.options.maxLines || Infinity;
		this.settings.printMargin         = this.options.printMargin || false;
		this.settings.tabSize             = this.options.tabSize || 2;

		// Hide cursor
		if (this.options.cursor === 'none' || this.options.cursor === false) {
			this.editor.renderer.$cursorLayer.element.style.display = 'none';
			delete this.settings.cursor;
		}

		// Set mode and theme
		this.editor.getSession().setMode(`ace/mode/${this.options.mode || 'json'}`);
		this.editor.setTheme(`ace/theme/${this.options.theme || 'sqlserver'}`);

		// Load settings
		this.editor.setOptions(this.settings);

		// Set model value
		// Use slot content if no value is found
		if (!this.value || this.value === '') {
			this.$emit('input', this.editor.getValue());
		}
		else {
			this.editor.setValue(this.value, -1);
		}

		// Editor value changes
		this.editor.on('change', () => {
			let new_value = this.local_value = this.editor.getValue();
			this.$emit('input', new_value);
		});
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Code.less';
</style>

<docs>
# Code
A code input based off of Ace Editor.

## Props
* **v-model** : STRING
* **id** : STRING (Required) - A unique ID for the field that Ace Editor binds to.
* **options** : OBJECT - An object containing option settings for the Ace Editor instance. Any [options from Ace Editor](https://ace.c9.io/#nav=api) can be passed in.
* **options.mode** : STRING - The name of the mode/language you want to use in the editor. You will need to import the code from the `brace/mode` folder (see below).
* **options.theme** : STRING - The name of the theme you want to use to color the code. You will need to import the code from the `brace/theme` folder (see below).
* **max-height** : STRING - The maximum height as a string to allow the editor to grow to.

## Usage
In the template...
```html
<r-code id="my_code_editor" v-model="code_editor_value" :options="code_editor_options" max-height="600px"/>
```

In the script...
```js
import 'brace/mode/python';
import 'brace/theme/cobalt';

{
	data() {
		return {
			code_editor_value : '{"hello" : "world"}',
			code_editor_options : {
				fontFamily : 'Consolas',
				mode : 'python',
				theme : 'cobalt'
			}
		};
	}
}
```
</docs>