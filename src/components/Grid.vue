<template>
	<div :class="['grid', $attrs.class]">
		<slot></slot>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import (optional) '~remix-ui-styles/Layout.less';
</style>