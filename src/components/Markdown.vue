<template>
	<div
		:class="['r-markdown', 'control-border', 'focusable', mode, {disabled}]"
	>
		<div ref="toolbar" class="toolbar">
			<div class="tools">
				<!-- <div class="btn icon"><icon type="format-bold" size="24"/></div>
				<div class="btn icon"><icon type="format-italic" size="24"/></div> -->
			</div>
			<div class="utils">
				<!-- <div class="btn right icon"><icon type="help-circle" size="18"/></div> -->
				<div class="btn right icon fullscreen" @click="togglePreview()"><icon :type="preview" size="18"/></div>
				<div class="btn right icon fullscreen" @click="mode = 'fullscreen'"><icon type="fullscreen" size="24"/></div>
				<div class="btn right icon compact" @click="mode = 'compact'"><icon type="fullscreen-exit" size="24"/></div>
			</div>
		</div>
		<div class="editor">
			<div :class="['input', {'active' : edit}]" :style="maxHeightStyle">
				<textarea
					ref="input"
					wrap="soft"
					cols="1"
					:name="name"
					:value.sync="value"
					:disabled="disabled"
					v-on="listeners"
				></textarea>
				<div v-if="mode === 'compact'" class="mirror">
					<pre>{{input}}<br/>&nbsp;</pre>
				</div>
			</div>
			<div :class="['output', {'active' : !edit}]" :style="maxHeightStyle">
				<div class="markdown" v-html="output"></div>
			</div>
		</div>
	</div>	
</template>

<script>
import formField from '../mixins/formField';
import Icon from './Icon';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();

export default {
	props : {
		name  : String,
		value : {
			type    : String,
			default : ''
		},
		maxHeight : {
			type : String,
			default : '500px'
		},
		disabled : Boolean
	},
	data() {
		return {
			edit    : true,
			focused : false,
			mode    : 'compact',
			preview : 'eye-off'
		};
	},
	computed : {
		input() {
			return this.value;
		},
		output() {
			return markdown.render(this.value);
		},
		maxHeightStyle() {
			if (this.mode === 'compact') {
				return {
					maxHeight : this.maxHeight
				};
			}
			return null;
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					input(event) {
						vm.dirty = true;
						vm.inputHandler(event);
						vm.validate();
					},
					keydown(event) {
						let use_default;
						if (vm.$listeners.keydown) {
							use_default = vm.$listeners.keydown(event);
						}
						if (use_default !== false) {
							vm.shortcut(event);
						}
					}
				}
			);
		}
	},
	methods : {
		inputHandler(event) {
			this.$emit('input', event.target.value);
		},
		shortcut(event) {
			let ta = event.target;
			switch (event.key) {

				// Tab
				case 'Tab':
					event.preventDefault();
					let new_cursor_position;
					if (event.shiftKey) {
						new_cursor_position = ta.selectionStart - '\t'.length;
						if (ta.value.substring(new_cursor_position, ta.selectionStart) === '\t') {
							ta.value = ta.value.substring(0, new_cursor_position) + ta.value.substring(ta.selectionStart, ta.value.length);
							ta.selectionStart = new_cursor_position;
							ta.selectionEnd   = new_cursor_position;
						}
					}
					else {
						new_cursor_position = ta.selectionStart + '\t'.length;
						ta.value = ta.value.substring(0, ta.selectionStart) + '\t' + ta.value.substring(ta.selectionStart, ta.value.length);
						ta.selectionStart = new_cursor_position;
						ta.selectionEnd   = new_cursor_position;
					}
					ta.focus();
					break;

				// Ctrl + f
				case 'f':
					if (event.ctrlKey && this.mode === 'compact') {
						event.preventDefault();
						this.toggleMode(event)
					}
					break;

				case 'm':
					if (event.ctrlKey) {
						this.togglePreview(event);
					}
					break;

				case 'Escape':
					if (this.mode === 'fullscreen') {
						this.toggleMode(event);
					}
					break;
			}
		},
		togglePreview() {
			this.edit = !this.edit;
			this.$nextTick(() => {
				this.preview = (this.edit ? 'eye-off' : 'eye');
			});
		},
		toggleMode(event) {
			if (this.mode === 'fullscreen') {
				this.mode = 'compact';
				this.$refs.input.focus();
				document.getElementsByTagName('html')[0].style.overflow = null;
			}
			else {
				this.mode = 'fullscreen';
				this.$refs.input.focus();
				document.getElementsByTagName('html')[0].style.overflow = 'hidden';
			}
		}
	},
	mixins : [
		formField
	],
	components : {
		Icon
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.toggleMode);
	}
};
</script>