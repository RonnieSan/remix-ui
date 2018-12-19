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
				<r-button class="icon toolbar" icon="format-header-pound"></r-button>

				<r-button class="icon toolbar" icon="format-bold"></r-button>
				<r-button class="icon toolbar" icon="format-italic"></r-button>

				<r-button class="icon toolbar" icon="format-align-left"></r-button>
				<r-button class="icon toolbar" icon="format-align-center"></r-button>
				<r-button class="icon toolbar" icon="format-align-right"></r-button>
				<r-button class="icon toolbar" icon="format-align-justify"></r-button>

				<r-button class="icon toolbar" icon="palette-swatch"></r-button>

				<r-button class="icon toolbar" icon="image"></r-button>
				<r-button class="icon toolbar" icon="table"></r-button>
				<r-button class="icon toolbar" icon="link-variant"></r-button>

				<r-button class="icon toolbar" icon="format-quote-close"></r-button>
				<r-button class="icon toolbar" icon="code-tags"></r-button>

				<r-button class="icon toolbar" icon="check"></r-button>
			</div>
			<div class="template">
				<iframe id="template-editor" :src="templateSrc" frameborder="0"></iframe>
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
			edit_mode : false
		};
	},
	methods : {
		openTemplateEditor() {
			this.edit_mode = true;
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