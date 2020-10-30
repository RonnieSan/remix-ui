<template>
	<div class="image-cropper">
		<div class="canvas" :style="canvasStyle">
			<Cropper
				class="cropper"
				:src="src"
				:stencil-props="settings.stencil"
				@change="changeHandler"
			/>
		</div>
	</div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';

export default {
	components : {
		Cropper
	},
	props : {
		src : {
			type : String
		},
		settings : {
			type : Object,
			default() {
				return {
					min_canvas_height : '200px',
					min_canvas_width  : '300px',
					max_canvas_height : '800px',
					max_canvas_width  : '1200px',
					stendcil : {}
				};
			}
		}
	},
	data() {
		return {
			coordinates: {
				width: 0,
				height: 0,
				left: 0,
				top: 0,
			}
		};
	},
	computed : {
		canvasStyle() {
			return {
				minHeight : this.settings.min_canvas_height || '200px',
				minWidth  : this.settings.min_canvas_width  || '300px',
				maxHeight : this.settings.max_canvas_height || '800px',
				maxWidth  : this.settings.max_canvas_width  || '1200px'
			};
		}
	},
	methods : {
		changeHandler({ coordinates }) {
			this.$emit('change', coordinates);
		}
	}
};
</script>