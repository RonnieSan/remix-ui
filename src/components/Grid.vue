<template>
	<div :class="['grid', $attrs.class]" :style="style">
		<slot></slot>
	</div>
</template>

<script>
export default {
	provide() {
		return {
			gutter : this.gutter
		}
	},
	props : {
		gutter : String
	},
	computed : {
		style() {
			if (this.gutter) {
				return {
					'margin' : '-' + this.gutter + ' 0'
				};
			}
			return null;
		}
	}
};
</script>