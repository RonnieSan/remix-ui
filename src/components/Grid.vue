<template>
	<div :class="['grid', $attrs.class]">
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

.grid {
	align-items: stretch;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: -(@gutter-size/2) 0;

	&.no-gutter {
		margin: 0;

		.row {
			margin: 0;
		}

		.column {
			margin: 0;

			&.span-2 {
				flex: 2 0 0;
			}

			&.span-3 {
				flex: 3 0 0;
			}

			&.span-4 {
				flex: 4 0 0;
			}

			&.span-5 {
				flex: 5 0 0;
			}
		}
	}
}
</style>