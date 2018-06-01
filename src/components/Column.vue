<template>
	<div :class="['column', $attrs.class]" :style="style">
		<slot/>
	</div>
</template>

<script>
export default {
	computed : {
		style() {
			if (this.minWidth || this.maxWidth || this.span) {
				if (this.span) {
					column_size = this.span + ' 0 0';
				}

				let output = {
					'flex' : [
						'-webkit-box',
						'-moz-box',
						'-webkit',
						'-ms',
						column_size
					]
				};

				if (this.maxWidth) {
					output.maxWidth = this.maxWidth;
				}

				if (this.minWidth) {
					output.minWidth = this.minWidth;
				}

				return output;
			}
			return null;
		}
	},
	props : {
		maxWidth : String,
		minWidth : String,
		span     : Number
	}
};
</script>

<style lang="less">
// Default variables
@gutter-size: 20px;

// Import custom variables
@import (optional, reference) '~theme';

.column {
	flex: 1 0 0;
	margin: (@gutter-size/2);
	min-width: 320px;

	&.span-2 {
		flex: 2 0 @gutter-size;
	}

	&.span-3 {
		flex: 3 0 (@gutter-size * 2);
	}

	&.span-4 {
		flex: 4 0 (@gutter-size * 3);
	}

	&.span-5 {
		flex: 5 0 (@gutter-size * 4);
	}
}
</style>