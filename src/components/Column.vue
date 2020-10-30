<template>
	<div :class="['column', $attrs.class]" :style="style">
		<div class="inner-column"><slot/></div>
	</div>
</template>

<script>
export default {
	inject : {
		gutter : {
			default : false
		}
	},
	props : {
		auto : Boolean,
		maxWidth : {
			type : String
		},
		minWidth : {
			type : String,
		},
		span : {
			type : String
		}
	},
	computed : {
		style() {
			let gutter = (this.gutter || 0);
			let output = {
				flexGrow : 1,
				flexShrink : 0,
				margin : `0 calc(${gutter} / 2)`
			};
			if (this.span) {
				output.flexBasis =  `calc(${gutter} * ${this.span - 1})`;
				output.flexGrow = this.span;
			}

			if (this.auto) {
				output.flexBasis = 'auto';
				output.flexGrow = '0';
			}

			if (this.maxWidth) {
				output.maxWidth = this.maxWidth;
			}

			if (this.minWidth) {
				output.minWidth = this.minWidth;
			}
			return output;
		}
	}
};
</script>