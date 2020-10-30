<template>
	<div class="template-editor">
		<div v-if="edit_mode" class="edit-window">
			<div class="toolbar">
				<div class="header-options">
					<ul>
						<li>Heading One</li>
						<li>Heading Two</li>
						<li>Heading Three</li>
						<li>Heading Four</li>
						<li>Heading Five</li>
						<li>Heading Six</li>
					</ul>
				</div>
				<r-button class="icon toolbar" icon="format-header-pound" @click="command('formatBlock', '<h1>')"></r-button>

				<r-button class="icon toolbar" icon="format-bold" @click="command('bold')"></r-button>
				<r-button class="icon toolbar" icon="format-italic" @click="command('italic')"></r-button>

				<r-button class="icon toolbar" icon="format-align-left" @click="command('justifyLeft')"></r-button>
				<r-button class="icon toolbar" icon="format-align-center" @click="command('justifyCenter')"></r-button>
				<r-button class="icon toolbar" icon="format-align-right" @click="command('justifyRight')"></r-button>
				<r-button class="icon toolbar" icon="format-align-justify" @click="command('justifyFull')"></r-button>

				<r-button class="icon toolbar" icon="image"></r-button>
				<r-button class="icon toolbar" icon="link-variant" @click="command('createLink')"></r-button>

				<r-button class="icon toolbar" icon="format-list-bulleted-square" @click="command('insertUnorderedList')"></r-button>
				<r-button class="icon toolbar" icon="format-list-numbered" @click="command('insertOrderedList')"></r-button>
				<r-button class="icon toolbar" icon="format-quote-close" @click="command('formatBlock', '<blockquote>')"></r-button>
				<r-button class="icon toolbar" icon="code-tags" @click="command('formatBlock', '<pre>')"></r-button>

				<r-button class="icon toolbar" icon="playlist-edit"></r-button>
				<r-button class="icon toolbar" icon="check" @click="save()"></r-button>
			</div>
			<div class="template">
				<iframe ref="canvas" id="template-editor" :src="templateSrc" frameborder="0" @load="init()"></iframe>
			</div>
		</div>
		<div v-else>
			<r-button icon="pencil" @click="openTemplateEditor()">Edit Template</r-button>
		</div>
	</div>
</template>

<script>
import rButton from './Button';
import icon from './Icon';

export default {
	components : {
		rButton,
		icon
	},
	props : {
		templateSrc : {
			type : String,
			required : true
		},
		value : {
			type : Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			edit_mode : false,
			iframe    : null,
			edit_el   : null
		};
	},
	methods : {
		openTemplateEditor() {
			this.edit_mode = true;
			this.$nextTick(() => {
				this.iframe = (this.$refs.canvas.contentWindow || this.$refs.canvas.contentDocument);
				this.$refs.canvas.addEventListener('onload', (event) => {
					this.init();
				});
			});
		},
		init() {
			this.iframe.document.querySelectorAll('.remix-content').forEach((el) => {
				el.contentEditable = 'true';
				el.innerHTML = this.value[el.id];

				el.addEventListener('focus', (event) => {
					this.edit_el = el;
				});
			});
		},
		command(action, value = null) {
			this.iframe.document.execCommand(action, false, value);
			this.edit_el.focus();
		},
		save() {
			let new_value = {};

			this.iframe.document.querySelectorAll('.remix-content').forEach((el) => {
				new_value[el.id] = el.innerHTML;
			});

			this.$emit('input', new_value);
			this.edit_mode = false;
		}
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/TemplateEditor.less';

.template-editor {

	.edit-window {
		background-color: #FFF;
		display: flex;
		flex-direction: column;
		height: 100vh;
		left: 0;
		overflow: hidden;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 500;
	}

	.toolbar {
		flex: 0 0 auto;
	}

	.template {
		flex: 1 0 0;

		#template-editor {
			height: 100%;
			width: 100%;
		}
	}
}
</style>