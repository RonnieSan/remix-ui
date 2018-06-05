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
		this.settings.fontFamily          = this.options.fontFamily || 'Roboto Mono';
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
// Default variables
@control-border-color: #CCC;
@control-border-stroke: 1px;
@control-radius: 3px;

// Import theme
@import (optional, reference) '~theme';

.code-wrapper {
	border: @control-border-stroke solid @control-border-color;
	border-radius: @control-radius;
	overflow-y: auto;
	position: relative;
	vertical-align: top;
	width: 100%;
}
</style>