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
				let unit;
				let gutter_number = parseFloat(this.gutter) || 0;
				if (gutter_number) {
					unit = this.gutter.replace(/[0-9\.]+/, '');
				}

				return {
					'margin' : `${(gutter_number / 2) + unit} -${(gutter_number / 2) + unit}`
				};
			}
			return null;
		}
	}
};
</script>