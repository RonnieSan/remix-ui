<template>
	<div :class="['row', $attrs.class]">
		<slot></slot>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Layout.less';
</style>