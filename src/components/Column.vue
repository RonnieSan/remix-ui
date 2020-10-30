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
			let unit;
			
			let output = {
				flexGrow : 1,
				flexShrink : 0
			};

			let gutter_number = parseFloat(this.gutter) || 0;
			if (gutter_number) {
				unit = this.gutter.replace(/[0-9\.]+/, '');
				output.margin = `0 ${(gutter_number / 2) + unit}`;
			}
			if (this.span) {
				output.flexBasis = gutter_number * (this.span - 1) + unit;
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