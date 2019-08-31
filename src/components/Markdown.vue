<template>
	<div
		:class="['markdown-wrapper', mode, {'disabled' : disabled}]"
		:style="{maxHeight}"
	>
		<div class="toolbar">
			<div class="tools"></div>
			<div class="utils">
				<div class="btn right icon fullscreen" @click="togglePreview()"><icon :type="preview" size="18"/></div>
				<!-- <div class="btn right icon"><icon type="help-circle" size="18"/></div> -->
				<div class="btn right icon fullscreen" @click="mode = 'fullscreen'"><icon type="fullscreen" size="24"/></div>
				<div class="btn right icon compact" @click="mode = 'compact'"><icon type="fullscreen-exit" size="24"/></div>
			</div>
		</div>
		<div class="editor">
			<div :class="['input', {'active' : edit}]">
				<div class="mirror">
					<pre>{{input}}<br/>&nbsp;</pre>
				</div>
				<textarea
					ref="input"
					wrap="soft"
					cols="1"
					:name="name"
					:value.sync="value"
					:disabled="disabled"
					v-on="listeners"
				></textarea>
			</div>
			<div :class="['output', {'active' : !edit}]">
				<div class="markdown" v-html="output"></div>
			</div>
		</div>
	</div>	
</template>

<script>
import formField from '../mixins/formField';
import Icon from './Icon';
import MarkdownIt from 'markdown-it';
import MarkdownItAttrs from 'markdown-it-attrs';

const markdown = new MarkdownIt();
markdown.use(MarkdownItAttrs);

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
			input   : this.value,
			edit    : true,
			focused : false,
			mode    : 'compact',
			preview : 'eye-off'
		};
	},
	computed : {
		output() {
			return markdown.render(this.value);
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
						vm.shortcut(event);
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
			switch (event.key) {

				// Tab
				case 'Tab':
					event.preventDefault();
					this.doCommand(event, '\t');
					break;

				// Ctrl + f
				case 'F':
					if (event.ctrlKey && this.mode === 'compact') {
						event.preventDefault();
						this.mode = 'fullscreen';
					}
					break;
			}
		},
		togglePreview() {
			this.edit = !this.edit;
			this.preview = (this.edit ? 'eye-off' : 'eye');
		},
		switchToCompact(event) {
			if (this.mode === 'fullscreen' && event.which === 27) {
				this.mode = 'compact';
				this.$refs.input.focus();
			}
		}
	},
	mixins : [
		formField
	],
	components : {
		Icon
	},
	mounted() {
		window.addEventListener('keydown', this.switchToCompact);
	},
	beforeDstroy() {
		window.removeEventListener('keydown', this.switchToCompact);
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Markdown.less';
</style>