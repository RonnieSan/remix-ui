<template>
	<div class="spacer" :style="{flex : flexBasis}"/>
</template>

<script>
export default {
	props : {
		size : {
			type : String,
			default : '10px'
		}
	},
	computed : {
		flexBasis() {
			return '0 0 ' + this.size;
		}
	}
};
</script>