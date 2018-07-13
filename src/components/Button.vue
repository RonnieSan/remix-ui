<template>
	<button :class="[$attrs.class, {disabled, loading}]" :type="type" :disabled="disabled || loading" @click="$emit('click')">
		<span v-if="icon || loading" class="icon">
			<icon v-if="!loading" :type="icon" :size="iconSize"/>
			<icon v-else type="loading" :size="iconSize"/>
		</span><span class="label"><slot></slot></span>
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
		},
		iconSize : {
			type : String,
			default : '24'
		},
		loading : {
			type : Boolean,
			default : false
		},
		disabled : {
			type : Boolean
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