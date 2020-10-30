<template>
	<div
		:style="{maxHeight}"
		:class="['r-code', 'control-border', 'focusable', {disabled}]"
		@focusout="touched = true; $emit('validate')"
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
	props : {
		settings : {
			type : Object,
			default() {
				return {
					mode : 'json',
					theme : 'sqlserver'
				};
			}
		},
		maxHeight : String,
		value : String,
		disabled : Boolean
	},
	data() {
		return {
			dirty       : false,
			touched     : false,
			editor      : null,
			local_value : null,
			ready       : false
		};
	},
	computed : {
		id() {
			if (this.name) {
				return this.name;
			}
			else {
				let name       = '';
				let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				for (let n = 0; n < 8; n++) {
				  name += characters.charAt(Math.floor(Math.random() * characters.length));
				}
				return name;
			}
		},
		mergedSettings() {
			let settings = {};

			if (this.ready) {
				// Trigger
			}

			// Option defaults
			settings.highlightActiveLine = this.settings.highlightActiveLine || false;
			settings.highlightGutterLine = this.settings.highlightGutterLine || false;
			settings.minLines            = this.settings.minLines || 8;
			settings.maxLines            = this.settings.maxLines || Infinity;
			settings.printMargin         = this.settings.printMargin || false;
			settings.tabSize             = this.settings.tabSize || 2;

			// Set fonts
			if (this.settings.fontFamily) {
				settings.fontFamily = this.settings.fontFamily;
			}
			if (this.settings.fontSize) {
				settings.fontSize = this.settings.fontSize;
			}

			// Hide cursor
			if (this.settings.cursor === 'none' || this.settings.cursor === false) {
				this.editor.renderer.$cursorLayer.element.style.display = 'none';
				delete settings.cursor;
			}

			return settings;
		}
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
		mergedSettings : {
			handler(new_value) {
				if (this.editor) {
					// Set mode and theme
					this.editor.getSession().setMode(`ace/mode/${this.settings.mode || 'json'}`);
					this.editor.setTheme(`ace/theme/${this.settings.theme || 'sqlserver'}`);

					// Load settings
					this.editor.setOptions(new_value);
				}
			},
			deep : true
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

		// Set model value
		// Use slot content if no value is found
		if (!this.value || this.value === '') {
			this.$emit('input', this.editor.getValue());
		}
		else {
			this.editor.setValue(this.value, -1);
		}

		if (this.disabled) {
			this.editor.setReadOnly(true);
		}
		else {
			// Editor value changes
			this.editor.on('change', () => {
				let new_value = this.local_value = this.editor.getValue();
				this.$emit('input', new_value);
			});
		}

		// Set focus and blur listeners
		if (this.$listeners.focus) {
			this.editor.on('focus', this.$listeners.focus);
		}
		if (this.$listeners.blur) {
			this.editor.on('blur', this.$listeners.blur);
		}

		this.ready = true;
	}
};
</script>