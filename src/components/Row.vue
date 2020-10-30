<template>
	<div :class="['row', $attrs.class]" :style="style">
		<slot></slot>
	</div>
</template>

<script>
export default {
	inject : {
		gutter : {
			default : false
		}
	},
	computed : {
		style() {
			if (this.gutter) {
				return {
					'margin' : `calc(${this.gutter} / 2) calc(-${this.gutter} / 2)`
				};
			}
			return null;
		}
	}
};
</script>