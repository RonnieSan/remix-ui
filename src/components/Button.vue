<template>
	<button :class="$attrs.class" :type="type" @click="$emit('click')">
		<span v-if="icon" class="icon"><icon v-if="icon" :type="icon" size="24"/></span><span class="label"><slot></slot></span>
	</button>
</template>

<script>
import Icon from './Icon';

export default {
	props : {
		type : {
			type : String,
			default : 'button'
		},
		icon : {
			type : String,
			default : null
		}
	},
	components : {
		Icon
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Button.less';
</style>