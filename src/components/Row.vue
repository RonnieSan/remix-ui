<template>
	<div :class="['row', $attrs.class]">
		<slot></slot>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less">
// Default variables
@gutter-size: 20px;

// Import custom variables
@import (optional, reference) '~theme';

.row {
	align-items: stretch;
	display: flex;
	flex: 0 0 auto;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 0 -(@gutter-size/2);

	// Row modifiers
	&.left {
		justify-content: flex-start !important;
	}

	&.center {
		justify-content: center !important;
	}

	&.right {
		justify-content: flex-end !important;
	}

	&.top {
		align-items: flex-start !important;
	}

	&.middle {
		align-items: center !important;
	}

	&.bottom {
		align-items: flex-end !important;
	}
}
</style>