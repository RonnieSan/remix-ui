<template>
	<i :class="['mdi', iconType, iconSize]"></i>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed : {
		iconType() {
			return 'mdi-' + this.type;
		},
		iconSize() {
			if (this.size) {
				return 'mdi-' + this.size + 'px';
			}
			return null;
		}
	},
	props : {
		size : String,
		type : String
	}
};
</script>