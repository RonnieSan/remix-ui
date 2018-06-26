<template>
	<div :class="['column', $attrs.class]" :style="style">
		<slot/>
	</div>
</template>

<script>
export default {
	computed : {
		style() {
			let column_size = '1 0 0';
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
@import (optional) '~remix-ui-styles/Layout.less';
</style>